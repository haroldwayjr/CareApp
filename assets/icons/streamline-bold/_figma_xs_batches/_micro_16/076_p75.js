const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MCAwIDAgLTEgMC4xIDEzLjUgMTMuNSAwIDAgMSAtNy42NiAyQzguMzQgNC40NSA1Ljc2IDcgNS43MSA3YTguMTEgOC4xMSAwIDAgMCAtMy4yOCA2LjQ5QTggOCAwIDAgMCAzIDE2LjU3YTAuNTEgMC41MSAwIDAgMSAtMC4xIDAuNTNMMC4yNyAyMGExIDEgMCAwIDAgMCAxLjQyIDEgMSAwIDAgMCAxLjMyIDAuMDVDMy4zNSAxOS45IDYuMTUgMTUuMiAxNCAxMS45MWExIDEgMCAwIDEgMC43OCAxLjg2IDI2LjE4IDI2LjE4IDAgMCAwIC04LjQzIDUuNTRsLTAuMjQgMC4yNUEwLjUxIDAuNTEgMCAwIDAgNiAyMGEwLjUgMC41IDAgMCAwIDAuMjQgMC4zNiA4IDggMCAwIDAgNC4yNiAxLjIyQTEyLjIxIDEyLjIxIDAgMCAwIDE2LjI3IDIwQzI1IDE1LjE3IDI0LjIgNS44";
t.characters = t.characters + add;
return { part: 75, addLen: add.length, len: t.characters.length, expect: 38000 };
