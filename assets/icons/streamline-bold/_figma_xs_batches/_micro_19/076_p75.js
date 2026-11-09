const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "bGluZSBJY29uOiBodHRwczovL3N0cmVhbWxpbmVocS5jb21cbiAgPC9kZXNjPlxuICA8cGF0aCBkPVwiTTEyIDBhMTIgMTIgMCAxIDAgMTIgMTJBMTIgMTIgMCAwIDAgMTIgMFptNi45MyA4LjIgLTYuODUgOS4yOWExIDEgMCAwIDEgLTEuNDMgMC4xOWwtNC44OSAtMy45MWExIDEgMCAwIDEgLTAuMTUgLTEuNDFBMSAxIDAgMCAxIDcgMTIuMjFsNC4wOCAzLjI2TDE3LjMyIDdhMSAxIDAgMCAxIDEuMzkgLTAuMjEgMSAxIDAgMCAxIDAuMjIgMS40MVpcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG48L3N2Zz4ifV07CmxldCBvaz0wLCBtaXNzaW5nPTAsIGZhaWxlZD0wOyBjb25zdCBtaXNzPVtdLCBmYWlsPVtdOwpmb3IgKGNv";
t.characters = t.characters + add;
return { part: 75, addLen: add.length, len: t.characters.length, expect: 38000 };
