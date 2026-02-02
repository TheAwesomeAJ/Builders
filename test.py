import requests
from collections import defaultdict

# URL of your local FastAPI webhook
WEBHOOK_URL = "http://127.0.0.1:8000/webhooks/github"

# Users, repos, and labels to simulate
users = ["octocat", "alice", "bob", "charlie"]
repos = ["hackclub/site", "hackclub/workshops", "hackclub/sprig"]
labels = ["builders:small", "builders:medium", "builders:large"]

# Points mapping must match your FastAPI logic
POINTS = {
    "builders:small": 10,
    "builders:medium": 25,
    "builders:large": 50,
}

# Dictionary to track points locally
leaderboard = defaultdict(int)
pr_counter = 1

for user in users:
    for repo in repos:
        for label in labels:
            # Fake PR payload
            payload = {
                "action": "closed",
                "pull_request": {
                    "merged": True,
                    "html_url": f"https://github.com/{repo}/pull/{pr_counter}",
                    "user": {"login": user},
                    "labels": [{"name": label}],
                },
                "repository": {"full_name": repo},
            }

            headers = {
                "Content-Type": "application/json",
                # Skip signature for local testing
                "X-Hub-Signature-256": "skip"
            }

            response = requests.post(WEBHOOK_URL, json=payload, headers=headers)
            if response.status_code == 200:
                awarded = response.json().get("awarded_points", 0)
                leaderboard[user] += awarded
                print(f"✅ {user} awarded {awarded} points for {repo} ({label})")
            else:
                print(f"❌ Error {response.status_code}: {response.text}")

            pr_counter += 1

# Print a simple leaderboard
print("\n🏆 Local Hack Club Builders Leaderboard 🏆")
sorted_board = sorted(leaderboard.items(), key=lambda x: x[1], reverse=True)
for rank, (user, points) in enumerate(sorted_board, start=1):
    print(f"{rank}. {user}: {points} points")