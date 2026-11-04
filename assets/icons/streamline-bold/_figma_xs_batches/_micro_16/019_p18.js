const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_16");
if (!t) return { error: "missing-payload" };
const add = "MDAzMjcgMC4wMDA5IC0wLjAwNjUxIDAuMDAxIC0wLjAwOTc3IDAuMDAwNCAtMC4wMTY1MiAwLjAwMDQgLTAuMDMzMTUgMC4wMDE5IC0wLjA0OThsMC4wMTE3IC0wLjA3NjE3YzAuMDAyNiAtMC4wMTMyNCAwLjAwNjYgLTAuMDI2MDUgMC4wMDk4IC0wLjAzOTA3IDAuMDA3NSAtMC4wMjk1NSAwLjAxNjYgLTAuMDU4MTEgMC4wMjc0IC0wLjA4NTkzIDAuMDg5MiAtMC4yMzI3NyAwLjI5MDEgLTAuNDE2ODIgMC41NTI3IC0wLjQ2ODc1IDIuNDQzMiAtMC40ODI0OSA0LjQxNzUgLTIuNDQ0MjQgNC45MTAxIC00LjkwOTE4NEMxNy4wODQ3IDAuMjUyOTY1IDE3LjM5MjUgMC4wMDAxMjY5ODEgMTcuNzUgME03Ljg3NSAxMC4wMjgzYy0wLjQxNDE5IDAgLTAuNzQ5OTcgMC4z";
t.characters = t.characters + add;
return { part: 18, addLen: add.length, len: t.characters.length, expect: 9500 };
