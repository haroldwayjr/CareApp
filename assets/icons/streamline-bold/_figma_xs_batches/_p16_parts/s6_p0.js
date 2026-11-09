const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "aW5lLVVsdGltYXRlXCI+XG4gIDxkZXNjPlxuICAgIFJhaW4gVW1icmVsbGEgU3RyZWFtbGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8Zz5cbiAgICA8cGF0aCBkPVwiTTExLjMyIDE2LjlhMC4yNSAwLjI1IDAgMCAwIC0wLjIyIDAgMC4yNiAwLjI2IDAgMCAwIC0wLjEgMC4ydjQuMTFhMi43NSAyLjc1IDAgMCAwIDUuNSAwIDEgMSAwIDAgMCAtMiAwIDAuNzUgMC43NSAwIDAgMSAtMS41IDB2LTQuMDdhMC4yNiAwLjI2IDAgMCAwIC0wLjEgLTAuMiAwLjI1IDAuMjUgMCAwIDAgLTAuMjIgMCAyLjM2IDIuMzYgMCAwIDEgLTEuMzYgMFpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4g";
t.characters = t.characters + add;
return { step: 6, part: 0, addLen: add.length, len: t.characters.length };
