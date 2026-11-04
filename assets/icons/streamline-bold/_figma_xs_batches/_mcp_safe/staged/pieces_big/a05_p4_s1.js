const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a05_p4') || '';
const chunk = "ODkgMjBsLTAuOTEgMC45MmEwLjc1IDAuNzUgMCAwIDAgMCAxLjA2IDAuNzMgMC43MyAwIDAgMCAwLjUzIDAuMjIgMC43NCAwLjc0IDAgMCAwIDAuNTMgLTAuMjJsMS40NCAtMS40NEwyMS45MyAxOWEwLjc1IDAuNzUgMCAwIDAgLTEuMDYgLTFsLTAuOTIgMC45MSAtMS4xMyAtMS4xM2E4LjkzIDguOTMgMCAwIDAgMi4wNyAtNWgxLjYxdjEuM2EwLjc1IDAuNzUgMCAwIDAgMS41IDBWMTBhMC43NiAwLjc2IDAgMCAwIC0wLjc1IC0wLjhNNSA5LjQzYTEuMTMgMS4xMyAwIDEgMSAxLjEzIDEuMTNBMS4xMyAxLjEzIDAgMCAxIDUgOS40M00xNy4zMiAxMWMtMC40MSAtMC45IC0xLjQzIC0xLjIzIC0yLjcyIC0wLjg5IC0yLjYzIDAuNjkgLTMuOTIgLTAuMjYgLTQuNDUg";
store.setSharedPluginData('careapp', 'a05_p4', prev + chunk);
return { key: 'a05_p4', piece: 1, totalLen: (prev+chunk).length, id: store.id };
