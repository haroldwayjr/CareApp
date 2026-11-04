const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const keys = ["__sb14_0", "__sb14_1", "__sb14_2", "__sb14_3", "__sb14_4", "__sb14_5", "__sb14_6", "__sb14_7", "__sb14_8", "__sb14_9"];
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