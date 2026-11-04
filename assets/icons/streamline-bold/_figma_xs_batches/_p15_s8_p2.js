const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "MS4wMDAwMXYxMi44NzQxYzAgMC41NTIzIC0wLjQ0NzcgMSAtMSAxaC03LjY1MDFjLTAuNTUyMyAwIC0xIC0wLjQ0NzcgLTEgLTF6bTcuNjUwMSAxdjIuMjkxNGgtNS42NTAxdi0yLjI5MTR6bTAgNC4yOTE0aC01LjY1MDF2Mi4yOTEzaDUuNjUwMXptLTUuNjUwMSA2LjU4Mjd2LTIuMjkxNGg1LjY1MDF2Mi4yOTE0elwiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL2ZpbGVzL2ZpbGUucGRmIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIlBkZi1SZWFk";
t.characters = t.characters + add;
return { step: 8, part: 2, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
