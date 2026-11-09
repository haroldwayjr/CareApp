
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

const BATCH = [{"setName": "icon/files/notes", "name": "notes", "category": "files", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Notes-Add--Streamline-Ultimate\">\n  <desc>\n    Notes Add Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M17.5 11a6.5 6.5 0 1 0 6.5 6.5 6.51 6.51 0 0 0 -6.5 -6.5m2.5 7.25h-1.5a0.25 0.25 0 0 0 -0.25 0.25V20a0.75 0.75 0 0 1 -1.5 0v-1.5a0.25 0.25 0 0 0 -0.25 -0.25H15a0.75 0.75 0 0 1 0 -1.5h1.5a0.25 0.25 0 0 0 0.25 -0.25V15a0.75 0.75 0 0 1 1.5 0v1.5a0.25 0.25 0 0 0 0.25 0.25H20a0.75 0.75 0 0 1 0 1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 4.75V5a1 1 0 0 0 2 0v-0.25a0.25 0.25 0 0 1 0.25 -0.25h1a0.25 0.25 0 0 1 0.25 0.25v4.7a0.24 0.24 0 0 0 0.3 0.24 8.7 8.7 0 0 1 1.46 -0.19 0.24 0.24 0 0 0 0.24 -0.24V4.5a2 2 0 0 0 -2 -2h-1.25a0.25 0.25 0 0 1 -0.25 -0.25V1a1 1 0 0 0 -2 0v1.25a0.25 0.25 0 0 1 -0.25 0.25h-1.5a0.25 0.25 0 0 1 -0.25 -0.25V1a1 1 0 0 0 -2 0v1.25a0.25 0.25 0 0 1 -0.25 0.25h-1.5A0.25 0.25 0 0 1 6 2.25V1a1 1 0 0 0 -2 0v1.25a0.25 0.25 0 0 1 -0.25 0.25H2a2 2 0 0 0 -2 2v13a2 2 0 0 0 2 2h7.45a0.24 0.24 0 0 0 0.24 -0.3 8.7 8.7 0 0 1 -0.19 -1.46 0.24 0.24 0 0 0 -0.24 -0.24h-7a0.25 0.25 0 0 1 -0.26 -0.25V4.75a0.25 0.25 0 0 1 0.25 -0.25h1.5a0.25 0.25 0 0 1 0.25 0.25V5a1 1 0 0 0 2 0v-0.25a0.25 0.25 0 0 1 0.25 -0.25h1.5a0.25 0.25 0 0 1 0.25 0.25V5a1 1 0 0 0 2 0v-0.25a0.25 0.25 0 0 1 0.25 -0.25h1.5a0.25 0.25 0 0 1 0.25 0.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}, {"setName": "icon/files/cloud", "name": "cloud", "category": "files", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Cloud--Streamline-Ultimate\">\n  <desc>\n    Cloud Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.75 13.87A5.71 5.71 0 0 0 22 9.78a5.61 5.61 0 0 0 -3.37 -1.55 0.28 0.28 0 0 1 -0.19 -0.12 7.53 7.53 0 0 0 -13.8 2.24 0.24 0.24 0 0 1 -0.23 0.19A4.51 4.51 0 0 0 0.25 15a4.25 4.25 0 0 0 1.21 3.15A5.29 5.29 0 0 0 5 19.54h13.67a5.68 5.68 0 0 0 5.08 -5.67m-5.28 3.67H5a3.24 3.24 0 0 1 -2.1 -0.77A2.29 2.29 0 0 1 2.25 15a2.53 2.53 0 0 1 0.92 -1.95 2.56 2.56 0 0 1 1.58 -0.56 2.24 2.24 0 0 1 0.52 0.06 1 1 0 0 0 0.81 -0.19 1 1 0 0 0 0.39 -0.73 5.54 5.54 0 0 1 10.53 -2 1 1 0 0 0 0.94 0.57 3.67 3.67 0 0 1 3.81 3.67 3.7 3.7 0 0 1 -3.28 3.67\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}, {"setName": "icon/files/server", "name": "server", "category": "files", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Server--Streamline-Ultimate\">\n  <desc>\n    Server Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M24 6a1.5 1.5 0 0 0 -1.5 -1.5h-21A1.5 1.5 0 0 0 0 6v2.5A1.5 1.5 0 0 0 1.5 10h21A1.5 1.5 0 0 0 24 8.5ZM3.25 7.25A1.25 1.25 0 1 1 4.5 8.5a1.25 1.25 0 0 1 -1.25 -1.25M8.5 8.5a1.25 1.25 0 1 1 1.25 -1.25A1.25 1.25 0 0 1 8.5 8.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.74 2.05 18.84 0.11a1 1 0 0 0 -0.45 -0.11H5.63a1 1 0 0 0 -0.45 0.11L1.29 2.05a0.5 0.5 0 0 0 0.22 1h21a0.5 0.5 0 0 0 0.49 -0.43 0.52 0.52 0 0 0 -0.26 -0.57\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M24 13a1.5 1.5 0 0 0 -1.5 -1.5h-21A1.5 1.5 0 0 0 0 13v2.5A1.5 1.5 0 0 0 1.5 17h9.25a0.25 0.25 0 0 1 0.25 0.25v4.5a0.25 0.25 0 0 1 -0.25 0.25H5.5a1 1 0 0 0 0 2h13a1 1 0 0 0 0 -2h-5.25a0.25 0.25 0 0 1 -0.25 -0.25v-4.5a0.25 0.25 0 0 1 0.25 -0.25h9.25a1.5 1.5 0 0 0 1.5 -1.5ZM3.25 14.25A1.25 1.25 0 1 1 4.5 15.5a1.25 1.25 0 0 1 -1.25 -1.25M8.5 15.5a1.25 1.25 0 1 1 1.25 -1.25A1.25 1.25 0 0 1 8.5 15.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 24a1 1 0 0 0 0 -2h-1a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 24h1a1 1 0 0 0 0 -2H1a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
