const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9taXNjL3JlY3ljbGUiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIlBsYXN0aWMtQmFnLVJlY3ljbGUtLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgUGxhc3RpYyBCYWcgUmVjeWNsZSBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxnPlxuICAgIDxwYXRoIGQ9XCJtOS43MiAxOS4xNyAwLjI4IC0wLjQ5YTIuMjUgMi4yNSAwIDAgMSAwLjkgLTMuODNsMi40NiAtMC42OWEyLjE5IDIuMTkgMCAwIDEgMC4yMyAtMS42";
t.characters = t.characters + add;
return { part: 41, addLen: add.length, len: t.characters.length, expect: 21000 };
