
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
  xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}

const BATCH = [{"setName":"icon/misc/projector","name":"projector","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Video-Projector--Streamline-Ultimate\">\n  <desc>\n    Video Projector Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"m9.34 9.94 7.2 -4a0.5 0.5 0 0 0 0 -0.88l-7.2 -4a0.5 0.5 0 0 0 -0.49 0 0.48 0.48 0 0 0 -0.25 0.43v8a0.48 0.48 0 0 0 0.25 0.43 0.55 0.55 0 0 0 0.49 0.02\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.5 10.5a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M4 6a1 1 0 0 0 -1 -1H2a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M2 2a1 1 0 0 0 0 -2H1a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.5 9.5h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7 15a1 1 0 0 0 -1 -1H5a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 14h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22 5h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 0h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.5 17h-2.26a0.25 0.25 0 0 0 -0.25 0.23 3 3 0 0 1 -6 0 0.25 0.25 0 0 0 -0.23 -0.23H8.5A2.5 2.5 0 0 0 6 19.5v1a1.52 1.52 0 0 0 0.5 1.11V23a1 1 0 0 0 2 0v-0.75a0.25 0.25 0 0 1 0.25 -0.25h8.5a0.25 0.25 0 0 1 0.25 0.25V23a1 1 0 0 0 2 0v-1.39a1.52 1.52 0 0 0 0.5 -1.11v-1a2.5 2.5 0 0 0 -2.5 -2.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 19a2 2 0 1 0 -2 -2 2 2 0 0 0 2 2m-0.75 -2a0.75 0.75 0 1 1 0.75 0.75 0.76 0.76 0 0 1 -0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/wrench","name":"wrench","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wrench--Streamline-Ultimate\">\n  <desc>\n    Wrench Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.58 5a0.5 0.5 0 0 0 -0.36 -0.34 0.5 0.5 0 0 0 -0.47 0.13l-3.56 3.55a0.48 0.48 0 0 1 -0.39 0.15l-2.6 -0.24a0.49 0.49 0 0 1 -0.45 -0.45l-0.24 -2.6a0.52 0.52 0 0 1 0.15 -0.4l3.56 -3.55a0.53 0.53 0 0 0 0.13 -0.48 0.48 0.48 0 0 0 -0.35 -0.35 7.17 7.17 0 0 0 -7.13 1.84 7 7 0 0 0 -1.59 7.51 0.5 0.5 0 0 1 -0.11 0.53L0.91 19.56a2.6 2.6 0 0 0 -0.6 2.85 2.52 2.52 0 0 0 4.06 0.76l9.33 -9.34a0.49 0.49 0 0 1 0.53 -0.1 7 7 0 0 0 7.5 -1.57A7.19 7.19 0 0 0 23.58 5\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
