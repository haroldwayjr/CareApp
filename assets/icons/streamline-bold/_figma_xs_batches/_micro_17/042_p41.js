const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "OSAwIDAgMSAwLjU4IDAuMjJsMSAxLjY2YTEgMSAwIDAgMCAxLjczIC0xbC0xIC0xLjY2YTAuNTIgMC41MiAwIDAgMSAwLjEgLTAuNjIgNC4xNiA0LjE2IDAgMCAwIDAuNDIgLTAuNDIgMC41MiAwLjUyIDAgMCAxIDAuNjIgLTAuMWwxLjY2IDFhMSAxIDAgMCAwIDAuNSAwLjEzIDEgMSAwIDAgMCAwLjg2IC0wLjUgMSAxIDAgMCAwIC0wLjM2IC0xLjM2bC0xLjY2IC0xYTAuNDggMC40OCAwIDAgMSAtMC4yMiAtMC41OCA1LjQ3IDUuNDcgMCAwIDAgMC4xNSAtMC41OCAwLjQ5IDAuNDkgMCAwIDEgMC40OSAtMC4zOWgxLjkxYTEgMSAwIDAgMCAwIC0ybS0xMC4yNSA0LjVhMiAyIDAgMSAxIDIgLTIgMiAyIDAgMCAxIC0yIDJtMyAtNWExIDEgMCAxIDEgMSAtMSAxIDEg";
t.characters = t.characters + add;
return { part: 41, addLen: add.length, len: t.characters.length, expect: 21000 };
