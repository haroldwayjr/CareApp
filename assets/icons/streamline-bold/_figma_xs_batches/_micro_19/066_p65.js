const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MC43NSAwIDAgMSAwLjE1IDEuMDUgMC43NyAwLjc3IDAgMCAxIC0wLjYgMC4zIDAuNzQgMC43NCAwIDAgMSAtMC40NSAtMC4xNSA4LjQyIDguNDIgMCAwIDAgLTMuMTggLTEuMzhBMy41NCAzLjU0IDAgMCAwIDE2IDE5YTguODkgOC44OSAwIDAgMCAyLjg1IDAuNDdjMi43MiAwIDQuNjMgLTEuMzIgNC44NyAtMiAwLjMzIC0wLjk5IC0xLjA2IC00LjU0IC01LjIyIC01LjkzXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICA8L2c+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vaGVhbHRoLzkxMSIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3";
t.characters = t.characters + add;
return { part: 65, addLen: add.length, len: t.characters.length, expect: 33000 };
