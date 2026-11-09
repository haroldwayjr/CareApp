const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNNS4yMyA5LjMxQTAuMjQgMC4yNCAwIDAgMCA1LjM1IDlhMy4zMyAzLjMzIDAgMCAxIC0wLjEgLTAuNzggMyAzIDAgMCAxIDMgLTMgMi44NyAyLjg3IDAgMCAxIDEuMSAwLjIxIDAuMjUgMC4yNSAwIDAgMCAwLjI1IDBBOC41IDguNSAwIDAgMSAxMSA0LjVhMC4yOCAwLjI4IDAgMCAwIDAuMTMgLTAuMjEgMC4yNSAwLjI1IDAgMCAwIC0wLjEzIC0wLjIyIDQuOTQgNC45NCAwIDAgMCAtMi43NCAtMC44MiA1IDUgMCAwIDAgLTUgNSA0Ljk0IDQuOTQgMCAwIDAgMC4zNCAxLjgxIDAuMjYgMC4yNiAwIDAgMCAwLjE3IDAuMTUgMC4yNSAwLjI1IDAgMCAwIDAuMjMgLTAuMDUgNy4wNiA3LjA2";
t.characters = t.characters + add;
return { part: 78, addLen: add.length, len: t.characters.length, expect: 39500 };
