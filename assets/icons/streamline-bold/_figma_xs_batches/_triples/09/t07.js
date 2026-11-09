
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

const BATCH = [{"setName":"icon/files/document","name":"document","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Document--Streamline-Ultimate\">\n  <desc>\n    Document Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M6.48 20.67a9.4 9.4 0 0 1 -6.13 -2.29 1 1 0 0 1 -0.35 -0.76V4.35a1 1 0 0 1 1 -1h22a1 1 0 0 1 1 1v13.27a1 1 0 0 1 -1.62 0.79l-0.15 -0.12a7.63 7.63 0 0 0 -9.6 0.11l-0.49 0.37a9.41 9.41 0 0 1 -5.66 1.9M2 17.15a7.4 7.4 0 0 0 8.94 0l0.46 -0.35A9.59 9.59 0 0 1 22 15.77V5.35H2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/files/cabinet","name":"cabinet","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Bathroom-Mirror-Cabinet--Streamline-Ultimate\">\n  <desc>\n    Bathroom Mirror Cabinet Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23 13.44V2.4A1.45 1.45 0 0 0 21.6 1H2.4A1.45 1.45 0 0 0 1 2.4v11a1 1 0 1 0 0 1.92h1.8a1 1 0 0 0 0.12 -1.91V3.38a0.5 0.5 0 0 1 0.5 -0.5h17.2a0.5 0.5 0 0 1 0.5 0.5v10.06H21a1 1 0 0 0 0 1.92h2a1 1 0 0 0 0 -1.92\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18.72 12.48a1 1 0 0 0 -1 -1H16.6a0.48 0.48 0 0 1 -0.43 -0.25 0.48 0.48 0 0 1 0 -0.49A4.39 4.39 0 0 0 16.8 9a0.47 0.47 0 0 0 -0.48 -0.48h-4.78A0.5 0.5 0 0 1 11 8V6.56a0.48 0.48 0 0 1 1 0 1 1 0 1 0 1.92 0 2.4 2.4 0 0 0 -4.8 0V8a0.5 0.5 0 0 1 -0.5 0.5h-0.94a0.47 0.47 0 0 0 -0.48 0.5 4.39 4.39 0 0 0 0.64 1.82 0.48 0.48 0 0 1 0 0.49 0.48 0.48 0 0 1 -0.43 0.25H6.24a1 1 0 0 0 -1 1v9.6a1 1 0 0 0 1 1h11.52a1 1 0 0 0 1 -1Zm-1.92 8.16a0.48 0.48 0 0 1 -0.48 0.48H7.68a0.48 0.48 0 0 1 -0.48 -0.48v-1.92a0.48 0.48 0 0 1 0.48 -0.48h8.64a0.48 0.48 0 0 1 0.48 0.48Zm0 -4.8a0.48 0.48 0 0 1 -0.48 0.48H7.68a0.48 0.48 0 0 1 -0.48 -0.48v-1.92a0.48 0.48 0 0 1 0.48 -0.48h8.64a0.48 0.48 0 0 1 0.48 0.48Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13 14.4h-2a0.48 0.48 0 0 0 0 1h2a0.48 0.48 0 0 0 0 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13 19.2h-2a0.48 0.48 0 0 0 0 1h2a0.48 0.48 0 0 0 0 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/database","name":"database","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Database--Streamline-Ultimate\">\n  <desc>\n    Database Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23 20.5h-1a0.75 0.75 0 0 0 0 1.5h1a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M2 20.5H1A0.75 0.75 0 0 0 1 22h1a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.25 18.43a0.26 0.26 0 0 1 -0.17 0.24 2.78 2.78 0 0 0 -1.66 1.66 0.26 0.26 0 0 1 -0.24 0.17H5.5a0.75 0.75 0 0 0 0 1.5h3.68a0.26 0.26 0 0 1 0.24 0.17 2.73 2.73 0 0 0 5.16 0 0.26 0.26 0 0 1 0.24 -0.17h3.68a0.75 0.75 0 0 0 0 -1.5h-3.68a0.26 0.26 0 0 1 -0.24 -0.17 2.78 2.78 0 0 0 -1.66 -1.66 0.25 0.25 0 0 1 -0.17 -0.24v-1.2A0.26 0.26 0 0 1 13 17c4.9 -0.16 8.76 -1.88 8.76 -4v-1.72a0.26 0.26 0 0 0 -0.14 -0.22 0.26 0.26 0 0 0 -0.27 0c-1.93 1.58 -5.59 2.41 -9.09 2.41s-7.16 -0.83 -9.09 -2.41a0.26 0.26 0 0 0 -0.27 0 0.26 0.26 0 0 0 -0.14 0.22V13c0 2 3.6 3.71 8.26 4a0.25 0.25 0 0 1 0.24 0.25Zm2 2.82A1.25 1.25 0 1 1 12 20a1.25 1.25 0 0 1 1.25 1.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12.25 12.5c5.25 0 9.5 -1.79 9.5 -4V6.78a0.26 0.26 0 0 0 -0.14 -0.22 0.26 0.26 0 0 0 -0.27 0C19.4 8.17 15.75 9 12.25 9s-7.16 -0.83 -9.09 -2.41a0.26 0.26 0 0 0 -0.27 0 0.26 0.26 0 0 0 -0.14 0.22V8.5c0 2.21 4.25 4 9.5 4\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M2.75 4a9.5 4 0 1 0 19 0 9.5 4 0 1 0 -19 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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