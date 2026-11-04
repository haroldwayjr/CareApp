const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MjYgMCAwIDAgMC4zIDAgNSA1IDAgMCAwIDAuMzkgLTguMTRaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgICAgPHBhdGggZD1cIk04IDIzYTEgMSAwIDEgMCAyIDAgMSAxIDAgMSAwIC0yIDBcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgICA8cGF0aCBkPVwiTTEwLjUgMjFhMSAxIDAgMSAwIDIgMCAxIDEgMCAxIDAgLTIgMFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICAgIDxwYXRoIGQ9XCJNMTMgMjNhMSAxIDAgMSAwIDIgMCAxIDEgMCAxIDAgLTIgMFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwv";
t.characters = t.characters + add;
return { part: 7, addLen: add.length, len: t.characters.length, expect: 4000 };
