const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgQ29mZmVlIEphciBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxnPlxuICAgIDxwYXRoIGQ9XCJNNS41IDMuNWgxM0EwLjUgMC41IDAgMCAwIDE5IDNWMS41QTEuNSAxLjUgMCAwIDAgMTcuNSAwaC0xMUExLjUgMS41IDAgMCAwIDUgMS41VjNhMC41IDAuNSAwIDAgMCAwLjUgMC41XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJtMjEgMTAuMzEgLTIgLTVhMC40OSAwLjQ5IDAgMCAwIC0wLjUgLTAuMzFoLTEzYTAuNDkgMC40OSAwIDAgMCAtMC41IDAuMzFsLTIgNWEwLjQzIDAuNDMgMCAwIDAgMCAwLjE5";
t.characters = t.characters + add;
return { part: 13, addLen: add.length, len: t.characters.length, expect: 7000 };
