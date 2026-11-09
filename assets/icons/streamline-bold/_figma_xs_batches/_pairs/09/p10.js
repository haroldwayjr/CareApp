
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

const BATCH = [{"setName":"icon/files/file.code","name":"file-code","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Common-File-Dash--Streamline-Ultimate\">\n  <desc>\n    Common File Dash Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M3 4a1 1 0 0 1 -1 -1V2a2 2 0 0 1 2 -2h1.5a1 1 0 0 1 0 2H4v1a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.5 22a1 1 0 0 1 0 2H4a2 2 0 0 1 -2 -2v-1a1 1 0 0 1 2 0v1Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20 24h-1.5a1 1 0 0 1 0 -2H20v-1a1 1 0 0 1 2 0v1a2 2 0 0 1 -2 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17 3a1 1 0 0 1 -0.71 -0.29l-0.7 -0.71H14.5a1 1 0 0 1 0 -2h1.09A2 2 0 0 1 17 0.59l0.71 0.7a1 1 0 0 1 0 1.42A1 1 0 0 1 17 3\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 9a1 1 0 0 1 -1 -1V6.5a1 1 0 0 1 2 0V8a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.75 2h-1.5a1 1 0 0 1 0 -2h1.5a1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.5 24H9a1 1 0 0 1 0 -2h1.5a1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15 24h-1.5a1 1 0 0 1 0 -2H15a1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 13.5a1 1 0 0 1 -1 -1V11a1 1 0 0 1 2 0v1.5a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 18.5a1 1 0 0 1 -1 -1V16a1 1 0 0 1 2 0v1.5a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21 9a1 1 0 0 1 -1 -1V6.91l-0.71 -0.7a1 1 0 0 1 1.42 -1.42l0.7 0.71A2 2 0 0 1 22 6.91V8a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21 13.5a1 1 0 0 1 -1 -1V11a1 1 0 0 1 2 0v1.5a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21 18.5a1 1 0 0 1 -1 -1V16a1 1 0 0 1 2 0v1.5a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/document","name":"document","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Document--Streamline-Ultimate\">\n  <desc>\n    Document Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M6.48 20.67a9.4 9.4 0 0 1 -6.13 -2.29 1 1 0 0 1 -0.35 -0.76V4.35a1 1 0 0 1 1 -1h22a1 1 0 0 1 1 1v13.27a1 1 0 0 1 -1.62 0.79l-0.15 -0.12a7.63 7.63 0 0 0 -9.6 0.11l-0.49 0.37a9.41 9.41 0 0 1 -5.66 1.9M2 17.15a7.4 7.4 0 0 0 8.94 0l0.46 -0.35A9.59 9.59 0 0 1 22 15.77V5.35H2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
