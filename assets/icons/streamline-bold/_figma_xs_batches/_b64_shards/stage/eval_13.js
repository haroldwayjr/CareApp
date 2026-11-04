const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const keys = ["__sb13_0", "__sb13_1", "__sb13_2", "__sb13_3", "__sb13_4", "__sb13_5", "__sb13_6", "__sb13_7", "__sb13_8"];
const parts = [];
const removed = [];
for (const name of keys) {
  const t = page.findOne(n => n.type === "TEXT" && n.name === name);
  if (!t) return { error: "missing shard", name };
  parts.push(t.characters);
  removed.push(t.id);
  t.remove();
}
const src = atob(parts.join(""));
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const result = await new AsyncFunction(src)();
return { ...result, shards: keys.length, removed };