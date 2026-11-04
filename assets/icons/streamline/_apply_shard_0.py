
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from _match_lib import pick_best
base = os.path.dirname(__file__)
result_path = os.path.join(base, "_result_shard_0.json")
cache = os.path.join(base, "_search_cache")
os.makedirs(cache, exist_ok=True)
with open(result_path) as f: result = json.load(f)
with open(os.path.join(base, "_shard_0.json")) as f:
    icons = {i["name"]: i for i in json.load(f)}
wave = json.load(sys.stdin)  # {name: {query, results:[{hash,name,categorySlug}]}}
used = set(result.get("usedHashes", {}).keys())
for name, data in wave.items():
    with open(os.path.join(cache, f"{name}.json"), "w") as f:
        json.dump(data, f)
    if name in result["resolved"] or name in result.get("notFound", []):
        print("skip", name); continue
    best, sc = pick_best(data["query"], data.get("results", []), used)
    if best:
        used.add(best["hash"])
        result["usedHashes"][best["hash"]] = name
        result["resolved"][name] = {
            "name": name, "category": icons[name]["category"], "hash": best["hash"],
            "streamlineName": best["name"], "setSlug": "streamline-regular",
            "score": sc, "query": data["query"],
        }
        print(f"OK {name} -> {best['name']} ({sc:.1f})")
    else:
        if name not in result["notFound"]:
            result["notFound"].append(name)
        print(f"NF {name}")
with open(result_path, "w") as f: json.dump(result, f, indent=2)
print("resolved", len(result["resolved"]), "notFound", len(result["notFound"]))
