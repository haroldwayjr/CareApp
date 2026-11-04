const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "MDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMS41IDEwLjI1aDFzMC43NSAwIDAuNzUgMC43NXYxczAgMC43NSAtMC43NSAwLjc1aC0xcy0wLjc1IDAgLTAuNzUgLTAuNzV2LTFzMCAtMC43NSAwLjc1IC0wLjc1XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNNy41IDE0LjI1aDFzMC43NSAwIDAuNzUgMC43NXYxczAgMC43NSAtMC43NSAwLjc1aC0xcy0wLjc1IDAgLTAuNzUgLTAuNzV2LTFzMCAtMC43NSAwLjc1IC0wLjc1XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTEuNSAxNC4yNWgx";
t.characters = t.characters + add;
return { part: 56, addLen: add.length, len: t.characters.length, expect: 28500 };
