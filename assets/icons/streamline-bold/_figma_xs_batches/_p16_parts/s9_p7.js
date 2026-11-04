const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "IDEuMDIzNjkgMCAxLjQxNDIybDAuOTY5NyAwLjk2OTY3IC04LjIzMDQzIDguMjMwNDJjLTAuMjkyODkgMC4yOTI5IC0wLjI5Mjg5IDAuNzY3NyAwIDEuMDYwNmw0LjUgNC41YzAuMjkyODkgMC4yOTI5IDAuNzY3NzcgMC4yOTI5IDEuMDYwNjYgMGw4LjIzMDM3IC04LjIzMDQgMC45Njk3IDAuOTY5N2MwLjM5MDUgMC4zOTA1IDEuMDIzNyAwLjM5MDUgMS40MTQyIDBzMC4zOTA1IC0xLjAyMzcgMCAtMS40MTQybC0wLjk2OTcgLTAuOTY5NyAwLjc5MjkgLTAuNzkyOWMwLjE0MTMgLTAuMTQxMjYgMC4yMjA0IC0wLjMzMzA5IDAuMjE5NyAtMC41MzI5IC0wLjAwMDcgLTAuMTk5ODIgLTAuMDgxMSAtMC4zOTEwOSAtMC4yMjM0IC0wLjUzMTRsLTQuNTMxMiAtNC40Njg3";
t.characters = t.characters + add;
return { step: 9, part: 7, addLen: add.length, len: t.characters.length };
