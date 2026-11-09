
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

const BATCH = [{"setName":"icon/status/shield","name":"shield","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Lock-Shield--Streamline-Ultimate\">\n  <desc>\n    Lock Shield Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M13.75 7.24a1.75 1.75 0 0 0 -3.5 0v1.5a0.25 0.25 0 0 0 0.25 0.26h3a0.25 0.25 0 0 0 0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M24 2a2 2 0 0 0 -2 -2H2a2 2 0 0 0 -2 2v7.31A15.13 15.13 0 0 0 11.86 24a0.68 0.68 0 0 0 0.2 0 0.71 0.71 0 0 0 0.2 0A15.14 15.14 0 0 0 24 9.2ZM7.5 15.49V10a1 1 0 0 1 1 -1h0.25V7.24a3.25 3.25 0 0 1 6.5 0V9h0.25a1 1 0 0 1 1 1v5.5a1 1 0 0 1 -1 1h-7a1 1 0 0 1 -1 -1.01\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.75 13.24a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/status/pending","name":"pending","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Hourglass--Streamline-Ultimate\">\n  <desc>\n    Hourglass Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M20.5 22H19v-3.5a7 7 0 0 0 -4.4 -6.5A7 7 0 0 0 19 5.5V2h1.5a1 1 0 0 0 0 -2h-17a1 1 0 0 0 0 2H5v3.5A7 7 0 0 0 9.4 12 7 7 0 0 0 5 18.5V22H3.5a1 1 0 0 0 0 2h17a1 1 0 0 0 0 -2M8.19 6.92a1 1 0 0 1 0.89 -0.54h5.84A1 1 0 0 1 15.73 8a4.58 4.58 0 0 1 -7.46 0 1 1 0 0 1 -0.08 -1.08m-0.27 11.71 3 -2.94a1.55 1.55 0 0 1 2.07 0l3 2.94a1.36 1.36 0 0 1 0.27 1.6A1.46 1.46 0 0 1 15 21H9a1.44 1.44 0 0 1 -1.3 -0.76 1.35 1.35 0 0 1 0.22 -1.61\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/status/blocked","name":"blocked","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Tags-Block--Streamline-Ultimate\">\n  <desc>\n    Tags Block Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M9.25 17a7.34 7.34 0 0 1 2.07 -4.73c2.68 -2.88 5 -3.27 7.08 -3a0.54 0.54 0 0 0 0.43 -0.14l0.52 -0.54a4 4 0 0 0 1 -2.41v-4a2 2 0 0 0 -0.6 -1.35 2 2 0 0 0 -1.41 -0.58h-4.26a4 4 0 0 0 -2.42 1L0.84 12.08a2 2 0 0 0 0 2.83l4.83 4.84a2 2 0 0 0 1.42 0.58 1.92 1.92 0 0 0 1.41 -0.6l0.73 -0.73a0.48 0.48 0 0 0 0.13 -0.43A8.62 8.62 0 0 1 9.25 17m3.59 -11.25a2 2 0 1 1 2 2 2 2 0 0 1 -2 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.25 10.75a6.5 6.5 0 1 0 6.5 6.5 6.51 6.51 0 0 0 -6.5 -6.5m0 11a4.51 4.51 0 0 1 -2.1 -0.53A0.29 0.29 0 0 1 15 21a0.27 0.27 0 0 1 0.07 -0.21l5.73 -5.73A0.28 0.28 0 0 1 21 15a0.26 0.26 0 0 1 0.19 0.13 4.48 4.48 0 0 1 -4 6.6Zm2.1 -8.47a0.26 0.26 0 0 1 0.13 0.19 0.28 0.28 0 0 1 -0.07 0.21l-5.73 5.73a0.28 0.28 0 0 1 -0.21 0.07 0.29 0.29 0 0 1 -0.19 -0.13 4.48 4.48 0 0 1 6.07 -6.07\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/stop","name":"stop","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Button-Stop--Streamline-Ultimate\">\n  <desc>\n    Button Stop Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12 24A12 12 0 1 0 0 12a12 12 0 0 0 12 12M7.5 9A1.5 1.5 0 0 1 9 7.5h6A1.5 1.5 0 0 1 16.5 9v6a1.5 1.5 0 0 1 -1.5 1.5H9A1.5 1.5 0 0 1 7.5 15Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/media/volume.off","name":"volume-off","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Volume-Control-Off--Streamline-Ultimate\">\n  <desc>\n    Volume Control Off Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M14.68 6.06a0.29 0.29 0 0 0 0.07 -0.18V3.75a1 1 0 0 0 -1.75 -0.7L7.12 9a0.25 0.25 0 0 1 -0.18 0.08H4.75a2 2 0 0 0 -2 2v3.41a2 2 0 0 0 1.42 1.91 0.23 0.23 0 0 0 0.25 -0.06Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.71 1.71a1 1 0 0 0 0 -1.41 1 1 0 0 0 -1.42 0l-22 22a1 1 0 0 0 0 1.41 0.79 0.79 0 0 0 0.15 0.12 1 1 0 0 0 1.27 -0.12l6.11 -6.12a0.27 0.27 0 0 1 0.36 0L13 22.46a1 1 0 0 0 1.71 -0.71v-11a0.29 0.29 0 0 1 0.07 -0.18Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/mic","name":"mic","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Microphone--Streamline-Ultimate\">\n  <desc>\n    Microphone Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M12 16a4.51 4.51 0 0 0 4.5 -4.5v-7a4.5 4.5 0 0 0 -9 0v7A4.51 4.51 0 0 0 12 16\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 8a1 1 0 0 0 -1 1v2.5a6 6 0 0 1 -12 0V9a1 1 0 0 0 -2 0v2.5a8 8 0 0 0 6.79 7.91 0.25 0.25 0 0 1 0.21 0.24V23a1 1 0 0 0 2 0v-3.35a0.25 0.25 0 0 1 0.21 -0.24A8 8 0 0 0 20 11.5V9a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/film","name":"film","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Movies-Film--Streamline-Ultimate\">\n  <desc>\n    Movies Film Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M1 0a1 1 0 0 0 -1 1v22a1 1 0 0 0 2 0V1a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 0a1 1 0 0 0 -1 1v22a1 1 0 0 0 2 0V1a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8 0h8s2 0 2 2v6s0 2 -2 2H8s-2 0 -2 -2V2s0 -2 2 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8 14h8s2 0 2 2v6s0 2 -2 2H8s-2 0 -2 -2v-6s0 -2 2 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 3a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 3a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 9a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 9a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 15a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 15a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 21a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 21a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
