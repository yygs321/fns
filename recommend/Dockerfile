FROM python:3.9

WORKDIR /app

COPY recommend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY recommend/app.py .

EXPOSE 8083

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8083"]
