const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "OXMwLjc1IDAgMC43NSAwLjc1djAuNXMwIDAuNzUgLTAuNzUgMC43NWgtNS41cy0wLjc1IDAgLTAuNzUgLTAuNzV2LTAuNXMwIC0wLjc1IDAuNzUgLTAuNzVcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9maWxlcy9yZXN1bWUiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIlJlY3J1aXRpbmctUmVzdW1lLURvY3VtZW50LS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIFJlY3J1aXRpbmcgUmVzdW1lIERvY3VtZW50IFN0cmVhbWxpbmUgSWNvbjog";
t.characters = t.characters + add;
return { part: 29, addLen: add.length, len: t.characters.length, expect: 15000 };
