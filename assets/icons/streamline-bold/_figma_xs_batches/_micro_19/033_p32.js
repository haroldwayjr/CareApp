const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MjAxOTQgLTAuMTc5NiAtMC40MzE1NCAtMC4zODggLTAuNjY1MDQgLTAuNjQwNyAtMC4wMTYxOCAtMC4wMTc1IC0wLjAzMTcgLTAuMDM1OCAtMC4wNDc4NSAtMC4wNTM3aC0wLjM0MThjLTEuMTUwOTIgMCAtMi4wNTQ3IC0wLjM4MTMgLTIuNzM4MjggLTAuOTc2NSAtMC42Njg3MSAtMC41ODI0IC0xLjA5MTQ1IC0xLjMzNyAtMS4zNjEzMyAtMi4wNDIgLTAuMjcwODcgLTAuNzA3NyAtMC40MDIzNCAtMS40MDUyIC0wLjQ2Nzc3IC0xLjkxOCAtMC4wMzI5NiAtMC4yNTgzIC0wLjA1MDE3IC0wLjQ3NDkgLTAuMDU4NiAtMC42Mjg5IC0wLjAwNDIgLTAuMDc3IC0wLjAwNjY5IC0wLjEzODcgLTAuMDA3ODEgLTAuMTgyNiAtMC4wMDA1NiAtMC4wMjIgLTAuMDAwODIgLTAu";
t.characters = t.characters + add;
return { part: 32, addLen: add.length, len: t.characters.length, expect: 16500 };
