from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy import Table, MetaData
from recommend.database import engineconn
import redis
import sys

print(sys.path)

app = FastAPI()


class Offset(BaseModel):
    calorie: int
    carbohydrate: float
    protein: float


metadata = MetaData()
Food = Table("food", metadata, autoload_with=engineconn().engine)

redis_host = "13.124.188.144/"
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
    return {"offset": offset}

