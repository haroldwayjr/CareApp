const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgICA8cGF0aCBkPVwiTTkgMjNhMSAxIDAgMSAwIDIgMCAxIDEgMCAxIDAgLTIgMFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICAgIDxwYXRoIGQ9XCJNMTMgMjNhMSAxIDAgMSAwIDIgMCAxIDEgMCAxIDAgLTIgMFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICAgIDxwYXRoIGQ9XCJNNy40NyAyMS41M2EwLjc1IDAuNzUgMCAwIDAgMS4wNiAwbDMgLTNhMC43NSAwLjc1IDAgMCAwIC0xLjA2IC0xLjA2bC0zIDNhMC43NSAwLjc1IDAgMCAwIDAgMS4wNlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwv";
t.characters = t.characters + add;
return { part: 63, addLen: add.length, len: t.characters.length, expect: 32000 };
