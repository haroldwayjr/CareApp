const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "NjY3czAuMjAwOCAtMC41NTgyIDAuNDEwNSAtMC43NjhjMC4yMDk4IC0wLjIwOTggMC40NzcxIC0wLjM1MjYgMC43NjgxIC0wLjQxMDUgMC4yOTA5IC0wLjA1NzkgMC41OTI1IC0wLjAyODIgMC44NjY2IDAuMDg1MyAwLjI3NDEgMC4xMTM2IDAuNTA4NCAwLjMwNTggMC42NzMyIDAuNTUyNXMwLjI1MjggMC41MzY3IDAuMjUyOCAwLjgzMzRjMC4wMDQyIDAuMjAzNyAtMC4wMzMyIDAuNDA2MiAtMC4xMDk5IDAuNTk1MSAtMC4wNzY2IDAuMTg4OCAtMC4xOTEgMC4zNiAtMC4zMzYgMC41MDMyIC0wLjE0NTEgMC4xNDMyIC0wLjMxNzggMC4yNTUzIC0wLjUwNzYgMC4zMjk1IC0wLjE4OTkgMC4wNzQyIC0wLjM5MjggMC4xMDkgLTAuNTk2NSAwLjEwMjJ6bS0xNi41NTAw";
t.characters = t.characters + add;
return { part: 15, addLen: add.length, len: t.characters.length, expect: 8000 };
