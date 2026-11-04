
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

const BATCH = [{"setName":"icon/commerce/coupon","name":"coupon","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Coupon-Cut--Streamline-Ultimate\">\n  <desc>\n    Coupon Cut Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M10.5 17.43H10a1 1 0 0 0 0 2h0.5a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15 17.43h-1.5a1 1 0 0 0 0 2H15a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19.5 17.43H18a1 1 0 0 0 0 2h1.5a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 17.43h-0.5a1 1 0 0 0 0 2h0.5a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.92 15.93a0.25 0.25 0 0 0 0.21 -0.11 0.39 0.39 0 0 0 0.06 -0.11 1 1 0 0 0 -0.57 -1.3l-5.73 -2.19a0.25 0.25 0 0 1 0 -0.46l11.47 -4.48a1 1 0 0 0 0.06 -1.84 11 11 0 0 0 -10.88 0.64 14 14 0 0 0 -3.61 3.43 0.28 0.28 0 0 1 -0.24 0.1 0.27 0.27 0 0 1 -0.2 -0.17 12.53 12.53 0 0 1 -0.75 -4.14 3.87 3.87 0 1 0 -3.87 3.87 3.81 3.81 0 0 0 2 -0.53 0.26 0.26 0 0 1 0.23 0 0.24 0.24 0 0 1 0.14 0.17 17.72 17.72 0 0 0 1.15 3.09 0.22 0.22 0 0 1 0 0.22 15.93 15.93 0 0 0 -1.19 3.09 0.28 0.28 0 0 1 -0.15 0.17 0.25 0.25 0 0 1 -0.22 0 3.87 3.87 0 1 0 1.91 3.32 12.51 12.51 0 0 1 0.75 -4.16 0.27 0.27 0 0 1 0.2 -0.17 0.28 0.28 0 0 1 0.24 0.1 15.42 15.42 0 0 0 1.15 1.39 0.23 0.23 0 0 0 0.18 0.07Zm-14 -8.76A1.87 1.87 0 1 1 5.74 5.3a1.87 1.87 0 0 1 -1.87 1.87Zm0 13.4a1.87 1.87 0 1 1 1.82 -1.87 1.87 1.87 0 0 1 -1.87 1.87Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

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
