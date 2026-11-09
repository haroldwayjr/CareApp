const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "NjYgMC4wNDg0IDAuMDcyNiAwLjExMzEgMC4wNzI2IDAuMTgwNHYwLjU4NDdjMCAwLjU5NjcgMC4yMzcgMS4xNjkgMC42NTkgMS41OTEgMC40MjIgMC40MjE5IDAuOTk0MyAwLjY1OSAxLjU5MSAwLjY1OXMxLjE2OSAtMC4yMzcxIDEuNTkxIC0wLjY1OWMwLjQyMTkgLTAuNDIyIDAuNjU5IC0wLjk5NDMgMC42NTkgLTEuNTkxdi0wLjc5NDdjMC4wMDA2IC0wLjA1IDAuMDE2MiAtMC4wOTg2IDAuMDQ0NyAtMC4xMzk2IDAuMDI4NiAtMC4wNDEgMC4wNjg3IC0wLjA3MjUgMC4xMTUzIC0wLjA5MDQgMC40NjggLTAuMTgxNSAwLjg3MDIgLTAuNTAwMSAxLjE1MzkgLTAuOTE0MSAwLjI4MzggLTAuNDE0IDAuNDM1OCAtMC45MDQgMC40MzYxIC0xLjQwNTl2LTJjMC4wMDg4";
t.characters = t.characters + add;
return { part: 12, addLen: add.length, len: t.characters.length, expect: 6500 };
