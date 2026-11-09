const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "NmEwLjI5IDAuMjkgMCAwIDEgLTAuMDcgLTAuMThWNy43NWExLjUgMS41IDAgMCAwIC0xLjUgLTEuNUg3Ljc3YTAuMjkgMC4yOSAwIDAgMSAtMC4xOCAtMC4wN0wxLjcxIDAuMjlBMSAxIDAgMCAwIDAuNDQgMC4xN0wwLjI5IDAuMjlhMSAxIDAgMCAwIDAgMS40MmwyMiAyMmExIDEgMCAwIDAgMS40MiAtMS40MlpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gIDwvZz5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9taXNjL2FsYXJtIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJBbGFybS1DbG9jay0xLS1TdHJlYW1saW5l";
t.characters = t.characters + add;
return { part: 37, addLen: add.length, len: t.characters.length, expect: 19000 };
