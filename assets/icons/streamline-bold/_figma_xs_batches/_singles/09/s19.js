
const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const collections = await figma.variables.getLocalVariableCollectionsAsync();
let iconDefault = null;
for (const coll of collections) {
  for (const id of coll.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v && v.name === 'icon/default') iconDefault = v;
  }
}
function bindFills(root) {
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    if ('constraints' in n) n.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    if (n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION' || n.type === 'ELLIPSE' || n.type === 'STAR' || n.type === 'POLYGON') {
      const paint = figma.variables.setBoundVariableForPaint(
        { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', iconDefault);
      n.fills = [paint];
      n.strokes = [];
    }
    if ('children' in n) for (const c of n.children) stack.push(c);
  }
}
function applyBoldXs(set, svg) {
  const xs = set.children.find(c => c.name === 'Size=xs');
  const md = set.children.find(c => c.name === 'Size=md');
  if (!xs) return { ok: false, reason: 'no-xs' };
  xs.visible = true;
  for (const c of [...xs.children]) c.remove();
  const node = figma.createNodeFromSvg(svg);
  node.name = set.name.split('/').pop();
  node.resize(16, 16);
  node.x = 0; node.y = 0;
  node.clipsContent = false;
  if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
  xs.appendChild(node);
  try { xs.resizeWithoutConstraints(16, 16); } catch (_) { try { xs.resize(16, 16); } catch (__) {} }
  bindFills(node);
  xs.clipsContent = false;
  xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}

const BATCH = [{"setName":"icon/files/tag","name":"tag","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Tag-New--Streamline-Ultimate\">\n  <desc>\n    Tag New Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M1 4.5h22a1 1 0 0 0 0 -2H1a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 19.5H1a1 1 0 0 0 0 2h22a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.71 8.5v1.7a0.26 0.26 0 0 1 -0.19 0.25 0.28 0.28 0 0 1 -0.29 -0.13L4.1 8.05a1 1 0 0 0 -1.89 0.45v7a1 1 0 0 0 2 0v-1.7a0.26 0.26 0 0 1 0.19 -0.25 0.26 0.26 0 0 1 0.28 0.13L5.81 16a1 1 0 0 0 0.9 0.55l0.23 0a1 1 0 0 0 0.77 -1v-7a1 1 0 0 0 -2 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.38 9.5h2.33a1 1 0 0 0 0 -2h-2.33a2.17 2.17 0 0 0 -2.17 2.17v4.66a2.17 2.17 0 0 0 2.17 2.17h2.33a1 1 0 0 0 0 -2h-2.33a0.16 0.16 0 0 1 -0.17 -0.17v-1.08a0.25 0.25 0 0 1 0.25 -0.25h1.08a1 1 0 0 0 0 -2h-1.08a0.25 0.25 0 0 1 -0.25 -0.25V9.67a0.16 0.16 0 0 1 0.17 -0.17\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m20.29 8.43 -0.2 2.91a0.14 0.14 0 0 1 -0.1 0.11 0.13 0.13 0 0 1 -0.14 -0.06 1 1 0 0 0 -1.79 0 0.11 0.11 0 0 1 -0.13 0.06 0.11 0.11 0 0 1 -0.1 -0.11l-0.21 -2.91a1 1 0 1 0 -2 0.14l0.5 7A1 1 0 0 0 18 16l0.71 -1.43a0.25 0.25 0 0 1 0.23 -0.14 0.24 0.24 0 0 1 0.22 0.14L19.9 16a1 1 0 0 0 0.89 0.55l0.2 0a1 1 0 0 0 0.8 -0.91l0.5 -7a1 1 0 1 0 -2 -0.14Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

let ok = 0, missing = 0, failed = 0;
const miss = [], fail = [];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length < 5) miss.push(item.setName); continue; }
  try {
    const r = applyBoldXs(set, item.svg);
    if (r.ok) ok++; else { failed++; fail.push({ name: item.setName, r }); }
  } catch (e) {
    failed++;
    if (fail.length < 5) fail.push({ name: item.setName, err: String(e) });
  }
}
return { ok, missing, failed, miss, fail };
