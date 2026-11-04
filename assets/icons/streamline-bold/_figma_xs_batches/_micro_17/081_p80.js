const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "bmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgT2ZmaWNlIEZpbGUgVGV4dCBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGZpbGw9XCIjMDAwMDAwXCIgZD1cIk0xNC4yNSA2YzAgMC41OTY3MyAwLjIzNzIgMS4xNjg4NiAwLjY1OTIgMS41OTA4MiAwLjQyMTkgMC40MjE5NiAwLjk5NDEgMC42NTkxOCAxLjU5MDggMC42NTkxOGg2djEzYzAgMS41MTg4IC0xLjIzMTIgMi43NSAtMi43NSAyLjc1SDQuMjVjLTEuNTE4NzggMCAtMi43NSAtMS4yMzEyIC0yLjc1IC0yLjc1VjIuNzVDMS41IDEuMjMxMjIgMi43MzEyMiAwIDQuMjUgMGgxMHpNNS45MDcyMyAxOC42OTUzYy0wLjQxNDIyIDAgLTAuNzUg";
t.characters = t.characters + add;
return { part: 80, addLen: add.length, len: t.characters.length, expect: 40500 };
