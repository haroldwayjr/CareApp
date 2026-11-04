const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "LTAuMDA3OCAwLjE4MjYgLTAuMDA4NSAwLjE1NCAtMC4wMjU3IDAuMzcwNiAtMC4wNTg2IDAuNjI4OSAtMC4wNjU1IDAuNTEyOCAtMC4xOTY5IDEuMjEwMyAtMC40Njc4IDEuOTE4IC0wLjI2OTkgMC43MDUgLTAuNjkyNiAxLjQ1OTYgLTEuMzYxMyAyLjA0MiAtMC42ODM2IDAuNTk1MiAtMS41ODc0IDAuOTc2NSAtMi43MzgzIDAuOTc2NWgtMC4zNDE4Yy0wLjAxNjIgMC4wMTc5IC0wLjAzMTcgMC4wMzYyIC0wLjA0NzkgMC4wNTM3IC0wLjIzMzUgMC4yNTI3IC0wLjQ2MzEgMC40NjExIC0wLjY2NSAwLjY0MDcgLTAuMjA4MSAwLjE4NSAtMC4zNzI4IDAuMzI4OCAtMC41MTI3IDAuNDc2NSAtMC4yNTM0IDAuMjY3NSAtMC4zODk1IDAuNTA5MyAtMC4zODk2IDAuOTE2";
t.characters = t.characters + add;
return { part: 29, addLen: add.length, len: t.characters.length, expect: 15000 };
