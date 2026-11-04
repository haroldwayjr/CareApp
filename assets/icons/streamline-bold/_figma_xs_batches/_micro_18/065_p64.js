const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "NTMxOTMgMC4yMzQ5IDAuNzg5MSAtMC45NzQ2IDEuMDM4MjggLTMuNTU4OCAzLjEwNjg1IC04LjQ3MDEgMi43NzY3OSAwLjEyMjMgLTAuMTI1NjYgMC4yMzUxIC0wLjI1NTI3IDAuMzM3OCAtMC4zODUyMyAwLjcxNzkgLTAuOTA4NDcgMS4yMjE2IC0yLjEzOTIzIDEuNDM1MyAtMy40NzA4MU0zLjQ3OTUxIDguMzk0NzdjMC42MTE0NCAtMC4zMzk2OSAwLjcxNTE3IC0xLjM3MTcgMC43MTg4MyAtMS45OTg1NiAwLjU0NzUgMC4yOTkxNCAxLjM0NTYgMC42MTY1NCAxLjg4ODc0IDAuMzE0NzkgMC45IC0wLjUgMC45IC0xLjM5OTk5IDAuNCAtMi4yOTk5OXMtMS4zIC0xLjM5OTk5IC0yLjIgLTAuODk5OTljLTAuNjE2MzYgMC4zNDI0MiAtMC43MTY4IDEuMzg4MzYgLTAu";
t.characters = t.characters + add;
return { part: 64, addLen: add.length, len: t.characters.length, expect: 32500 };
