const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "cGF0aD5cbiAgICAgIDxwYXRoIGQ9XCJNMTUuNTMgMTguNTNhMC43NSAwLjc1IDAgMCAwIC0xLjA2IC0xLjA2bC0zIDNhMC43NSAwLjc1IDAgMCAwIDAgMS4wNiAwLjc1IDAuNzUgMCAwIDAgMS4wNiAwWlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICAgIDxwYXRoIGQ9XCJNMTkuNTMgMTguNTNhMC43NSAwLjc1IDAgMCAwIC0xLjA2IC0xLjA2bC0zIDNhMC43NSAwLjc1IDAgMCAwIDAgMS4wNiAwLjc1IDAuNzUgMCAwIDAgMS4wNiAwWlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8L2c+XG4gICAgPHBhdGggZD1cIk04LjI1IDNhMSAxIDAgMCAwIDEgLTFWMWExIDEgMCAw";
t.characters = t.characters + add;
return { part: 64, addLen: add.length, len: t.characters.length, expect: 32500 };
