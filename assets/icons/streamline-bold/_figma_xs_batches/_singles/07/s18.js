
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

const BATCH = [{"setName":"icon/status/badge","name":"badge","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-Badge--Streamline-Ultimate\">\n  <desc>\n    Check Badge Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m22.72 10.35 -1.84 -1.48a1.09 1.09 0 0 1 -0.4 -1l0.25 -2.34a2.09 2.09 0 0 0 -2.3 -2.31l-2.35 0.25a1.09 1.09 0 0 1 -1 -0.4l-1.45 -1.81a2.16 2.16 0 0 0 -3.26 0L8.89 3.1a1.09 1.09 0 0 1 -1 0.4l-2.32 -0.25a2.09 2.09 0 0 0 -2.3 2.31l0.25 2.34a1.09 1.09 0 0 1 -0.4 1l-1.84 1.45a2.09 2.09 0 0 0 0 3.26l1.84 1.48a1.1 1.1 0 0 1 0.4 1l-0.25 2.35a2.07 2.07 0 0 0 0.6 1.7 2 2 0 0 0 1.7 0.6l2.35 -0.25a1.09 1.09 0 0 1 1 0.4l1.48 1.84a2.09 2.09 0 0 0 3.26 0l1.48 -1.84a1.09 1.09 0 0 1 1 -0.4l2.35 0.25a2 2 0 0 0 1.7 -0.6 2.07 2.07 0 0 0 0.6 -1.7l-0.25 -2.35a1.1 1.1 0 0 1 0.4 -1l1.84 -1.48a2.09 2.09 0 0 0 0 -3.26Zm-10.32 4.7a1.79 1.79 0 0 1 -2.67 0.19L7.29 12.8a1 1 0 1 1 1.42 -1.42L11 13.63l3.91 -5.21a1 1 0 0 1 1.6 1.2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];

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
