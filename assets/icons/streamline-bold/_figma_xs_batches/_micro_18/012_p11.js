const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IDAuMDcgMTUuOTMgMTEuMjkgMTEuMjkgMCAwIDAgMTUuOTMgLTAuMDggMSAxIDAgMCAwIDAuMjkgLTAuNyAxIDEgMCAwIDAgLTAuMyAtMC43MWwtNi41NiAtNi41IDIuMDkgLTJhMyAzIDAgMCAwIDQuMjcgLTIuNzUgMyAzIDAgMCAwIC0zIC0zIDMgMyAwIDAgMCAtMi42OCA0LjNsLTIuMDkgMlpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9maWxlcy9ib3guYWx0IiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIlRleHQtQm94LTItLVN0cmVh";
t.characters = t.characters + add;
return { part: 11, addLen: add.length, len: t.characters.length, expect: 6000 };
