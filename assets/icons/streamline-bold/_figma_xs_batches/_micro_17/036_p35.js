const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "M2MxLjUyIDkuMTcgMC44OCA1LjMyIDIuNjIgMTUuNzVBMyAzIDAgMCAwIDguMzUgMjRoNi44YTMgMyAwIDAgMCAzIC0yLjUxYzEuNzMgLTEwLjQzIDEuMDkgLTYuNTkgMi42MiAtMTUuNzNhMS40MSAxLjQxIDAgMCAwIC0wLjMgLTEuMThBMS40NCAxLjQ0IDAgMCAwIDE5LjI1IDRoLTMuNzhhMC4yNCAwLjI0IDAgMCAxIC0wLjIxIC0wLjEyIDAuMjMgMC4yMyAwIDAgMSAwIC0wLjI0QTMgMyAwIDAgMSAxNy45MSAybS02LjY0IDkuNmEwLjI1IDAuMjUgMCAwIDEgLTAuMyAwLjE5IDMuNjEgMy42MSAwIDAgMSAtMi4yIC0xLjQxQTEgMSAwIDAgMCA4IDEwYTEgMSAwIDAgMCAtMC44IDAuNDEgMy44NSAzLjg1IDAgMCAxIC0xLjA3IDEgMC4yNiAwLjI2IDAgMCAxIC0w";
t.characters = t.characters + add;
return { part: 35, addLen: add.length, len: t.characters.length, expect: 18000 };
