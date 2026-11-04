const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MC4xMjAwMiAtMC4wMjA0OSAtMC4wMzgwMiAtMC4wMTU1NiAtMC4wNzIxNiAtMC4wMzkyOSAtMC4wOTk5OCAtMC4wNjk1MSAtMC4wMjUzIC0wLjA2NzcxIC0wLjAyNTMgLTAuMTQyMjggMCAtMC4yMWwwLjQzIC0yLjc5YzAuMDI5MDUgLTAuMjQwNSAwLjE0NDQxIC0wLjQ2MjI4IDAuMzI0NjYgLTAuNjI0MTMgMC4xODAyNCAtMC4xNjE4NSAwLjQxMzExIC0wLjI1Mjc3IDAuNjU1MzQgLTAuMjU1ODd6TTE5LjU1MDEgMTUuNjgyN2MtMC4yOTY3IDAgLTAuNTg2NyAtMC4wODggLTAuODMzNCAtMC4yNTI4IC0wLjI0NjYgLTAuMTY0OSAtMC40Mzg5IC0wLjM5OTEgLTAuNTUyNCAtMC42NzMyIC0wLjExMzYgLTAuMjc0MSAtMC4xNDMzIC0wLjU3NTcgLTAuMDg1NCAtMC44";
t.characters = t.characters + add;
return { part: 14, addLen: add.length, len: t.characters.length, expect: 7500 };
