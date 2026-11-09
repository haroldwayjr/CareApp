const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "NzUgMCAtMC43NSAtMC43NXYtMC41czAgLTAuNzUgMC43NSAtMC43NVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTUgMTQuNWg1LjVzMC43NSAwIDAuNzUgMC43NXYwLjVzMCAwLjc1IC0wLjc1IDAuNzVINXMtMC43NSAwIC0wLjc1IC0wLjc1di0wLjVzMCAtMC43NSAwLjc1IC0wLjc1XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNNSAxOGg1LjVzMC43NSAwIDAuNzUgMC43NXYwLjVzMCAwLjc1IC0wLjc1IDAuNzVINXMtMC43NSAwIC0wLjc1IC0wLjc1di0wLjVzMCAtMC43NSAwLjc1IC0wLjc1XCIgZmlsbD1cIiMwMDAwMDBcIiBz";
t.characters = t.characters + add;
return { step: 3, part: 3, addLen: add.length, len: t.characters.length };
