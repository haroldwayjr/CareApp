const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "LjQ2MzUgMC4yMzU5OCAwLjU1MjcgMC40Njg3NSAwLjAxMDggMC4wMjc4MiAwLjAxOTkgMC4wNTYzOCAwLjAyNzQgMC4wODU5MyAwLjAwMzIgMC4wMTMwMiAwLjAwNzIgMC4wMjU4MyAwLjAwOTggMC4wMzkwN2wwLjAxMTcgMC4wNzYxN2MwLjAwMTUgMC4wMTY2NSAwLjAwMTUgMC4wMzMyOCAwLjAwMTkgMC4wNDk4IDAuMDAwMSAwLjAwMzI2IDAuMDAxIDAuMDA2NSAwLjAwMSAwLjAwOTc3djAuMDE1NjJsLTAuMDE0NiAwLjEzMTg0Yy0wLjAwMjUgMC4wMTMxOCAtMC4wMDU3IDAuMDI2MDkgLTAuMDA4OCAwLjAzOTA2IC0wLjAwNzYgMC4wMzA2MyAtMC4wMTczIDAuMDYwMDggLTAuMDI4NCAwLjA4ODg3IC0wLjA4OSAwLjIzMzE3IC0wLjI4OTggMC40MTc3MyAtMC41";
t.characters = t.characters + add;
return { part: 16, addLen: add.length, len: t.characters.length, expect: 8500 };
