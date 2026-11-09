const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_18");
if (!t) return { error: "missing-payload" };
const add = "Zy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIlNjYW5uZXItLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgU2Nhbm5lciBTdHJlYW1saW5lIEljb246IGh0dHBzOi8vc3RyZWFtbGluZWhxLmNvbVxuICA8L2Rlc2M+XG4gIDxnPlxuICAgIDxwYXRoIGQ9XCJNMC4zMyAyMGEwLjI1IDAuMjUgMCAwIDAgLTAuMTkgMC4wOSAwLjI4IDAuMjggMCAwIDAgLTAuMDUgMC4yQzAuNDYgMjIuNTkgMi40NSAyNCA1LjUgMjRoMTNjMy4wNSAwIDUgLTEuNDEgNS40MSAtMy43MWEwLjI4IDAuMjggMCAwIDAgLTAuMDUgLTAuMiAwLjI1IDAuMjUgMCAwIDAgLTAuMTkgLTAuMDlabTE5LjE3IDFhMC43NSAwLjc1IDAgMSAxIC0wLjc1IDAu";
t.characters = t.characters + add;
return { part: 58, addLen: add.length, len: t.characters.length, expect: 29500 };
