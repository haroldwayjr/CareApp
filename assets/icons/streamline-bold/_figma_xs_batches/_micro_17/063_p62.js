const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "LjI1IDAgMCAwIC0wLjE2IC0wLjE5QTMuNSAzLjUgMCAwIDEgOC41IDEybDAuNSAwYTEgMSAwIDAgMCAxLjExIC0wLjgzQTUgNSAwIDAgMSAyMCAxMmwwIDAuNDNhMSAxIDAgMCAwIDAuNSAxIDMgMyAwIDAgMSAwLjU3IDQuOCAwLjI5IDAuMjkgMCAwIDAgLTAuMDggMC4xNCAxLjg5IDEuODkgMCAwIDEgLTAuNTYgMS4wOEwxOSAyMC44OGEwLjA4IDAuMDggMCAwIDAgMCAwLjA4IDAuMSAwLjEgMCAwIDAgMCAwLjA0IDUgNSAwIDAgMCAzLjA5IC04LjkzXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgICAgPHBhdGggZD1cIk01IDIzYTEgMSAwIDEgMCAyIDAgMSAxIDAgMSAwIC0yIDBcIiBmaWxsPVwiIzAwMDAwMFwiIHN0";
t.characters = t.characters + add;
return { part: 62, addLen: add.length, len: t.characters.length, expect: 31500 };
