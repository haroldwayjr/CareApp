const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a05_p4';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "NDVMNSAyMS45M2EwLjc0IDAuNzQgMCAwIDAgMC41MyAwLjIyIDAuNzMgMC43MyAwIDAgMCAwLjQ3IC0wLjIyIDAuNzUgMC43NSAwIDAgMCAwIC0xLjA2TDUuMTEgMjBsMS4xMyAtMS4xNGE4LjkzIDguOTMgMCAwIDAgNSAyLjA3djEuNTdIMTBhMC43NSAwLjc1IDAgMCAwIDAgMS41aDQuMWEwLjc1IDAuNzUgMCAwIDAgMCAtMS41aC0xLjN2LTEuNjFhOC45MyA4LjkzIDAgMCAwIDUgLTIuMDdMMTguODkgMjBsLTAuOTEgMC45MmEwLjc1IDAuNzUgMCAwIDAgMCAxLjA2IDAuNzMgMC43MyAwIDAgMCAwLjUzIDAuMjIgMC43NCAwLjc0IDAgMCAwIDAuNTMgLTAuMjJsMS40NCAtMS40NEwyMS45MyAxOWEwLjc1IDAuNzUgMCAwIDAgLTEuMDYgLTFsLTAuOTIgMC45MSAtMS4xMyAtMS4xM2E4LjkzIDguOTMgMCAwIDAgMi4wNyAtNWgxLjYxdjEuM2EwLjc1IDAuNzUgMCAwIDAgMS41IDBWMTBhMC43NiAwLjc2IDAgMCAwIC0wLjc1IC0wLjhNNSA5LjQzYTEuMTMgMS4xMyAwIDEgMSAxLjEzIDEuMTNBMS4xMyAxLjEzIDAgMCAxIDUgOS40M00xNy4zMiAxMWMtMC40MSAtMC45IC0xLjQzIC0xLjIzIC0yLjcyIC0wLjg5IC0yLjYzIDAuNjkgLTMuOTIgLTAuMjYgLTQuNDUg";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
