const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "LVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIEFsYXJtIENsb2NrIDEgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8cGF0aCBkPVwiTTE5LjA5IDAuMjVhNC44MiA0LjgyIDAgMCAwIC0yLjg5IDEgMC41MyAwLjUzIDAgMCAwIC0wLjIgMC4zNiAwLjQ3IDAuNDcgMCAwIDAgMC4xNSAwLjM5bDIuMzggMi4zOSAtMS4yOCAxLjA3YTguOTEgOC45MSAwIDAgMCAtMTAuNSAwTDUuNDcgNC4zNSA3Ljg1IDJBMC40NyAwLjQ3IDAgMCAwIDggMS41N2EwLjQ5IDAuNDkgMCAwIDAgLTAuMiAtMC4zNiA0LjgyIDQuODIgMCAwIDAgLTIuODkgLTFBNC45MSA0LjkxIDAgMCAwIDAgNS4xNmE0LjgyIDQuODIgMCAwIDAgMSAy";
t.characters = t.characters + add;
return { step: 4, part: 6, addLen: add.length, len: t.characters.length };
