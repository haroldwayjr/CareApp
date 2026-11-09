#!/usr/bin/env python3
"""Apply a wave of search results to _result_remain_3.json using pick_best."""
import json, sys
from pathlib import Path

BASE = Path(__file__).parent
sys.path.insert(0, str(BASE))
from _match_lib import pick_best


def slim(r):
    return {
        "hash": r.get("hash"),
        "name": r.get("name"),
        "categorySlug": r.get("categorySlug"),
        "setSlug": r.get("setSlug"),
    }


def main():
    wave_path = Path(sys.argv[1])
    wave = json.load(open(wave_path))
    result_path = BASE / "_result_remain_3.json"
    out = json.load(open(result_path)) if result_path.exists() else {"resolved": {}, "notFound": [], "usedHashes": {}}
    used = set(out.get("usedHashes", {}).keys())
    not_found_set = set(out.get("notFound", []))

    for name, payload in wave.items():
        if name in out["resolved"]:
            continue
        query = payload["query"]
        category = payload["category"]
        results = [slim(r) for r in (payload.get("results") or [])]
        best, score = pick_best(query, results, used)
        if best is None:
            if name not in not_found_set:
                out["notFound"].append(name)
                not_found_set.add(name)
            print(f"NF {name}")
            continue
        h = best["hash"]
        used.add(h)
        out["usedHashes"][h] = name
        if name in not_found_set:
            out["notFound"] = [n for n in out["notFound"] if n != name]
            not_found_set.discard(name)
        out["resolved"][name] = {
            "name": name,
            "category": category,
            "hash": h,
            "streamlineName": best.get("name"),
            "setSlug": best.get("setSlug") or "streamline-regular",
            "score": score,
            "query": query,
        }
        print(f"OK {name} -> {best.get('name')} ({score:.1f})")

    json.dump(out, open(result_path, "w"), indent=2)
    print(f"resolved={len(out['resolved'])} notFound={len(out['notFound'])} usedHashes={len(out['usedHashes'])}")


if __name__ == "__main__":
    main()
