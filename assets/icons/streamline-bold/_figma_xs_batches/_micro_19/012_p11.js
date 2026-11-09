const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MjUgMC4wOTA0IDAuMDI4NTEgMC4wNDEgMC4wNDQxIDAuMDg5NiAwLjA0NDc1IDAuMTM5NnYwLjc5NDdjMCAwLjU5NjcgMC4yMzcwNSAxLjE2OSAwLjY1OTAxIDEuNTkxIDAuNDIxOTYgMC40MjE5IDAuOTk0MjUgMC42NTkgMS41OTA5OSAwLjY1OXMxLjE2OTAzIC0wLjIzNzEgMS41OTA5OSAtMC42NTljMC40MjE5NiAtMC40MjIgMC42NTkwMSAtMC45OTQzIDAuNjU5MDEgLTEuNTkxdi0wLjU4NDdjLTAuMDAwMDUgLTAuMDY3MyAwLjAyNTk3IC0wLjEzMiAwLjA3MjU4IC0wLjE4MDQgMC4wNDY2MiAtMC4wNDg1IDAuMTEwMjEgLTAuMDc3MSAwLjE3NzQyIC0wLjA3OTZIMTcuMDAwMWMwLjA2NzIgMC4wMDI1IDAuMTMwOCAwLjAzMTEgMC4xNzc0IDAuMDc5NiAwLjA0";
t.characters = t.characters + add;
return { part: 11, addLen: add.length, len: t.characters.length, expect: 6000 };
