const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const key = 'a05_p0';
const prev = store.getSharedPluginData('careapp', key) || '';
const chunk = "LCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIkJhbmRhZ2UtLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgQmFuZGFnZSBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxnPlxuICAgIDxwYXRoIGQ9XCJNMTMuMTEgNS4zM2EwLjUxIDAuNTEgMCAwIDAgMCAtMC43MWwtMi44NyAtMi44NmE2IDYgMCAwIDAgLTguNDggMCA2IDYgMCAwIDAgMCA4LjQ4bDIuODYgMi44N2EwLjUxIDAuNTEgMCAwIDAgMC43MSAwWm0tNS40OSAtMi43YTEgMSAwIDAgMSAwIDIgMSAxIDAgMCAxIDAgLTJtLTAuMjEgMy43OGExIDEgMCAxIDEgLTEgMSAxIDEgMCAwIDEgMSAtMU0zLjc1IDIuNzVhMSAxIDAgMSAxIC0xIDEgMSAxIDAgMCAxIDEgLTFtLTAuMTMgNS44OGExIDEgMCAwIDEgMCAtMiAxIDEgMCAwIDEgMCAyXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJtMjIuMjQgMTMuNzYgLTIuODYgLTIuODdhMC41MiAwLjUyIDAgMCAwIC0wLjM2IC0wLjE0";
store.setSharedPluginData('careapp', key, prev + chunk);
return { key, piece: 4, totalLen: (prev + chunk).length, id: store.id };
