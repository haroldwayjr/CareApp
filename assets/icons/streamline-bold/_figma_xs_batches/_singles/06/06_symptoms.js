
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

const BATCH = [{"setName":"icon/health/symptoms","name":"symptoms","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Smiley-Fever--Streamline-Ultimate\">\n  <desc>\n    Smiley Fever Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M15.41 16.71a0.26 0.26 0 0 0 0.31 0l3.57 -2.37a0.25 0.25 0 0 0 0.07 -0.34l-0.56 -0.86a0.26 0.26 0 0 0 -0.35 -0.08l-3.91 2.53a0.24 0.24 0 0 0 -0.11 0.21 0.26 0.26 0 0 0 0.11 0.21 6.29 6.29 0 0 1 0.87 0.7\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m5.36 6.45a2.69 2.69 0 0 0 -2.11 -1 1 1 0 0 1 0 -2c1.15 0 3.14 0.55 3.89 2.05a1 1 0 0 1 -0.44 1.34 0.93 0.93 0 0 1 -0.45 0.11 1 1 0 0 1 -0.89 -0.5m0.14 3.05A1.5 1.5 0 1 1 16 8a1.5 1.5 0 0 1 1.5 1.5m-9.25 -6a1 1 0 0 1 0 2 2.69 2.69 0 0 0 -2.11 1 1 1 0 0 1 -0.89 0.5 0.93 0.93 0 0 1 -0.45 -0.11 1 1 0 0 1 -0.44 -1.34C5.11 4.05 7.1 3.5 8.25 3.5m1.25 6A1.5 1.5 0 1 1 8 8a1.5 1.5 0 0 1 1.5 1.5M22 14.39l-5.32 3.52a0.25 0.25 0 0 0 -0.1 0.28 1 1 0 0 1 -0.4 1.14 1 1 0 0 1 -1.41 -0.33 4.49 4.49 0 0 0 -6.61 -1 1 1 0 0 1 -1.27 -1.55A6.55 6.55 0 0 1 11 15a6.34 6.34 0 0 1 1.38 0.15 0.25 0.25 0 0 0 0.19 0l7 -4.49A2.25 2.25 0 0 1 22 14.39\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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