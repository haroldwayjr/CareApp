const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MiAtMC4zODU0MyAtMC44NDQ1IC0wLjY5MzY3IC0xLjk2IC0wLjgzOTg0IC0zLjQ5OXptMTEuNjcyODUgMy40MjE5YzAuMzE1NCAtMC4xMDg0IDAuNTc2MyAtMC4yNjU3IDAuNzk0OSAtMC40NTYxIDAuNDIzNiAtMC4zNjg5IDAuNzI5NiAtMC44ODI5IDAuOTQ1MyAtMS40NDYzIDAuMjA2MyAtMC41Mzg5IDAuMzE2MSAtMS4wODgyIDAuMzc0MSAtMS41MTk1aC0xLjM4Mzh6TTQuNDEzMDkgMS45MjM4M2MtMC41NTIxNyAwIC0wLjk5OTgxIDAuNDQ3ODggLTEgMSAwIDAuNTUyMjggMC40NDc3MSAxIDEgMSAwLjU1MjA2IC0wLjAwMDI3IDEgLTAuNDQ3ODggMSAtMSAtMC4wMDAxOSAtMC41MTc2NiAtMC4zOTQyMyAtMC45NDMwMiAtMC44OTg0NCAtMC45OTQxNHptMy4z";
t.characters = t.characters + add;
return { part: 36, addLen: add.length, len: t.characters.length, expect: 18500 };
