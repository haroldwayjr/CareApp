
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

const BATCH = [{"setName":"icon/actions/share.alt","name":"share-alt","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Share-3--Streamline-Ultimate\">\n  <desc>\n    Share 3 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M12.76 10.25a2.64 2.64 0 0 0 -2.51 1.83 2 2 0 0 1 -3.59 0.5 7.25 7.25 0 0 1 -1.16 -4 6.81 6.81 0 0 1 0.18 -1.57 0.31 0.31 0 0 0 0 -0.21 0.25 0.25 0 0 0 -0.2 -0.09H2a2 2 0 0 0 -2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2 -2V10.5a0.25 0.25 0 0 0 -0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19.37 0.41a0.51 0.51 0 0 0 -0.55 -0.13 0.51 0.51 0 0 0 -0.32 0.47V2.5a0.25 0.25 0 0 1 -0.25 0.25h-5.37A5.88 5.88 0 0 0 7 8.62a5.74 5.74 0 0 0 0.92 3.14 0.51 0.51 0 0 0 0.9 -0.12 4.15 4.15 0 0 1 3.94 -2.89h5.49a0.25 0.25 0 0 1 0.25 0.25v1.75a0.51 0.51 0 0 0 0.32 0.47 0.5 0.5 0 0 0 0.55 -0.14l4.5 -5a0.5 0.5 0 0 0 0 -0.67Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

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
