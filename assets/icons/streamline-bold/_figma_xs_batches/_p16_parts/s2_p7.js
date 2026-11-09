const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MDc4IC0wLjY2OTQgLTAuNDI5MjUgLTAuNDI0NCAtMC42NzU5OSAtMC45OTk2IC0wLjY4NzczIC0xLjYwMzEgLTAuMDExNjcgLTAuNTk5NyAwLjIwOTU5IC0xLjE4MDMgMC42MTY5OCAtMS42MjAxem0zLjQ3NzUgLTMuOTY1MTdjLTAuOTkzOCAtMC4wMTM5NyAtMS45NTM5IDAuMzYwMiAtMi42NzYyIDEuMDQyOThsLTAuMDE1MSAwLjAxNDcgLTQuMTM3NjggNC4xMzc2OWMtMC4wMDU4NyAwLjAwNTg4IC0wLjAxMTY1IDAuMDExODQgLTAuMDE3MzIgMC4wMTc5MSAtMC42NzkzNSAwLjcyNjA1IC0xLjA0ODYzIDEuNjg4NDUgLTEuMDI5MjkgMi42ODI2NSAwLjAxOTM0IDAuOTk0MSAwLjQyNTc3IDEuOTQxNSAxLjEzMjg0IDIuNjQwNSAwLjcwNzA3IDAuNjk5MSAxLjY1";
t.characters = t.characters + add;
return { step: 2, part: 7, addLen: add.length, len: t.characters.length };
