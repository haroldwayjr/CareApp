const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a05_p3') || '';
const chunk = "bDEuNDggMS44NGExLjU1IDEuNTUgMCAwIDAgMS4yMyAwLjU5IDEuNTcgMS41NyAwIDAgMCAxLjIzIC0yLjU2bC0xLjQ3IC0xLjg0YTMuNyAzLjcgMCAwIDAgLTIuODcgLTEuMzhIOC43NXYtMi40MmwyLjQ0IDAuNTJhMS4yNCAxLjI0IDAgMCAwIDAuMjcgMCAxLjMxIDEuMzEgMCAwIDAgMC4yOCAtMi42IDIxLjY4IDIxLjY4IDAgMCAwIC00LjU2IC0xLjAyIDEuNDggMS40OCAwIDAgMCAtMC43OCAwLjIyXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vaGVhbHRoL3ByZXNjcmlwdGlvbiIsICJuYW1lIjogInByZXNjcmlwdGlvbiIsICJjYXRlZ29yeSI6ICJoZWFs";
store.setSharedPluginData('careapp', 'a05_p3', prev + chunk);
return { key: 'a05_p3', piece: 1, totalLen: (prev+chunk).length, id: store.id };
