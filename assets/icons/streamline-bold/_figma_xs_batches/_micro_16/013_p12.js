const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MDAxIDAuMDAzOWMtMC4wMDQ0IDAuMDE2ODIgLTAuMDE2NCAwLjA2MTg3IC0wLjAyNzMgMC4xMTgxNyAtMC4wMDM2IDAuMDE4NzIgLTAuMDA2OSAwLjAzNzggLTAuMDA5OCAwLjA1NjY0bC0wLjAxMTcgMC4wNzYxNyAtMC4wMTA3IDAuMDg4ODdjLTAuMDAyOCAwLjAyOTU2IC0wLjAwMzggMC4wNTYyNCAtMC4wMDQ5IDAuMDc4MTIgLTAuMDAwNiAwLjAwNjk5IC0wLjAwMTUgMC4wMTQ3OSAtMC4wMDIgMC4wMjI0NkwxMCA2LjIzMTQ1djAuMDI2MzZjMCAwLjA1NTM1IDAuMDAyNyAwLjExMTAxIDAuMDA4OCAwLjE2NjAybDAuMDE0NiAwLjEzMTgzYzAuMDA0MiAwLjAzNzMgMC4wMDk3IDAuMDc0NDYgMC4wMTY2IDAuMTExMzMgMC4wMTExIDAuMDU4NzkgMC4wMjQzIDAu";
t.characters = t.characters + add;
return { part: 12, addLen: add.length, len: t.characters.length, expect: 6500 };
