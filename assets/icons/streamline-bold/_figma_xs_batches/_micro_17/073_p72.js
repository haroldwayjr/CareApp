const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "OCAyLjQ4IDAgMCAwIDIuNDggLTIuNDhjMCAtMC43MSAwLjA0IDAuMTEgLTAuOSAtMTMuODhtLTYuMjggLTEuNDZIOC41M3YtMWEzLjcxIDMuNzEgMCAwIDEgNy40MSAwYzAgNC4xIDAgMy45MSAwLjE0IDQuMTdhMC43NSAwLjc1IDAgMCAxIC0xLjM2IC0wLjQzWm0tMS4wNSA1LjIxYTAuNSAwLjUgMCAwIDEgMC42NiAtMC4yMyA2LjU4IDYuNTggMCAwIDEgMyA1Ljk1IDAuNSAwLjUgMCAwIDEgLTAuNSAwLjVoLTIuMjF2Mi43OGEwLjUgMC41IDAgMCAxIC0wLjUgMC41IDAuNTEgMC41MSAwIDAgMSAtMC41IC0wLjVjMCAtOS4zIC0wLjAyIC04Ljg1IDAuMDUgLTltLTYuNTcgMC4xMWEwLjUgMC41IDAgMCAxIDEgMHYzLjEzYzAgMC4zIDAuMzUgMC42MyAwLjkgMC43";
t.characters = t.characters + add;
return { part: 72, addLen: add.length, len: t.characters.length, expect: 36500 };
