
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

const BATCH = [{"setName":"icon/files/usb","name":"usb","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Usb-Port--Streamline-Ultimate\">\n  <desc>\n    Usb Port Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M24 9a0.5 0.5 0 0 0 -0.5 -0.5H0.5A0.5 0.5 0 0 0 0 9v13.07a1.47 1.47 0 0 0 1.5 1.43h21a1.47 1.47 0 0 0 1.5 -1.43Zm-3.5 6h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1m1 3v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1m-9 -2a5 5 0 1 1 -5 -5 5 5 0 0 1 5 5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M0.5 7h23a0.52 0.52 0 0 0 0.44 -0.25 0.54 0.54 0 0 0 0 -0.51l-3 -5A1.52 1.52 0 0 0 19.58 0.5H4.42a1.52 1.52 0 0 0 -1.33 0.7l-3 5a0.54 0.54 0 0 0 0 0.51A0.52 0.52 0 0 0 0.5 7\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17 13a0.5 0.5 0 1 0 1 0 0.5 0.5 0 1 0 -1 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 13a0.5 0.5 0 1 0 1 0 0.5 0.5 0 1 0 -1 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17 19a0.5 0.5 0 1 0 1 0 0.5 0.5 0 1 0 -1 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 19a0.5 0.5 0 1 0 1 0 0.5 0.5 0 1 0 -1 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.81 16.29a1.72 1.72 0 0 0 -0.26 -2.58 0.68 0.68 0 0 0 -0.45 -0.21c-0.17 0 -0.38 0.1 -0.4 0.27a1.93 1.93 0 0 1 -1.55 1.57 3.16 3.16 0 0 0 -0.36 -2.65 1.72 1.72 0 0 0 -2.58 0.31 0.68 0.68 0 0 0 -0.21 0.4c0 0.17 0.1 0.38 0.27 0.4a1.93 1.93 0 0 1 1.57 1.55 3.16 3.16 0 0 0 -2.65 0.36 1.72 1.72 0 0 0 0.26 2.58 0.68 0.68 0 0 0 0.45 0.21c0.17 0 0.38 -0.1 0.4 -0.27a1.93 1.93 0 0 1 1.55 -1.57 3.16 3.16 0 0 0 0.36 2.65 1.72 1.72 0 0 0 2.58 -0.26 0.68 0.68 0 0 0 0.21 -0.45c0 -0.17 -0.1 -0.38 -0.27 -0.4a1.93 1.93 0 0 1 -1.57 -1.55 3.16 3.16 0 0 0 2.65 -0.36\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

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
