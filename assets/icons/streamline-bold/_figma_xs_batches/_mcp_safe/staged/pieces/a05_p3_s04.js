const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a05_p3';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "IDIuNzUgMCAxIDAgNS41IDAgMi43NSAyLjc1IDAgMSAwIC01LjUgMFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTYuNCA3LjM5YTEuMiAxLjIgMCAwIDAgLTAuNTYgMC41MyAxLjU1IDEuNTUgMCAwIDAgLTAuMjQgMC44M3Y0LjQ3YTIuNjMgMi42MyAwIDAgMCAyLjYzIDIuNjNoMi4xNGEwLjUzIDAuNTMgMCAwIDEgMC40MSAwLjE5bDEuNDggMS44NGExLjU1IDEuNTUgMCAwIDAgMS4yMyAwLjU5IDEuNTcgMS41NyAwIDAgMCAxLjIzIC0yLjU2bC0xLjQ3IC0xLjg0YTMuNyAzLjcgMCAwIDAgLTIuODcgLTEuMzhIOC43NXYtMi40MmwyLjQ0IDAuNTJhMS4yNCAxLjI0IDAgMCAwIDAuMjcgMCAxLjMxIDEuMzEgMCAwIDAgMC4yOCAtMi42IDIxLjY4IDIxLjY4IDAgMCAwIC00LjU2IC0xLjAyIDEuNDggMS40OCAwIDAgMCAtMC43OCAwLjIyXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vaGVhbHRoL3ByZXNjcmlwdGlvbiIsICJuYW1lIjogInByZXNjcmlwdGlvbiIsICJjYXRlZ29yeSI6ICJoZWFs";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
