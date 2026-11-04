const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "MzMgMCAwIDAgMjEuMTkgMC4wNU04IDEzLjQ5YTEwLjU5IDEwLjU5IDAgMCAxIDMgNiAwLjg3IDAuODcgMCAwIDEgLTEgMSAxMC42NCAxMC42NCAwIDAgMSAtNiAtM2wtMS4zMSAtMS40YTAuODcgMC44NyAwIDAgMSAxLjIzIC0xLjIzbDEuMzcgMS4zN2E5IDkgMCAwIDAgMy4zOCAyLjExYzAuMTIgMCAwLjI5IC0wLjEzIDAuMjUgLTAuMjVhOC44NyA4Ljg3IDAgMCAwIC0yLjExIC0zLjM3bC0xLjM3IC0xLjM4YTAuODcgMC44NyAwIDEgMSAxLjIzIC0xLjIzWm01IC00LjEyYTAuODcgMC44NyAwIDAgMSAtMS4yMyAxLjIzbC0wLjQ1IC0wLjQ2YTEuMDcgMS4wNyAwIDAgMCAtMS41MiAwIDEuMDYgMS4wNiAwIDAgMCAwIDEuNTFsMi43NCAyLjc1YTEuMDcgMS4wNyAw";
t.characters = t.characters + add;
return { part: 38, addLen: add.length, len: t.characters.length, expect: 19500 };
