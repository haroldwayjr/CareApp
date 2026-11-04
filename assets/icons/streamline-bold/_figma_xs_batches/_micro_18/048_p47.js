const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "NSAwIDAgMSAwLjUgLTAuNWgxOWEwLjUgMC41IDAgMCAxIDAuNSAwLjVaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTMuNDcgMTdhMC43NCAwLjc0IDAgMCAwIDAuNzIgMC4xOSAwLjczIDAuNzMgMCAwIDAgMC41MyAtMC41MmwwLjU0IC0yYTAuMjUgMC4yNSAwIDAgMSAwLjQ4IDBsMC41NCAyYTAuNzMgMC43MyAwIDAgMCAwLjUzIDAuNTIgMC42MyAwLjYzIDAgMCAwIDAuMTkgMCAwLjc1IDAuNzUgMCAwIDAgMC41MyAtMC4yMmMxLjExIC0xLjExIDEuNzIgLTMuMjIgMS43MiAtNS45NVY4LjQ5YTAuNzUgMC43NSAwIDAgMCAtMS41IDB2Mi41OGExMi4wOCAxMi4wOCAwIDAgMSAtMC4yNSAyLjYy";
t.characters = t.characters + add;
return { part: 47, addLen: add.length, len: t.characters.length, expect: 24000 };
