const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a04_p4') || '';
const chunk = "My4xNmE0LjEzIDQuMTMgMCAwIDAgLTIuOTEgMS4yIDAuNzUgMC43NSAwIDAgMCAwIDEuMDYgMC43NCAwLjc0IDAgMCAwIDEuMDYgMCAyLjcgMi43IDAgMCAxIDMuNyAwIDAuNzQgMC43NCAwIDAgMCAwLjUzIDAuMjIgMC43MSAwLjcxIDAgMCAwIDAuNTMgLTAuMjIgMC43NCAwLjc0IDAgMCAwIDAgLTEuMDYgNC4xIDQuMSAwIDAgMCAtMi45MSAtMS4yXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vaGVhbHRoL2ZpcnN0LmFpZCIsICJuYW1lIjogImZpcnN0LWFpZCIsICJjYXRlZ29yeSI6ICJoZWFsdGgiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3";
store.setSharedPluginData('careapp', 'a04_p4', prev + chunk);
return { key: 'a04_p4', piece: 1, totalLen: (prev+chunk).length, id: store.id };
