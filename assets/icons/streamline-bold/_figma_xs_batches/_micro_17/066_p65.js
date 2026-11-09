const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "IDAgLTIgMHYxYTEgMSAwIDAgMCAxIDFcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0yLjg4IDQuM2ExIDEgMCAwIDAgMC43MSAwLjI5IDEgMSAwIDAgMCAwLjcxIC0wLjI5IDEgMSAwIDAgMCAwIC0xLjQybC0wLjcxIC0wLjdhMSAxIDAgMCAwIC0xLjQxIDEuNDFaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMyA4LjI1YTEgMSAwIDAgMCAtMSAtMUgxYTEgMSAwIDAgMCAwIDJoMWExIDEgMCAwIDAgMSAtMVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE0LjA4IDIu";
t.characters = t.characters + add;
return { part: 65, addLen: add.length, len: t.characters.length, expect: 33000 };
