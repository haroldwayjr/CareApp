const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "cGF0aCBkPVwiTTUuMSA2LjY3YTAuNzQgMC43NCAwIDAgMCAwLjUzIDAuMjIgMC43MSAwLjcxIDAgMCAwIDAuNTMgLTAuMjIgMC43NCAwLjc0IDAgMCAwIDAgLTEuMDZMNC41NyA0YTAuNzQgMC43NCAwIDAgMCAtMS4wNiAwIDAuNzUgMC43NSAwIDAgMCAwIDEuMDZaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMy43NSAxMi41YTAuNzYgMC43NiAwIDAgMCAtMC43NSAtMC43NUgwLjc1YTAuNzUgMC43NSAwIDAgMCAwIDEuNUgzYTAuNzUgMC43NSAwIDAgMCAwLjc1IC0wLjc1XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMjEgMjEu";
t.characters = t.characters + add;
return { part: 60, addLen: add.length, len: t.characters.length, expect: 30500 };
