
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
  const was = xs.visible;
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
  xs.visible = false; // keep catalog md-only
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}

const BATCH = [{"setName":"icon/misc/wifi","name":"wifi","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wifi--Streamline-Ultimate\">\n  <desc>\n    Wifi Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M4.05 9.92a1.24 1.24 0 0 0 0 1.76 1.23 1.23 0 0 0 1.76 0 8.77 8.77 0 0 1 12.38 0 1.25 1.25 0 0 0 1.77 0 1.27 1.27 0 0 0 0 -1.76 11.26 11.26 0 0 0 -15.91 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.78 6.09a15.25 15.25 0 0 0 -21.56 0A1.25 1.25 0 0 0 3 7.86a12.78 12.78 0 0 1 18 0 1.25 1.25 0 0 0 1.76 -1.77Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.38 12a7.27 7.27 0 0 0 -7.51 1.71 1.27 1.27 0 0 0 0 1.77 1.25 1.25 0 0 0 0.89 0.37 1.21 1.21 0 0 0 0.88 -0.37 4.75 4.75 0 0 1 6.53 -0.15 1.53 1.53 0 0 0 1.07 0.52 1.26 1.26 0 0 0 0.89 -2.14A7.18 7.18 0 0 0 14.38 12\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M9.5 19.87a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0 -5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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