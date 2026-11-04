
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

const BATCH = [{"setName":"icon/status/eye.off","name":"eye-off","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"View-Off--Streamline-Ultimate\">\n  <desc>\n    View Off Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.19 10.51a20.64 20.64 0 0 0 -4.3 -3.59l4 -4a0.91 0.91 0 0 0 -0.05 -1.34 0.87 0.87 0 0 0 -1.31 0L2 21.07a1 1 0 1 0 1.35 1.35l4.15 -4.15a10.85 10.85 0 0 0 4.61 0.94c4.25 0 8.49 -3 11 -5.8a2.16 2.16 0 0 0 0.08 -2.9m-6.88 2.72a4.59 4.59 0 0 1 -3 3 4.3 4.3 0 0 1 -3.1 -0.19 0.24 0.24 0 0 1 -0.06 -0.4l5.55 -5.56a0.25 0.25 0 0 1 0.41 0.06 4.3 4.3 0 0 1 0.2 3.09\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.61 13.36a0.24 0.24 0 0 0 0.07 -0.24A4 4 0 0 1 7.5 12 4.51 4.51 0 0 1 12 7.46a4 4 0 0 1 1.16 0.18 0.26 0.26 0 0 0 0.24 -0.06l1.95 -1.95a0.26 0.26 0 0 0 -0.11 -0.42 10.58 10.58 0 0 0 -3.24 -0.5c-4.3 0 -8.6 3 -11.19 5.8a2.16 2.16 0 0 0 0 2.9 21.36 21.36 0 0 0 3.43 3 0.26 0.26 0 0 0 0.33 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

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
