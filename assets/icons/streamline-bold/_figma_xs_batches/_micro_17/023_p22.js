const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "dHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8Zz5cbiAgICA8cGF0aCBkPVwiTTIwLjE1IDRhMC41IDAuNSAwIDAgMSAtMC40IC0wLjQ5VjJhMiAyIDAgMCAwIC0yIC0ySDUuMjVhMyAzIDAgMCAwIC0zIDN2MThhMyAzIDAgMCAwIDMgM2gxNC41YTIgMiAwIDAgMCAyIC0yVjZhMiAyIDAgMCAwIC0xLjYgLTJtLTMuNDkgOC4xMmMwIDEuMzggLTEuNTkgNC4xMyAtNC4yNSA3LjM2YTAuNTMgMC41MyAwIDAgMSAtMC40MSAwLjE5IDAuNTEgMC41MSAwIDAgMSAtMC40IC0wLjE5Yy0yLjY3IC0zLjIzIC00LjI2IC02IC00LjI2IC03LjM2YTQuNjYgNC42NiAwIDAgMSA5LjMyIDBtMS4wOSAtOC40MWEwLjI1IDAuMjUgMCAwIDEgLTAuMjUgMC4yOUg1";
t.characters = t.characters + add;
return { part: 22, addLen: add.length, len: t.characters.length, expect: 11500 };
