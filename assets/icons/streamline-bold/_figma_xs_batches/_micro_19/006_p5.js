const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "IChfKSB7fQogIHNldC5jbGlwc0NvbnRlbnQgPSB0cnVlOwogIHJldHVybiB7IG9rOiB0cnVlIH07Cn0KY29uc3QgQkFUQ0ggPSBbeyJzZXROYW1lIjogImljb24vbWlzYy9jYXIiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiQ2FyLS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIENhciBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGZpbGw9XCIjMDAwMDAwXCIgZD1cIk0yMi4yNDAxIDEwLjU5MjdjLTAuMDI1MyAtMC4wMjg1IC0wLjA0NDYgLTAuMDYxNyAt";
t.characters = t.characters + add;
return { part: 5, addLen: add.length, len: t.characters.length, expect: 3000 };
