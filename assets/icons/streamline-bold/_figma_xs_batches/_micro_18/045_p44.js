const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "Mkg2LjA4YTEuMTUgMS4xNSAwIDAgMSAtMS4xNCAtMS4xNHYtMkw2IDE4LjI5YTAuNzQgMC43NCAwIDAgMCAwLjUzIDAuMjIgMC43MSAwLjcxIDAgMCAwIDAuNTMgLTAuMjIgMC43NCAwLjc0IDAgMCAwIDAgLTEuMDZsLTIuMzQgLTIuMzZhMC43NyAwLjc3IDAgMCAwIC0xLjA2IDBMMS4zIDE3LjIzYTAuNzUgMC43NSAwIDAgMCAxLjA2IDEuMDZsMS4wOCAtMS4wOHYyYTIuNjUgMi42NSAwIDAgMCAyLjY0IDIuNjRoNC43M2EwLjc1IDAuNzUgMCAxIDAgMCAtMS41WlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTYuODQgMTMuNWExLjg5IDEuODkgMCAwIDAgMiAtMS43NVY0LjQ3QTEuODYgMS44NiAw";
t.characters = t.characters + add;
return { part: 44, addLen: add.length, len: t.characters.length, expect: 22500 };
