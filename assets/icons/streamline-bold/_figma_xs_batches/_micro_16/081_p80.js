const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "NWMtMC4yOTM1IC0wLjI4OTQyIC0wLjc2NTUgLTAuMjg3NzggLTEuMDU3IDAuMDAzNjdsLTAuNzYxNiAwLjc2MTY0elwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuPC9zdmc+In1dOwpsZXQgb2s9MCwgbWlzc2luZz0wLCBmYWlsZWQ9MDsgY29uc3QgbWlzcz1bXSwgZmFpbD1bXTsKZm9yIChjb25zdCBpdGVtIG9mIEJBVENIKSB7CiAgY29uc3Qgc2V0ID0gcGFnZS5maW5kT25lKG4gPT4gbi50eXBlID09PSAnQ09NUE9ORU5UX1NFVCcgJiYgbi5uYW1lID09PSBpdGVtLnNldE5hbWUpOwogIGlmICghc2V0KSB7IG1pc3NpbmcrKzsgaWYgKG1pc3MubGVuZ3RoPDgpIG1pc3MucHVzaChpdGVtLnNldE5hbWUpOyBjb250";
t.characters = t.characters + add;
return { part: 80, addLen: add.length, len: t.characters.length, expect: 40500 };
