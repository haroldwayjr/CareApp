const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MVYxYTEgMSAwIDAgMCAtMiAwdjFhMSAxIDAgMCAwIDEgMVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTIuODggNC4zYTEgMSAwIDAgMCAwLjcxIDAuMjkgMSAxIDAgMCAwIDAuNzEgLTAuMjkgMSAxIDAgMCAwIDAgLTEuNDJsLTAuNzEgLTAuN2ExIDEgMCAwIDAgLTEuNDEgMS40MVpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0zIDguMjVhMSAxIDAgMCAwIC0xIC0xSDFhMSAxIDAgMCAwIDAgMmgxYTEgMSAwIDAgMCAxIC0xXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9";
t.characters = t.characters + add;
return { part: 10, addLen: add.length, len: t.characters.length, expect: 5500 };
