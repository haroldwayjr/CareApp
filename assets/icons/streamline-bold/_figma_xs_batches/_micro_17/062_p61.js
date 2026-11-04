const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "ZVwiPlxuICA8ZGVzYz5cbiAgICBXZWF0aGVyIFJhaW4gU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8Zz5cbiAgICA8Zz5cbiAgICAgIDxwYXRoIGQ9XCJNMjIuMDkgMTIuMDdhMC4yNSAwLjI1IDAgMCAxIC0wLjA5IC0wLjE5IDcgNyAwIDAgMCAtMTMuNjYgLTIgMC4yMyAwLjIzIDAgMCAxIC0wLjIyIDAuMTdBNS41IDUuNSAwIDAgMCA1LjM0IDIwYTAuMjggMC4yOCAwIDAgMCAwLjE4IDBBMi41OSAyLjU5IDAgMCAxIDYgMjBoMC4xMmEwLjI1IDAuMjUgMCAwIDAgMC4yMiAtMC4xMSAxLjQyIDEuNDIgMCAwIDEgMC4yNSAtMC4zbDAuNTEgLTAuNTFhMC4yNSAwLjI1IDAgMCAwIDAuMDYgLTAuMjIgMC4yNSAw";
t.characters = t.characters + add;
return { part: 61, addLen: add.length, len: t.characters.length, expect: 31000 };
