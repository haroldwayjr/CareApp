const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MCAwLjQxNDIgMC4zMzU4IDAuNzUgMC43NSAwLjc1IDAuMzg4MiAwIDAuNzA3NSAtMC4yOTQ5IDAuNzQ2MSAtMC42NzI5TDIwLjI1IDEzdi0wLjVjMCAtNC4zMDM0OCAtMy4yOTUyIC03LjgzNTg2IC03LjUgLTguMjE0ODRWMy43NWMwIC0wLjQxNDIxIC0wLjMzNTggLTAuNzUgLTAuNzUgLTAuNzVcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL21pc2MvYnVzIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJCdXMtLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgQnVzIFN0cmVhbWxpbmUgSWNv";
t.characters = t.characters + add;
return { part: 53, addLen: add.length, len: t.characters.length, expect: 27000 };
