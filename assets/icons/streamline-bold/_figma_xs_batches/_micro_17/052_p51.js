const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MC41MSAtMC45OSAwLjg3XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNNS40NiA5Ljc5YTEgMSAwIDAgMCAxLjQxIDAgMSAxIDAgMCAwIDAgLTEuNDEgMC4zMiAwLjMyIDAgMCAxIC0wLjA5IC0wLjI2IDAuMzUgMC4zNSAwIDAgMSAwLjE2IC0wLjIzIDkuODcgOS44NyAwIDAgMSAxMC4xMiAwIDAuMzEgMC4zMSAwIDAgMSAwLjE1IDAuMjMgMC4yOSAwLjI5IDAgMCAxIC0wLjA4IDAuMjYgMSAxIDAgMCAwIDAgMS40MSAxIDEgMCAwIDAgMS40MSAwTDIzLjI5IDVhMSAxIDAgMSAwIC0xLjQxIC0xLjQxbC0yLjcyIDIuNzZhMC41MSAwLjUxIDAgMCAxIC0wLjYxIDAuMDggMTIuMDYgMTIuMDYgMCAwIDAg";
t.characters = t.characters + add;
return { part: 51, addLen: add.length, len: t.characters.length, expect: 26000 };
