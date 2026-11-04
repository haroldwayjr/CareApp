const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "dHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTUuMzMgMjJoLTEuOTJhMC45MSAwLjkxIDAgMCAxIC0wLjkxIC0wLjkxdi00YTAuMzcgMC4zNyAwIDAgMSAwIC0wLjE1IDIuNSAyLjUgMCAxIDAgLTIuMDggMCAwLjM3IDAuMzcgMCAwIDEgMCAwLjE1djRBMi45MiAyLjkyIDAgMCAwIDEzLjQxIDI0aDEuOTJhMSAxIDAgMCAwIDAgLTJtLTMuOCAtNi4zNmExIDEgMCAxIDEgMSAtMSAxIDEgMCAwIDEgLTEgMVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTIzIDNhMSAxIDAgMCAwIC0xIDF2MC44OWEwLjUgMC41IDAgMCAxIC0wLjUgMC41aC0wLjdhMi41IDIuNSAwIDEgMCAw";
t.characters = t.characters + add;
return { part: 46, addLen: add.length, len: t.characters.length, expect: 23500 };
