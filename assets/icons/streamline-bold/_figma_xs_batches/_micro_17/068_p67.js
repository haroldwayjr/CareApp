const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "LjEzIC0wLjIxIDAuMjIgMC4yMiAwIDAgMCAtMC4xMSAtMC4yMiA1IDUgMCAwIDAgLTcuNzQgNC4xNCA1LjEzIDUuMTMgMCAwIDAgMC4zMyAxLjggMC4yNiAwLjI2IDAgMCAwIDAuMTggMC4xNiAwLjIzIDAuMjMgMCAwIDAgMC4yMiAtMC4wNiA3LjE5IDcuMTkgMCAwIDEgMS4yNSAtMC44NFwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbiAgPC9nPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL21pc2Mvd2luZCIsICJzdmciOiAiPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGlkPVwiV2luZC1XZXN0LS1TdHJlYW1saW5lLVVsdGltYXRlXCI+XG4gIDxk";
t.characters = t.characters + add;
return { part: 67, addLen: add.length, len: t.characters.length, expect: 34000 };
