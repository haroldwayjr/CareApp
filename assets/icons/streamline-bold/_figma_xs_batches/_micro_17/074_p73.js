const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "NlYxMS41YTAuNSAwLjUgMCAwIDEgMC41IC0wLjUgMC41IDAuNSAwIDAgMSAwLjUgMC41djMuODljMC41NSAtMC4xMyAwLjkxIC0wLjQ2IDAuOTEgLTAuNzZWMTEuNWEwLjUgMC41IDAgMCAxIDAuNSAtMC41IDAuNSAwLjUgMCAwIDEgMC41IDAuNXYzLjEzQTIgMiAwIDAgMSAxMCAxNi40MXY0YTAuNSAwLjUgMCAwIDEgLTAuNSAwLjUgMC41MSAwLjUxIDAgMCAxIC0wLjUgLTAuNXYtNGEyIDIgMCAwIDEgLTEuOSAtMS43OFpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG48L3N2Zz4ifSwgeyJzZXROYW1lIjogImljb24vbWlzYy9iaWtlIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdc";
t.characters = t.characters + add;
return { part: 73, addLen: add.length, len: t.characters.length, expect: 37000 };
