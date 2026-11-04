const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "NzUgMC43NWgtMXMtMC43NSAwIC0wLjc1IC0wLjc1VjdzMCAtMC43NSAwLjc1IC0wLjc1XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTUuNSA2LjI1aDFzMC43NSAwIDAuNzUgMC43NXYxczAgMC43NSAtMC43NSAwLjc1aC0xcy0wLjc1IDAgLTAuNzUgLTAuNzVWN3MwIC0wLjc1IDAuNzUgLTAuNzVcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk03LjUgMTAuMjVoMXMwLjc1IDAgMC43NSAwLjc1djFzMCAwLjc1IC0wLjc1IDAuNzVoLTFzLTAuNzUgMCAtMC43NSAtMC43NXYtMXMwIC0wLjc1IDAuNzUgLTAuNzVcIiBmaWxsPVwiIzAw";
t.characters = t.characters + add;
return { part: 55, addLen: add.length, len: t.characters.length, expect: 28000 };
