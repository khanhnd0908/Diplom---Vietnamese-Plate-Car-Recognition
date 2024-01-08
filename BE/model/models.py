from datetime import datetime

from sqlalchemy import Column, INTEGER, String, DATETIME, text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class History(Base):
    __tablename__ = "history"
    id= Column(INTEGER, primary_key=True)
    number= Column(String(1024), nullable=True)
    parked_at= Column(DATETIME, nullable=True, server_default=text("CURRENT_TIMESTAMP"))



