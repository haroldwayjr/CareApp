
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

const BATCH = [{"setName":"icon/health/pediatric","name":"pediatric","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Baby--Streamline-Ultimate\">\n  <desc>\n    Baby Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M10.55 11.78a1 1 0 0 0 -1 -1 1 1 0 0 0 -1 0.73 0.52 0.52 0 0 1 -0.51 0.4 0.52 0.52 0 0 1 -0.51 -0.38 1 1 0 0 0 -2 0.28A2.28 2.28 0 0 0 8 13.91a2.27 2.27 0 0 0 2.55 -2.13\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.38 10.78a1 1 0 0 0 -1 0.72 0.53 0.53 0 0 1 -1 0 1 1 0 0 0 -1 -0.73 1 1 0 0 0 -1 1 2.27 2.27 0 0 0 2.46 2.1 2.28 2.28 0 0 0 2.47 -2.1 1 1 0 0 0 -0.93 -0.99\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.81 16.3a1 1 0 0 0 -1.37 0.35 1.86 1.86 0 0 1 -1.44 0.49 1.86 1.86 0 0 1 -1.44 -0.49 1 1 0 1 0 -1.72 1A3.6 3.6 0 0 0 12 19.14a3.6 3.6 0 0 0 3.16 -1.47 1 1 0 0 0 -0.35 -1.37\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.57 9.93a1 1 0 0 1 -0.38 -0.58A10.57 10.57 0 0 0 12 1 10.57 10.57 0 0 0 1.81 9.35a1 1 0 0 1 -0.38 0.58 3.5 3.5 0 0 0 0.48 5.94 0.94 0.94 0 0 1 0.46 0.5A10.51 10.51 0 0 0 12 23a10.51 10.51 0 0 0 9.63 -6.63 0.94 0.94 0 0 1 0.46 -0.5 3.5 3.5 0 0 0 0.48 -5.94m-1.77 4.29a1 1 0 0 0 -0.76 0.67A8.46 8.46 0 0 1 12 21a8.46 8.46 0 0 1 -8 -6.11 1 1 0 0 0 -0.76 -0.67A1.5 1.5 0 0 1 3 11.34a1 1 0 0 0 0.64 -0.78A8.64 8.64 0 0 1 12 3a1.5 1.5 0 0 1 1.45 1.34 1 1 0 0 1 -0.89 1.09 0.58 0.58 0 0 1 -0.65 -0.61 1 1 0 1 0 -2 -0.44 2.52 2.52 0 0 0 0.9 2.47 2.8 2.8 0 0 0 3.92 -0.51 2.94 2.94 0 0 0 0.66 -2.15 0.26 0.26 0 0 1 0.16 -0.19 0.25 0.25 0 0 1 0.25 0 9 9 0 0 1 4.59 6.62 1 1 0 0 0 0.64 0.78 1.5 1.5 0 0 1 -0.23 2.88Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

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
