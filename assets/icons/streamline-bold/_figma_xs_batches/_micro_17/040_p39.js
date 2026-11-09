const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "IDAgMCAxIC0wLjM5IDAuNDljLTAuMiAwIC0wLjM5IDAuMSAtMC41OCAwLjE1YTAuNDkgMC40OSAwIDAgMSAtMC41OCAtMC4yMmwtMSAtMS42NmExIDEgMCAwIDAgLTEuNzMgMWwxIDEuNjZhMC41MiAwLjUyIDAgMCAxIC0wLjEgMC42MiA0LjE2IDQuMTYgMCAwIDAgLTAuMzcgMC40MiAwLjUyIDAuNTIgMCAwIDEgLTAuNjIgMC4xTDIuNjcgOWExIDEgMCAwIDAgLTEgMS43M2wxLjY2IDFhMC40OCAwLjQ4IDAgMCAxIDAuMjIgMC41OCA1LjQ3IDUuNDcgMCAwIDAgLTAuMTUgMC41OCAwLjQ5IDAuNDkgMCAwIDEgLTAuNDkgMC4zOUgxYTEgMSAwIDAgMCAwIDJoMS45MWEwLjQ5IDAuNDkgMCAwIDEgMC40OSAwLjM5IDUuNDcgNS40NyAwIDAgMCAwLjE1IDAuNTggMC40";
t.characters = t.characters + add;
return { part: 39, addLen: add.length, len: t.characters.length, expect: 20000 };
