const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "XCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICAgIDxwYXRoIGQ9XCJNMTMgMTlhMSAxIDAgMSAwIDIgMCAxIDEgMCAxIDAgLTIgMFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICAgIDxwYXRoIGQ9XCJNMTUuNSAxN2ExIDEgMCAxIDAgMiAwIDEgMSAwIDEgMCAtMiAwXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgICAgPHBhdGggZD1cIk0xOCAxOWExIDEgMCAxIDAgMiAwIDEgMSAwIDEgMCAtMiAwXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDwvZz5cbiAgICA8cGF0aCBkPVwiTTguMjUgM2ExIDEgMCAwIDAgMSAt";
t.characters = t.characters + add;
return { part: 9, addLen: add.length, len: t.characters.length, expect: 5000 };
