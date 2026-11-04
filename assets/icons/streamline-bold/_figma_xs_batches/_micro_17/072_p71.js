const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "PVwiMCAwIDI0IDI0XCIgaWQ9XCJGb29kLURlbGl2ZXJ5LUJhZy0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBGb29kIERlbGl2ZXJ5IEJhZyBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGQ9XCJNMjEgNy42NGExLjU1IDEuNTUgMCAwIDAgLTEuNTUgLTEuNDZoLTJ2LTFBNS4yIDUuMiAwIDAgMCA3IDUuMmMwIDQuMDkgMCAzLjkxIDAuMTQgNC4xN2EwLjc1IDAuNzUgMCAwIDEgLTEuMzYgLTAuNDNWNi4xOGgtMS4yQTEuNTYgMS41NiAwIDAgMCAzIDcuNjRjLTEgMTMuOTIgLTAuOTMgMTMuMTUgLTAuOTMgMTMuODhBMi40OCAyLjQ4IDAgMCAwIDQuNTggMjRoMTQuODRhMi40";
t.characters = t.characters + add;
return { part: 71, addLen: add.length, len: t.characters.length, expect: 36000 };
