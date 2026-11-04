const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "LjUgMCAwIDEgMC41IDAuNXYxYTAuNSAwLjUgMCAwIDEgLTAuNSAwLjVoLTRhMC41IDAuNSAwIDAgMSAtMC41IC0wLjVtMC43NSAxNGEwLjc2IDAuNzYgMCAwIDEgLTAuNzUgMC43NWgtM2EwLjc1IDAuNzUgMCAwIDEgMCAtMS41aDNhMC43NiAwLjc2IDAgMCAxIDAuNzUgMC43NW00LjI1IDAuNzVhMC43NSAwLjc1IDAgMCAxIDAgLTEuNWgzYTAuNzUgMC43NSAwIDAgMSAwIDEuNVpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy9nYXMiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1c";
t.characters = t.characters + add;
return { part: 56, addLen: add.length, len: t.characters.length, expect: 28500 };
