const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "OCAwIDAgMCAzIDE5LjkybS0wLjYzIC0yLjM4di0zYTAuNjMgMC42MyAwIDAgMSAxLjI1IDB2M2EwLjYzIDAuNjMgMCAxIDEgLTEuMjUgMFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTIyLjUgMTIuMTdhMC44NyAwLjg3IDAgMCAwIC0wLjg4IDAuODd2MS4yNGEwLjI1IDAuMjUgMCAwIDEgLTAuNDcgMC4xMWwtMC44NyAtMS43NGEwLjg3IDAuODcgMCAwIDAgLTEgLTAuNDYgMC44OCAwLjg4IDAgMCAwIC0wLjY4IDAuODV2NmEwLjg4IDAuODggMCAxIDAgMS43NSAwdi0xLjIzYTAuMjQgMC4yNCAwIDAgMSAwLjIgLTAuMjQgMC4yNSAwLjI1IDAgMCAxIDAuMjggMC4xM2wwLjg3IDEuNzRhMC44NiAw";
t.characters = t.characters + add;
return { part: 30, addLen: add.length, len: t.characters.length, expect: 15500 };
