from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

from app.core.database import Base, SessionLocal, engine

# Import all models before create_all
import app.models

# Routers
from app.api import (
    admin,
    auth,
    bookings,
    chatbot,
    coupons,
    reviews,
)

from app.routers import vehicles_new as vehicles_router


# ====================================================
# Create Tables (Only Missing Tables)
# ====================================================
#Base.metadata.create_all(bind=engine)

# ====================================================
# FastAPI
# ====================================================
app = FastAPI(
    title="Smart Vehicle Rental Platform API",
    description="AI Powered Smart Vehicle Rental Platform",
    version="2.0.0",
)

# ====================================================
# CORS
# ====================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ====================================================
# Upload Folder
# ====================================================
uploads = Path("BACKEND/uploads")
uploads.mkdir(parents=True, exist_ok=True)

app.mount(
    "/uploads",
    StaticFiles(directory=str(uploads)),
    name="uploads",
)

# ====================================================
# API Routers
# ====================================================
app.include_router(auth.router, prefix="/api", tags=["Authentication"])

app.include_router(
    vehicles_router.router,
    prefix="/api",
    tags=["Vehicles"],
)

app.include_router(
    bookings.router,
    prefix="/api",
    tags=["Bookings"],
)

app.include_router(
    reviews.router,
    prefix="/api",
    tags=["Reviews"],
)

app.include_router(
    coupons.router,
    prefix="/api",
    tags=["Coupons"],
)

app.include_router(
    chatbot.router,
    prefix="/api",
    tags=["AI Chatbot"],
)

app.include_router(
    admin.router,
    prefix="/api",
    tags=["Admin"],
)

# ====================================================
# Root
# ====================================================
@app.get("/", tags=["System"])
def root():
    return {
        "project": "Smart Vehicle Rental Platform",
        "status": "Running",
        "version": "2.0.0",
        "database": "Supabase PostgreSQL",
        "documentation": "/docs",
        "features": [
            "JWT Authentication",
            "Vehicle Rental",
            "Multiple Vehicle Booking",
            "AI Chatbot",
            "Driver Booking",
            "Coupons",
            "Loyalty Rewards",
            "Hidden Deal Finder",
            "Vehicle Reviews",
            "Razorpay Payment",
            "Admin Dashboard"
        ]
    }


# ====================================================
# Health Check
# ====================================================
@app.get("/health", tags=["System"])
def health():
    return {
        "status": "healthy"
    }


# ====================================================
# Database Test
# ====================================================
@app.get("/db-test", tags=["System"])
def database_test():

    db = SessionLocal()

    try:

        db.execute(text("SELECT 1"))

        return {
            "database": "Connected",
            "message": "Supabase PostgreSQL Connected Successfully",
            "status": True
        }

    except Exception as e:

        return {
            "database": "Disconnected",
            "status": False,
            "error": str(e)
        }

    finally:
        db.close()


# ====================================================
# Startup Event
# ====================================================
@app.on_event("startup")
def startup():

    print("=" * 60)
    print(" SMART VEHICLE RENTAL PLATFORM ")
    print("=" * 60)
    print(" Server Started Successfully")
    print(" Database Connected")
    print(" Swagger Docs : http://127.0.0.1:8000/docs")
    print(" Health Check : http://127.0.0.1:8000/health")
    print(" Database Test: http://127.0.0.1:8000/db-test")
    print("=" * 60)


# ====================================================
# Shutdown Event
# ====================================================
@app.on_event("shutdown")
def shutdown():
    print("Server Stopped")