const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IDIuNSAwIDAgMCAyLjUgLTIuNXYtMTlBMi41IDIuNSAwIDAgMCAxOSAwTTUgNC41YTEgMSAwIDAgMSAxIC0xaDEyYTEgMSAwIDAgMSAxIDF2MTRhMSAxIDAgMCAxIC0xIDFINmExIDEgMCAwIDEgLTEgLTFaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNNy41IDYuMjVoMXMwLjc1IDAgMC43NSAwLjc1djFzMCAwLjc1IC0wLjc1IDAuNzVoLTFzLTAuNzUgMCAtMC43NSAtMC43NVY3czAgLTAuNzUgMC43NSAtMC43NVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTExLjUgNi4yNWgxczAuNzUgMCAwLjc1IDAuNzV2MXMwIDAuNzUgLTAu";
t.characters = t.characters + add;
return { part: 54, addLen: add.length, len: t.characters.length, expect: 27500 };
