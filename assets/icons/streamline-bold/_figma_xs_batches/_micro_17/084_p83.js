const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "LjQxNDIgLTAuMzM1OCAtMC43NSAtMC43NSAtMC43NUg5LjQyMTg4VjUuODU4NGgxLjI2NTYydjAuMTcxODdjMC4wMDAxIDAuNDE0MTMgMC4zMzU5IDAuNzUgMC43NSAwLjc1IDAuNDE0MSAtMC4wMDAwOSAwLjc0OTkgLTAuMzM1OTMgMC43NSAtMC43NVY1LjEwODRjLTAuMDAwMiAtMC40MTM5OSAtMC4zMzYgLTAuNzQ5OTEgLTAuNzUgLTAuNzV6TTE1LjgwNjYgMC41MDk3NjZsMC4xNjMxIDAuMTQ4NDM3IDUuODcyMSA1Ljg3MjA2N3YwLjAwMDk4YzAuMDY4NSAwLjA2ODU3IDAuMTMgMC4xNDI3OCAwLjE4ODUgMC4yMTg3NUgxNi41Yy0wLjE5ODkgMCAtMC4zODk2IC0wLjA3OTA3IC0wLjUzMDMgLTAuMjE5NzNDMTUuODI5MSA2LjM4OTYyIDE1Ljc1IDYuMTk4OTEg";
t.characters = t.characters + add;
return { part: 83, addLen: add.length, len: t.characters.length, expect: 42000 };
