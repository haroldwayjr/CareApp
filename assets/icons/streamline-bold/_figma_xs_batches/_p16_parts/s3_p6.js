const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "aHR0cHM6Ly9zdHJlYW1saW5laHEuY29tXG4gIDwvZGVzYz5cbiAgPGc+XG4gICAgPGc+XG4gICAgICA8cGF0aCBkPVwiTTEyLjU2IDEzLjcxSDMuODVhMC43NSAwLjc1IDAgMCAwIDAgMS41aDguNzFhMC43NSAwLjc1IDAgMSAwIDAgLTEuNVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICAgIDxwYXRoIGQ9XCJNMTEuMjUgMTguMTZoLTcuNGEwLjc1IDAuNzUgMCAxIDAgMCAxLjVoNy40YTAuNzUgMC43NSAwIDAgMCAwIC0xLjVcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPC9nPlxuICAgIDxwYXRoIGQ9XCJNNC40NCAzLjQ5aDMuODlzMS4wNCAwIDEuMDQgMS4wNHY0LjY0";
t.characters = t.characters + add;
return { step: 3, part: 6, addLen: add.length, len: t.characters.length };
