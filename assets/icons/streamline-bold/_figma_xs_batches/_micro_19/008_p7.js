const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MjQxNiAtMC4zMzI3NiAtMC40MDcgLTAuNDU0OXMtMC4zNTQxIC0wLjIwODk3IC0wLjU1NDUgLTAuMjU1MWMtMC4yMDAzIC0wLjA0NjE0IC0wLjQwOCAtMC4wNTA1OSAtMC42MTAyIC0wLjAxMzA4cy0wLjM5NDQgMC4xMTYxOCAtMC41NjQ5IDAuMjMxMTJsLTEuMDcgMC42MWMtMC4wMzUgMC4wMjAxOSAtMC4wNzQ2IDAuMDMwODIgLTAuMTE1IDAuMDMwODJzLTAuMDggLTAuMDEwNjMgLTAuMTE1IC0wLjAzMDgyYy0wLjAzMzMgLTAuMDE1MyAtMC4wNjMgLTAuMDM3NDYgLTAuMDg3MSAtMC4wNjUwMyAtMC4wMjQxIC0wLjAyNzU4IC0wLjA0MjIgLTAuMDU5OTQgLTAuMDUyOSAtMC4wOTQ5N2wtMC40IC0yLjM5Yy0wLjExNzIgLTAuNzA4MDQgLTAuNDg0MyAtMS4zNTA2";
t.characters = t.characters + add;
return { part: 7, addLen: add.length, len: t.characters.length, expect: 4000 };
