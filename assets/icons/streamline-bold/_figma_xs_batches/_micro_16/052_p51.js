const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "NTM1MTZjLTQuMjA0ODEgMC4zNzg5OCAtNy41IDMuOTExMzUgLTcuNSA4LjIxNDg0djAuNWMwIDAuNDE0MiAwLjMzNTc5IDAuNzUgMC43NSAwLjc1czAuNzUgLTAuMzM1OCAwLjc1IC0wLjc1YzAgLTAuMjY2NyAwLjMzODkxIC0wLjc1IDEuMTI1IC0wLjc1IDAuNjg4MDQgMCAxLjAzMjk0IDAuMzcwNCAxLjEwODQgMC42NDE2TDcuNSAxM2wwLjAwMzkxIDAuMDc3MWMwLjAzODYyIDAuMzc4IDAuMzU3OTMgMC42NzI5IDAuNzQ2MDkgMC42NzI5IDAuMzg4MTMgMCAwLjcwNzQ4IC0wLjI5NDkgMC43NDYwOSAtMC42NzI5TDkgMTNjMCAtMC4yNjY3IDAuMzM4ODEgLTAuNzUgMS4xMjUgLTAuNzUgMC43ODYxIDAgMS4xMjUgMC40ODMzIDEuMTI1IDAuNzV2NS4yNWMwIDAu";
t.characters = t.characters + add;
return { part: 51, addLen: add.length, len: t.characters.length, expect: 26000 };
