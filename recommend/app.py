from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy import Table, MetaData
from recommend.database import engineconn
import redis
import sys
import numpy as np
import math

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

    for food in foods:
        redis_db.set(str(food.food_id), str(food))

    print("Data loaded to Redis at startup!")



@app.post("/fastapi/recommend")
async def test(offset: Offset):
    print(offset)
    user_diffs = (offset.calorie, offset.carbohydrate, offset.protein)

    food_keys = redis_db.keys("food:*")
    foods_data = {}

    for key in food_keys:
        foods_data[key.decode()] = redis_db.hgetall(key)

    for food_key, data in foods_data.items():
        print(food_key, {k.decode(): v.decode() for k, v in data.items()})
    #
    # weights = []
    # for food in foods:
    #
    #
    # return {"offset": offset}
    return {"foods": foods_data}


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
