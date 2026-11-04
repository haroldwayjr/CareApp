const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MC41MSAwIDAgMSAtMC43MyAwLjY0bC0yLjEzIC0xLjJhMC4yNSAwLjI1IDAgMCAwIC0wLjI0IDBsLTIuMTMgMS4yYTAuNTEgMC41MSAwIDAgMSAtMC43NSAtMC42NmwwLjg2IC0yYTAuMjYgMC4yNiAwIDAgMCAtMC4wNSAtMC4yOGwtMS41MyAtMS41MWEwLjQ3IDAuNDcgMCAwIDEgMC4zMyAtMC44M2gxLjc4YTAuMjQgMC4yNCAwIDAgMCAwLjIyIC0wLjE1bDAuOTMgLTJhMC41MiAwLjUyIDAgMCAxIDAuOTIgMGwwLjkzIDJhMC4yNCAwLjI0IDAgMCAwIDAuMjIgMC4xNWgxLjc4YTAuNDggMC40OCAwIDAgMSAwLjM0IDAuODNcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAi";
t.characters = t.characters + add;
return { step: 8, part: 5, addLen: add.length, len: t.characters.length };
