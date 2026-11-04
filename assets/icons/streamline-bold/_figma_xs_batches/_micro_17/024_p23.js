const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "LjI1YTEgMSAwIDAgMSAwIC0ySDE3LjVhMC4yNSAwLjI1IDAgMCAxIDAuMjUgMC4yNVpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMC4wMyAxMi4xNmExLjk3IDEuOTcgMCAxIDAgMy45NCAwIDEuOTcgMS45NyAwIDEgMCAtMy45NCAwXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy9wYXNzcG9ydCIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiUGFzc3BvcnQtLVN0cmVhbWxpbmUtVWx0aW1h";
t.characters = t.characters + add;
return { part: 23, addLen: add.length, len: t.characters.length, expect: 12000 };
