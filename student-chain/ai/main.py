from fastapi import FastAPI
import hashlib
import json
from typing import Dict

app = FastAPI()

SPEC_VERSION = "1.0.0"

@app.post("/ai/canonicalize")
def canonicalize(data: Dict):

    canonical = json.dumps(
        data,
        sort_keys=True,
        separators=(",", ":")
    )

    sha256 = hashlib.sha256(
        canonical.encode("utf-8")
    ).hexdigest()

    return {
        "canonical": canonical,
        "sha256": "0x" + sha256,
        "specVersion": SPEC_VERSION
    }


@app.get("/")
def root():
    return {"message": "AI service running"}
