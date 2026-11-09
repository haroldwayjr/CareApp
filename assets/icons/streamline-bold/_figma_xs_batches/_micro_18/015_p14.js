const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "NyA0LjI3NTM5bC0xMi4zOTg2NCAwYy0wLjI3NTU1IDAuNjk1NTMgLTAuODMwMTQgMS4yNTAxMiAtMS41MjU2NyAxLjUyNTY3bDAgMTIuMzk4NjRjMC42OTUyOCAwLjI3NTQgMS4yNDk3MiAwLjgyOTcgMS41MjUzNyAxLjUyNDlIMTguMmMwLjI3NTUgLTAuNjk0OSAwLjgyOTcgLTEuMjQ5MSAxLjUyNDYgLTEuNTI0NlY1LjgwMDc2Yy0wLjY5NTIgLTAuMjc1NjUgLTEuMjQ5NSAtMC44MzAwOSAtMS41MjQ5IC0xLjUyNTM3TTcuNjQ2NDggNy4yNDgwNWMtMC41NTIyOCAwIC0xIDAuNDQ3NzEgLTEgMSAwIDAuNTUyMjggMC40NDc3MiAxIDEgMUgxMmMwLjU1MjMgMCAxIC0wLjQ0NzcyIDEgLTEgMCAtMC41NTIyOSAtMC40NDc3IC0xIC0xIC0xem0tMSA0Ljc0OTk1YzAg";
t.characters = t.characters + add;
return { part: 14, addLen: add.length, len: t.characters.length, expect: 7500 };
