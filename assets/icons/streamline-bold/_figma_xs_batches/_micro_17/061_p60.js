const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_17");
if (!t) return { error: "missing-payload" };
const add = "IDAgMCAwLjU5IC0xLjI0TTEyIDEyLjVhNC43MSA0LjcxIDAgMCAxIDMuMzIgMS4yMiAwLjI1IDAuMjUgMCAwIDEgLTAuMDkgMC40MWwtMy4xNCAxLjI1YTAuMTkgMC4xOSAwIDAgMSAtMC4xOCAwbC0zLjE0IC0xLjI1YTAuMjUgMC4yNSAwIDAgMSAtMC4wOCAtMC40MUE0LjYyIDQuNjIgMCAwIDEgMTIgMTIuNVwiIGZpbGw9XCIjMDAwMDAwXCIgc3Ryb2tlLXdpZHRoPVwiMVwiPjwvcGF0aD5cbjwvc3ZnPiJ9LCB7InNldE5hbWUiOiAiaWNvbi9taXNjL3dlYXRoZXIiLCAic3ZnIjogIjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBpZD1cIldlYXRoZXItUmFpbi0tU3RyZWFtbGluZS1VbHRpbWF0";
t.characters = t.characters + add;
return { part: 60, addLen: add.length, len: t.characters.length, expect: 30500 };
