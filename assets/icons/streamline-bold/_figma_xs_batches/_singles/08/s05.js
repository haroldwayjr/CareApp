
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

const BATCH = [{"setName":"icon/files/blog","name":"blog","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Blogger-Logo--Streamline-Ultimate\">\n  <desc>\n    Blogger Logo Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M24 10.31a1.54 1.54 0 0 0 -0.66 -1.19L23.22 9c-0.3 -0.24 -0.77 -0.26 -1.58 -0.28a4 4 0 0 1 -1.53 -0.2 2.75 2.75 0 0 1 -0.42 -1.49l0 -0.18a6.17 6.17 0 0 0 -0.6 -2.41L19 4.27A8.51 8.51 0 0 0 12.89 0h-5.1A7.8 7.8 0 0 0 0 7.79v8.51a7.79 7.79 0 0 0 7.79 7.79h8.37A7.83 7.83 0 0 0 24 16.31l0 -5.9a0.34 0.34 0 0 0 0 -0.1M8 6h4a2 2 0 0 1 0 4H8a2 2 0 0 1 0 -4m8 12H8a2 2 0 0 1 0 -4h8a2 2 0 0 1 0 4\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];

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
