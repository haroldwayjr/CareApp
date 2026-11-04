const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "IDAgMCAxIC0wLjI1IC0wLjI1VjE3YTEgMSAwIDAgMCAtMiAwdjJhMiAyIDAgMCAwIDIgMmgxLjg3YTEgMSAwIDEgMCAwIC0yXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMjMgMTZhMSAxIDAgMCAwIC0xIDFsMCAxLjc0YTAuMjcgMC4yNyAwIDAgMSAtMC4wNyAwLjE4IDAuMjUgMC4yNSAwIDAgMSAtMC4xOCAwLjA4aC0xLjYyYTEgMSAwIDEgMCAwIDJIMjJhMiAyIDAgMCAwIDIgLTJ2LTJhMSAxIDAgMCAwIC0xIC0xXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMjIgM2gtMS44N2ExIDEgMCAwIDAgMCAyaDEuNjJhMC4yNSAwLjI1";
t.characters = t.characters + add;
return { part: 70, addLen: add.length, len: t.characters.length, expect: 35500 };
