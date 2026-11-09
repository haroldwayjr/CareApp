const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "NzU0IC0wLjM5MDYzIDAuMDY3NCAtMC44MTkzOSAwLjQ1ODAxIC0wLjk1NzAzIDAuMzkwMzkgLTAuMTM3MjkgMC44MTgyMyAwLjA2Nzc5IDAuOTU2MDMgMC40NTggMC4xMDI1IDAuMjkwNzcgMC40Nzk0IDAuNTcxMjkgMC44OTY1IDAuNTcxMjkgMC40Njg1IC0wLjAwMDM1IDAuODUyMyAtMC4zODE4MiAwLjg1MjUgLTAuODU3NDJ2LTAuNzUyOTNjLTAuMjY0NSAwLjEwMzMgLTAuNTUyMSAwLjE2MjA5IC0wLjg1MzUgMC4xNjIxMSAtMS4zMDE0IC0wLjAwMDI2IC0yLjM1MjQ5IC0xLjA1NzUxIC0yLjM1MjUxIC0yLjM1NzQydi0wLjI2NzU4QzkuMDU0MDMgMS4wNjA1NCAxMC4xMDUgMC4wMDIyMTM2NiAxMS40MDY0IDAuMDAxOTUzMTJtNS4yNjI3IDBjMC40MTQxIDAu";
t.characters = t.characters + add;
return { part: 70, addLen: add.length, len: t.characters.length, expect: 35500 };
