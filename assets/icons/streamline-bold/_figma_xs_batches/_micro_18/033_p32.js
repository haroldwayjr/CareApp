const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "MCAtMS43NWgtMC44OGEwLjI1IDAuMjUgMCAwIDEgLTAuMjUgLTAuMjVaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNNy41IDE5LjkyYTAuODcgMC44NyAwIDAgMCAwLjg3IC0wLjkydi0xLjgzYTAuMjUgMC4yNSAwIDAgMSAwLjI1IC0wLjI1SDlhMi4zOCAyLjM4IDAgMCAwIDAgLTQuNzVINy41YTAuODcgMC44NyAwIDAgMCAtMC44OCAwLjg3djZhMC44NyAwLjg3IDAgMCAwIDAuODggMC44OG0wLjg3IC01Ljc1YTAuMjUgMC4yNSAwIDAgMSAwLjI1IC0wLjI1SDlhMC42MyAwLjYzIDAgMCAxIDAgMS4yNWgtMC4zOGEwLjI1IDAuMjUgMCAwIDEgLTAuMjUgLTAuMjVaXCIgZmlsbD1cIiMwMDAwMDBc";
t.characters = t.characters + add;
return { part: 32, addLen: add.length, len: t.characters.length, expect: 16500 };
