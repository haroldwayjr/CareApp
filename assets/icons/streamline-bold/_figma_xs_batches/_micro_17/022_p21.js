const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MC41IDAuNSAwIDAgMSAtMC41IC0wLjV2LTMuMjVhMS43NSAxLjc1IDAgMCAxIDMuNSAwWm0wIC0xMGEwLjUgMC41IDAgMCAxIC0wLjUgMC41SDlhMC41IDAuNSAwIDAgMSAtMC41IC0wLjVWNS43NWExLjc1IDEuNzUgMCAwIDEgMy41IDBaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL21pc2MvYm9vayIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiQm9vay1QaW4tLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgQm9vayBQaW4gU3RyZWFtbGluZSBJY29uOiBo";
t.characters = t.characters + add;
return { part: 21, addLen: add.length, len: t.characters.length, expect: 11000 };
