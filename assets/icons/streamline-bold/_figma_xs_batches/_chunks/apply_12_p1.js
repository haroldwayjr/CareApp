
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

const BATCH = [{"setName":"icon/misc/terminal","name":"terminal","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Terminal--Streamline-Ultimate\">\n  <desc>\n    Terminal Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M2.25 1.25C1.036 1.25 0 2.286 0 3.5v17c0 1.214 1.036 2.25 2.25 2.25h19.5c1.214 0 2.25 -1.036 2.25 -2.25v-17c0 -0.62 -0.209 -1.187 -0.607 -1.605a2.106 2.106 0 0 0 -1.543 -0.645zm6.678 8.766a0.75 0.75 0 0 1 0.75 -0.75h4.5a0.75 0.75 0 0 1 0 1.5h-4.5a0.75 0.75 0 0 1 -0.75 -0.75m-4.07 -5.577a0.75 0.75 0 1 0 -0.96 1.153l2.308 1.924 -2.308 1.923a0.75 0.75 0 0 0 0.96 1.153l3 -2.5a0.75 0.75 0 0 0 0 -1.153z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/actions/draft","name":"draft","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Workflow-Request-Draft--Streamline-Ultimate\">\n  <desc>\n    Workflow Request Draft Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M6 7.365A3.752 3.752 0 0 0 5 0a3.75 3.75 0 0 0 -1 7.365v9.27A3.752 3.752 0 0 0 5 24a3.75 3.75 0 0 0 1 -7.365zm9.25 12.885a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1 -7.5 0m2.375 -6.833a1.375 1.375 0 1 0 2.75 0 1.375 1.375 0 0 0 -2.75 0m0 -4.833a1.375 1.375 0 1 0 2.75 0 1.375 1.375 0 0 0 -2.75 0m0 -4.834a1.375 1.375 0 1 0 2.75 0 1.375 1.375 0 0 0 -2.75 0\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/status/info","name":"info","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Information-Circle--Streamline-Ultimate\">\n  <desc>\n    Information Circle Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m0.25 5a1.5 1.5 0 1 1 -1.5 1.5 1.5 1.5 0 0 1 1.5 -1.5m2.25 13.5h-4a1 1 0 0 1 0 -2h0.75a0.25 0.25 0 0 0 0.25 -0.25v-4.5a0.25 0.25 0 0 0 -0.25 -0.25h-0.75a1 1 0 0 1 0 -2h1a2 2 0 0 1 2 2v4.75a0.25 0.25 0 0 0 0.25 0.25h0.75a1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/status/help","name":"help","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Question-Circle--Streamline-Ultimate\">\n  <desc>\n    Question Circle Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m0 19a1.5 1.5 0 1 1 1.5 -1.5A1.5 1.5 0 0 1 12 19m1.6 -6.08a1 1 0 0 0 -0.6 0.92 1 1 0 0 1 -2 0 3 3 0 0 1 1.8 -2.75A2 2 0 1 0 10 9.25a1 1 0 0 1 -2 0 4 4 0 1 1 5.6 3.67\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/status/unlock","name":"unlock","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Lock-Unlock--Streamline-Ultimate\">\n  <desc>\n    Lock Unlock Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M19.5 9.5h-0.75V6.75A6.75 6.75 0 0 0 5.53 4.81a1.25 1.25 0 0 0 2.4 0.72 4.25 4.25 0 0 1 8.32 1.22V9a0.5 0.5 0 0 1 -0.5 0.5H4.5a2 2 0 0 0 -2 2V22a2 2 0 0 0 2 2h15a2 2 0 0 0 2 -2V11.5a2 2 0 0 0 -2 -2m-9.5 6a2 2 0 0 1 4 0 2 2 0 0 1 -1 1.72v2.28a1 1 0 0 1 -2 0v-2.28a2 2 0 0 1 -1 -1.72\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/status/star.filled","name":"star-filled","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Rating-Star-1--Streamline-Ultimate\">\n  <desc>\n    Rating Star 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M19.81 10.12a1.54 1.54 0 0 0 -1.22 -1L15 8.57 13.34 5.3a1.5 1.5 0 0 0 -2.68 0L9 8.57l-3.63 0.52a1.5 1.5 0 0 0 -1.21 1 1.47 1.47 0 0 0 0.38 1.54l2.66 2.56 -0.62 3.59a1.47 1.47 0 0 0 0.6 1.46 1.49 1.49 0 0 0 1.57 0.12l3.25 -1.7 3.25 1.7a1.5 1.5 0 0 0 2.17 -1.59l-0.62 -3.58 2.62 -2.54a1.49 1.49 0 0 0 0.39 -1.53\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
