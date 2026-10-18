"""Build app/public/data/cards.json from .tasks/init/ash_collection.json.

Python 3 stdlib only. Minifies whitespace only: every row kept as-is, no dedupe.
Deterministic: re-running produces a byte-identical file.
Run from anywhere: python3 -I .tasks/data/build.py
"""
import gzip
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "init", "ash_collection.json")
OUT = os.path.join(HERE, "..", "..", "app", "public", "data", "cards.json")

with open(SRC, encoding="utf-8") as f:
    data = json.load(f)

raw = json.dumps(data, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
assert json.loads(raw) == data

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "wb") as f:
    f.write(raw)

print(f"raw: {len(raw)} bytes")
print(f"gzip: {len(gzip.compress(raw, compresslevel=9))} bytes")
