from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)
    hcp_name = Column(String)
    interaction_type = Column(String)
    product = Column(String)
    notes = Column(Text)
    follow_up = Column(String)