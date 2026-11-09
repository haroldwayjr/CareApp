const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "NyAtMC43MzI0IDEuNzY3NmMtMC40Njg5IDAuNDY4OCAtMS4xMDQ2IDAuNzMyNCAtMS43Njc2IDAuNzMyNEg4LjU3NzE1YzAuMzAzMjQgLTAuNDg2OCAwLjUwOTI0IC0xLjA1NTQgMC42MDkzNyAtMS42NTIzIDAuMTM3NDYgLTAuODIwNCAwLjA3NTUyIC0xLjY4NDYgLTAuMTgxNjQgLTIuNDYgLTAuMDYwMTMgLTAuMTgxMiAtMC4xMzI3IC0wLjM1NzIgLTAuMjEzODYgLTAuNTI2NHpNMTUuMDY1NCAxLjYyNWMtMC42NjgyIDEuMjI5NSAtMS44NjQ1IDIuMTQyMDIgLTMuMjUxOSAyLjQxNjAyIC0wLjc5ODEgMC4xNTc4MyAtMS4zOTgyIDAuNzE3NDggLTEuNjYxMiAxLjQwMDM5IC0wLjAzMTggMC4wODI2MSAtMC4wNTk1IDAuMTY4ODUgLTAuMDgyIDAuMjU3ODFsLTAu";
t.characters = t.characters + add;
return { step: 1, part: 3, addLen: add.length, len: t.characters.length };
