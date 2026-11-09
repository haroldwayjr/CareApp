
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

const BATCH = [{"setName":"icon/health/insurance","name":"insurance","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Insurance-Hand--Streamline-Ultimate\">\n  <desc>\n    Insurance Hand Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M24 6.12A1.12 1.12 0 0 0 22.88 5H19.5a0.5 0.5 0 0 1 -0.5 -0.5V1.12A1.12 1.12 0 0 0 17.88 0h-3.76A1.12 1.12 0 0 0 13 1.12V4.5a0.5 0.5 0 0 1 -0.5 0.5H9.12A1.12 1.12 0 0 0 8 6.12v3.76A1.12 1.12 0 0 0 9.12 11h3.38a0.5 0.5 0 0 1 0.5 0.5v3.38A1.12 1.12 0 0 0 14.12 16h3.76A1.12 1.12 0 0 0 19 14.88V11.5a0.5 0.5 0 0 1 0.5 -0.5h3.38A1.12 1.12 0 0 0 24 9.88Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 14.75a1 1 0 0 0 -1 1V23a1 1 0 0 0 2 0v-7.25a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 19.5H6.38a0.63 0.63 0 1 1 0 -1.25H8.9a1 1 0 0 0 0.92 -1.39 2.23 2.23 0 0 0 -2.06 -1.36H3.5a0.5 0.5 0 0 0 -0.5 0.5v6.5a0.5 0.5 0 0 0 0.5 0.5h10.76a2.24 2.24 0 0 0 2.24 -2.24v-0.26a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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