const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "bWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgVGV4dCBCb3ggMiBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGZpbGw9XCIjMDAwMDAwXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMy4yNzU3NyAwLjU2MDU0N0MxLjc3NjE5IDAuNTYwNTQ3IDAuNTYwNTQ3IDEuNzc2MTkgMC41NjA1NDcgMy4yNzU3N2MwIDEuMTQ2MjkgMC43MTAzMzMgMi4xMjY2OCAxLjcxNDg0MyAyLjUyNDk5bDAgMTIuMzk5MjRjLTEuMDA0NTEgMC4zOTgzIC0xLjcxNDg0MyAxLjM3ODcgLTEuNzE0ODQzIDIuNTI1IDAgMS40OTk2IDEuMjE1NjQzIDIuNzE1MiAyLjcxNTIyMyAyLjcxNTIgMS4xNDY1OCAwIDIu";
t.characters = t.characters + add;
return { part: 12, addLen: add.length, len: t.characters.length, expect: 6500 };
