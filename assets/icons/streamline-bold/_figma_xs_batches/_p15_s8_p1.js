const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_15");
if (!t) return { error: "missing-payload" };
const add = "Mi4xMjMgMS41MjU2NUg3LjMwMDAyYy0wLjkxMTI4IDAgLTEuODA4MjEgLTAuNTgxMTYgLTIuMTIzMDQgLTEuNTI1NjVMNC4yOTIxOCAySDIuMjVDMS4wMzU3OSAyIDAgMy4wMzU3OSAwIDQuMjV2MTcuNUMwIDIyLjk2NDIgMS4wMzU3OSAyNCAyLjI1IDI0aDEwLjY2MDdjLTAuMTcwMSAtMC4zMzc3IC0wLjI2NTkgLTAuNzE5MiAtMC4yNjU5IC0xLjEyMzJWMTAuMDAyN2MwIC0xLjM4MDczIDEuMTE5MyAtMi41MDAwMSAyLjUgLTIuNTAwMDFIMjFWNC4yNUMyMSAzLjAzNTc5IDE5Ljk2NDIgMiAxOC43NSAyaC0yLjA0MjJ6bS0xLjY3ODIgNS4zNDgzYzAgLTAuNTUyMyAwLjQ0NzcgLTEuMDAwMDEgMSAtMS4wMDAwMWg3LjY1MDFjMC41NTIzIDAgMSAwLjQ0NzcxIDEg";
t.characters = t.characters + add;
return { step: 8, part: 1, addLen: add.length, len: t.characters.length, head: add.slice(0,16), tail: add.slice(-16) };
