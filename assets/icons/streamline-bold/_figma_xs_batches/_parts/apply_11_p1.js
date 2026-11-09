
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

const BATCH = [{"setName":"icon/files/notes","name":"notes","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Notes-Add--Streamline-Ultimate\">\n  <desc>\n    Notes Add Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M17.5 11a6.5 6.5 0 1 0 6.5 6.5 6.51 6.51 0 0 0 -6.5 -6.5m2.5 7.25h-1.5a0.25 0.25 0 0 0 -0.25 0.25V20a0.75 0.75 0 0 1 -1.5 0v-1.5a0.25 0.25 0 0 0 -0.25 -0.25H15a0.75 0.75 0 0 1 0 -1.5h1.5a0.25 0.25 0 0 0 0.25 -0.25V15a0.75 0.75 0 0 1 1.5 0v1.5a0.25 0.25 0 0 0 0.25 0.25H20a0.75 0.75 0 0 1 0 1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 4.75V5a1 1 0 0 0 2 0v-0.25a0.25 0.25 0 0 1 0.25 -0.25h1a0.25 0.25 0 0 1 0.25 0.25v4.7a0.24 0.24 0 0 0 0.3 0.24 8.7 8.7 0 0 1 1.46 -0.19 0.24 0.24 0 0 0 0.24 -0.24V4.5a2 2 0 0 0 -2 -2h-1.25a0.25 0.25 0 0 1 -0.25 -0.25V1a1 1 0 0 0 -2 0v1.25a0.25 0.25 0 0 1 -0.25 0.25h-1.5a0.25 0.25 0 0 1 -0.25 -0.25V1a1 1 0 0 0 -2 0v1.25a0.25 0.25 0 0 1 -0.25 0.25h-1.5A0.25 0.25 0 0 1 6 2.25V1a1 1 0 0 0 -2 0v1.25a0.25 0.25 0 0 1 -0.25 0.25H2a2 2 0 0 0 -2 2v13a2 2 0 0 0 2 2h7.45a0.24 0.24 0 0 0 0.24 -0.3 8.7 8.7 0 0 1 -0.19 -1.46 0.24 0.24 0 0 0 -0.24 -0.24h-7a0.25 0.25 0 0 1 -0.26 -0.25V4.75a0.25 0.25 0 0 1 0.25 -0.25h1.5a0.25 0.25 0 0 1 0.25 0.25V5a1 1 0 0 0 2 0v-0.25a0.25 0.25 0 0 1 0.25 -0.25h1.5a0.25 0.25 0 0 1 0.25 0.25V5a1 1 0 0 0 2 0v-0.25a0.25 0.25 0 0 1 0.25 -0.25h1.5a0.25 0.25 0 0 1 0.25 0.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/cloud","name":"cloud","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Cloud--Streamline-Ultimate\">\n  <desc>\n    Cloud Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.75 13.87A5.71 5.71 0 0 0 22 9.78a5.61 5.61 0 0 0 -3.37 -1.55 0.28 0.28 0 0 1 -0.19 -0.12 7.53 7.53 0 0 0 -13.8 2.24 0.24 0.24 0 0 1 -0.23 0.19A4.51 4.51 0 0 0 0.25 15a4.25 4.25 0 0 0 1.21 3.15A5.29 5.29 0 0 0 5 19.54h13.67a5.68 5.68 0 0 0 5.08 -5.67m-5.28 3.67H5a3.24 3.24 0 0 1 -2.1 -0.77A2.29 2.29 0 0 1 2.25 15a2.53 2.53 0 0 1 0.92 -1.95 2.56 2.56 0 0 1 1.58 -0.56 2.24 2.24 0 0 1 0.52 0.06 1 1 0 0 0 0.81 -0.19 1 1 0 0 0 0.39 -0.73 5.54 5.54 0 0 1 10.53 -2 1 1 0 0 0 0.94 0.57 3.67 3.67 0 0 1 3.81 3.67 3.7 3.7 0 0 1 -3.28 3.67\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/files/server","name":"server","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Server--Streamline-Ultimate\">\n  <desc>\n    Server Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M24 6a1.5 1.5 0 0 0 -1.5 -1.5h-21A1.5 1.5 0 0 0 0 6v2.5A1.5 1.5 0 0 0 1.5 10h21A1.5 1.5 0 0 0 24 8.5ZM3.25 7.25A1.25 1.25 0 1 1 4.5 8.5a1.25 1.25 0 0 1 -1.25 -1.25M8.5 8.5a1.25 1.25 0 1 1 1.25 -1.25A1.25 1.25 0 0 1 8.5 8.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.74 2.05 18.84 0.11a1 1 0 0 0 -0.45 -0.11H5.63a1 1 0 0 0 -0.45 0.11L1.29 2.05a0.5 0.5 0 0 0 0.22 1h21a0.5 0.5 0 0 0 0.49 -0.43 0.52 0.52 0 0 0 -0.26 -0.57\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M24 13a1.5 1.5 0 0 0 -1.5 -1.5h-21A1.5 1.5 0 0 0 0 13v2.5A1.5 1.5 0 0 0 1.5 17h9.25a0.25 0.25 0 0 1 0.25 0.25v4.5a0.25 0.25 0 0 1 -0.25 0.25H5.5a1 1 0 0 0 0 2h13a1 1 0 0 0 0 -2h-5.25a0.25 0.25 0 0 1 -0.25 -0.25v-4.5a0.25 0.25 0 0 1 0.25 -0.25h9.25a1.5 1.5 0 0 0 1.5 -1.5ZM3.25 14.25A1.25 1.25 0 1 1 4.5 15.5a1.25 1.25 0 0 1 -1.25 -1.25M8.5 15.5a1.25 1.25 0 1 1 1.25 -1.25A1.25 1.25 0 0 1 8.5 15.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 24a1 1 0 0 0 0 -2h-1a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 24h1a1 1 0 0 0 0 -2H1a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/agreement","name":"agreement","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Workflow-Agreement--Streamline-Ultimate\">\n  <desc>\n    Workflow Agreement Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M19.25 0h-14A1.75 1.75 0 0 0 3.5 1.75v8.52A1.75 1.75 0 0 0 5.25 12h6a0.25 0.25 0 0 1 0.25 0.25v2a0.75 0.75 0 0 0 1.28 0.53l2.71 -2.71a0.23 0.23 0 0 1 0.17 -0.08h3.59A1.75 1.75 0 0 0 21 10.27V1.75A1.75 1.75 0 0 0 19.25 0m0.25 10.27a0.25 0.25 0 0 1 -0.25 0.25h-4a0.75 0.75 0 0 0 -0.53 0.22L13.43 12a0.25 0.25 0 0 1 -0.36 0 0.29 0.29 0 0 1 -0.07 -0.18v-0.58a0.75 0.75 0 0 0 -0.75 -0.75h-7a0.25 0.25 0 0 1 -0.25 -0.22V1.75a0.25 0.25 0 0 1 0.25 -0.25h14a0.25 0.25 0 0 1 0.25 0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M2 16.5a3 3 0 1 0 6 0 3 3 0 1 0 -6 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5 20.5a4.66 4.66 0 0 0 -4.28 2.81 0.5 0.5 0 0 0 0.46 0.69h7.64a0.5 0.5 0 0 0 0.46 -0.69A4.67 4.67 0 0 0 5 20.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16 16.5a3 3 0 1 0 6 0 3 3 0 1 0 -6 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.28 23.31a4.67 4.67 0 0 0 -8.56 0 0.5 0.5 0 0 0 0.46 0.69h7.64a0.5 0.5 0 0 0 0.46 -0.69\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16.59 3.35a0.75 0.75 0 0 0 -1.05 -0.12L10.83 7 9.21 5.38a0.75 0.75 0 1 0 -1.06 1.06l2.1 2.09a0.75 0.75 0 0 0 1 0.06l5.22 -4.19a0.74 0.74 0 0 0 0.12 -1.05\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/manual","name":"manual","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Manual-Book-Content-Sign--Streamline-Ultimate\">\n  <desc>\n    Manual Book Content Sign Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M2.312 4.036A3.892 3.892 0 0 1 6.208 0.14h13.756a1.73 1.73 0 0 1 1.724 1.724v15.928a1.73 1.73 0 0 1 -1.449 1.702v2.366h0.449a1 1 0 1 1 0 2H5.484a3.175 3.175 0 0 1 -3.172 -3.172zm2 16.652c0 0.645 0.527 1.172 1.172 1.172h12.755v-2.344H5.484c-0.645 0 -1.172 0.527 -1.172 1.172m5.615 -14.02c0 -1.1 0.88 -2.073 2.073 -2.073 1.1 0 2.073 0.88 2.073 2.073 0 1.1 -0.88 2.073 -2.073 2.073a1 1 0 0 0 -1 1v1.8a1 1 0 0 0 2 0v-0.921c1.832 -0.455 3.073 -2.132 3.073 -3.952 0 -2.366 -1.938 -4.073 -4.073 -4.073 -2.366 0 -4.073 1.937 -4.073 4.073a1 1 0 1 0 2 0M12 16.26A1.13 1.13 0 1 0 12 14a1.13 1.13 0 0 0 0 2.26\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/files/wiki","name":"wiki","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wikipedia-Logo--Streamline-Ultimate\">\n  <desc>\n    Wikipedia Logo Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23 4h-3a1 1 0 1 0 0 2h0.26l-5.15 10.63L13 11.76 16 6h0.53a1 1 0 0 0 0 -2h-3a1 1 0 1 0 0 2h0.21l-1.81 3.41L10.42 6h0.08a1 1 0 0 0 0 -2h-3a1 1 0 0 0 0 2h0.74l2.51 5.71 -2.57 4.92L3.88 6h0.62a1 1 0 0 0 0 -2H1a1 1 0 0 0 0 2h0.72l5.42 13.39A1 1 0 0 0 8 20h0.05a1 1 0 0 0 0.95 -0.52L11.78 14l2.37 5.39A1 1 0 0 0 15 20a1 1 0 0 0 0.9 -0.57L22.49 6H23a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/files/magazine","name":"magazine","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Shopping-Magazine-Advertising--Streamline-Ultimate\">\n  <desc>\n    Shopping Magazine Advertising Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M15.5 8.31h-0.75v6h0.75a1.25 1.25 0 0 0 1.25 -1.25v-3.5a1.25 1.25 0 0 0 -1.25 -1.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.5 8.31a1.25 1.25 0 0 0 -1.25 1.25v1.75h2.5V9.56A1.25 1.25 0 0 0 8.5 8.31\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.39 1.57A1.93 1.93 0 0 0 22 1c-3.84 0.11 -7.7 0.87 -9.65 2.31a0.51 0.51 0 0 1 -0.6 0c-2 -1.43 -5.86 -2.19 -9.7 -2.31a1.94 1.94 0 0 0 -1.44 0.56A2 2 0 0 0 0 3v14.5a2 2 0 0 0 2 2c6 0.17 9 1.82 9 2.48a1 1 0 0 0 2 0c0 -0.66 3.08 -2.31 9 -2.48a2 2 0 0 0 2 -2V3a2 2 0 0 0 -0.61 -1.43M11.25 15.06a0.75 0.75 0 1 1 -1.5 0v-2.25h-2.5v2.25a0.75 0.75 0 1 1 -1.5 0v-5.5a2.75 2.75 0 1 1 5.5 0Zm7 -2a2.75 2.75 0 0 1 -2.75 2.75H14a0.76 0.76 0 0 1 -0.75 -0.75v-7.5a0.75 0.75 0 0 1 0.75 -0.75h1.5a2.75 2.75 0 0 1 2.75 2.75Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/portfolio","name":"portfolio","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M13.5 1.25c1.6569 0 3 1.34315 3 3v1.5h4c1.933 0 3.5 1.567 3.5 3.5v10c0 1.933 -1.567 3.5 -3.5 3.5h-17c-1.933 0 -3.5 -1.567 -3.5 -3.5v-10c1.289e-7 -1.933 1.567 -3.5 3.5 -3.5h4v-1.5c0 -1.65685 1.34315 -3 3 -3zm-1.5 13c-2.77614 0 -5 2.2239 -5 5 0 0.2761 0.22386 0.5 0.5 0.5h9c0.2761 0 0.5 -0.2239 0.5 -0.5 0 -2.7761 -2.2239 -5 -5 -5m0 -6c-1.3807 0 -2.5 1.11929 -2.5 2.5 0 1.3807 1.1193 2.5 2.5 2.5s2.5 -1.1193 2.5 -2.5c0 -1.38071 -1.1193 -2.5 -2.5 -2.5m-1.5 -5c-0.55228 0 -1 0.44772 -1 1v1.5h5v-1.5c0 -0.55228 -0.4477 -1 -1 -1z\" stroke-width=\"1\"></path>\n</svg>"}];
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
return { ok, missing, failed, miss, fail, batch: 'apply_11_p1' };
