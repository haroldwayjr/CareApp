const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "IDJoMS43NEExLjQ4IDEuNDggMCAwIDAgMjQgNS45M1Y0YTEgMSAwIDAgMCAtMSAtMW0tNC41IDQuMzlhMSAxIDAgMSAxIDEgLTEgMSAxIDAgMCAxIC0xIDFcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGggZD1cIm0yMi4zIDE0IC0wLjk1IDFhMC40OCAwLjQ4IDAgMCAxIC0wLjM2IDAuMTUgMC41MSAwLjUxIDAgMCAxIC0wLjM2IC0wLjE1bC0xLjU4IC0xLjY4YTIuNTQgMi41NCAwIDAgMCAwLjI2IC0xLjEgMi41IDIuNSAwIDEgMCAtMi41IDIuNSAyLjM4IDIuMzggMCAwIDAgMC43IC0wLjExbDIgMi4xNGExLjkzIDEuOTMgMCAwIDAgMS4zNyAwLjYgMS45MiAxLjkyIDAgMCAwIDEuMzUgLTAuNTRsMS4zOSAt";
t.characters = t.characters + add;
return { part: 47, addLen: add.length, len: t.characters.length, expect: 24000 };
