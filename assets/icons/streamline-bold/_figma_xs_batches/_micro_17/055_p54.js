const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "IDE5YTEgMSAwIDAgMCAxLjQxIDEuNDFsMi43MiAtMi43MmEwLjUxIDAuNTEgMCAwIDEgMC42MSAtMC4wOCAxMiAxMiAwIDAgMCAxMy4xIDAgMC41MSAwLjUxIDAgMCAxIDAuNjEgMC4wOGwyLjcyIDIuNzJBMSAxIDAgMCAwIDIzLjI5IDE5WlwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgPC9nPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL21pc2MvZmxhc2gub2ZmIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJGbGFzaC1PZmYtLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgRmxhc2ggT2ZmIFN0";
t.characters = t.characters + add;
return { part: 54, addLen: add.length, len: t.characters.length, expect: 27500 };
