import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
GITHUB_WEBHOOK_SECRET = os.getenv("GITHUB_WEBHOOK_SECRET")
ALLOWED_REPOS = os.getenv("ALLOWED_REPOS", "").split(",")  # comma-separated
POINTS = {
    "builders:small": 10,
    "builders:medium": 25,
    "builders:large": 50,
    "builders:xl": 100,
}