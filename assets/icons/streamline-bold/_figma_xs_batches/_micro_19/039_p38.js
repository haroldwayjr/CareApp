const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgaWQ9XCJDYWtlLUZsb3VyLS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIENha2UgRmxvdXIgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8Zz5cbiAgICA8cGF0aCBkPVwiTTE4IDEwLjVhNC41MSA0LjUxIDAgMCAxIC0yLjcgLTAuOSAwLjQ4IDAuNDggMCAwIDAgLTAuNiAwIDQuNSA0LjUgMCAwIDEgLTUuNCAwIDAuNDggMC40OCAwIDAgMCAtMC42IDAgNC41MSA0LjUxIDAgMCAxIC0yLjcgMC45IDQuNDQgNC40NCAwIDAgMSAtMS4zMiAtMC4yIDAuNTIgMC41MiAwIDAg";
t.characters = t.characters + add;
return { part: 38, addLen: add.length, len: t.characters.length, expect: 19500 };
