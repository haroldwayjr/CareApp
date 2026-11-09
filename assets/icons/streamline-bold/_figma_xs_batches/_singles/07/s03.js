
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

const BATCH = [{"setName":"icon/misc/bluetooth","name":"bluetooth","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Bluetooth--Streamline-Ultimate\">\n  <desc>\n    Bluetooth Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M3.67 11.1H1a1 1 0 0 0 0 2h2.67a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 11.1h-2.67a1 1 0 0 0 0 2H23a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18 8.21a1 1 0 0 0 -0.4 -0.79L12.12 3.3a1 1 0 0 0 -1.6 0.8v5.27l-3.73 -3A1 1 0 1 0 5.55 8l5 3.93v0.16L5.51 16a1 1 0 0 0 1.24 1.57l3.77 -3v5.33a1 1 0 0 0 0.56 0.89 1 1 0 0 0 1 -0.09l5.5 -4.12a1 1 0 0 0 0 -1.59l-3.79 -3 3.79 -3a1 1 0 0 0 0.42 -0.78m-2.9 7.34a0.25 0.25 0 0 1 0.1 0.2 0.26 0.26 0 0 1 -0.1 0.2l-2.2 1.65a0.27 0.27 0 0 1 -0.26 0 0.26 0.26 0 0 1 -0.14 -0.22V14a0.26 0.26 0 0 1 0.41 -0.19Zm-2.19 -5.38a0.26 0.26 0 0 1 -0.41 -0.19V6.6a0.26 0.26 0 0 1 0.14 -0.22 0.27 0.27 0 0 1 0.26 0l2.2 1.65a0.24 0.24 0 0 1 0.1 0.19 0.25 0.25 0 0 1 -0.1 0.2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

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
