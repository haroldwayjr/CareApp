const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MiAwLjQ3IDAuMzEgMC4zMSAwIDAgMSAwIDAuMTIgMi4zMiAyLjMyIDAgMCAwIDAuNjIgMS4yNiAwLjIzIDAuMjMgMCAwIDEgMC4wNyAwLjE3djAuNThhMC4yNSAwLjI1IDAgMCAxIC0wLjE2IDAuMjRaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy9tZWRhbCIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiQXdhcmQtTWVkYWwtLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgQXdhcmQgTWVkYWwgU3RyZWFtbGluZSBJY29uOiBodHRwczov";
t.characters = t.characters + add;
return { step: 8, part: 2, addLen: add.length, len: t.characters.length };
