
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

const BATCH = [{"setName":"icon/misc/wifi.off","name":"wifi-off","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wifi-Off--Streamline-Ultimate\">\n  <desc>\n    Wifi Off Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.34 7.36a14.88 14.88 0 0 0 -1.67 -1.51 1 1 0 1 0 -1.23 1.58 13 13 0 0 1 1.46 1.31 1 1 0 0 0 0.72 0.31 1 1 0 0 0 0.69 -0.28 1 1 0 0 0 0.03 -1.41\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M9.28 20a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18.34 9.4a1 1 0 1 0 -1.06 1.7 8.56 8.56 0 0 1 1.6 1.28 1 1 0 0 0 1.42 0 1 1 0 0 0 0 -1.42 11.68 11.68 0 0 0 -1.96 -1.56\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.25 13.46a1 1 0 1 0 -0.5 1.93 5.09 5.09 0 0 1 2.31 1.31 1 1 0 0 0 0.7 0.3 1 1 0 0 0 0.71 -1.71 6.94 6.94 0 0 0 -3.22 -1.83\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21.43 0.24A1 1 0 0 0 20 0.35L17.75 3A15.08 15.08 0 0 0 0.67 5.89a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0 13.08 13.08 0 0 1 14.3 -2.76l-2.06 2.38A11.08 11.08 0 0 0 3.5 9.72a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0 9 9 0 0 1 7.93 -2.49L1 22.35a1 1 0 0 0 0.11 1.41 1 1 0 0 0 0.65 0.24 1 1 0 0 0 0.76 -0.35l19 -22a1 1 0 0 0 -0.09 -1.41\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

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
