const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MjY0IDUuNzIyNjEgLTAuMDA5OSAwLjAwNiAtMC4wMjA2MyAwLjAxMTIgLTAuMDMxMjUgMC4wMTU3IC0wLjYyMTI5IDAuMjYyNyAtMS4zMTAyMyAwLjMyMDggLTEuOTY2OCAwLjE2NiAtMC42NTAzMSAtMC4xNTM0IC0xLjIzNDcgLTAuNTA4OCAtMS42NzE4NyAtMS4wMTM3bC0wLjAwMDk4IDAuMDAxIC0wLjQxOTkyIC0wLjQyMTljLTAuMjI0OCAtMC4xODc3IC0wLjM3MjE3IC0wLjQ1MjIgLTAuNDEwMTYgLTAuNzQzMSAtMC4wMzg5MiAtMC4yOTg1IDAuMDM5MjggLTAuNjAwNSAwLjIxNzc4IC0wLjg0MjhsMC4wMjQ0MSAtMC4wMjgzIDEuMzY4MTcgLTEuMzY4MiAwLjAyODMyIC0wLjAyNDQgMC4wOTM3NSAtMC4wNjI1YzAuMjI0MTUgLTAuMTMzOSAwLjQ4Nzk1IC0w";
t.characters = t.characters + add;
return { part: 44, addLen: add.length, len: t.characters.length, expect: 22500 };
