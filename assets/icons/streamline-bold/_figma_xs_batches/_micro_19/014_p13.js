const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "IC0xLjE2NTcgLTAuNDQ0MiAtMi4yODc0IC0xLjI2IC0zLjEyTTcuMjQwMDkgNC42ODI2NWg5LjYyMDAxYzAuMjM5NyAtMC4wMDMwOCAwLjQ3MjUgMC4wODAwNCAwLjY1NjEgMC4yMzQyMiAwLjE4MzUgMC4xNTQxOCAwLjMwNTYgMC4zNjkxNiAwLjM0MzkgMC42MDU3OGwwLjQ4IDIuODdjMC4wMDU4IDAuMDM3MjYgMC4wMDM1IDAuMDc1MzUgLTAuMDA2OSAwLjExMTYxcy0wLjAyODUgMC4wNjk4NCAtMC4wNTMxIDAuMDk4MzljLTAuMDIzNyAwLjAyNjYyIC0wLjA1MzEgMC4wNDc2IC0wLjA4NiAwLjA2MTQ0IC0wLjAzMjggMC4wMTM4NCAtMC4wNjg0IDAuMDIwMTggLTAuMTA0IDAuMDE4NTZINi4wMDAwOWMtMC4wNDEwMyAwLjAwMjA2IC0wLjA4MiAtMC4wMDQ5NCAt";
t.characters = t.characters + add;
return { part: 13, addLen: add.length, len: t.characters.length, expect: 7000 };
