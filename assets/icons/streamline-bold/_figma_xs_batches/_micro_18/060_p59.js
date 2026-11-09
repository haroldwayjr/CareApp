const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "NzUgMC43NiAwLjc2IDAgMCAxIDAuNzUgLTAuNzVtLTMgMGEwLjc1IDAuNzUgMCAxIDEgLTAuNzUgMC43NSAwLjc2IDAuNzYgMCAwIDEgMC43NSAtMC43NVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTQgOS43NWEwLjI1IDAuMjUgMCAwIDAgLTAuMjMgMC4xNkwwLjMgMTguNjZhMC4yNyAwLjI3IDAgMCAwIDAgMC4yMyAwLjI2IDAuMjYgMCAwIDAgMC4yMyAwLjExaDIyLjk0YTAuMjYgMC4yNiAwIDAgMCAwLjIxIC0wLjExIDAuMjcgMC4yNyAwIDAgMCAwIC0wLjIzTDIwLjIgOS45MWEwLjI1IDAuMjUgMCAwIDAgLTAuMiAtMC4xNlptMTUuODggNy41M2EwLjQ4IDAuNDggMCAwIDEgLTAuNDEgMC4y";
t.characters = t.characters + add;
return { part: 59, addLen: add.length, len: t.characters.length, expect: 30000 };
