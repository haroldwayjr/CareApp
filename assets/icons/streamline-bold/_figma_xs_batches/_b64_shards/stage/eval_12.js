const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const keys = ["__sb12_0", "__sb12_1", "__sb12_2", "__sb12_3", "__sb12_4", "__sb12_5", "__sb12_6", "__sb12_7", "__sb12_8"];
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