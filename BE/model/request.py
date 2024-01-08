from datetime import datetime

from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class historyRequest(BaseModel):
    number: str = Field(
        None, title="number", max_length=1000
    )
    parked_at: datetime = Field(
        None, title="parked_at"
    )
