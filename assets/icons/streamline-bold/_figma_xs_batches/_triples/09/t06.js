
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

const BATCH = [{"setName":"icon/files/folder","name":"folder","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Folder--Streamline-Ultimate\">\n  <desc>\n    Folder Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M20 6.5h-9.5a0.51 0.51 0 0 1 -0.36 -0.15L8.8 5a1.52 1.52 0 0 0 -1.08 -0.5H4.29A1.79 1.79 0 0 0 2.5 6.29v11.42a1.79 1.79 0 0 0 1.79 1.79h15.42a1.79 1.79 0 0 0 1.79 -1.79V8A1.5 1.5 0 0 0 20 6.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/files/tag","name":"tag","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Tag-New--Streamline-Ultimate\">\n  <desc>\n    Tag New Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M1 4.5h22a1 1 0 0 0 0 -2H1a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 19.5H1a1 1 0 0 0 0 2h22a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.71 8.5v1.7a0.26 0.26 0 0 1 -0.19 0.25 0.28 0.28 0 0 1 -0.29 -0.13L4.1 8.05a1 1 0 0 0 -1.89 0.45v7a1 1 0 0 0 2 0v-1.7a0.26 0.26 0 0 1 0.19 -0.25 0.26 0.26 0 0 1 0.28 0.13L5.81 16a1 1 0 0 0 0.9 0.55l0.23 0a1 1 0 0 0 0.77 -1v-7a1 1 0 0 0 -2 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.38 9.5h2.33a1 1 0 0 0 0 -2h-2.33a2.17 2.17 0 0 0 -2.17 2.17v4.66a2.17 2.17 0 0 0 2.17 2.17h2.33a1 1 0 0 0 0 -2h-2.33a0.16 0.16 0 0 1 -0.17 -0.17v-1.08a0.25 0.25 0 0 1 0.25 -0.25h1.08a1 1 0 0 0 0 -2h-1.08a0.25 0.25 0 0 1 -0.25 -0.25V9.67a0.16 0.16 0 0 1 0.17 -0.17\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m20.29 8.43 -0.2 2.91a0.14 0.14 0 0 1 -0.1 0.11 0.13 0.13 0 0 1 -0.14 -0.06 1 1 0 0 0 -1.79 0 0.11 0.11 0 0 1 -0.13 0.06 0.11 0.11 0 0 1 -0.1 -0.11l-0.21 -2.91a1 1 0 1 0 -2 0.14l0.5 7A1 1 0 0 0 18 16l0.71 -1.43a0.25 0.25 0 0 1 0.23 -0.14 0.24 0.24 0 0 1 0.22 0.14L19.9 16a1 1 0 0 0 0.89 0.55l0.2 0a1 1 0 0 0 0.8 -0.91l0.5 -7a1 1 0 1 0 -2 -0.14Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/file.code","name":"file-code","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Common-File-Dash--Streamline-Ultimate\">\n  <desc>\n    Common File Dash Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M3 4a1 1 0 0 1 -1 -1V2a2 2 0 0 1 2 -2h1.5a1 1 0 0 1 0 2H4v1a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.5 22a1 1 0 0 1 0 2H4a2 2 0 0 1 -2 -2v-1a1 1 0 0 1 2 0v1Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20 24h-1.5a1 1 0 0 1 0 -2H20v-1a1 1 0 0 1 2 0v1a2 2 0 0 1 -2 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17 3a1 1 0 0 1 -0.71 -0.29l-0.7 -0.71H14.5a1 1 0 0 1 0 -2h1.09A2 2 0 0 1 17 0.59l0.71 0.7a1 1 0 0 1 0 1.42A1 1 0 0 1 17 3\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 9a1 1 0 0 1 -1 -1V6.5a1 1 0 0 1 2 0V8a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.75 2h-1.5a1 1 0 0 1 0 -2h1.5a1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.5 24H9a1 1 0 0 1 0 -2h1.5a1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15 24h-1.5a1 1 0 0 1 0 -2H15a1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 13.5a1 1 0 0 1 -1 -1V11a1 1 0 0 1 2 0v1.5a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 18.5a1 1 0 0 1 -1 -1V16a1 1 0 0 1 2 0v1.5a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21 9a1 1 0 0 1 -1 -1V6.91l-0.71 -0.7a1 1 0 0 1 1.42 -1.42l0.7 0.71A2 2 0 0 1 22 6.91V8a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21 13.5a1 1 0 0 1 -1 -1V11a1 1 0 0 1 2 0v1.5a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21 18.5a1 1 0 0 1 -1 -1V16a1 1 0 0 1 2 0v1.5a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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