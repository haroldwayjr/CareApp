const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "LTEzLjEgMCAwLjUxIDAuNTEgMCAwIDEgLTAuNjEgLTAuMDhMMi4xMiAzLjYzQTEgMSAwIDAgMCAwLjcxIDVaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMS43MSAxNC43OGEwLjI2IDAuMjYgMCAwIDAgMC4zNSAwbDEuMDYgLTEuMDZhMC4yNiAwLjI2IDAgMCAwIDAuMDcgLTAuMTggMC4yMyAwLjIzIDAgMCAwIC0wLjA4IC0wLjE4Yy0wLjM0IC0wLjMyIC0wLjY2IC0wLjY1IC0xIC0xYTAuNiAwLjYgMCAwIDEgMCAtMC43OWMwLjI5IC0wLjMxIDAuNjIgLTAuNjMgMSAtMC45NWEwLjMxIDAuMzEgMCAwIDAgMC4wOSAtMC4xOCAwLjIzIDAuMjMgMCAwIDAgLTAuMDggLTAuMThMMi4wNiA5LjIyYTAu";
t.characters = t.characters + add;
return { part: 52, addLen: add.length, len: t.characters.length, expect: 26500 };
