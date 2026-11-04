const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "ODk4IDEuMDk0NyAyLjY1MzI2IDEuMTAyOCAwLjk5NDI5IDAuMDA4IDEuOTUyNDkgLTAuMzcyMiAyLjY3MDc5IC0xLjA1OTdsMC4wMTE3IC0wLjAxMTUgMi43ODY0IC0yLjc4NjQgMC4wMTAyIC0wLjAxIDEuMzE2MyAtMS4zMTY0IDAuMDE0NyAtMC4wMTUxYzAuNDg5NSAtMC41MTc4IDAuODIwNCAtMS4xNTc3NSAwLjk2MzMgLTEuODQ0NzQgMC4wNTY1IC0wLjI3MTQ1IDAuMDgzNyAtMC41NTAyNSAwLjA3OTggLTAuODMxNzQgLTAuMDE0IC0wLjk5Mzg0IC0wLjQxNSAtMS45NDMwNCAtMS4xMTc4IC0yLjY0NTg1IC0wLjcwMjggLTAuNzAyODIgLTEuNjUyIC0xLjEwMzgzIC0yLjY0NTkgLTEuMTE3OFwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2Utd2lkdGg9";
t.characters = t.characters + add;
return { step: 3, part: 0, addLen: add.length, len: t.characters.length };
