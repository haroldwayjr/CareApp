const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "Ljc2IDAuNzYgMCAwIDAgMC43NSAtMC43NXYtNGEwLjc1IDAuNzUgMCAwIDAgLTEuNSAwdjNhMC4yNSAwLjI1IDAgMCAxIC0wLjI1IDAuMjVINi41YTAuNzYgMC43NiAwIDAgMCAtMC43NSAwLjc1XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMyA5Ljc1YTAuNzYgMC43NiAwIDAgMCAtMC43NSAwLjc1VjEzYTAuMjUgMC4yNSAwIDAgMSAtMC4yNSAwLjI1SDFhMC43NSAwLjc1IDAgMCAwIDAgMS41aDEzYTAuNzYgMC43NiAwIDAgMCAwLjc1IC0wLjc1di0zYTAuNzUgMC43NSAwIDAgMCAtMS41IDB2MmEwLjI1IDAuMjUgMCAwIDEgLTAuMjUgMC4yNUg0YTAuMjUgMC4yNSAwIDAgMSAtMC4yNSAtMC4y";
t.characters = t.characters + add;
return { part: 25, addLen: add.length, len: t.characters.length, expect: 13000 };
