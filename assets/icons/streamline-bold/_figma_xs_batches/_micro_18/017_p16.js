const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIlNob3BwaW5nLUNhcnQtLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgU2hvcHBpbmcgQ2FydCBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxnPlxuICAgIDxwYXRoIGQ9XCJNMy43NSAyMS43NWEyLjI1IDIuMjUgMCAxIDAgNC41IDAgMi4yNSAyLjI1IDAgMSAwIC00LjUgMFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTEzIDIxLjc1YTIuMjUgMi4yNSAwIDEgMCA0LjUgMCAyLjI1IDIuMjUgMCAxIDAgLTQuNSAwXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9";
t.characters = t.characters + add;
return { part: 16, addLen: add.length, len: t.characters.length, expect: 8500 };
