const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "Mi4wOSAxIDEgMCAwIDAgMC45NCAwLjU3IDMuNjcgMy42NyAwIDAgMSAyLjc2IDEuMDVBMy43NCAzLjc0IDAgMCAxIDIyIDEwLjQxYTMuODMgMy44MyAwIDAgMSAtMy40NCAzLjc5IDEgMSAwIDAgMCAwLjI2IDJBNS44MiA1LjgyIDAgMCAwIDI0IDEwLjQxXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTIuNzEgOWExIDEgMCAwIDAgLTEuNDIgMGwtMy41IDMuNWExIDEgMCAwIDAgMC43MSAxLjdoMS43NWEwLjI1IDAuMjUgMCAwIDEgMC4yNSAwLjI1djcuMjVhMS41IDEuNSAwIDEgMCAzIDB2LTcuMjVhMC4yNSAwLjI1IDAgMCAxIDAuMjUgLTAuMjVoMS43NWExIDEgMCAwIDAgMC43MSAtMS43MVpc";
t.characters = t.characters + add;
return { step: 0, part: 7, addLen: add.length, len: t.characters.length };
