const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MC41IC0wLjUgLTAuNWgtM1Y0YzAgMC41NTIyOCAtMC40NDc3IDEgLTEgMXMtMSAtMC40NDc3MiAtMSAtMVYxYzAgLTAuNTUyMjg1IDAuNDQ3NyAtMSAxIC0xTTcgMGMwLjU1MjI4IDAgMSAwLjQ0NzcxNSAxIDF2MC41aDZ2Mkg4VjRjMCAwLjU1MjI4IC0wLjQ0NzcyIDEgLTEgMXMtMSAtMC40NDc3MiAtMSAtMVYxYzAgLTAuNTUyMjg1IDAuNDQ3NzIgLTEgMSAtMVwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy9yYWluIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJSYWluLVVtYnJlbGxhLS1TdHJlYW1s";
t.characters = t.characters + add;
return { step: 5, part: 7, addLen: add.length, len: t.characters.length };
