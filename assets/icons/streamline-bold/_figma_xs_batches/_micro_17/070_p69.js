const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "ZD1cIk0yNCAxMGExMCAxMCAwIDEgMCAtMTkgNC4zNiAwLjI0IDAuMjQgMCAwIDAgMC4yMyAwLjE0aDEuNTNhMC4yNyAwLjI3IDAgMCAwIDAuMjQgLTAuMDggMC4yNiAwLjI2IDAgMCAwIDAgLTAuMTlBMS43NyAxLjc3IDAgMCAxIDcgMTR2LTAuMDZhMC4zMSAwLjMxIDAgMCAwIDAgLTAuMTNBNy45IDcuOSAwIDAgMSA2IDEwYTggOCAwIDEgMSA4IDggMC4xOCAwLjE4IDAgMCAwIC0wLjE2IDAuMTEgMC4xNyAwLjE3IDAgMCAwIDAuMDYgMC4xOSAzLjkgMy45IDAgMCAxIDEuMiAxLjQ3IDAuMjYgMC4yNiAwIDAgMCAwLjI2IDAuMTRBMTAgMTAgMCAwIDAgMjQgMTBcIiBmaWxsPVwiIzAwMDAwMFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+XG4gICAgPHBhdGgg";
t.characters = t.characters + add;
return { part: 69, addLen: add.length, len: t.characters.length, expect: 35000 };
