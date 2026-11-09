
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

const BATCH = [{"setName":"icon/health/lab","name":"lab","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Laboratory-Sample--Streamline-Ultimate\">\n  <desc>\n    Laboratory Sample Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.25 9.68a1 1 0 0 0 -0.4 -1.35l-8.79 -4.77A1 1 0 0 0 12.7 4a1 1 0 0 0 0.41 1.35l0.89 0.45a0.5 0.5 0 0 1 0.2 0.68L12 10.43a4 4 0 0 0 0.18 4.3 0.49 0.49 0 0 1 0 0.54l-1.59 2.95a1 1 0 0 0 0.4 1.35 0.89 0.89 0 0 0 0.47 0.12 1 1 0 0 0 0.88 -0.52L14 16.23a0.48 0.48 0 0 1 0.5 -0.23 4 4 0 0 0 3.7 -2.2l2.14 -4a0.52 0.52 0 0 1 0.3 -0.24 0.5 0.5 0 0 1 0.38 0l0.88 0.48a1 1 0 0 0 1.35 -0.41Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16.84 0.52a1 1 0 0 0 0.41 1.36l0.88 0.48a0.5 0.5 0 0 1 0.2 0.68l-0.24 0.43a0.5 0.5 0 0 0 0.2 0.68l1.76 1a0.5 0.5 0 0 0 0.38 0 0.48 0.48 0 0 0 0.3 -0.24l0.27 -0.45a0.53 0.53 0 0 1 0.29 -0.24 0.55 0.55 0 0 1 0.38 0l0.88 0.48a1 1 0 0 0 0.48 0.12A1 1 0 0 0 23.47 3L18.2 0.12a1 1 0 0 0 -1.36 0.4\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21 14a1 1 0 1 0 -1 1.75c1.26 0.7 2 1.54 2 2.3 0 1.89 -4.28 4 -10 4S2 19.89 2 18c0 -1.41 2.5 -3.22 7.13 -3.82a1 1 0 0 0 -0.26 -2C3.48 12.89 0 15.17 0 18c0 3.42 5.16 6 12 6s12 -2.58 12 -6c0 -1.54 -1.07 -3 -3 -4\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5 17.97a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.25 19.47a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18 17.97a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
