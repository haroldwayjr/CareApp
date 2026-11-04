const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "MS4xMTkgLTEuNDgyMjkgMS45MTc4IC0yLjc0MjY2IDEuOTE3OCAtMS42MTIwMyAwIC0yLjkxODgzIC0xLjMwNjggLTIuOTE4ODMgLTIuOTE4OCAwIC0xLjYxMjEgMS4zMDY4IC0yLjkxODkgMi45MTg4MyAtMi45MTg5IDAuMTc2NDQgMCAwLjM0OTIyIDAuMDE1NyAwLjUxNzA0IDAuMDQ1N1wiIGNsaXAtcnVsZT1cImV2ZW5vZGRcIiBzdHJva2Utd2lkdGg9XCIxXCI+PC9wYXRoPlxuPC9zdmc+In0sIHsic2V0TmFtZSI6ICJpY29uL21pc2Mvb2ZmaWNlIiwgInN2ZyI6ICI8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIk9mZmljZS1GaWxlLVRleHQtLVN0cmVhbWxp";
t.characters = t.characters + add;
return { part: 79, addLen: add.length, len: t.characters.length, expect: 40000 };
