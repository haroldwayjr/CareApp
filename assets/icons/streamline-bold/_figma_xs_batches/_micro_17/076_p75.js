const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "OXMtMi4yMDIzIDQuOTE4OCAtNC45MTg4IDQuOTE4OGMtMi43MTY2IDAgLTQuOTE4OSAtMi4yMDIyIC00LjkxODkgLTQuOTE4OCAwIC0xLjc2NzQgMC45MzIxIC0zLjMxNyAyLjMzMTUgLTQuMTg0MmwtMC40MTE2IC0xLjEzMDcgLTMuODgxMSA1Ljg2NzVjLTAuMTg1MiAwLjI4IC0wLjQ5ODQgMC40NDg0IC0wLjgzNDEgMC40NDg0SDkuNzczODJjLTAuNDYyMzggMi4yMzY2IC0yLjQ0MzMgMy45MTc4IC00LjgxNjkgMy45MTc4IC0yLjcxNjYgMCAtNC45MTg4MzQxIC0yLjIwMjIgLTQuOTE4ODM0MSAtNC45MTg4UzIuMjQwMzIgMTAuNDg5OCA0Ljk1NjkyIDEwLjQ4OThjMC42Njc4NCAwIDEuMzA0NiAwLjEzMzEgMS44ODUxOSAwLjM3NDJsMC44NDg5IC0xLjAzNzAz";
t.characters = t.characters + add;
return { part: 75, addLen: add.length, len: t.characters.length, expect: 38000 };
