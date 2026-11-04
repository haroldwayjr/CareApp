const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MjUgMC4yNSAwIDAgMCAtMC4zMyAwLjE3bC0xLjY3IDYuMjRhMC4yNSAwLjI1IDAgMCAxIC0wLjMxIDAuMTcgNi42MiA2LjYyIDAgMCAwIC0wLjk1IC0wLjIxIDAuMjUgMC4yNSAwIDAgMSAtMC4yIC0wLjMxTDE0LjcyIDRhMC4yNSAwLjI1IDAgMCAwIC0wLjIgLTAuMzEgMTUuMjIgMTUuMjIgMCAwIDAgLTUgMCAwLjI1IDAuMjUgMCAwIDAgLTAuMiAwLjMxTDExIDEwLjI4YTAuMjUgMC4yNSAwIDAgMSAtMC4yMSAwLjMxIDYuNDggNi40OCAwIDAgMCAtMC45NCAwLjIxIDAuMjYgMC4yNiAwIDAgMSAtMC4zMiAtMC4xN2wtMS43IC02LjI0YTAuMjUgMC4yNSAwIDAgMCAtMC4zMiAtMC4xNyAxMC45IDEwLjkgMCAwIDAgLTMuOTUgMi4zNiAwLjI0IDAuMjQgMCAwIDAg";
t.characters = t.characters + add;
return { part: 58, addLen: add.length, len: t.characters.length, expect: 29500 };
