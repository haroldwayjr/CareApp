const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "LmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGZpbGw9XCIjMDAwMDAwXCIgZD1cIk0xMiAwQzkuNjI2NjMgMCA3LjMwNjU1IDAuNzAzNzg4IDUuMzMzMTYgMi4wMjIzNiAzLjM1OTc3IDMuMzQwOTQgMS44MjE3IDUuMjE1MDkgMC45MTM0NTEgNy40MDc4IDAuMDA1MTk5NDMgOS42MDA1MSAtMC4yMzI0NDEgMTIuMDEzMyAwLjIzMDU4MiAxNC4zNDExczEuNjA1OTA4IDQuNDY2IDMuMjg0MTM4IDYuMTQ0MiAzLjgxNjQzIDIuODIxMSA2LjE0NDIgMy4yODQxYzIuMzI3NzggMC40NjMgNC43NDA1OCAwLjIyNTQgNi45MzMyOCAtMC42ODI4IDIuMTkyNyAtMC45MDgzIDQuMDY2OSAtMi40NDY0IDUuMzg1NCAtNC40MTk4QzIzLjI5NjIgMTYuNjkzNSAyNCAxNC4zNzM0IDI0";
t.characters = t.characters + add;
return { step: 7, part: 0, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
