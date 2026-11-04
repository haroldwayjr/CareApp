const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTIwLjg5IDEzLjM2YTAuMjMgMC4yMyAwIDAgMCAtMC4wOCAwLjE4IDAuMjYgMC4yNiAwIDAgMCAwLjA3IDAuMThsMS4wNiAxLjA2YTAuMjYgMC4yNiAwIDAgMCAwLjM1IDBjMC4zNiAtMC4zNCAwLjcxIC0wLjY5IDEgLTFhMi42IDIuNiAwIDAgMCAwIC0zLjVjLTAuMzEgLTAuMzQgLTAuNjYgLTAuNjkgLTEgLTFhMC4yNiAwLjI2IDAgMCAwIC0wLjM1IDBsLTEuMDYgMS4wN2EwLjI1IDAuMjUgMCAwIDAgLTAuMDggMC4xOCAwLjMgMC4zIDAgMCAwIDAuMDggMC4xOGMwLjM1IDAuMzIgMC42NyAwLjY0IDEgMWEwLjU4IDAuNTggMCAwIDEgMCAwLjc4Yy0wLjMzIDAuMjIgLTAuNjUg";
t.characters = t.characters + add;
return { part: 50, addLen: add.length, len: t.characters.length, expect: 25500 };
