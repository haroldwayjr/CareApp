const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "IiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIkJpY3ljbGUtLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgQmljeWNsZSBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGZpbGw9XCIjMDAwMDAwXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTguMjM5MyA0LjQyODc5YzAuMTM0NCAwLjUzNTY5IC0wLjE5MDkgMS4wNzg4OSAtMC43MjY2IDEuMjEzMjdsLTAuODgwOCAwLjIyMDk0IDEuNzAzIDQuNjc3NGMwLjIzMTIgLTAuMDMzMyAwLjQ2NzYgLTAuMDUwNiAwLjcwOCAtMC4wNTA2IDIuNzE2NSAwIDQuOTE4OCAyLjIwMjMgNC45MTg4IDQuOTE4";
t.characters = t.characters + add;
return { part: 74, addLen: add.length, len: t.characters.length, expect: 37500 };
