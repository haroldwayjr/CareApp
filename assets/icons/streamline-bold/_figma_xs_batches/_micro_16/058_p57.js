const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "IjAgMCAyNCAyNFwiIGlkPVwiR2FzLVN0YXRpb24tLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgR2FzIFN0YXRpb24gU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8cGF0aCBmaWxsPVwiIzAwMDAwMFwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTIzLjgzMjEgMC40NDUzMDFjMC4zMDYzIDAuNDU5NTI5IDAuMTgyMSAxLjA4MDM5OSAtMC4yNzc0IDEuMzg2NzQ5bC0xLjIgMC44IC0wLjAxNzggMC4wMTE2MUMyMS41MzA3IDMuMTU2NjggMjEgNC4xMzU0NyAyMSA1LjF2MS41ODAwNWgwLjVjMC41NTIzIDAgMSAwLjQ0NzcyIDEgMSAwIDAuNTUyMjkgLTAuNDQ3NyAxIC0xIDFIMjFW";
t.characters = t.characters + add;
return { part: 57, addLen: add.length, len: t.characters.length, expect: 29000 };
