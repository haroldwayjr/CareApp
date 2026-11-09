const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a05_p5';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "aWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xOS41IDguOTFhNC40MyA0LjQzIDAgMCAwIC0yIDAuNDUgMC4zOCAwLjM4IDAgMCAwIC0wLjE4IDAuNSA2Ljg0IDYuODQgMCAwIDEgMSAzLjUyIDAuMzcgMC4zNyAwIDAgMCAwLjM3IDAuMzdoNC44N2EwLjM4IDAuMzggMCAwIDAgMC4zOCAtMC4zNyA0LjQ5IDQuNDkgMCAwIDAgLTQuNDQgLTQuNDdcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk0xNi42NSA1LjcyYTIuODEgMi44MSAwIDEgMCA1LjYyIDAgMi44MSAyLjgxIDAgMSAwIC01LjYyIDBcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIk04LjA3IDMuODRhMy41NiAzLjU2IDAgMSAwIDcuMTIgMCAzLjU2IDMuNTYgMCAxIDAgLTcuMTIgMFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTE3LjI1IDEzLjQxYTUuNjMgNS42MyAwIDEgMCAtMTEuMjUgMCAwLjM4IDAuMzggMCAwIDAgMC4zOCAwLjM3aDEwLjVhMC4z";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
