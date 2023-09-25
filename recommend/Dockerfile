FROM python:3.9

WORKDIR /app

COPY recommend ./recommend

RUN pip install --no-cache-dir -r recommend/requirements.txt

EXPOSE 8083

CMD ["uvicorn", "recommend.app:app", "--host", "0.0.0.0", "--port", "8083"]
