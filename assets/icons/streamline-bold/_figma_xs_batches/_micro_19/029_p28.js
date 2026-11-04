const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
const t = page.findOne(n => n.type === 'TEXT' && n.name === "__reapply_payload_19");
if (!t) return { error: "missing-payload" };
const add = "OC42NjMwOWMwLjE5MDQgLTAuMDAwMDEgMC4zNzgyIDAuMDQwNDEgMC41NTE3IDAuMTE4MTYgMC4xNzM2IDAuMDc3NzcgMC4zMjg4IDAuMTkxMiAwLjQ1NyAwLjMzMTA1IDAuMTI4MSAwLjEzOTc1IDAuMjI3NSAwLjMwMzc2IDAuMjkzIDAuNDgxNDUgMC4wNDgyIDAuMTMwNzUgMC4wNzc1IDAuMjY3NjQgMC4wODc5IDAuNDA2MjVoMi4yODEzYzAuMTk4OCAwLjAwMDEgMC4zODk2IDAuMDc5MSAwLjUzMDIgMC4yMTk3IDAuMTQwNiAwLjE0MDcgMC4yMTk4IDAuMzMxNSAwLjIxOTggMC41MzAzaC0wLjc1bDAuNzUgMC4wMDF2MC4wMjI0Yy0wLjAwMDIgMC4wMTI4IC0wLjAwMDUgMC4wMzA4IC0wLjAwMSAwLjA1MjggLTAuMDAxMSAwLjA0MzkgLTAuMDAzNiAwLjEwNTYg";
t.characters = t.characters + add;
return { part: 28, addLen: add.length, len: t.characters.length, expect: 14500 };
