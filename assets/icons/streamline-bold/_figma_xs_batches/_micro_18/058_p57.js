const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "czAuNzUgMCAwLjc1IDAuNzV2MXMwIDAuNzUgLTAuNzUgMC43NWgtMXMtMC43NSAwIC0wLjc1IC0wLjc1di0xczAgLTAuNzUgMC43NSAtMC43NVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE1LjUgMTAuMjVoMXMwLjc1IDAgMC43NSAwLjc1djFzMCAwLjc1IC0wLjc1IDAuNzVoLTFzLTAuNzUgMCAtMC43NSAtMC43NXYtMXMwIC0wLjc1IDAuNzUgLTAuNzVcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9taXNjL3NjYW5uZXIiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9y";
t.characters = t.characters + add;
return { part: 57, addLen: add.length, len: t.characters.length, expect: 29000 };
