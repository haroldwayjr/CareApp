
import json, os, sys, urllib.request, time
base = os.path.dirname(os.path.abspath(__file__))
progress_path = os.path.join(base, "_progress.json")
progress = json.load(open(progress_path))
mapping = {v["hash"]: v for v in progress["resolved"].values()}
downloads = json.load(open(sys.argv[1]))
if isinstance(downloads, dict) and "downloads" in downloads:
    downloads = downloads["downloads"]
downloaded = set(progress.get("downloaded", []))
skipped = 0
ok = 0
failed = []
for d in downloads:
    h = d["iconHash"]
    icon = mapping.get(h)
    if not icon:
        print("UNKNOWN HASH", h)
        continue
    rel = f"{icon['category']}/{icon['name']}.svg"
    path = os.path.join(base, icon["category"], f"{icon['name']}.svg")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if os.path.exists(path) and os.path.getsize(path) > 0:
        skipped += 1
        if icon["name"] not in downloaded:
            downloaded.add(icon["name"])
        print("SKIP", rel)
        continue
    url = d["downloadUrl"]
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "CareApp-StreamlineImport/1.0"})
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = resp.read()
        if not data or b"<svg" not in data[:500].lower() and b"<svg" not in data.lower():
            # still write if looks like svg xml
            if b"svg" not in data.lower():
                raise ValueError("not svg")
        with open(path, "wb") as f:
            f.write(data)
        downloaded.add(icon["name"])
        ok += 1
        print("OK", rel, len(data))
    except Exception as e:
        failed.append(icon["name"])
        print("FAIL", rel, e)
    time.sleep(0.05)
progress["downloaded"] = sorted(downloaded)
progress.setdefault("failedImport", [])
for n in failed:
    if n not in progress["failedImport"]:
        progress["failedImport"].append(n)
with open(progress_path, "w") as f:
    json.dump(progress, f, indent=2)
print(f"done ok={ok} skipped={skipped} failed={len(failed)}")
