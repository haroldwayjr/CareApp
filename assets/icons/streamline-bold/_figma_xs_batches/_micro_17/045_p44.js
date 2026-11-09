const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "LjUxIDIuNTEgMCAwIDAgMC42MSAtMC4zNiAwLjUgMC41IDAgMCAxIDAuNTUgMGwwLjQzIDAuMjVhMC43NiAwLjc2IDAgMCAwIDEgLTAuMjcgMC43NSAwLjc1IDAgMCAwIC0wLjI1IC0xLjAzbS0zLjQgMC4xNWExLjI1IDEuMjUgMCAxIDEgMS4yNSAtMS4yNSAxLjI1IDEuMjUgMCAwIDEgLTEuMjUgMS4yNVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgPC9nPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL21pc2MvdG9vbCIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiVG9vbHMtS2V5cy0tU3RyZWFtbGluZS1VbHRpbWF0";
t.characters = t.characters + add;
return { part: 44, addLen: add.length, len: t.characters.length, expect: 22500 };
