import json

from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy import Table, MetaData
from recommend.database import engineconn
from datetime import datetime
from decimal import Decimal
import redis
import sys
import numpy as np
import math
import ast

print(sys.path)

app = FastAPI()


class Offset(BaseModel):
    calorie: int
    carbohydrate: float
    protein: float


metadata = MetaData()
Food = Table("food", metadata, autoload_with=engineconn().engine)

redis_host = "13.124.188.144"
redis_port = 6379
try:
    redis_db = redis.StrictRedis(host=redis_host, port=redis_port, db=0)
    print(redis_db.ping())
except Exception as e:
    print(f"Error: {e}")


@app.on_event("startup")
async def load_food_data_to_redis():
    db = engineconn().sessionmaker()
    foods = db.query(Food).all()

    keys = redis_db.keys('food:*')

    for key in keys:
        redis_db.delete(key)

    for food in foods:
        data_dict = {
            "food_id": food.food_id,
            "kcal": float(food.kcal),
            "carbs": float(food.carbs),
            "protein": float(food.protein),
            "name": food.name
        }
        redis_db.set("food:" + str(food.food_id), json.dumps(data_dict))

    print("Data loaded to Redis at startup!")


@app.post("/fastapi/recommend")
async def test(offset: Offset):
    print(offset)
    user_diffs = (offset.calorie, offset.carbohydrate, offset.protein)

    food_keys = redis_db.keys("food:*")

    foods_data = []

    weights = []

    for key in food_keys:
        value = redis_db.get(key)
        data = json.loads(value)
        foods_data.append(data)

    for food in foods_data:
        food_id = food["food_id"]
        kcal = food["kcal"]
        carbs = food["carbs"]
        protein = food["protein"]
        name = food["name"]

        weight = recommend_food(user_diffs[0] - kcal, user_diffs[1] - carbs, user_diffs[2] - protein)
        accuracy = calculate_accuracy(weight, 1)
        weights.append({
            "accuracy": accuracy,
            "name": name,
            "kcal": kcal,
            "carbs": carbs,
            "protein": protein
        })

    weights.sort(key=lambda x: x["accuracy"], reverse=True)

    top_foods = weights[:5]

    return {"recommended_foods": top_foods}


def recommend_food(calorie_diff, carb_diff, protein_diff, w_i=[1, 1, 1], λ=1):
    # 각 영양소의 차이 계산
    diffs = [
        math.log(1 + abs(calorie_diff)),
        math.log(1 + abs(carb_diff)),
        math.log(1 + abs(protein_diff))
    ]

    # 균형 패널티 계산
    balance_penalty = np.std(diffs)

    # 전체 가중치 합 계산
    W = sum([w * diff for w, diff in zip(w_i, diffs)]) + λ * balance_penalty

    return W


# 가중치 W를 기반으로 음식의 일치율 측정
def calculate_accuracy(w, alpha=1):
    return 100 * math.exp(-alpha * w)
