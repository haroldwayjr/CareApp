const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MyAtMS4wMzQ3IC0xLjgxMTE1IC0wLjU1MDQgLTAuNDYwNTMgLTEuMjQ3NyAtMC43MDg0NyAtMS45NjUzIC0wLjY5ODg1SDcuMTkwMDljLTAuNzExOTYgMC4wMDMwOCAtMS4zOTk2MiAwLjI1OTI2IC0xLjk0MDA1IDAuNzIyNzVzLTAuODk4NDIgMS4xMDQwOCAtMS4wMDk5NSAxLjgwNzI1bC0wLjQgMi4zN2MtMC4wMDgxMiAwLjAzODY3IC0wLjAyNDk1IDAuMDc0OTggLTAuMDQ5MjEgMC4xMDYxN3MtMC4wNTUzMSAwLjA1NjQ0IC0wLjA5MDc5IDAuMDczODNjLTAuMDM0OTYgMC4wMjAxOSAtMC4wNzQ2MyAwLjAzMDgyIC0wLjExNSAwLjAzMDgycy0wLjA4MDA0IC0wLjAxMDYzIC0wLjExNSAtMC4wMzA4MmwtMS4wNyAtMC42Yy0wLjE3MDQ3IC0wLjExNDk0IC0wLjM2";
t.characters = t.characters + add;
return { part: 8, addLen: add.length, len: t.characters.length, expect: 4500 };
