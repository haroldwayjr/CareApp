const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MCAwLjM1bDQuMjggNC41NGEwLjI0IDAuMjQgMCAwIDEgMCAwLjM2IDUuNDkgNS40OSAwIDAgMCAtMC42OSAwLjY2IDAuMjYgMC4yNiAwIDAgMSAtMC4zNyAwTDIuNTUgOC4wN2EwLjI1IDAuMjUgMCAwIDAgLTAuMzggMCAxMy4wNiAxMy4wNiAwIDAgMCAtMiAzLjggMSAxIDAgMCAwIDAuNTggMS4yNEwxMC41OCAxN2EwLjI1IDAuMjUgMCAwIDEgMC4wNyAwLjQzbC0xLjQ2IDEuMThhMC41IDAuNSAwIDAgMCAtMC4xNCAwLjYxYzAuMDcgMC4xMyAwLjcgMS4yOCAyLjk1IDEuMjhzMi44OCAtMS4xNSAyLjk1IC0xLjI4YTAuNTEgMC41MSAwIDAgMCAtMC4xNCAtMC42MWwtMS40NSAtMS4xN2EwLjI1IDAuMjUgMCAwIDEgMC4wNiAtMC40M2w5LjgzIC0zLjg4YTEgMSAw";
t.characters = t.characters + add;
return { part: 59, addLen: add.length, len: t.characters.length, expect: 30000 };
