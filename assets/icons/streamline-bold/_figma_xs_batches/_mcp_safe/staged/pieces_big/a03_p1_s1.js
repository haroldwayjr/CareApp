const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a03_p1') || '';
const chunk = "d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJDcm9wLVJvdGF0ZS0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBDcm9wIFJvdGF0ZSBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGZpbGw9XCIjMDAwMDAwXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNMTcuNDUgMWEwLjc1IDAuNzUgMCAwIDAgLTEuMjggLTAuNTNsLTIgMmEwLjc1IDAuNzUgMCAwIDAgMCAxLjA2bDIgMkEwLjc1IDAuNzUgMCAwIDAgMTcuNDUgNVYzLjc3YzIuNjc4IDAuMjMgNC44IDIuNDk2IDQuOCA1LjIzYTAuNzUgMC43NSAwIDAgMCAx";
store.setSharedPluginData('careapp', 'a03_p1', prev + chunk);
return { key: 'a03_p1', piece: 1, totalLen: (prev+chunk).length, id: store.id };
