
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

const BATCH = [{"setName":"icon/health/hand.wash","name":"hand-wash","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Laundry-Hand-Wash--Streamline-Ultimate\">\n  <desc>\n    Laundry Hand Wash Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.91 4.75a0.27 0.27 0 0 0 0.09 -0.17V0.25a0.25 0.25 0 0 0 -0.1 -0.18 0.26 0.26 0 0 0 -0.17 -0.07h-5.49a0.23 0.23 0 0 0 -0.14 0l-0.29 0.2a4.59 4.59 0 0 1 -2.5 0.76A21.67 21.67 0 0 0 5.93 2.6l-4.4 1.76A1.79 1.79 0 0 0 0.28 6.3 1.74 1.74 0 0 0 2 7.79a1.77 1.77 0 0 0 0.56 -0.09l2.36 -0.79a0.25 0.25 0 0 1 0.27 0.39 9.16 9.16 0 0 0 -1.91 4.91A1.65 1.65 0 0 0 4 13.77a1.9 1.9 0 0 0 1.85 0.11 1.69 1.69 0 0 0 0.94 -1.42 3.74 3.74 0 0 1 1.83 -3.18 5.5 5.5 0 0 1 1.47 -0.56 0.26 0.26 0 0 1 0.27 0.12 0.24 0.24 0 0 1 0 0.29 9.86 9.86 0 0 0 -1.95 3.37l-0.73 2.19a1.74 1.74 0 0 0 1.1 2.21 1.71 1.71 0 0 0 0.55 0.09A1.75 1.75 0 0 0 11 15.8l0.73 -2.2a6.53 6.53 0 0 1 2.09 -3l2 -1.59A1.49 1.49 0 0 1 17 8.69a1.52 1.52 0 0 1 1.24 1.09l0.11 0.38a1.44 1.44 0 0 1 -0.05 1l-0.58 1.46a1.76 1.76 0 0 0 0.08 1.47 1.74 1.74 0 0 0 3.2 -0.27l0.66 -1.64a4.5 4.5 0 0 0 0.13 -2.72 4 4 0 0 1 0.73 -3.05Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.91 22c-1.57 0.13 -2.66 -1.55 -2.67 -1.57a1 1 0 0 0 -1.71 0A3.36 3.36 0 0 1 15.78 22a2.8 2.8 0 0 1 -2.4 -1.48 1.05 1.05 0 0 0 -1.72 -0.16A4.26 4.26 0 0 1 8.57 22a3.55 3.55 0 0 1 -2.76 -1.58 1 1 0 0 0 -1.63 -0.09S2.71 22.13 1.07 22a1 1 0 0 0 -1 0.94A1 1 0 0 0 1 24h0.22a5.7 5.7 0 0 0 3.55 -1.46 0.25 0.25 0 0 1 0.33 0A5.17 5.17 0 0 0 8.57 24a5.81 5.81 0 0 0 3.63 -1.35 0.25 0.25 0 0 1 0.33 0A4.53 4.53 0 0 0 15.78 24a5.15 5.15 0 0 0 3.45 -1.33 0.24 0.24 0 0 1 0.33 0A4.71 4.71 0 0 0 23.05 24a1 1 0 0 0 0.95 -1.11 1 1 0 0 0 -1.09 -0.89\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/health/clipboard.health","name":"clipboard-health","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Medical-Data-Clipboard-Cross--Streamline-Ultimate\">\n  <desc>\n    Medical Data Clipboard Cross Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M12.22 0H6.29c-0.722 0 -1.309 0.527 -1.309 1.178v1.22c0 0.651 0.587 1.179 1.31 1.179h5.928c0.724 0 1.31 -0.528 1.31 -1.178V1.178c0 -0.65 -0.586 -1.178 -1.31 -1.178Zm7.753 12.73h-3.006a0.5 0.5 0 0 0 -0.5 0.5v3.027h-3.028a0.5 0.5 0 0 0 -0.5 0.5v3.006a0.5 0.5 0 0 0 0.5 0.5h3.028v3.027a0.5 0.5 0 0 0 0.5 0.5h3.006a0.5 0.5 0 0 0 0.5 -0.5v-3.027H23.5a0.5 0.5 0 0 0 0.5 -0.5v-3.006a0.5 0.5 0 0 0 -0.5 -0.5h-3.027v-3.028a0.5 0.5 0 0 0 -0.5 -0.5ZM1.851 1.787h1.63v0.61c0 1.625 1.412 2.679 2.81 2.679h5.928c1.399 0 2.81 -1.054 2.81 -2.678v-0.61h1.63a1.851 1.851 0 0 1 1.85 1.85v7.59h-1.542a2 2 0 0 0 -2 2l0 1.528h-1.528a2 2 0 0 0 -2 2v3.006a2 2 0 0 0 2 2h1.528v1.527c0 0.25 0.046 0.49 0.13 0.71H1.85A1.85 1.85 0 0 1 0 22.149V3.639a1.851 1.851 0 0 1 1.851 -1.85Zm2.6 6.722a0.75 0.75 0 1 0 0 1.5h9.608a0.75 0.75 0 1 0 0 -1.5H4.45Zm-0.75 5.25a0.75 0.75 0 0 1 0.75 -0.75H8.53a0.75 0.75 0 0 1 0 1.5H4.45a0.75 0.75 0 0 1 -0.75 -0.75Zm0.75 3.75a0.75 0.75 0 0 0 0 1.5H8.53a0.75 0.75 0 0 0 0 -1.5H4.45Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/patient","name":"patient","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Patient-Care--Streamline-Ultimate\">\n  <desc>\n    Patient Care Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M20 17.78 16.47 19a0.29 0.29 0 0 0 -0.15 0.14 2 2 0 0 1 -1.82 1.19h-4a0.5 0.5 0 0 1 0 -1h4a1 1 0 0 0 0 -2H11c-0.31 0 -1.51 -1.5 -4 -1.5H5a4.06 4.06 0 0 0 -1.79 0.42l-3 1.51a0.24 0.24 0 0 0 -0.14 0.22v5.4a0.25 0.25 0 0 0 0.25 0.25 0.28 0.28 0 0 0 0.13 0l3.22 -2a1 1 0 0 1 0.86 -0.1c10 3.36 6.63 3.37 17.86 -2.31a0.52 0.52 0 0 0 0.24 -0.69 0.75 0.75 0 0 0 -0.14 -0.17 2.48 2.48 0 0 0 -2.49 -0.58\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19.5 8.91a4.43 4.43 0 0 0 -2 0.45 0.38 0.38 0 0 0 -0.18 0.5 6.84 6.84 0 0 1 1 3.52 0.37 0.37 0 0 0 0.37 0.37h4.87a0.38 0.38 0 0 0 0.38 -0.37 4.49 4.49 0 0 0 -4.44 -4.47\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16.65 5.72a2.81 2.81 0 1 0 5.62 0 2.81 2.81 0 1 0 -5.62 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.07 3.84a3.56 3.56 0 1 0 7.12 0 3.56 3.56 0 1 0 -7.12 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.25 13.41a5.63 5.63 0 1 0 -11.25 0 0.38 0.38 0 0 0 0.38 0.37h10.5a0.38 0.38 0 0 0 0.37 -0.37\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
