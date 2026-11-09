const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MmEwLjc2IDAuNzYgMCAwIDEgLTAuNzUgLTAuNzV2LTUuNWEwLjc1IDAuNzUgMCAwIDEgMS41IDBWMTJoMi43NWEwLjc1IDAuNzUgMCAwIDEgMCAxLjVcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy9zY2hlZHVsZSIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJTY2hlZHVsZWQtUGhvbmUtQ2FsbC1DYWxlbmRhci0yLS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIFNjaGVkdWxlZCBQaG9uZSBDYWxsIENhbGVuZGFyIDIgU3Ry";
t.characters = t.characters + add;
return { step: 5, part: 0, addLen: add.length, len: t.characters.length };
