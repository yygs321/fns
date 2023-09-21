from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Offset(BaseModel):
    calorie: int
    carbohydrate: float
    protein: float


@app.post("/fastapi/recommend")
async def test(offset: Offset):
    print(offset)
    return {"offset": offset}

