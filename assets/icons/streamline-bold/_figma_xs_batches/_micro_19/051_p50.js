const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "c2M+XG4gIDxnPlxuICAgIDxwYXRoIGQ9XCJNNS41IDExaDEzYTIgMiAwIDAgMCAyIC0yVjJhMiAyIDAgMCAwIC0yIC0yaC0xM2EyIDIgMCAwIDAgLTIgMnY3YTIgMiAwIDAgMCAyIDJNMTYgNGExLjUgMS41IDAgMSAxIC0xLjUgMS41QTEuNSAxLjUgMCAwIDEgMTYgNE04IDRhMS41IDEuNSAwIDEgMSAtMS41IDEuNUExLjUgMS41IDAgMCAxIDggNFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTEwLjUgMTIuNWExIDEgMCAwIDAgMCAyaDNhMSAxIDAgMCAwIDAgLTJaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMjMuMyA5Ljg3YTEg";
t.characters = t.characters + add;
return { part: 50, addLen: add.length, len: t.characters.length, expect: 25500 };
