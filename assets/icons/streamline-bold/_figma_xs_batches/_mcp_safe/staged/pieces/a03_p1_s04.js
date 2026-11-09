const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a03_p1';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "NDMgMC4yNEgxNmEwLjUxIDAuNTEgMCAwIDAgMC40MiAtMC4yMiAwLjQ5IDAuNDkgMCAwIDAgMCAtMC40N1pcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9tZWRpYS9jcm9wIiwgIm5hbWUiOiAiY3JvcCIsICJjYXRlZ29yeSI6ICJtZWRpYSIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJDcm9wLVJvdGF0ZS0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBDcm9wIFJvdGF0ZSBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGZpbGw9XCIjMDAwMDAwXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTcuNDUgMWEwLjc1IDAuNzUgMCAwIDAgLTEuMjggLTAuNTNsLTIgMmEwLjc1IDAuNzUgMCAwIDAgMCAxLjA2bDIgMkEwLjc1IDAuNzUgMCAwIDAgMTcuNDUgNVYzLjc3YzIuNjc4IDAuMjMgNC44IDIuNDk2IDQuOCA1LjIzYTAuNzUgMC43NSAwIDAgMCAx";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
