const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "Mzc0OTdsMC44IDAuNDcwMDVjMC4wMzMxOSAwLjAxOSAwLjA2MTk1IDAuMDQ0OSAwLjA4NDM2IDAuMDc2IDAuMDIyNDEgMC4wMzEgMC4wMzc5NyAwLjA2NjQgMC4wNDU2NCAwLjEwNCAwLjAwMzIyIDAuMDM3OSAtMC4wMDEzMyAwLjA3NjEgLTAuMDEzMzcgMC4xMTIyIC0wLjAxMjAzIDAuMDM2MSAtMC4wMzEzIDAuMDY5MyAtMC4wNTY2MyAwLjA5NzggLTAuODA4NTI4IDAuODI1MiAtMS4yNjA5NTQgMS45MzQ3IC0xLjI2IDMuMDl2MmMwLjAwMDMzNCAwLjUwMTkgMC4xNTIzMzUgMC45OTE5IDAuNDM2MDcxIDEuNDA1OSAwLjI4MzczOSAwLjQxNCAwLjY4NTk1OSAwLjczMjYgMS4xNTM5MjkgMC45MTQxIDAuMDQ2NTkgMC4wMTc5IDAuMDg2NzMgMC4wNDk0IDAuMTE1";
t.characters = t.characters + add;
return { part: 10, addLen: add.length, len: t.characters.length, expect: 5500 };
