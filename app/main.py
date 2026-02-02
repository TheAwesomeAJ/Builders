from requests import Session
from fastapi import FastAPI, Request, Header
from app.github.webhook import verify_signature
from app.github.scoring import first_builders_label, get_points
from app.db import SessionLocal
from app.models import User, Repo, Contribution
from app.config import ALLOWED_REPOS
from fastapi.responses import JSONResponse

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/leaderboard")
def leaderboard():
    """
    Returns all builders sorted by total points descending.
    """
    db: Session = next(get_db())

    # Calculate total points per user
    users_points = (
        db.query(User)
        .all()
    )

    leaderboard = []
    for user in users_points:
        total_points = sum(c.points for c in user.contributions)
        leaderboard.append({
            "username": user.github_username,
            "display_name": user.display_name,
            "total_points": total_points
        })

    # Sort descending
    leaderboard_sorted = sorted(leaderboard, key=lambda x: x["total_points"], reverse=True)

    return JSONResponse(content={"leaderboard": leaderboard_sorted})

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/builders/{github_username}")
def get_profile(github_username: str):
    db = SessionLocal()
    user = db.query(User).filter(User.github_username == github_username).first()
    if not user:
        return {"error": "User not found"}
    contributions = db.query(Contribution).filter(Contribution.user_id == user.id).all()
    total_points = sum(c.points for c in contributions)
    return {
        "user": user.github_username,
        "total_points": total_points,
        "contributions": [
            {"repo": db.query(Repo).get(c.repo_id).full_name, "points": c.points, "pr": c.pr_url}
            for c in contributions
        ]
    }

@app.post("/webhooks/github")
async def github_webhook(request: Request, x_hub_signature_256: str = Header(...)):
    body = await request.body()
    verify_signature(body, x_hub_signature_256)
    payload = await request.json()

    if payload.get("action") != "closed":
        return {"ok": True}

    pr = payload["pull_request"]
    if not pr["merged"]:
        return {"ok": True}

    repo_name = payload["repository"]["full_name"]
    if repo_name not in ALLOWED_REPOS:
        return {"ok": True}

    label_name = first_builders_label(pr["labels"])
    if not label_name:
        return {"ok": True}

    points = get_points(label_name)

    db = SessionLocal()
    github_user = pr["user"]["login"]

    # ensure user exists
    user = db.query(User).filter(User.github_username == github_user).first()
    if not user:
        user = User(github_username=github_user, display_name=github_user)
        db.add(user)
        db.commit()
        db.refresh(user)

    repo = db.query(Repo).filter(Repo.full_name == repo_name).first()
    if not repo:
        repo = Repo(full_name=repo_name)
        db.add(repo)
        db.commit()
        db.refresh(repo)

    contrib = Contribution(user_id=user.id, repo_id=repo.id, pr_url=pr["html_url"], label=label_name, points=points)
    db.add(contrib)
    db.commit()

    return {"ok": True, "awarded_points": points}