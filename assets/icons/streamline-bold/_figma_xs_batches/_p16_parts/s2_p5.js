const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "Mjg5IDEuMTQwMjg1IC0wLjczMDExIDAuNzMwMTEgLTEuMTQwMjkgMS43MjAzNSAtMS4xNDAyOSAyLjc1Mjg5VjIwLjY3OTZsMC4wMDAwMSAwLjAwMzJjMC4wMDA4OCAwLjgzOTUgMC4zMzQ3NSAxLjY0NDQgMC45Mjg0MyAyLjIzODEgMC41OTQ0NyAwLjU5NDUgMS40MDA3NCAwLjkyODQgMi4yNDE0NCAwLjkyODRIMjAuNjc5NWMwLjU1MjMgMCAxIC0wLjQ0NzcgMSAtMXMtMC40NDc3IC0xIC0xIC0xSDUuNDkwMzFjLTAuMzEwMjcgMCAtMC42MDc4MyAtMC4xMjMyIC0wLjgyNzIzIC0wLjM0MjYgLTAuMjE5MzggLTAuMjE5NCAtMC4zNDI2MyAtMC41MTY5IC0wLjM0MjY1IC0wLjgyNzIgMC4wMDAwMiAtMC4zMTAyIDAuMTIzMjcgLTAuNjA3OCAwLjM0MjY1IC0wLjgy";
t.characters = t.characters + add;
return { step: 2, part: 5, addLen: add.length, len: t.characters.length };
