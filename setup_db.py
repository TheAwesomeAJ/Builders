from app.db import Base, engine, SessionLocal
from app.models import User, Repo, Contribution

# 1️⃣ Create tables
Base.metadata.create_all(bind=engine)
print("✅ Tables created!")

# 2️⃣ Seed a test repo
db = SessionLocal()
test_repo = db.query(Repo).filter(Repo.full_name == "hackclub/site").first()
if not test_repo:
    test_repo = Repo(full_name="hackclub/site", active=1)
    db.add(test_repo)
    db.commit()
    db.refresh(test_repo)
    print(f"✅ Repo seeded: {test_repo.full_name}")

# 3️⃣ Seed a test user
test_user = db.query(User).filter(User.github_username == "octocat").first()
if not test_user:
    test_user = User(github_username="octocat", display_name="Octo Cat")
    db.add(test_user)
    db.commit()
    db.refresh(test_user)
    print(f"✅ User seeded: {test_user.github_username}")

# 4️⃣ Seed a fake PR contribution
test_contrib = db.query(Contribution).filter(Contribution.pr_url == "https://github.com/hackclub/site/pull/1").first()
if not test_contrib:
    contrib = Contribution(
        user_id=test_user.id,
        repo_id=test_repo.id,
        pr_url="https://github.com/hackclub/site/pull/1",
        label="builders:medium",
        points=25
    )
    db.add(contrib)
    db.commit()
    print(f"✅ Contribution seeded: {contrib.pr_url}")

db.close()
print("🎉 DB setup complete. You can now test the app!")