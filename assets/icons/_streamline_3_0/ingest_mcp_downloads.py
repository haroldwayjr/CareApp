#!/usr/bin/env python3
"""Map MCP download_multiple_assets JSON to dest files and fetch.

Usage:
  python3 ingest_mcp_downloads.py regular path/to/mcp.json
  python3 ingest_mcp_downloads.py bold path/to/mcp.json
"""
from __future__ import annotations

import json
import sys
import urllib.request
from pathlib import Path

ROOT = Path("/Users/harold.wayjr/Projects/CareApp/assets/icons")
META = Path("/Users/harold.wayjr/Projects/CareApp/assets/icons/_streamline_3_0")


def load_map(kind: str) -> dict[str, str]:
    name = "hash_to_file_regular.json" if kind == "regular" else "hash_to_file_bold.json"
    return json.loads((META / name).read_text())


def main() -> None:
    kind = sys.argv[1]
    src = Path(sys.argv[2])
    mapping = load_map(kind)
    payload = json.loads(src.read_text())
    downloads = payload["downloads"] if isinstance(payload, dict) else payload
    sub = "streamline" if kind == "regular" else "streamline-bold"
    ok = 0
    missing = []
    for row in downloads:
        h = row["iconHash"]
        rel = mapping.get(h)
        if not rel:
            missing.append(h)
            continue
        dest = ROOT / sub / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        req = urllib.request.Request(row["downloadUrl"], headers={"User-Agent": "CareApp-icon-ingest"})
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = resp.read()
        if b"<svg" not in data:
            raise SystemExit(f"not svg: {h} {dest}")
        dest.write_bytes(data)
        ok += 1
        print("wrote", dest.relative_to(ROOT), len(data))
    print("ok", ok, "missing_hash", len(missing))
    if missing:
        print("missing", missing)


if __name__ == "__main__":
    main()
