const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const parts = [
  "NWMtMC4yOTM1IC0wLjI4OTQyIC0wLjc2NTUgLTAuMjg3NzggLTEuMDU3IDAuMDAzNjdsLTAuNzYxNiAwLjc2MTY0elwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuPC9zdmc+In1dOwpsZXQgb2s9MCwgbWlzc2luZz0wLCBmYWlsZWQ9MDsgY29uc3QgbWlzcz1bXSwgZmFpbD1bXTsKZm9yIChjb25zdCBpdGVtIG9mIEJBVENIKSB7CiAgY29uc3Qgc2V0ID0gcGFnZS5maW5kT25lKG4gPT4gbi50eXBlID09PSAnQ09NUE9ORU5UX1NFVCcgJiYgbi5uYW1lID09PSBpdGVtLnNldE5hbWUpOwogIGlmICghc2V0KSB7IG1pc3NpbmcrKzsgaWYgKG1pc3MubGVuZ3RoPDgpIG1pc3MucHVzaChpdGVtLnNldE5hbWUpOyBjb250",
  "aW51ZTsgfQogIHRyeSB7CiAgICBjb25zdCByID0gYXBwbHlCb2xkWHMoc2V0LCBpdGVtLnN2Zyk7CiAgICBpZiAoci5vaykgb2srKzsgZWxzZSB7IGZhaWxlZCsrOyBmYWlsLnB1c2goe25hbWU6aXRlbS5zZXROYW1lLHJ9KTsgfQogIH0gY2F0Y2goZSkgeyBmYWlsZWQrKzsgaWYgKGZhaWwubGVuZ3RoPDgpIGZhaWwucHVzaCh7bmFtZTppdGVtLnNldE5hbWUsZXJyOlN0cmluZyhlKX0pOyB9Cn0KcmV0dXJuIHsgb2ssIG1pc3NpbmcsIGZhaWxlZCwgbWlzcywgZmFpbCB9Owo=",
];
const add = parts.join("");
let h = 0; for (let i = 0; i < add.length; i++) h = ((h << 5) - h + add.charCodeAt(i)) | 0;
if (add.length !== 860 || h !== -796207983) return { error: "pack-corrupt", len: add.length, hash: h, wantLen: 860, wantHash: -796207983 };
t.characters = t.characters + add;
let fh = 0; const s = t.characters; for (let i = 0; i < s.length; i++) fh = ((fh << 5) - fh + s.charCodeAt(i)) | 0;
if (s.length !== 40860 || fh !== 730050320) return { error: "cum-corrupt", len: s.length, hash: fh, wantLen: 40860, wantHash: 730050320 };
return { pack: 10, len: s.length, hash: fh };
