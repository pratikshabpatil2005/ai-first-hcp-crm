from fastapi import FastAPI

from app.database import Base, engine

from app import models

from app.routes import (
    users,
    hcps,
    leads,
    ai
)

from app.routes import auth


app = FastAPI(
    title="AI First HCP CRM"
)


# Create database tables
Base.metadata.create_all(
    bind=engine
)


# Register routes

app.include_router(
    auth.router
)

app.include_router(
    users.router
)

app.include_router(
    hcps.router
)

app.include_router(
    leads.router
)

app.include_router(
    ai.router
)


@app.get("/")
def home():

    return {
        "message": "AI First HCP CRM Backend Running"
    }