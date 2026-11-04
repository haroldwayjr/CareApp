const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "NSAtMC4yNVptNCA3LjI2djEuMjFhMC43NSAwLjc1IDAgMCAxIC0xLjUgMHYtMS4yMWExLjUgMS41IDAgMSAxIDEuNSAwXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTkuNSAxOC40MUExLjU0IDEuNTQgMCAwIDAgMTcuOTMgMTdoLTcuMWE1LjU0IDUuNTQgMCAwIDAgLTUuMyAtNEw1IDEzYTUuNiA1LjYgMCAwIDAgLTUgNS40OUE1LjUyIDUuNTIgMCAwIDAgNS41MiAyNGE1LjQ4IDUuNDggMCAwIDAgNS4yOSAtNGgwLjUxYTAuMjUgMC4yNSAwIDAgMSAwLjIyIDAuMTNsMC45NCAxLjY2YTAuNDggMC40OCAwIDAgMCAwLjQzIDAuMjUgMC41IDAuNSAwIDAgMCAwLjQzIC0wLjIzbDEuMDYgLTEuNjlh";
t.characters = t.characters + add;
return { part: 67, addLen: add.length, len: t.characters.length, expect: 34000 };
