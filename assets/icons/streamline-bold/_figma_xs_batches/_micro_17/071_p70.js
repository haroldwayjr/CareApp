const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "ZD1cIk0xMS41IDE5SDFhMSAxIDAgMCAwIDAgMmgxMC41YTAuNSAwLjUgMCAwIDEgMCAxIDEgMSAwIDAgMCAwIDIgMi41IDIuNSAwIDAgMCAwIC01XCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNMSAxOGg4LjVhMi41IDIuNSAwIDAgMCAwIC01IDEgMSAwIDAgMCAwIDIgMC41IDAuNSAwIDAgMSAwIDFIMWExIDEgMCAwIDAgMCAyXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy9mb29kIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94";
t.characters = t.characters + add;
return { part: 70, addLen: add.length, len: t.characters.length, expect: 35500 };
