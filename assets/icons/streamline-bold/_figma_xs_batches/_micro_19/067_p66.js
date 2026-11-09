const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJTYWZldHktOTExLS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIFNhZmV0eSA5MTEgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8cGF0aCBmaWxsPVwiIzAwMDAwMFwiIGQ9XCJNMy4xNDc2NCA0Ljg2MDM1YzAuMjA2MDYgMCAwLjQxMDIyIDAuMDQwMjkgMC42MDA1OSAwLjExOTE0IDAuMTkwNDQgMC4wNzg5MiAwLjM2NDA1IDAuMTk1MDEgMC41MDk3NyAwLjM0MDgybDIuNzcyNDYgMi43NzI0NmMwLjE0NTgxIDAuMTQ1NzIgMC4yNjE5IDAuMzE5MzMgMC4zNDA4MiAwLjUwOTc3IDAuMDc4ODUgMC4xOTAzNiAwLjExOTE0IDAuMzk0NTQgMC4xMTkx";
t.characters = t.characters + add;
return { part: 66, addLen: add.length, len: t.characters.length, expect: 33500 };
