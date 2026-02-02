import os
import hmac
import hashlib
from fastapi import HTTPException

# Load your secret from .env
GITHUB_WEBHOOK_SECRET = os.getenv("GITHUB_WEBHOOK_SECRET")

# Toggle for local testing
SKIP_SIGNATURE = True  # Set False when deploying

def verify_signature(payload: bytes, signature_header: str):
    """
    Verifies GitHub webhook signature.
    - payload: raw request body bytes
    - signature_header: value of 'X-Hub-Signature-256' header
    """
    if SKIP_SIGNATURE:
        return True  # skip verification for local testing

    if not signature_header:
        raise HTTPException(status_code=400, detail="Missing signature header")

    try:
        sha_name, signature = signature_header.split("=")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid signature header format")

    if sha_name != "sha256":
        raise HTTPException(status_code=400, detail="Unsupported signature type")

    mac = hmac.new(GITHUB_WEBHOOK_SECRET.encode(), msg=payload, digestmod=hashlib.sha256)
    if not hmac.compare_digest(mac.hexdigest(), signature):
        raise HTTPException(status_code=400, detail="Invalid signature")

    return True