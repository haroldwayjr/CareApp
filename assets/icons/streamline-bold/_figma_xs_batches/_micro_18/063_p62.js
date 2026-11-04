const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "ZD1cIk0xNC4wNjk1IDAuMDE2NjQzOUMxNS4zMjkgMC4yMTg4MjkgMTYuMDU2OCAyLjIwOTkgMTUuNjk1IDQuNDYzODJjLTAuMzA4NiAxLjkyMjMxIC0xLjMxMDEgMy40MTQ5NyAtMi4zNzk1IDMuNjg3MTRsLTAuNzc4IDUuMDYzNTRjMC4yODQxIDAuMTEyMyAwLjU0MDcgMC4zMDUyIDAuNzI3NiAwLjU4NTUgMSAxLjUgMyAzLjUgNiAzLjUgMi4yIDAgNCAxLjggNCA0VjI0aC04di00LjJjLTIgLTEgLTMuMyAtMi4xIC00LjUgLTQgLTAuNzIxMiAtMS4yMDIgLTAuNDAyMiAtMi4wNTcyIDAuMjM0NyAtMi40NTQ2bDAuODczMyAtNS42ODM4NmMtMC42ODQ4IC0wLjc2OTIxIC0xLjAwNDQgLTIuMjc5MDUgLTAuNzM5NCAtMy45Mjk5IDAuMzYxOCAtMi4yNTM5MiAxLjY3";
t.characters = t.characters + add;
return { part: 62, addLen: add.length, len: t.characters.length, expect: 31500 };
