
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

const BATCH = [{"setName":"icon/status/pending","name":"pending","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Hourglass--Streamline-Ultimate\">\n  <desc>\n    Hourglass Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M20.5 22H19v-3.5a7 7 0 0 0 -4.4 -6.5A7 7 0 0 0 19 5.5V2h1.5a1 1 0 0 0 0 -2h-17a1 1 0 0 0 0 2H5v3.5A7 7 0 0 0 9.4 12 7 7 0 0 0 5 18.5V22H3.5a1 1 0 0 0 0 2h17a1 1 0 0 0 0 -2M8.19 6.92a1 1 0 0 1 0.89 -0.54h5.84A1 1 0 0 1 15.73 8a4.58 4.58 0 0 1 -7.46 0 1 1 0 0 1 -0.08 -1.08m-0.27 11.71 3 -2.94a1.55 1.55 0 0 1 2.07 0l3 2.94a1.36 1.36 0 0 1 0.27 1.6A1.46 1.46 0 0 1 15 21H9a1.44 1.44 0 0 1 -1.3 -0.76 1.35 1.35 0 0 1 0.22 -1.61\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/status/blocked","name":"blocked","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Tags-Block--Streamline-Ultimate\">\n  <desc>\n    Tags Block Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M9.25 17a7.34 7.34 0 0 1 2.07 -4.73c2.68 -2.88 5 -3.27 7.08 -3a0.54 0.54 0 0 0 0.43 -0.14l0.52 -0.54a4 4 0 0 0 1 -2.41v-4a2 2 0 0 0 -0.6 -1.35 2 2 0 0 0 -1.41 -0.58h-4.26a4 4 0 0 0 -2.42 1L0.84 12.08a2 2 0 0 0 0 2.83l4.83 4.84a2 2 0 0 0 1.42 0.58 1.92 1.92 0 0 0 1.41 -0.6l0.73 -0.73a0.48 0.48 0 0 0 0.13 -0.43A8.62 8.62 0 0 1 9.25 17m3.59 -11.25a2 2 0 1 1 2 2 2 2 0 0 1 -2 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.25 10.75a6.5 6.5 0 1 0 6.5 6.5 6.51 6.51 0 0 0 -6.5 -6.5m0 11a4.51 4.51 0 0 1 -2.1 -0.53A0.29 0.29 0 0 1 15 21a0.27 0.27 0 0 1 0.07 -0.21l5.73 -5.73A0.28 0.28 0 0 1 21 15a0.26 0.26 0 0 1 0.19 0.13 4.48 4.48 0 0 1 -4 6.6Zm2.1 -8.47a0.26 0.26 0 0 1 0.13 0.19 0.28 0.28 0 0 1 -0.07 0.21l-5.73 5.73a0.28 0.28 0 0 1 -0.21 0.07 0.29 0.29 0 0 1 -0.19 -0.13 4.48 4.48 0 0 1 6.07 -6.07\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/stop","name":"stop","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Button-Stop--Streamline-Ultimate\">\n  <desc>\n    Button Stop Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12 24A12 12 0 1 0 0 12a12 12 0 0 0 12 12M7.5 9A1.5 1.5 0 0 1 9 7.5h6A1.5 1.5 0 0 1 16.5 9v6a1.5 1.5 0 0 1 -1.5 1.5H9A1.5 1.5 0 0 1 7.5 15Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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