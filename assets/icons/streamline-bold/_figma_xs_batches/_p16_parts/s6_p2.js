const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "LTFcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9taXNjL3VtYnJlbGxhIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgPHBhdGggZmlsbD1cIiMwMDAwMDBcIiBkPVwiTTEyIDBjNi42Mjc0IDAgMTIgNS4zNzI1OCAxMiAxMiAwIDYuNjI3NCAtNS4zNzI2IDEyIC0xMiAxMiAtNi42Mjc0MiAwIC0xMiAtNS4zNzI2IC0xMiAtMTJDMCA1LjM3MjU4IDUuMzcyNTggMCAxMiAwbTAgM2MtMC40MTQyIDAgLTAuNzUgMC4zMzU3OSAtMC43NSAwLjc1djAu";
t.characters = t.characters + add;
return { step: 6, part: 2, addLen: add.length, len: t.characters.length };
