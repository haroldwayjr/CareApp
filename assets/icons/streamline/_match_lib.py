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
    score = 0.0

    if cat in PREFERRED:
        score += 50
    elif "medical" in cat or "health" in cat:
        score += 45

    if n == q:
        score += 200
    elif n.startswith(q + " ") or n.startswith(q):
        score += 90
    elif q.startswith(n) and len(n) >= 3:
        score += 70
    elif q in n:
        score += 40

    qwords = [w for w in q.split() if w]
    nwords = n.split()
    if qwords:
        overlap = sum(1 for w in qwords if w in nwords)
        score += overlap * 15
        if overlap == len(qwords):
            score += 25
            extra = len(nwords) - len(qwords)
            if extra > 0:
                score -= extra * 10
        else:
            score -= (len(qwords) - overlap) * 30
        if len(qwords) <= 2 and len(nwords) >= len(qwords) + 2 and overlap < len(qwords):
            score -= 40

    score -= max(0, len(nwords) - 1) * 2
    score -= len(n) * 0.05
    if not result.get("hash"):
        return -9999
    return score

def pick_best(query, results, used_hashes):
    ranked = sorted(((score_result(query, r), r) for r in (results or [])), key=lambda x: x[0], reverse=True)
    for sc, r in ranked:
        h = r.get("hash")
        if not h or h in used_hashes:
            continue
        if sc < 40:
            continue
        return r, sc
    return None, None

if __name__ == "__main__":
    payload = json.load(sys.stdin)
    best, sc = pick_best(payload["query"], payload.get("results", []), set(payload.get("usedHashes", [])))
    print(json.dumps({"best": best, "score": sc}))
