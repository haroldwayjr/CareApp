const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMjMgMGgtMi4zMmExLjUgMS41IDAgMCAwIC0xLjQ4IDEuMjVsLTIuNzYgMTUuMjlhMC4yNiAwLjI2IDAgMCAxIC0wLjI1IDAuMjFINWEwLjUgMC41IDAgMCAxIDAgLTFoNy43NmEyLjUgMi41IDAgMCAwIDAgLTVIMy41YTAuNSAwLjUgMCAwIDEgMCAtMWgxMC43NWEyLjUgMi41IDAgMCAwIDAgLTVIMWExIDEgMCAwIDAgMCAyaDEzLjI1YTAuNSAwLjUgMCAwIDEgMCAxSDMuNWEyLjUgMi41IDAgMCAwIDAgNWg5LjI2YTAuNSAwLjUgMCAwIDEgMCAxSDVhMi41IDIuNSAwIDAgMCAwIDVoMTEuODJhMS41IDEuNSAwIDAgMCAxLjQ4IC0xLjI1bDIuNzYgLTE1LjI5YTAuMjYgMC4yNiAwIDAgMSAwLjI1IC0wLjIxSDIz";
t.characters = t.characters + add;
return { part: 17, addLen: add.length, len: t.characters.length, expect: 9000 };
