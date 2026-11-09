const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "IjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9taXNjL2ZpcmUiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIkhvdXNlLUZpcmUtLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgSG91c2UgRmlyZSBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxnPlxuICAgIDxwYXRoIGQ9XCJNMTQuNzcgMTIuMzFhMC41IDAuNSAwIDAgMCAtMC43NCAwLjI4IDUuMTMgNS4xMyAwIDAgMSAtMC44MSAxLjY0IDAuNSAwLjUgMCAwIDEgLTAuNzggMCA0IDQgMCAwIDEgLTAu";
t.characters = t.characters + add;
return { part: 32, addLen: add.length, len: t.characters.length, expect: 16500 };
