
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

const BATCH = [{"setName":"icon/actions/erase","name":"erase","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Eraser--Streamline-Ultimate\">\n  <desc>\n    Eraser Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M11 21.66H1a1 1 0 0 0 0 2h10a1 1 0 0 0 0 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.51 6.43 14.86 0.78a1.49 1.49 0 0 0 -2.12 0L5 8.54A1 1 0 0 0 5 10l6.36 6.37a1 1 0 0 0 1.41 0l7.76 -7.76a1.5 1.5 0 0 0 -0.02 -2.18Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1.8 19.11a1.75 1.75 0 0 0 1.2 0.55h4.66a1.84 1.84 0 0 0 1.22 -0.53l1 -1.13a0.5 0.5 0 0 0 0 -0.69L4.1 11.59a0.52 0.52 0 0 0 -0.71 0l-2.65 2.7a2.59 2.59 0 0 0 0 3.6Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16.5 21.66h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 21.66h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

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
