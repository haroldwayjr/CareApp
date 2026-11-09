const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MCAtMS4yNXptMC40OTMgLTExLjkzMWExLjQgMS40IDAgMCAxIDAuOTgyIC0wLjQxOCAxLjQgMS40IDAgMCAxIDAuOTgyIDAuNDE4IDEuNCAxLjQgMCAwIDEgMC40MTggMC45ODIgMS40IDEuNCAwIDAgMSAtMC40MTggMC45ODIgMS40IDEuNCAwIDAgMSAtMC45ODIgMC40MTggMS40IDEuNCAwIDAgMSAtMC45ODIgLTAuNDE4IDEuNCAxLjQgMCAwIDEgLTAuNDE4IC0wLjk4MiAxLjQgMS40IDAgMCAxIDAuNDE4IC0wLjk4MlwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL21pc2MvYnJpZWZjYXNlIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcv";
t.characters = t.characters + add;
return { part: 24, addLen: add.length, len: t.characters.length, expect: 12500 };
