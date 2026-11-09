
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

const BATCH = [{"setName":"icon/media/volume.off","name":"volume-off","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Volume-Control-Off--Streamline-Ultimate\">\n  <desc>\n    Volume Control Off Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M14.68 6.06a0.29 0.29 0 0 0 0.07 -0.18V3.75a1 1 0 0 0 -1.75 -0.7L7.12 9a0.25 0.25 0 0 1 -0.18 0.08H4.75a2 2 0 0 0 -2 2v3.41a2 2 0 0 0 1.42 1.91 0.23 0.23 0 0 0 0.25 -0.06Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.71 1.71a1 1 0 0 0 0 -1.41 1 1 0 0 0 -1.42 0l-22 22a1 1 0 0 0 0 1.41 0.79 0.79 0 0 0 0.15 0.12 1 1 0 0 0 1.27 -0.12l6.11 -6.12a0.27 0.27 0 0 1 0.36 0L13 22.46a1 1 0 0 0 1.71 -0.71v-11a0.29 0.29 0 0 1 0.07 -0.18Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/mic","name":"mic","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Microphone--Streamline-Ultimate\">\n  <desc>\n    Microphone Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M12 16a4.51 4.51 0 0 0 4.5 -4.5v-7a4.5 4.5 0 0 0 -9 0v7A4.51 4.51 0 0 0 12 16\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 8a1 1 0 0 0 -1 1v2.5a6 6 0 0 1 -12 0V9a1 1 0 0 0 -2 0v2.5a8 8 0 0 0 6.79 7.91 0.25 0.25 0 0 1 0.21 0.24V23a1 1 0 0 0 2 0v-3.35a0.25 0.25 0 0 1 0.21 -0.24A8 8 0 0 0 20 11.5V9a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/film","name":"film","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Movies-Film--Streamline-Ultimate\">\n  <desc>\n    Movies Film Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M1 0a1 1 0 0 0 -1 1v22a1 1 0 0 0 2 0V1a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 0a1 1 0 0 0 -1 1v22a1 1 0 0 0 2 0V1a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8 0h8s2 0 2 2v6s0 2 -2 2H8s-2 0 -2 -2V2s0 -2 2 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8 14h8s2 0 2 2v6s0 2 -2 2H8s-2 0 -2 -2v-6s0 -2 2 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 3a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 3a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 9a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 9a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 15a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 15a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 21a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 21a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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