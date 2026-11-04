const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "My4yNSA2LjVhMC43NiAwLjc2IDAgMCAxIC0wLjc1IDAuNzVoLTEuNWEwLjI1IDAuMjUgMCAwIDAgLTAuMjUgMC4yNVYyMGEwLjc1IDAuNzUgMCAwIDEgLTEuNSAwdi0xLjVhMC4yNSAwLjI1IDAgMCAwIC0wLjI1IC0wLjI1SDE1YTAuNzUgMC43NSAwIDAgMSAwIC0xLjVoMS41YTAuMjUgMC4yNSAwIDAgMCAwLjI1IC0wLjI1VjE1YTAuNzUgMC43NSAwIDAgMSAxLjUgMHYxLjVhMC4yNSAwLjI1IDAgMCAwIDAuMjUgMC4yNUgyMGEwLjc2IDAuNzYgMCAwIDEgMC43NSAwLjc1XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifV07CmxldCBvaz0wLCBtaXNzaW5nPTAsIGZhaWxlZD0wOyBjb25zdCBtaXNz";
t.characters = t.characters + add;
return { step: 9, part: 0, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
