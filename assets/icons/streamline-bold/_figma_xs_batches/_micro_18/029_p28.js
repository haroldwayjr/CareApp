const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "PVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0yMi41IDEyLjc1YTAuNzYgMC43NiAwIDAgMCAtMC43NSAwLjc1VjIwYTAuNzUgMC43NSAwIDAgMCAxLjUgMHYtNi41YTAuNzYgMC43NiAwIDAgMCAtMC43NSAtMC43NVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTIzLjI1IDEwYTAuNzYgMC43NiAwIDAgMCAtMC43NSAtMC43NUgxN2EwLjc2IDAuNzYgMCAwIDAgLTAuNzUgMC43NXYzYTAuNzUgMC43NSAwIDAgMCAxLjUgMHYtMmEwLjI1IDAuMjUgMCAwIDEgMC4yNSAtMC4yNWg0LjVhMC43NiAwLjc2IDAgMCAwIDAuNzUgLTAuNzVcIiBmaWxsPVwi";
t.characters = t.characters + add;
return { part: 28, addLen: add.length, len: t.characters.length, expect: 14500 };
