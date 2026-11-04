const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "LTAuNTUyMiAwLjQ0NzcyIC0xIDEgLTFoOC43MDcwMmMwLjU1MjMgMCAxIDAuNDQ3OCAxIDEgMCAwLjU1MjMgLTAuNDQ3NyAxIC0xIDFINy42NDY0OGMtMC41NTIyOCAwIC0xIC0wLjQ0NzcgLTEgLTFtMSAyLjc1Yy0wLjU1MjI4IDAgLTEgMC40NDc4IC0xIDEgMCAwLjU1MjMgMC40NDc3MiAxIDEgMWg4LjcwNzAyYzAuNTUyMyAwIDEgLTAuNDQ3NyAxIC0xIDAgLTAuNTUyMiAtMC40NDc3IC0xIC0xIC0xelwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL2NvbW1lcmNlL2NhcnQiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wi";
t.characters = t.characters + add;
return { part: 15, addLen: add.length, len: t.characters.length, expect: 8000 };
