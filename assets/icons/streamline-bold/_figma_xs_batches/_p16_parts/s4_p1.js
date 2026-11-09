const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJFbnZlbG9wZS0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBFbnZlbG9wZSBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxnPlxuICAgIDxwYXRoIGQ9XCJNMTEuMTEgMTQuNTZhMS4yNyAxLjI3IDAgMCAwIDEuNzcgMGw5LjY5IC05LjY5YTAuNSAwLjUgMCAwIDAgMC4xMiAtMC41MSAwLjUxIDAuNTEgMCAwIDAgLTAuNCAtMC4zNEwyMiA0SDJsLTAuMjkgMGEwLjUgMC41IDAgMCAwIC0wLjQgMC4zNCAwLjQ4IDAuNDggMCAwIDAgMC4xMiAwLjUxWlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0";
t.characters = t.characters + add;
return { step: 4, part: 1, addLen: add.length, len: t.characters.length };
