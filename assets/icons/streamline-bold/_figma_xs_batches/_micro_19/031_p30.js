const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "IDAgMC4wMTE0IC0wLjAwMDIgMC4wMjM4IC0wLjAwMSAwLjAzNTIgLTAuMDQgMC41ODM2IDAuMDk3MiAxLjI0MSAwLjM3NCAxLjcxNzggMC4yODE0IDAuNDg0NiAwLjY5NjIgMC44NTcxIDEuMTgwNyAxLjA3MDNsMC4wMDA5IDAuMDAxYzAuMjA3NSAwLjA5MTYgMC4zOCAwLjI0MzkgMC40OTkxIDAuNDMzNSAwLjExODggMC4xODkzIDAuMTgwNiAwLjQwODggMC4xODA2IDAuNjMwOSAwIDAuMzc1IC0wLjEzOTggMC43NDA4IC0wLjM5NzQgMS4wMTQ3IC0wLjI1ODcgMC4yNzQ4IC0wLjYxNjQgMC40MzU1IC0wLjk5NjEgMC40MzU1SDkuMjk0OTJjLTAuMzc5NjcgLTAuMDAwMSAtMC43Mzc0NyAtMC4xNjA3IC0wLjk5NjA5IC0wLjQzNTUgLTAuMjU3NjEgLTAuMjczOSAt";
t.characters = t.characters + add;
return { part: 30, addLen: add.length, len: t.characters.length, expect: 15500 };
