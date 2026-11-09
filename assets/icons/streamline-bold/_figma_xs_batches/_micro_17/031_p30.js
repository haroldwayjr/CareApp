const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "IDEwbDEuMTkgM2ExLjI4IDEuMjggMCAwIDAgMi40MyAtMC4xNWwxIC0zLjU3IDMuNTcgLTFhMS4yNyAxLjI3IDAgMCAwIDEgLTEuMThBMS4yNCAxLjI0IDAgMCAwIDE4IDUuODNsLTMgLTEuMTkgMC4xOCAtMy4xNGExLjI4IDEuMjggMCAwIDAgLTAuOCAtMS4xOUExLjI2IDEuMjYgMCAwIDAgMTMgMC42bC0xLjg4IDEuODggLTMuMyAtMS4zMWExLjI3IDEuMjcgMCAwIDAgLTEuMzEgMC4zMiAxLjI5IDEuMjkgMCAwIDAgLTAuMzEgMS4zNGwxLjI4IDMuM0w1LjYgOGExLjI0IDEuMjQgMCAwIDAgLTAuMjkgMS4zNiAxLjI3IDEuMjcgMCAwIDAgMS4yIDAuNzdaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9";
t.characters = t.characters + add;
return { part: 30, addLen: add.length, len: t.characters.length, expect: 15500 };
