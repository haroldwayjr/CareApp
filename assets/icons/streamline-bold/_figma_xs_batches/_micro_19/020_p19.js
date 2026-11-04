const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MCAwIC0wLjIzIC0wLjE2aC0xLjgyYTAuMjUgMC4yNSAwIDAgMCAtMC4yMiAwLjEzIDAuMjYgMC4yNiAwIDAgMSAtMC4yMSAwLjEySDQuOTNhMC4yNiAwLjI2IDAgMCAxIC0wLjIxIC0wLjExIDAuMjcgMC4yNyAwIDAgMSAwIC0wLjIzbDEgLTIuNWEwLjI0IDAuMjQgMCAwIDEgMC4yMSAtMC4xNmg0LjMyYTEgMSAwIDAgMCAwIC0ySDUuNDJBMS41IDEuNSAwIDAgMCA0IDkuOTRsLTEuOTEgNC44NUwyIDE1IDAuNDcgMTYuNDdhMC43NSAwLjc1IDAgMCAwIC0wLjIyIDAuNTN2Mi41YTEuMjUgMS4yNSAwIDAgMCAxLjI1IDEuMjVoMThhMS4yNSAxLjI1IDAgMCAwIDEuMjUgLTEuMjV2LTIuMjlhMS4yNiAxLjI2IDAgMCAwIC0wLjM3IC0wLjg5WlwiIGZpbGw9XCIjMDAw";
t.characters = t.characters + add;
return { part: 19, addLen: add.length, len: t.characters.length, expect: 10000 };
