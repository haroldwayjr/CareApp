const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "a2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTguMzcgNi44OWEwLjc0IDAuNzQgMCAwIDAgMC41MyAtMC4yMmwxLjU5IC0xLjU5YTAuNzUgMC43NSAwIDAgMCAwIC0xLjA2IDAuNzQgMC43NCAwIDAgMCAtMS4wNiAwbC0xLjU5IDEuNTlhMC43NCAwLjc0IDAgMCAwIDAgMS4wNiAwLjcxIDAuNzEgMCAwIDAgMC41MyAwLjIyXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMjMuMjUgMTEuNzVIMjFhMC43NSAwLjc1IDAgMCAwIDAgMS41aDIuMjVhMC43NSAwLjc1IDAgMCAwIDAgLTEuNVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8";
t.characters = t.characters + add;
return { part: 59, addLen: add.length, len: t.characters.length, expect: 30000 };
