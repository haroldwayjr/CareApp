const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "MCAwIDIgMFY4YTEgMSAwIDAgMCAtMSAtMVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE1LjUgN2ExIDEgMCAwIDAgLTEgMXY0YTEgMSAwIDAgMCAyIDBWOGExIDEgMCAwIDAgLTEgLTFcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk04LjUgMTRhMSAxIDAgMCAwIC0xIDF2MC41YTEgMSAwIDAgMCAyIDBWMTVhMSAxIDAgMCAwIC0xIC0xXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTIgMTRhMSAxIDAgMCAwIC0xIDF2MC41YTEgMSAwIDAgMCAyIDBWMTVhMSAxIDAg";
t.characters = t.characters + add;
return { part: 72, addLen: add.length, len: t.characters.length, expect: 36500 };
