
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

const BATCH = [{"setName":"icon/status/bell.off","name":"bell-off","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Alarm-Bell-Off-1--Streamline-Ultimate\">\n  <desc>\n    Alarm Bell Off 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M21 19.5a1 1 0 0 0 0 -2 1.5 1.5 0 0 1 -1.5 -1.5v-4.86a8.65 8.65 0 0 0 -0.4 -2.62l-11 11Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.24 21H9.76a0.25 0.25 0 0 0 -0.24 0.22 2.64 2.64 0 0 0 0 0.28 2.5 2.5 0 0 0 5 0 2.64 2.64 0 0 0 0 -0.28 0.25 0.25 0 0 0 -0.28 -0.22\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 24a1 1 0 0 0 0.71 -0.28l22 -22a1 1 0 0 0 0 -1.42 1 1 0 0 0 -1.42 0l-5 5A7.31 7.31 0 0 0 13 3.07V1a1 1 0 0 0 -2 0v2.07a8 8 0 0 0 -6.5 8.07V16A1.5 1.5 0 0 1 3 17.5a1 1 0 0 0 0 2h0.09l-2.8 2.79a1 1 0 0 0 0 1.42A1 1 0 0 0 1 24\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

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
