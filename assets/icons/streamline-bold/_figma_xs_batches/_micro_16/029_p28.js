const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "dHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTMuNSAxOEgxOXMwLjc1IDAgMC43NSAwLjc1djAuNXMwIDAuNzUgLTAuNzUgMC43NWgtNS41cy0wLjc1IDAgLTAuNzUgLTAuNzV2LTAuNXMwIC0wLjc1IDAuNzUgLTAuNzVcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xMy41IDExSDE5czAuNzUgMCAwLjc1IDAuNzV2MC41czAgMC43NSAtMC43NSAwLjc1aC01LjVzLTAuNzUgMCAtMC43NSAtMC43NXYtMC41czAgLTAuNzUgMC43NSAtMC43NVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTEzLjUgMTQuNUgx";
t.characters = t.characters + add;
return { part: 28, addLen: add.length, len: t.characters.length, expect: 14500 };
