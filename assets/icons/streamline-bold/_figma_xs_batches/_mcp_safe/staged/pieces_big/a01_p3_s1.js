const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a01_p3') || '';
const chunk = "LjQ2IDEuNDZ2Ny4xNnMwIDEuNDYgLTEuNDYgMS40NkgxLjk3cy0xLjQ2IDAgLTEuNDYgLTEuNDZ2LTcuMTZzMCAtMS40NiAxLjQ2IC0xLjQ2XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMS40OSA5LjQzYTEuMjUgMS4yNSAwIDAgMCAxLjI1IC0xLjI1VjNBMC4yNSAwLjI1IDAgMCAxIDMgMi43NGg1LjE4YTEuMjUgMS4yNSAwIDAgMCAwIC0yLjVIMi40NGEyLjIxIDIuMjEgMCAwIDAgLTIuMiAyLjJ2NS43NGExLjI1IDEuMjUgMCAwIDAgMS4yNSAxLjI1WlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTIzLjc2IDIuNDRhMi4yMSAy";
store.setSharedPluginData('careapp', 'a01_p3', prev + chunk);
return { key: 'a01_p3', piece: 1, totalLen: (prev+chunk).length, id: store.id };
