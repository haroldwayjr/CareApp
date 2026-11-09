
import json, re, sys

PREFERRED = {
    "interface-essential", "health-beauty", "files-folders", "messages-chat-smileys",
    "users", "phones-mobile-devices", "shopping-ecommerce", "computers-devices-electronics",
    "content", "medical"
}

def normalize(s):
    return re.sub(r"[^a-z0-9]+", " ", (s or "").lower()).strip()

def score_result(query, result):
    q = normalize(query)
    name = result.get("name") or ""
    n = normalize(name)
    cat = (result.get("categorySlug") or "").lower()
    score = 0

    # category preference
    if cat in PREFERRED:
        score += 100
    elif "medical" in cat or "health" in cat:
        score += 90

    # exact / close name match
    if n == q:
        score += 80
    elif n.startswith(q) or q.startswith(n):
        score += 50
    elif q in n:
        score += 35

    qwords = [w for w in q.split() if w]
    nwords = n.split()
    if qwords:
        overlap = sum(1 for w in qwords if w in nwords)
        score += overlap * 12
        # penalize compound extras when query is simple
        extra = len(nwords) - len(qwords)
        if extra > 0 and overlap == len(qwords):
            score -= extra * 8
        if len(qwords) <= 2 and len(nwords) >= len(qwords) + 2:
            score -= 15

    # prefer shorter names
    score -= max(0, len(nwords) - 1) * 2
    score -= len(n) * 0.05

    # reject empty
    if not result.get("hash"):
        return -9999
    return score

def pick_best(query, results, used_hashes):
    ranked = sorted(results or [], key=lambda r: score_result(query, r), reverse=True)
    for r in ranked:
        h = r.get("hash")
        if not h or h in used_hashes:
            continue
        sc = score_result(query, r)
        # require some minimum quality
        if sc < 20:
            continue
        return r, sc
    return None, None

if __name__ == "__main__":
    payload = json.load(sys.stdin)
    query = payload["query"]
    results = payload.get("results", [])
    used = set(payload.get("usedHashes", []))
    best, sc = pick_best(query, results, used)
    out = {"best": best, "score": sc}
    print(json.dumps(out))
