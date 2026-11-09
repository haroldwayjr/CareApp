
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

const BATCH = [{"setName":"icon/commerce/bank","name":"bank","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Blood-Bank--Streamline-Ultimate\">\n  <desc>\n    Blood Bank Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M8.166 10.797a4.03 4.03 0 0 0 1.262 -2.913c0 -3.501 -3.691 -7.62 -4.31 -7.62 -0.618 0 -4.31 4.119 -4.31 7.62a4.03 4.03 0 0 0 1.263 2.913 4.413 4.413 0 0 0 3.048 1.206 4.413 4.413 0 0 0 3.047 -1.206m0.513 1.528v2.673H8.67v3.655a0.75 0.75 0 0 1 -1.5 0v-3.655l-2.435 0a0.75 0.75 0 0 0 -0.75 0.75v7.4c0 0.415 0.335 0.75 0.75 0.75H9.41l0.018 0h2.815v-3.736a0.5 0.5 0 0 1 0.5 -0.5h2.297a0.5 0.5 0 0 1 0.5 0.5v3.737h2.816l0.015 0h4.678a0.75 0.75 0 0 0 0.75 -0.75v-7.4a0.75 0.75 0 0 0 -0.75 -0.75l-2.46 0v3.654a0.75 0.75 0 0 1 -1.5 0v-4.566c0 -0.056 0.005 -0.11 0.017 -0.162v-3.647a0.75 0.75 0 0 0 -0.75 -0.75h-7.683a5.59 5.59 0 0 1 -1.995 2.797Zm5.95 -0.979h-1.345a0.5 0.5 0 0 0 -0.5 0.5v1.136h-1.2a0.5 0.5 0 0 0 -0.5 0.5v1.346a0.5 0.5 0 0 0 0.5 0.5h1.2v1.137a0.5 0.5 0 0 0 0.5 0.5h1.346a0.5 0.5 0 0 0 0.5 -0.5v-1.137h1.072a0.5 0.5 0 0 0 0.5 -0.5v-1.346a0.5 0.5 0 0 0 -0.5 -0.5H15.13v-1.136a0.5 0.5 0 0 0 -0.5 -0.5Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/commerce/piggy.bank","name":"piggy-bank","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Saving-Piggy-Bank--Streamline-Ultimate\">\n  <desc>\n    Saving Piggy Bank Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M24 9.28a1 1 0 0 0 -0.92 -1.07 1 1 0 0 0 -1.08 0.92 0.14 0.14 0 0 1 -0.13 0.13 0.15 0.15 0 0 1 -0.15 -0.11 8.22 8.22 0 0 0 -2.87 -4.22 11.12 11.12 0 0 0 -8.91 -2.11 0.26 0.26 0 0 1 -0.25 -0.1A4 4 0 0 0 5.5 1.25a1 1 0 0 0 -0.72 0.75 1 1 0 0 0 0.28 1 3.05 3.05 0 0 1 0.8 1.26 0.25 0.25 0 0 1 -0.1 0.28A8.31 8.31 0 0 0 2.2 9.43a0.24 0.24 0 0 1 -0.2 0.19h-0.5a1.5 1.5 0 0 0 -1.5 1.5v2a1.5 1.5 0 0 0 1.5 1.5h1.24a0.25 0.25 0 0 1 0.22 0.13A8.82 8.82 0 0 0 6.07 18a0.26 0.26 0 0 1 0.11 0.29l-0.88 3a1.26 1.26 0 0 0 0.85 1.55 1.45 1.45 0 0 0 0.35 0A1.25 1.25 0 0 0 7.7 22l0.77 -2.65a0.29 0.29 0 0 1 0.12 -0.15 0.31 0.31 0 0 1 0.19 0 11.4 11.4 0 0 0 3.22 0.47 11.29 11.29 0 0 0 3.22 -0.46 0.24 0.24 0 0 1 0.19 0 0.22 0.22 0 0 1 0.12 0.15L16.3 22a1.25 1.25 0 0 0 1.2 0.9 1.45 1.45 0 0 0 0.35 0 1.26 1.26 0 0 0 0.85 -1.55l-0.88 -3a0.24 0.24 0 0 1 0.11 -0.28 8.36 8.36 0 0 0 4 -5.92 0.24 0.24 0 0 1 0.15 -0.2A3 3 0 0 0 24 9.28m-6.9 -1.7a0.76 0.76 0 0 1 -0.6 0.29 0.68 0.68 0 0 1 -0.45 -0.15 6.82 6.82 0 0 0 -4.5 -1.33 0.74 0.74 0 0 1 -0.8 -0.7 0.76 0.76 0 0 1 0.7 -0.8A8.24 8.24 0 0 1 17 6.53a0.75 0.75 0 0 1 0.1 1.05M6 10.62a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/commerce/coins","name":"coins","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Accounting-Coins--Streamline-Ultimate\">\n  <desc>\n    Accounting Coins Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M7.67 9.21A0.23 0.23 0 0 0 7.42 9 7.5 7.5 0 1 0 15 16.57a0.23 0.23 0 0 0 -0.2 -0.24 9 9 0 0 1 -7.13 -7.12m1.73 5a0.75 0.75 0 0 1 -0.75 0.75h-1.9a0.51 0.51 0 0 0 -0.5 0.51 0.48 0.48 0 0 0 0.32 0.46l1.92 0.77a2 2 0 0 1 -0.3 3.8 0.26 0.26 0 0 0 -0.19 0.25V21a0.75 0.75 0 0 1 -1.5 0v-0.17a0.25 0.25 0 0 0 -0.25 -0.25h-0.4a0.75 0.75 0 0 1 0 -1.5h1.9a0.5 0.5 0 0 0 0.5 -0.5 0.48 0.48 0 0 0 -0.31 -0.46L6 17.34a2 2 0 0 1 -1.26 -1.85 2 2 0 0 1 1.56 -2 0.24 0.24 0 0 0 0.19 -0.24v-0.23a0.75 0.75 0 0 1 1.5 0v0.16a0.25 0.25 0 0 0 0.25 0.25h0.4a0.76 0.76 0 0 1 0.76 0.8Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16.5 0A7.5 7.5 0 1 0 24 7.5 7.5 7.5 0 0 0 16.5 0m0 13.21a0.76 0.76 0 0 1 -0.75 -0.75V12a0.25 0.25 0 0 0 -0.25 -0.25h-0.75a0.75 0.75 0 0 1 0 -1.5h2.37a0.82 0.82 0 0 0 0.82 -0.82 0.8 0.8 0 0 0 -0.52 -0.75l-2.4 -1a2.29 2.29 0 0 1 -1.46 -2.14 2.32 2.32 0 0 1 2 -2.29 0.24 0.24 0 0 0 0.19 -0.25v-0.5a0.75 0.75 0 1 1 1.5 0V3a0.25 0.25 0 0 0 0.25 0.25h0.75a0.75 0.75 0 0 1 0 1.5h-2.37a0.82 0.82 0 0 0 -0.82 0.82 0.8 0.8 0 0 0 0.52 0.75l2.4 1a2.29 2.29 0 0 1 1.46 2.14 2.32 2.32 0 0 1 -2 2.29 0.24 0.24 0 0 0 -0.21 0.24v0.5a0.76 0.76 0 0 1 -0.73 0.72\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/commerce/chart.line","name":"chart-line","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Analytics-Graph--Streamline-Ultimate\">\n  <desc>\n    Analytics Graph Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M18.88 6.45A3 3 0 0 1 18.5 5a0.14 0.14 0 0 0 -0.06 -0.12 0.16 0.16 0 0 0 -0.13 0l-5 1.4a0.25 0.25 0 0 0 -0.16 0.14 0.24 0.24 0 0 0 0 0.22A3 3 0 0 1 13.5 8a0.21 0.21 0 0 0 0.08 0.17 0.19 0.19 0 0 0 0.18 0l5 -1.39a0.24 0.24 0 0 0 0.17 -0.14 0.28 0.28 0 0 0 -0.05 -0.19\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18.82 16a0.29 0.29 0 0 0 -0.17 -0.14l-4.84 -1.13a0.28 0.28 0 0 0 -0.22 0.05 0.25 0.25 0 0 0 -0.09 0.2V15a2.94 2.94 0 0 1 -0.29 1.29 0.26 0.26 0 0 0 0 0.21 0.26 0.26 0 0 0 0.17 0.14l4.81 1.12a0.28 0.28 0 0 0 0.22 -0.05 0.25 0.25 0 0 0 0.09 -0.2 3 3 0 0 1 0.31 -1.33 0.24 0.24 0 0 0 0.01 -0.18\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 0a1 1 0 0 0 -1 1v21.52A1.49 1.49 0 0 0 1.49 24H23a1 1 0 0 0 0 -2H2.25a0.25 0.25 0 0 1 -0.25 -0.25v-0.05a0.24 0.24 0 0 1 0.12 -0.21l6.31 -3.88a0.28 0.28 0 0 0 0.12 -0.19 0.24 0.24 0 0 0 -0.08 -0.21 3.13 3.13 0 0 1 -0.78 -1.15 0.25 0.25 0 0 0 -0.15 -0.15 0.26 0.26 0 0 0 -0.21 0L2.38 19a0.23 0.23 0 0 1 -0.25 0 0.24 0.24 0 0 1 -0.13 -0.24v-2.64a0.25 0.25 0 0 1 0.1 -0.2l6.63 -5.1a0.23 0.23 0 0 0 0.1 -0.2 0.26 0.26 0 0 0 -0.1 -0.2 3 3 0 0 1 -0.9 -1.06 0.28 0.28 0 0 0 -0.17 -0.13 0.31 0.31 0 0 0 -0.21 0L2.4 13.16A0.25 0.25 0 0 1 2 13V1a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.5 8a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19.5 5a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19.5 17.5a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.5 15a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
