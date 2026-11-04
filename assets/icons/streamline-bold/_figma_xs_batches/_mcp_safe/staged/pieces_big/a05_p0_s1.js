const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const store = page.findOne(n => n.name === '__xs_b64_store__');
const prev = store.getSharedPluginData('careapp', 'a05_p0') || '';
const chunk = "IDAuNTEgMCAwIDAgMCAtMC43MWwtMi44NyAtMi44NmE2IDYgMCAwIDAgLTguNDggMCA2IDYgMCAwIDAgMCA4LjQ4bDIuODYgMi44N2EwLjUxIDAuNTEgMCAwIDAgMC43MSAwWm0tNS40OSAtMi43YTEgMSAwIDAgMSAwIDIgMSAxIDAgMCAxIDAgLTJtLTAuMjEgMy43OGExIDEgMCAxIDEgLTEgMSAxIDEgMCAwIDEgMSAtMU0zLjc1IDIuNzVhMSAxIDAgMSAxIC0xIDEgMSAxIDAgMCAxIDEgLTFtLTAuMTMgNS44OGExIDEgMCAwIDEgMCAtMiAxIDEgMCAwIDEgMCAyXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJtMjIuMjQgMTMuNzYgLTIuODYgLTIuODdhMC41MiAwLjUyIDAgMCAwIC0wLjM2IC0wLjE0";
store.setSharedPluginData('careapp', 'a05_p0', prev + chunk);
return { key: 'a05_p0', piece: 1, totalLen: (prev+chunk).length, id: store.id };
