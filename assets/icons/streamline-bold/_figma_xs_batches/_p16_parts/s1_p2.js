const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "NyAwLjI3IDAgMCAwIDAuMjYgMCAzLjMxIDMuMzEgMCAwIDEgMS4zNCAtMC4yNVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgPC9nPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL2ZpbGVzL3BvbGljeSIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+XG4gIDxwYXRoIGZpbGw9XCIjMDAwMDAwXCIgZD1cIk0xOS40MTUgMTkuMzYxM2MwLjE3MjIgMC4xMDMyIDAuMzMzMiAwLjIyNjcgMC40Nzc2IDAuMzcxMSAwLjQ2ODggMC40Njg5IDAuNzMyNCAxLjEwNDYgMC43MzI0IDEuNzY3NnMtMC4yNjM2IDEuMjk4";
t.characters = t.characters + add;
return { step: 1, part: 2, addLen: add.length, len: t.characters.length };
