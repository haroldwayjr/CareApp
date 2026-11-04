const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MyAtMy4yOCAwLjc1IDAuNzUgMCAxIDEgMS40MSAwLjUgMTYuMTYgMTYuMTYgMCAwIDAgLTAuNjEgNy4xNCA1LjYzIDUuNjMgMCAwIDAgMC41OSAtMC4xNCA1IDUgMCAwIDEgMi40OSAtMi4yIDUuODUgNS44NSAwIDAgMCAwLjQgLTIuMDZjMC4xMyAtNS40MyAtNCAtOCAtNC40IC04IC0wLjQzIDAgLTQuNjUgMi40IC00Ljc5IDcuODIgLTAuMDcgMi43OCAxLjQ2IDQuNDcgNC4yMSA0LjY0XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTguNSAxMS41NGE0Ljg0IDQuODQgMCAwIDAgLTEuNSAtMC4yNyAzLjMzIDMuMzMgMCAwIDAgLTMgMS44MyA5LjY0IDkuNjQgMCAwIDEgMy41NCAxLjU5IDAuNzUg";
t.characters = t.characters + add;
return { part: 64, addLen: add.length, len: t.characters.length, expect: 32500 };
