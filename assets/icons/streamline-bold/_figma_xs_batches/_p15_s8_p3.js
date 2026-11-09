const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "ZXItLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgUGRmIFJlYWRlciBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxwYXRoIGZpbGw9XCIjMDAwMDAwXCIgZD1cIk0xNS4wNDU5IDZjMCAwLjU5NjczIDAuMjM3MiAxLjE2ODg2IDAuNjU5MiAxLjU5MDgyIDAuNDIxOSAwLjQyMTk2IDAuOTk0MSAwLjY1OTE4IDEuNTkwOCAwLjY1OTE4aDZ2MTNjMCAxLjUxODggLTEuMjMxMiAyLjc1IC0yLjc1IDIuNzVoLTE1LjVjLTEuNTE4NzggMCAtMi43NSAtMS4yMzEyIC0yLjc1IC0yLjc1di0wLjEyNzloMTAuMTkxNGMxLjUxODggMCAyLjc1IC0xLjIzMTIgMi43NSAtMi43NXYtMy4zNDY3YzAgLTEu";
t.characters = t.characters + add;
return { step: 8, part: 3, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
