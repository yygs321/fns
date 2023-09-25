from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
from settings import DATABASE_USER, DATABASE_PASSWORD

DB_URL = f'mysql+pymysql://{DATABASE_USER}:{DATABASE_PASSWORD}@http://13.124.188.144:3306/fns_database'

class engineconn:

    def __init__(self):
        self.engine = create_engine(DB_URL, pool_recycle = 500)

    def sessionmaker(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    def connection(self):
        conn = self.engine.connect()
        return conn