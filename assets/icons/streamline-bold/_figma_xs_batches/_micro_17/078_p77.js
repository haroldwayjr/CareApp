const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "NzU0MyAwLjE2NDQgLTAuMTI4NzcgMC4zNTM5IC0wLjIyMTU1IDAuNTU2NSAtMC4yNzIzM2wwLjAwMDMgLTAuMDAwMDkgMS40MjkxIC0wLjM1ODQ4YzAuNTM1NiAtMC4xMzQzOSAxLjA3ODggMC4xOTA5NCAxLjIxMzIgMC43MjY2Mm0tMC4xMzU4IDExLjMyMjAxIC0wLjkzODMgLTIuNTc3Yy0wLjYzNjYgMC41MzU1IC0xLjA0MTIgMS4zMzc5IC0xLjA0MTIgMi4yMzQ5IDAgMS42MTIgMS4zMDY4IDIuOTE4OCAyLjkxODkgMi45MTg4IDEuNjEyIDAgMi45MTg4IC0xLjMwNjggMi45MTg4IC0yLjkxODggMCAtMS42MTE1IC0xLjMwNTkgLTIuOTE3OSAtMi45MTcxIC0yLjkxODlsMC45MzgyIDIuNTc2OGMwLjE4ODkgMC41MTkgLTAuMDc4NiAxLjA5MjggLTAuNTk3NSAx";
t.characters = t.characters + add;
return { part: 77, addLen: add.length, len: t.characters.length, expect: 39000 };
