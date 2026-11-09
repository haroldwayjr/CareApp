const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "LjEwMzQgMC4wMTgyNyAtMC4yMDk3IDAuMDMwMjYgLTAuMzE4NCAwLjAzMDI3aC0wLjUzNDFjLTAuNDE0MSAwIC0wLjc0OTggLTAuMzM1OTkgLTAuNzUgLTAuNzUgMC4wMDAxIC0wLjQxNDEgMC4zMzU4IC0wLjc1IDAuNzUgLTAuNzVoMC41MzQxYzAuMTUyMSAtMC4wMDAwOCAwLjI4MjQgLTAuMTA5MTUgMC4zMTI1IC0wLjI1NjgzbDAuMDA1OSAtMC4wNjU0M1YwLjc1MTk1M2MwLjAwMDEgLTAuNDEzOTQxIDAuMzM2MSAtMC43NDk3Mzk3NyAwLjc1IC0wLjc0OTk5OTg4TTExLjQwNjQgMS41MDE5NWMtMC40Njg2IDAuMDAwMjYgLTAuODUyNCAwLjM4MjY4IC0wLjg1MjUgMC44NTg0djAuMjY3NThjMCAwLjQ3NTgyIDAuMzgzOCAwLjg1NzE2IDAuODUyNSAwLjg1NzQy";
t.characters = t.characters + add;
return { part: 73, addLen: add.length, len: t.characters.length, expect: 37000 };
