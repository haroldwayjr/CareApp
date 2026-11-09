const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "YTAuNzkgMC43OSAwIDAgMCAwIDAuMnYwLjkxQTMuMjQgMy4yNCAwIDAgMCAyIDkuMWEzLjMxIDMuMzEgMCAwIDAgMi42IDAuMDUgMC4yNSAwLjI1IDAgMCAwIDAuMTYgLTAuMjNaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vaGVhbHRoL3ByZWduYW5jeSIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiUHJlZ25hbmN5LVZnci0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBQcmVnbmFuY3kgVmdyIFN0cmVhbWxpbmUgSWNvbjogaHR0cHM6Ly9z";
t.characters = t.characters + add;
return { part: 36, addLen: add.length, len: t.characters.length, expect: 18500 };
