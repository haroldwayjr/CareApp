const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MSAtMS40N2MwIC0wLjI5NjcgMC4wODc5NyAtMC41ODY3IDAuMjUyOCAtMC44MzM0IDAuMTY0ODIgLTAuMjQ2NyAwLjM5OTA5IC0wLjQzODkgMC42NzMxNyAtMC41NTI1IDAuMjc0MDkgLTAuMTEzNSAwLjU3NTY5IC0wLjE0MzIgMC44NjY2NyAtMC4wODUzIDAuMjkwOTcgMC4wNTc5IDAuNTU4MjQgMC4yMDA3IDAuNzY4MDIgMC40MTA1czAuMzUyNjQgMC40NzcgMC40MTA1MiAwLjc2OCAwLjAyODE3IDAuNTkyNiAtMC4wODUzNiAwLjg2NjcgLTAuMzA1NzkgMC41MDgzIC0wLjU1MjQ2IDAuNjczMmMtMC4yNDY2OCAwLjE2NDggLTAuNTM2NjkgMC4yNTI4IC0wLjgzMzM2IDAuMjUyOCAtMC4zOTc4MiAwIC0wLjc3OTM2IC0wLjE1ODEgLTEuMDYwNjYgLTAuNDM5NHMt";
t.characters = t.characters + add;
return { part: 16, addLen: add.length, len: t.characters.length, expect: 8500 };
