const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "NS41MWEzLjMxIDMuMzEgMCAwIDAgLTYuNTYgMGMwIDIuMiAzLjI1IDUuNTEgMy4yNSA1LjUxbTAgLTYuNjRhMS4xMyAxLjEzIDAgMSAxIC0xLjEzIDEuMTMgMS4xNCAxLjE0IDAgMCAxIDEuMTMgLTEuMTNcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9taXNjL2J1aWxkaW5nIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJCdWlsZGluZy0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBCdWlsZGluZyBTdHJlYW1saW5lIEljb246IGh0dHBzOi8v";
t.characters = t.characters + add;
return { part: 18, addLen: add.length, len: t.characters.length, expect: 9500 };
