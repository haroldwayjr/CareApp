
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

const BATCH = [{"setName":"icon/files/database","name":"database","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Database--Streamline-Ultimate\">\n  <desc>\n    Database Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23 20.5h-1a0.75 0.75 0 0 0 0 1.5h1a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M2 20.5H1A0.75 0.75 0 0 0 1 22h1a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.25 18.43a0.26 0.26 0 0 1 -0.17 0.24 2.78 2.78 0 0 0 -1.66 1.66 0.26 0.26 0 0 1 -0.24 0.17H5.5a0.75 0.75 0 0 0 0 1.5h3.68a0.26 0.26 0 0 1 0.24 0.17 2.73 2.73 0 0 0 5.16 0 0.26 0.26 0 0 1 0.24 -0.17h3.68a0.75 0.75 0 0 0 0 -1.5h-3.68a0.26 0.26 0 0 1 -0.24 -0.17 2.78 2.78 0 0 0 -1.66 -1.66 0.25 0.25 0 0 1 -0.17 -0.24v-1.2A0.26 0.26 0 0 1 13 17c4.9 -0.16 8.76 -1.88 8.76 -4v-1.72a0.26 0.26 0 0 0 -0.14 -0.22 0.26 0.26 0 0 0 -0.27 0c-1.93 1.58 -5.59 2.41 -9.09 2.41s-7.16 -0.83 -9.09 -2.41a0.26 0.26 0 0 0 -0.27 0 0.26 0.26 0 0 0 -0.14 0.22V13c0 2 3.6 3.71 8.26 4a0.25 0.25 0 0 1 0.24 0.25Zm2 2.82A1.25 1.25 0 1 1 12 20a1.25 1.25 0 0 1 1.25 1.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12.25 12.5c5.25 0 9.5 -1.79 9.5 -4V6.78a0.26 0.26 0 0 0 -0.14 -0.22 0.26 0.26 0 0 0 -0.27 0C19.4 8.17 15.75 9 12.25 9s-7.16 -0.83 -9.09 -2.41a0.26 0.26 0 0 0 -0.27 0 0.26 0.26 0 0 0 -0.14 0.22V8.5c0 2.21 4.25 4 9.5 4\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M2.75 4a9.5 4 0 1 0 19 0 9.5 4 0 1 0 -19 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/contract","name":"contract","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Business-Contract-Give--Streamline-Ultimate\">\n  <desc>\n    Business Contract Give Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M17.75 2.47h-10a1 1 0 0 0 0 2h9.5a0.5 0.5 0 0 1 0.5 0.5v7.9a0.09 0.09 0 0 0 0 0.07l2.75 2.75a0.75 0.75 0 0 1 0 1.06 0.75 0.75 0 0 1 -1.06 0l-2.04 -2.07a1.26 1.26 0 0 0 -1.32 0.11 1.23 1.23 0 0 0 -0.5 0.9 1.29 1.29 0 0 0 0.35 1l2.75 2.79a0.29 0.29 0 0 1 0.07 0.18V21a6 6 0 0 0 0.94 2.4 0.26 0.26 0 0 0 0.17 0.12 4.09 4.09 0 0 0 3.79 -1.39 0.27 0.27 0 0 0 0 -0.27l-0.9 -1.74a0.27 0.27 0 0 1 0 -0.12v-4.5c0 -1.45 -1.36 -2.76 -2.91 -4.08a0.25 0.25 0 0 1 -0.09 -0.2V4.47a2 2 0 0 0 -2 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.25 21h10a1 1 0 0 0 0 -2h-9a0.5 0.5 0 0 1 -0.5 -0.5v-6.91a0.26 0.26 0 0 0 -0.13 -0.22 0.79 0.79 0 0 1 -0.15 -0.12L3.72 8.5a0.75 0.75 0 0 1 1.06 -1.06l2 2a1.25 1.25 0 0 0 1.64 -1.13 1.29 1.29 0 0 0 -0.35 -1L5.32 4.55a0.29 0.29 0 0 1 -0.07 -0.18V3A6 6 0 0 0 4.31 0.57a0.26 0.26 0 0 0 -0.17 -0.12A4.09 4.09 0 0 0 0.35 1.84a0.27 0.27 0 0 0 0 0.27l0.9 1.74a0.27 0.27 0 0 1 0 0.12v4.5c0 1.6 1.67 3 3.41 4.51a0.22 0.22 0 0 1 0.09 0.19v6.3A1.5 1.5 0 0 0 6.25 21\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
