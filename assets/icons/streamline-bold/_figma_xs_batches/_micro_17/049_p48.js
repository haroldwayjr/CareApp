const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MS4zMkExIDEgMCAwIDAgMjIuMyAxNG0tNS40OSAtMC44MmExIDEgMCAwIDEgMCAtMiAxIDEgMCAwIDEgMCAyXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNNS43NiA5LjY0YTIuNSAyLjUgMCAwIDAgLTIuMDYgMy45MUwxIDE2Ljc5YTMuODYgMy44NiAwIDAgMCAtMSAyLjgxIDMuNzkgMy43OSAwIDAgMCAxLjMzIDIuNjVsMS40NCAxLjI2QTEgMSAwIDAgMCA0LjA5IDIybC0xLjQ0IC0xLjI2YTEuODUgMS44NSAwIDAgMSAtMC4xOSAtMi42NGwzIC0zLjQ5IDAuMzMgMGEyLjUgMi41IDAgMCAwIDAgLTVabTAgMy41YTEgMSAwIDEgMSAxIC0xIDEgMSAwIDAgMSAtMSAxXCIgZmlsbD1cIiMwMDAwMDBc";
t.characters = t.characters + add;
return { part: 48, addLen: add.length, len: t.characters.length, expect: 24500 };
