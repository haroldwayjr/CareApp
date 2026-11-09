const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MCAxIDEgOSA1LjU1bDIuNzYgMi43N2EwLjUxIDAuNTEgMCAwIDAgMC43MSAwbDIuNzcgLTIuNzdhMSAxIDAgMCAxIDEuNDEgMCAxIDEgMCAwIDEgMCAxLjQybC0yLjggMi43NmEwLjUxIDAuNTEgMCAwIDAgMCAwLjcxWlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9zdGF0dXMvY3JpdGljYWwiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIkZsYXNoLTEtLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgRmxhc2ggMSBTdHJlYW1saW5lIEljb246IGh0dHBzOi8v";
t.characters = t.characters + add;
return { part: 55, addLen: add.length, len: t.characters.length, expect: 28000 };
