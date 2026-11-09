
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

const BATCH = [{"setName":"icon/health/radiology","name":"radiology","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Radiology-Scan--Streamline-Ultimate\">\n  <desc>\n    Radiology Scan Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M22.5 0h-21A1.5 1.5 0 0 0 0 1.5v21A1.5 1.5 0 0 0 1.5 24h21a1.5 1.5 0 0 0 1.5 -1.5v-21A1.5 1.5 0 0 0 22.5 0m-2.22 9.7a1 1 0 0 1 -1.41 0.14 10.51 10.51 0 0 0 -5.31 -2 0.5 0.5 0 0 0 -0.56 0.49v1.49a0.5 0.5 0 0 0 0.45 0.5 14.84 14.84 0 0 1 2.78 0.51 12.82 12.82 0 0 1 2 0.78 1 1 0 0 1 -0.44 1.89 1 1 0 0 1 -0.44 -0.1 10.7 10.7 0 0 0 -1.7 -0.65 13.13 13.13 0 0 0 -2.11 -0.41 0.49 0.49 0 0 0 -0.39 0.12 0.5 0.5 0 0 0 -0.17 0.38v1.23a0.5 0.5 0 0 0 0.46 0.5 14.88 14.88 0 0 1 2.77 0.51A1 1 0 0 1 16 17a0.9 0.9 0 0 1 -0.28 0 13.25 13.25 0 0 0 -2.12 -0.41 0.47 0.47 0 0 0 -0.38 0.12 0.5 0.5 0 0 0 -0.17 0.38v2.66a1 1 0 0 1 -2 0v-2.66a0.5 0.5 0 0 0 -0.17 -0.38 0.47 0.47 0 0 0 -0.38 -0.12 13.25 13.25 0 0 0 -2.17 0.41 1 1 0 1 1 -0.56 -1.92 14.88 14.88 0 0 1 2.77 -0.51 0.5 0.5 0 0 0 0.46 -0.5v-1.23a0.5 0.5 0 0 0 -0.17 -0.38 0.49 0.49 0 0 0 -0.39 -0.12 13.13 13.13 0 0 0 -2.11 0.41 10.7 10.7 0 0 0 -1.7 0.65 1 1 0 1 1 -0.88 -1.79 12.82 12.82 0 0 1 2 -0.78 14.88 14.88 0 0 1 2.77 -0.51 0.5 0.5 0 0 0 0.46 -0.5V8.33a0.5 0.5 0 0 0 -0.56 -0.49 10.51 10.51 0 0 0 -5.31 2 1 1 0 0 1 -1.39 -0.14 1 1 0 0 1 0.15 -1.41 12.51 12.51 0 0 1 6.68 -2.47 0.5 0.5 0 0 0 0.45 -0.5V3.75a1 1 0 0 1 2 0v1.57a0.5 0.5 0 0 0 0.45 0.5 12.51 12.51 0 0 1 6.68 2.47 1 1 0 0 1 0.15 1.41\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];

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
