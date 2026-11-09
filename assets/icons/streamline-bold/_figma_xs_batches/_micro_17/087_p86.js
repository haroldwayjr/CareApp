const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MiA0LjM0Wm0tMTAuMjczIDYuNzY4IDUuODUgLTIuMzU5djMuODM3YTAuNzk1IDAuNzk1IDAgMCAxIC0wLjM0NCAwLjY2OGMtMC44ODggMC41OTYgLTMuNDE3IDIuMDc0IC02LjY1IDIuMDc0IC0zLjIzNCAwIC01LjY0NyAtMS40OCAtNi40ODYgLTIuMDc0YTAuNzg3IDAuNzg3IDAgMCAxIC0wLjMyMyAtMC42NXYtMy44MTZsNS42NTQgMi4zMTRhMy4wNTUgMy4wNTUgMCAwIDAgMi4zIDAuMDA2WlwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuPC9zdmc+In1dOwpsZXQgb2s9MCwgbWlzc2luZz0wLCBmYWlsZWQ9MDsgY29uc3QgbWlzcz1bXSwgZmFpbD1bXTsKZm9yIChjb25zdCBpdGVtIG9mIEJBVENIKSB7CiAgY29u";
t.characters = t.characters + add;
return { part: 86, addLen: add.length, len: t.characters.length, expect: 43500 };
