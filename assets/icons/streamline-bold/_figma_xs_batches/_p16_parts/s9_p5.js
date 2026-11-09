const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "LjI0MTEwMWMtMi42NzkzIC0wLjMzNDkxNDMgLTUuMzYzMiAwLjU4NTk0MSAtNy4yNzI1IDIuNDk1MjQ5bC0wLjMyNjYgMC4zMjY2MmMwLjIyIDAuMTA1MTEgMC40MjY1IDAuMjQ4MDIgMC42MDk4IDAuNDI4NzhsNC41MzEyIDQuNDY4NzVjMC4xODc1IDAuMTg0ODcgMC4zMzkxIDAuMzk5MjUgMC40NTA0IDAuNjMyMzNsMC4yOTU5IC0wLjI5NTgyYzEuOTA5MyAtMS45MDkzMSAyLjgzMDEgLTQuNTkzMTcgMi40OTUyIC03LjI3MjQ5bC0wLjAxNDcgLTAuMTE3NTQzYy0wLjA0MjUgLTAuMzQwNDU5IC0wLjMxMDcgLTAuNjA4NjI2IC0wLjY1MTIgLTAuNjUxMTgzek03LjA2ODAyIDkuMjVIMy41Yy0wLjE5ODkxIDAgLTAuMzg5NjggMC4wNzkwMiAtMC41MzAzMyAwLjIx";
t.characters = t.characters + add;
return { step: 9, part: 5, addLen: add.length, len: t.characters.length };
