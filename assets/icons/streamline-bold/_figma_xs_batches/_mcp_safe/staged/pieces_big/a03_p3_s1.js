const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a03_p3') || '';
const chunk = "c2M+XG4gIDxwYXRoIGZpbGw9XCIjMDAwMDAwXCIgZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJtMTUuMjMgMTEuMTYgLTQuNjY5IDEuMzM0YTAuNSAwLjUgMCAwIDEgLTAuNjMgLTAuNTYzbDAuNjQ1IC0zLjg3NFYxLjg1MkExLjU1MSAxLjU1MSAwIDAgMSAxMi4xMjggMC4zaDEwLjA4NGExLjU1MiAxLjU1MiAwIDAgMSAxLjU1MSAxLjU1MnY3Ljc1N2ExLjU1MiAxLjU1MiAwIDAgMSAtMS41NTEgMS41NTF6bTEuMjUyIC04Ljk1NiAxLjU1IDBhMC41IDAuNSAwIDAgMSAwLjUgMC41VjQuMzdoMS42NjZhMC41IDAuNSAwIDAgMSAwLjUgMC41djEuNTVhMC41IDAuNSAwIDAgMSAtMC41IDAuNWgtMS42NjZ2MS42NjZhMC41IDAuNSAwIDAgMSAtMC41IDAuNWgtMS41";
store.setSharedPluginData('careapp', 'a03_p3', prev + chunk);
return { key: 'a03_p3', piece: 1, totalLen: (prev+chunk).length, id: store.id };
