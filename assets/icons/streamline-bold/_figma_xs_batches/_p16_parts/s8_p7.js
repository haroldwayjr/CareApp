const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "LjY3YTEuNDkgMS40OSAwIDAgMSAtMS43MSAwLjA5TDEyLjY2IDE4YTEuNzUgMS43NSAwIDAgMCAtMi41MyAwLjg2IDEuODIgMS44MiAwIDAgMCAwLjgxIDIuMTRsMi40MiAxLjQ1YTEuNzIgMS43MiAwIDAgMCAwLjkgMC4yNSAxLjc4IDEuNzggMCAwIDAgMC42MSAtMC4xMWwxLjg5IC0xdjJoN3YtMmMtMC4wMyAtMy43MyAtNC42NyAtNS41OSAtOC4xIC0yLjkyXCIgZmlsbD1cIiMwMDAwMDBcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuICAgIDxwYXRoIGQ9XCJNOC41MiAxNi4yNWE2LjgxIDYuODEgMCAwIDEgLTIuNDYgLTQuOTNBNC42IDQuNiAwIDAgMCA4LjUgOS43YTUuODIgNS44MiAwIDAgMCAxLjIyIC0zLjgxIDUuODIgNS44MiAwIDAgMCAtMS40";
t.characters = t.characters + add;
return { step: 8, part: 7, addLen: add.length, len: t.characters.length };
