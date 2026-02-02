from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    github_username = Column(String, unique=True, index=True)
    display_name = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship to contributions
    contributions = relationship("Contribution", back_populates="user")


class Repo(Base):
    __tablename__ = "repos"
    id = Column(Integer, primary_key=True)
    full_name = Column(String, unique=True)
    active = Column(Integer, default=1)  # 1 = allowed

    # Relationship to contributions
    contributions = relationship("Contribution", back_populates="repo")


class Contribution(Base):
    __tablename__ = "contributions"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    repo_id = Column(Integer, ForeignKey("repos.id"))
    pr_url = Column(String)
    label = Column(String)
    points = Column(Integer)
    merged_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships back to user and repo
    user = relationship("User", back_populates="contributions")
    repo = relationship("Repo", back_populates="contributions")