
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

const BATCH = [{"setName":"icon/status/shield","name":"shield","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Lock-Shield--Streamline-Ultimate\">\n  <desc>\n    Lock Shield Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M13.75 7.24a1.75 1.75 0 0 0 -3.5 0v1.5a0.25 0.25 0 0 0 0.25 0.26h3a0.25 0.25 0 0 0 0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M24 2a2 2 0 0 0 -2 -2H2a2 2 0 0 0 -2 2v7.31A15.13 15.13 0 0 0 11.86 24a0.68 0.68 0 0 0 0.2 0 0.71 0.71 0 0 0 0.2 0A15.14 15.14 0 0 0 24 9.2ZM7.5 15.49V10a1 1 0 0 1 1 -1h0.25V7.24a3.25 3.25 0 0 1 6.5 0V9h0.25a1 1 0 0 1 1 1v5.5a1 1 0 0 1 -1 1h-7a1 1 0 0 1 -1 -1.01\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.75 13.24a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

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
