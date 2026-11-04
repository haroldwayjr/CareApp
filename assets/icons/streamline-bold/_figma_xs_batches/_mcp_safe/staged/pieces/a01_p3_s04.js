const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a01_p3';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJFeHBhbmQtOC0tU3RyZWFtbGluZS1VbHRpbWF0ZVwiPlxuICA8ZGVzYz5cbiAgICBFeHBhbmQgOCBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxnPlxuICAgIDxwYXRoIGQ9XCJNMS45NyAxMy40MWg3LjE2czEuNDYgMCAxLjQ2IDEuNDZ2Ny4xNnMwIDEuNDYgLTEuNDYgMS40NkgxLjk3cy0xLjQ2IDAgLTEuNDYgLTEuNDZ2LTcuMTZzMCAtMS40NiAxLjQ2IC0xLjQ2XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMS40OSA5LjQzYTEuMjUgMS4yNSAwIDAgMCAxLjI1IC0xLjI1VjNBMC4yNSAwLjI1IDAgMCAxIDMgMi43NGg1LjE4YTEuMjUgMS4yNSAwIDAgMCAwIC0yLjVIMi40NGEyLjIxIDIuMjEgMCAwIDAgLTIuMiAyLjJ2NS43NGExLjI1IDEuMjUgMCAwIDAgMS4yNSAxLjI1WlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgICA8cGF0aCBkPVwiTTIzLjc2IDIuNDRhMi4yMSAy";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
