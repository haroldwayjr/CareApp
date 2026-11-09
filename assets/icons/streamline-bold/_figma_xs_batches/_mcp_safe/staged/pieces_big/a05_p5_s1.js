const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a05_p5') || '';
const chunk = "NDdcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xNi42NSA1LjcyYTIuODEgMi44MSAwIDEgMCA1LjYyIDAgMi44MSAyLjgxIDAgMSAwIC01LjYyIDBcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk04LjA3IDMuODRhMy41NiAzLjU2IDAgMSAwIDcuMTIgMCAzLjU2IDMuNTYgMCAxIDAgLTcuMTIgMFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE3LjI1IDEzLjQxYTUuNjMgNS42MyAwIDEgMCAtMTEuMjUgMCAwLjM4IDAuMzggMCAwIDAgMC4zOCAwLjM3aDEwLjVhMC4z";
store.setSharedPluginData('careapp', 'a05_p5', prev + chunk);
return { key: 'a05_p5', piece: 1, totalLen: (prev+chunk).length, id: store.id };
