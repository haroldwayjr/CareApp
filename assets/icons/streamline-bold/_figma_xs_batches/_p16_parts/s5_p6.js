const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "Ljg0Mjc3bDAuMDI1MzkgLTAuMDI4MzJMMTAuODE0NSA1LjU0OThjMC4wMDg4IC0wLjAwODgxIDAuMDE5MiAtMC4wMTcwMSAwLjAyOTMgLTAuMDI0NDEgMC4yNDIyIC0wLjE3ODQ0IDAuNTQ0NCAtMC4yNTY2MyAwLjg0MjcgLTAuMjE3NzdNMTYuNSAwYzAuNTUyMyAwIDEgMC40NDc3MTUgMSAxdjAuNWgzQzIxLjg4MDcgMS41IDIzIDIuNjE5MjkgMjMgNHY5Ljc2NjZjLTAuMDgyOCAtMC4wMDc2IC0wLjE2NjIgLTAuMDExNyAtMC4yNSAtMC4wMTE3aC0wLjV2LTAuNWMwIC0wLjcyOTggLTAuMjkwMiAtMS40Mjg5IC0wLjgwNTcgLTEuOTQ0NCAtMC4xMzYxIC0wLjEzNjEgLTAuMjg1NCAtMC4yNTU4IC0wLjQ0NDMgLTAuMzU5M1Y0YzAgLTAuMjc2MTQgLTAuMjIzOSAt";
t.characters = t.characters + add;
return { step: 5, part: 6, addLen: add.length, len: t.characters.length };
