const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "MTI3MTcgLTAuNzEwNyAyLjUyNTI5IC0xLjcxNTZIMTguMTk5N2MwLjM5ODEgMS4wMDQ5IDEuMzc4NyAxLjcxNTYgMi41MjUzIDEuNzE1NiAxLjQ5OTYgMCAyLjcxNTIgLTEuMjE1NiAyLjcxNTIgLTIuNzE1MiAwIC0xLjE0NjYgLTAuNzEwNyAtMi4xMjcyIC0xLjcxNTYgLTIuNTI1M1Y1LjgwMTA2YzEuMDA0OSAtMC4zOTgxMiAxLjcxNTYgLTEuMzc4NzEgMS43MTU2IC0yLjUyNTI5IDAgLTEuNDk5NTggLTEuMjE1NiAtMi43MTUyMjMgLTIuNzE1MiAtMi43MTUyMjMgLTEuMTQ2MyAwIC0yLjEyNjcgMC43MTAzMzMgLTIuNTI1IDEuNzE0ODQzbC0xMi4zOTkyNCAwQzUuNDAyNDUgMS4yNzA4OCA0LjQyMjA2IDAuNTYwNTQ3IDMuMjc1NzcgMC41NjA1NDdNMTguMTk5";
t.characters = t.characters + add;
return { part: 13, addLen: add.length, len: t.characters.length, expect: 7000 };
