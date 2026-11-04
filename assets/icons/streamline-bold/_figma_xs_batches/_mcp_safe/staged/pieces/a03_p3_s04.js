const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a03_p3';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "dmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJDaGF0LUNvbnN1bHRhdGlvbi1QaG9uZS0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBDaGF0IENvbnN1bHRhdGlvbiBQaG9uZSBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGZpbGw9XCIjMDAwMDAwXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJtMTUuMjMgMTEuMTYgLTQuNjY5IDEuMzM0YTAuNSAwLjUgMCAwIDEgLTAuNjMgLTAuNTYzbDAuNjQ1IC0zLjg3NFYxLjg1MkExLjU1MSAxLjU1MSAwIDAgMSAxMi4xMjggMC4zaDEwLjA4NGExLjU1MiAxLjU1MiAwIDAgMSAxLjU1MSAxLjU1MnY3Ljc1N2ExLjU1MiAxLjU1MiAwIDAgMSAtMS41NTEgMS41NTF6bTEuMjUyIC04Ljk1NiAxLjU1IDBhMC41IDAuNSAwIDAgMSAwLjUgMC41VjQuMzdoMS42NjZhMC41IDAuNSAwIDAgMSAwLjUgMC41djEuNTVhMC41IDAuNSAwIDAgMSAtMC41IDAuNWgtMS42NjZ2MS42NjZhMC41IDAuNSAwIDAgMSAtMC41IDAuNWgtMS41";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
