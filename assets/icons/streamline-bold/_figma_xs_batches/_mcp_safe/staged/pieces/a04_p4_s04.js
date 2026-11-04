const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a04_p4';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "MyAwIDAgMCAyNCA3LjIyYTcuMTYgNy4xNiAwIDAgMCAtMi4xMSAtNS4xMW0tMS40MSA4Ljc5IC0zLjczIDMuNzJhMC41IDAuNSAwIDAgMSAtMC43MSAwTDkuMzggOGEwLjUxIDAuNTEgMCAwIDEgMCAtMC43MWwzLjczIC0zLjcyYTUuMjEgNS4yMSAwIDAgMSA3LjM3IDcuMzdaXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMTYuNjMgMy4xNmE0LjEzIDQuMTMgMCAwIDAgLTIuOTEgMS4yIDAuNzUgMC43NSAwIDAgMCAwIDEuMDYgMC43NCAwLjc0IDAgMCAwIDEuMDYgMCAyLjcgMi43IDAgMCAxIDMuNyAwIDAuNzQgMC43NCAwIDAgMCAwLjUzIDAuMjIgMC43MSAwLjcxIDAgMCAwIDAuNTMgLTAuMjIgMC43NCAwLjc0IDAgMCAwIDAgLTEuMDYgNC4xIDQuMSAwIDAgMCAtMi45MSAtMS4yXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vaGVhbHRoL2ZpcnN0LmFpZCIsICJuYW1lIjogImZpcnN0LWFpZCIsICJjYXRlZ29yeSI6ICJoZWFsdGgiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
