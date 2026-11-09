const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "ZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8cGF0aCBmaWxsPVwiIzAwMDAwMFwiIGQ9XCJNMTkuNSAxMmMwLjMzMTUgMCAwLjY0OTQgMC4xMzE4IDAuODgzOCAwLjM2NjJzMC4zNjYyIDAuNTUyMyAwLjM2NjIgMC44ODM4djJoMmMwLjMzMTUgMCAwLjY0OTQgMC4xMzE4IDAuODgzOCAwLjM2NjJTMjQgMTYuMTY4NSAyNCAxNi41djNjMCAwLjMzMTUgLTAuMTMxOCAwLjY0OTQgLTAuMzY2MiAwLjg4MzhzLTAuNTUyMyAwLjM2NjIgLTAuODgzOCAwLjM2NjJoLTJ2MmMwIDAuMzMxNSAtMC4xMzE4IDAuNjQ5NCAtMC4zNjYyIDAuODgzOFMxOS44MzE1IDI0IDE5LjUgMjRoLTNjLTAuMzMxNSAwIC0wLjY0OTQgLTAuMTMx";
t.characters = t.characters + add;
return { part: 41, addLen: add.length, len: t.characters.length, expect: 21000 };
