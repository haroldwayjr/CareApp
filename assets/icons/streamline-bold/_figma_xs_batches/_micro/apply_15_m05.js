
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

const BATCH = [{"setName": "icon/status/critical", "name": "critical", "category": "status", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flash-1--Streamline-Ultimate\">\n  <desc>\n    Flash 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M20.44 9.27A0.48 0.48 0 0 0 20 9h-7.38L14.49 0.61A0.51 0.51 0 0 0 14.2 0a0.5 0.5 0 0 0 -0.61 0.17l-10 14a0.49 0.49 0 0 0 0 0.52A0.49 0.49 0 0 0 4 15h7.38l-1.87 8.39a0.51 0.51 0 0 0 0.29 0.61 0.52 0.52 0 0 0 0.61 -0.17l10 -14a0.49 0.49 0 0 0 0.03 -0.56\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}, {"setName": "icon/health/emergency", "name": "emergency", "category": "health", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Hospital-Emergency-Department--Streamline-Ultimate\">\n  <desc>\n    Hospital Emergency Department Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M5 19.75a0.5 0.5 0 0 0 0.5 0.5h13a0.5 0.5 0 0 0 0.5 -0.5v-7a7 7 0 0 0 -14 0Zm8.25 -9.5v2h2a0.5 0.5 0 0 1 0.5 0.5v1.5a0.5 0.5 0 0 1 -0.5 0.5h-2v2a0.5 0.5 0 0 1 -0.5 0.5h-1.5a0.5 0.5 0 0 1 -0.5 -0.5v-2h-2a0.5 0.5 0 0 1 -0.5 -0.5v-1.5a0.5 0.5 0 0 1 0.5 -0.5h2v-2a0.5 0.5 0 0 1 0.5 -0.5h1.5a0.5 0.5 0 0 1 0.5 0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 4.25a0.75 0.75 0 0 0 0.75 -0.75V1.25a0.75 0.75 0 0 0 -1.5 0V3.5a0.76 0.76 0 0 0 0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18.37 6.89a0.74 0.74 0 0 0 0.53 -0.22l1.59 -1.59a0.75 0.75 0 0 0 0 -1.06 0.74 0.74 0 0 0 -1.06 0l-1.59 1.59a0.74 0.74 0 0 0 0 1.06 0.71 0.71 0 0 0 0.53 0.22\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.25 11.75H21a0.75 0.75 0 0 0 0 1.5h2.25a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.1 6.67a0.74 0.74 0 0 0 0.53 0.22 0.71 0.71 0 0 0 0.53 -0.22 0.74 0.74 0 0 0 0 -1.06L4.57 4a0.74 0.74 0 0 0 -1.06 0 0.75 0.75 0 0 0 0 1.06Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3.75 12.5a0.76 0.76 0 0 0 -0.75 -0.75H0.75a0.75 0.75 0 0 0 0 1.5H3a0.75 0.75 0 0 0 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21 21.75H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}, {"setName": "icon/misc/leaf", "name": "leaf", "category": "misc", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Vegetable-Basil-Leaf--Streamline-Ultimate\">\n  <desc>\n    Vegetable Basil Leaf Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M12.65 18.32a4.87 4.87 0 0 1 -0.36 -0.59 5.18 5.18 0 0 1 -0.29 -3.52c0 -0.07 -0.11 -0.14 -0.16 -0.22l-0.58 0c-0.63 0.56 -1.26 1.07 -1.87 1.52a14.6 14.6 0 0 0 -0.71 3.23 0.74 0.74 0 0 1 -0.75 0.73 0.75 0.75 0 0 1 -0.74 -0.76 10.63 10.63 0 0 1 0.3 -2 13.61 13.61 0 0 1 -3.09 1.32 0.75 0.75 0 0 1 -0.93 -0.52 0.74 0.74 0 0 1 0.52 -0.92 15.13 15.13 0 0 0 5.22 -2.86 5.58 5.58 0 0 1 -2.74 -1.53 5.29 5.29 0 0 1 -0.55 -0.7 6.27 6.27 0 0 0 -2.41 1.58C-1 17.65 0.34 23.18 0.69 23.53A6 6 0 0 0 3.4 24a10.71 10.71 0 0 0 7.66 -3.24 6.32 6.32 0 0 0 1.59 -2.44\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.59 12.51c-0.08 -0.74 -0.12 -1.46 -0.13 -2.15a14.89 14.89 0 0 0 -2.21 -2.45 0.75 0.75 0 0 1 0.9 -1.2 10.09 10.09 0 0 1 1.41 1.38 13.7 13.7 0 0 1 0.73 -3.28 0.75 0.75 0 1 1 1.41 0.5 16.16 16.16 0 0 0 -0.61 7.14 5.63 5.63 0 0 0 0.59 -0.14 5 5 0 0 1 2.49 -2.2 5.85 5.85 0 0 0 0.4 -2.06c0.13 -5.43 -4 -8 -4.4 -8 -0.43 0 -4.65 2.4 -4.79 7.82 -0.07 2.78 1.46 4.47 4.21 4.64\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18.5 11.54a4.84 4.84 0 0 0 -1.5 -0.27 3.33 3.33 0 0 0 -3 1.83 9.64 9.64 0 0 1 3.54 1.59 0.75 0.75 0 0 1 0.15 1.05 0.77 0.77 0 0 1 -0.6 0.3 0.74 0.74 0 0 1 -0.45 -0.15 8.42 8.42 0 0 0 -3.18 -1.38A3.54 3.54 0 0 0 16 19a8.89 8.89 0 0 0 2.85 0.47c2.72 0 4.63 -1.32 4.87 -2 0.33 -0.99 -1.06 -4.54 -5.22 -5.93\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
