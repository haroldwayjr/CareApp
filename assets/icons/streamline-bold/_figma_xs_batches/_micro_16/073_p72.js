const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "NCAtMy43M0E0LjQyIDQuNDIgMCAwIDAgNC44MyAwLjYyYTQuNDcgNC40NyAwIDAgMCAtMy4zNiAxLjc0QTUuODIgNS44MiAwIDAgMCAwLjI2IDYuMTdhNS44MiA1LjgyIDAgMCAwIDEuNDMgMy43MiA0LjUzIDQuNTMgMCAwIDAgMi4zNyAxLjQ0IDguOCA4LjggMCAwIDAgMy4xMiA2LjQxIDEgMSAwIDAgMCAxLjM0IC0xLjQ5TTMuMTggOC41NmEzLjg2IDMuODYgMCAwIDEgLTAuOTMgLTIuNDVBMy44OSAzLjg5IDAgMCAxIDMgMy42MWEyLjQ1IDIuNDUgMCAwIDEgMS44NSAtMUg1YTIuNDcgMi40NyAwIDAgMSAxLjg0IDAuODhBMy44NiAzLjg2IDAgMCAxIDcuNzIgNmEzLjgzIDMuODMgMCAwIDEgLTAuNzggMi41IDIuNDcgMi40NyAwIDAgMSAtMS44NSAxIDIuNDkg";
t.characters = t.characters + add;
return { part: 72, addLen: add.length, len: t.characters.length, expect: 36500 };
