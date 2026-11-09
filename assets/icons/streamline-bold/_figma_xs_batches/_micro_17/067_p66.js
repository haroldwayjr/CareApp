const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "NDJhMSAxIDAgMCAwIC0xLjQxIDBsLTAuNzEgMC43YTEgMSAwIDAgMCAtMC4yOSAwLjY3QTAuMjUgMC4yNSAwIDAgMCAxMiA0YTguNzUgOC43NSAwIDAgMSAyLjEyIC0wLjUgMC4yMyAwLjIzIDAgMCAwIDAuMjIgLTAuMTkgMSAxIDAgMCAwIC0wLjI2IC0wLjg5XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNNS40NiA5LjU0YTAuMjUgMC4yNSAwIDAgMCAwLjEyIC0wLjI5IDIuNzYgMi43NiAwIDAgMSAtMC4xIC0wLjc3IDMgMyAwIDAgMSAzIC0zIDIuOTEgMi45MSAwIDAgMSAxLjEgMC4yMSAwLjI4IDAuMjggMCAwIDAgMC4yNSAwIDggOCAwIDAgMSAxLjM3IC0wLjkyIDAuMjMgMC4yMyAwIDAgMCAw";
t.characters = t.characters + add;
return { part: 66, addLen: add.length, len: t.characters.length, expect: 33500 };
