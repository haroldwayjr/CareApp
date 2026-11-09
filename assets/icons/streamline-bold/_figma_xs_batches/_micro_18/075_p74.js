const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "MC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJUaW1lci0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBUaW1lciBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxnPlxuICAgIDxwYXRoIGQ9XCJNMTkuMTcgMy40OGExLjIzIDEuMjMgMCAwIDAgLTEuNTMgMS45MkE5LjA1IDkuMDUgMCAxIDEgMy4zNiA5Ljc1IDEuMjMgMS4yMyAwIDAgMCAxIDlhMTEuNyAxMS43IDAgMCAwIC0wLjUzIDMuNDggMTEuNTEgMTEuNTEgMCAxIDAgMTguNjggLTlaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTAuMDQgMi4yYTEu";
t.characters = t.characters + add;
return { part: 74, addLen: add.length, len: t.characters.length, expect: 37500 };
