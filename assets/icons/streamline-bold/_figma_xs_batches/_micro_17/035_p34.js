const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "InNldE5hbWUiOiAiaWNvbi9taXNjL3dhdGVyIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJXYXRlci1TdHJhdy0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBXYXRlciBTdHJhdyBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGQ9XCJNMTcuOTEgMmgyLjM0YTEgMSAwIDAgMCAwIC0yaC0yLjM0YTUgNSAwIDAgMCAtNC44NiAzLjg0IDAuMjIgMC4yMiAwIDAgMSAtMC4yIDAuMTZoLTguNmExLjM5IDEuMzkgMCAwIDAgLTEuMTIgMC41MSAxLjQyIDEuNDIgMCAwIDAgLTAuMzUgMS4y";
t.characters = t.characters + add;
return { part: 34, addLen: add.length, len: t.characters.length, expect: 17500 };
