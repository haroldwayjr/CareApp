const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "IDAuNDM5NiAtMC4wMDAwOCAwLjgwNDggLTAuMzM1MzYgMC44NDg3IC0wLjc2OTUzbDAuMDA0OCAtMC4wODc4OXYtMC4yNjc1OGwtMC4wMDQ4IC0wLjA4ODg3Yy0wLjA0NDIgLTAuNDMzODIgLTAuNDA5MyAtMC43Njk0NSAtMC44NDg3IC0wLjc2OTUzXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9hY3Rpb25zL2NoZWNrLmNpcmNsZSIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiQ2hlY2stQ2lyY2xlLTEtLVN0cmVhbWxpbmUtVWx0aW1hdGVcIj5cbiAgPGRlc2M+XG4gICAgQ2hlY2sgQ2lyY2xlIDEgU3RyZWFt";
t.characters = t.characters + add;
return { part: 74, addLen: add.length, len: t.characters.length, expect: 37500 };
