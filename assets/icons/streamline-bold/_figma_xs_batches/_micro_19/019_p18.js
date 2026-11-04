const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "IDAgMS4yNSAxLjI1aDJhMS4yNSAxLjI1IDAgMCAwIDEuMjUgLTEuMjVWMjJhMC4yNSAwLjI1IDAgMCAwIC0wLjI1IC0wLjI1XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTkuNSAyMS43NWgtNGEwLjI1IDAuMjUgMCAwIDAgLTAuMjUgMC4yNXYwLjVhMS4yNSAxLjI1IDAgMCAwIDEuMjUgMS4yNWgyYTEuMjUgMS4yNSAwIDAgMCAxLjI1IC0xLjI1VjIyYTAuMjUgMC4yNSAwIDAgMCAtMC4yNSAtMC4yNVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwibTE5LjMgMTUuMjQgLTAuMTEgLTAuMTcgLTAuNDcgLTEuMTZhMC4yNSAwLjI1IDAg";
t.characters = t.characters + add;
return { part: 18, addLen: add.length, len: t.characters.length, expect: 9500 };
