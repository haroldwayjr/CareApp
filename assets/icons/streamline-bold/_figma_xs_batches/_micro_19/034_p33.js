const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "MDQgLTAuMDAwOTcgLTAuMDUyOHYtMC4wMjI0bDAuNzUgLTAuMDAxaC0wLjc1YzAgLTAuMTk4OCAwLjA3OTE2IC0wLjM4OTYgMC4yMTk3MiAtMC41MzAzIDAuMTQwNiAtMC4xNDA2IDAuMzMxNDUgLTAuMjE5NiAwLjUzMDI4IC0wLjIxOTdINi41NzUyYzAuMDEwNjMgLTAuMTM4NjIgMC4wNDA2NyAtMC4yNzU0NSAwLjA4ODg2IC0wLjQwNjI1IDAuMDY1NDcgLTAuMTc3NjMgMC4xNjM5NyAtMC4zNDE3MyAwLjI5MTk5IC0wLjQ4MTQ1IDAuMTI4MjIgLTAuMTM5OCAwLjI4MzU1IC0wLjI1MzI4IDAuNDU3MDQgLTAuMzMxMDUgMC4xNzM2OSAtMC4wNzc4MiAwLjM2MjE1IC0wLjExODIzIDAuNTUyNzMgLTAuMTE4MTZ6TTIxLjUgMC4wMDI5Mjk2OWMxLjM4MDcgMCAyLjUg";
t.characters = t.characters + add;
return { part: 33, addLen: add.length, len: t.characters.length, expect: 17000 };
