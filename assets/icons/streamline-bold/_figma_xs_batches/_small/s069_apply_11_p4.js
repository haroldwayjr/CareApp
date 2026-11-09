
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

const BATCH = [{"setName":"icon/files/shelf","name":"shelf","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Shelf-Tv--Streamline-Ultimate\">\n  <desc>\n    Shelf Tv Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M24 13.5a1.5 1.5 0 0 0 -1.5 -1.5h-9a0.5 0.5 0 0 1 -0.5 -0.5V11a0.5 0.5 0 0 1 0.5 -0.5H18a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2H6a2 2 0 0 0 -2 2v6.5a2 2 0 0 0 2 2h4.5a0.5 0.5 0 0 1 0.5 0.5v0.5a0.5 0.5 0 0 1 -0.5 0.5h-9A1.5 1.5 0 0 0 0 13.5v10a0.5 0.5 0 0 0 0.5 0.5H4a0.48 0.48 0 0 0 0.48 -0.37L5 21.58A1.29 1.29 0 0 1 6 21h12a1.31 1.31 0 0 1 1 0.58l0.57 2.06A0.5 0.5 0 0 0 20 24h3.5a0.5 0.5 0 0 0 0.5 -0.5Zm-13.5 4a0.5 0.5 0 0 1 -0.5 0.5H3a0.5 0.5 0 0 1 -0.5 -0.5v-2A0.5 0.5 0 0 1 3 15h7a0.5 0.5 0 0 1 0.5 0.5Zm-4 -9A0.5 0.5 0 0 1 6 8V2.5a0.5 0.5 0 0 1 0.5 -0.5h11a0.5 0.5 0 0 1 0.5 0.5V8a0.5 0.5 0 0 1 -0.5 0.5Zm15 9a0.5 0.5 0 0 1 -0.5 0.5h-7a0.5 0.5 0 0 1 -0.5 -0.5v-2a0.5 0.5 0 0 1 0.5 -0.5h7a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/files/folder.star","name":"folder-star","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Folder-Star--Streamline-Ultimate\">\n  <desc>\n    Folder Star Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M12.26 13h1a0.51 0.51 0 0 0 0.46 -0.3c0.25 -0.59 0.8 -1.84 0.81 -1.87a3.3 3.3 0 0 1 5.89 0l0.15 0.35a0.21 0.21 0 0 0 0.41 0V4.5A1.5 1.5 0 0 0 19.5 3H9.62a0.51 0.51 0 0 1 -0.45 -0.28L8.22 0.83A1.49 1.49 0 0 0 6.88 0H1.5A1.5 1.5 0 0 0 0 1.5v15A1.5 1.5 0 0 0 1.5 18h7.63a0.25 0.25 0 0 0 0.22 -0.37A3.18 3.18 0 0 1 9.24 15a3.23 3.23 0 0 1 3.02 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.61 17.14a1.28 1.28 0 0 0 0.3 -1.38 1.23 1.23 0 0 0 -1.17 -0.76h-2.5a0.25 0.25 0 0 1 -0.23 -0.15l-1.35 -3.12a1.29 1.29 0 0 0 -2.3 0L15 14.85a0.25 0.25 0 0 1 -0.23 0.15h-2.5a1.23 1.23 0 0 0 -1.17 0.76 1.28 1.28 0 0 0 0.3 1.38l2.21 2a0.26 0.26 0 0 1 0.07 0.29l-1.23 2.81a1.29 1.29 0 0 0 1.82 1.62l3.12 -1.75a0.21 0.21 0 0 1 0.24 0l3.12 1.75a1.29 1.29 0 0 0 1.82 -1.62l-1.24 -2.84a0.26 0.26 0 0 1 0.07 -0.29Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/commerce/gift","name":"gift","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Gift-Box--Streamline-Ultimate\">\n  <desc>\n    Gift Box Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M13 12a0.5 0.5 0 0 0 0.5 0.5H22a1.76 1.76 0 0 0 1.75 -1.75v-2A1.75 1.75 0 0 0 22 7h-8.5a0.5 0.5 0 0 0 -0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3.75 12.5H11a0.5 0.5 0 0 0 0.5 -0.5V7.5A0.5 0.5 0 0 0 11 7H2A1.75 1.75 0 0 0 0.25 8.75v2A1.76 1.76 0 0 0 2 12.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.5 14.5a0.5 0.5 0 0 0 -0.5 -0.5H2.75a0.5 0.5 0 0 0 -0.5 0.5v7.75A1.76 1.76 0 0 0 4 24h7a0.5 0.5 0 0 0 0.5 -0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13.5 14a0.5 0.5 0 0 0 -0.5 0.5v9a0.5 0.5 0 0 0 0.5 0.5H20a1.76 1.76 0 0 0 1.75 -1.75V14.5a0.5 0.5 0 0 0 -0.5 -0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13 6.71A1 1 0 0 0 14 7c1.18 -0.29 4 -1 4.89 -1.92A3 3 0 0 0 14.7 0.86c-0.75 0.76 -1.48 3.08 -1.92 4.9a1 1 0 0 0 0.22 0.95m3.08 -4.43a1 1 0 1 1 1.35 1.35 8.79 8.79 0 0 1 -2.28 0.93 8.79 8.79 0 0 1 0.97 -2.28Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.72 5.76c-0.44 -1.82 -1.17 -4.14 -1.92 -4.9a3 3 0 1 0 -4.18 4.19c0.86 0.87 3.71 1.63 4.89 1.92a1 1 0 0 0 1 -0.26 1 1 0 0 0 0.21 -0.95M7 3.63a1 1 0 0 1 1.38 -1.35 8.79 8.79 0 0 1 0.93 2.28A8.79 8.79 0 0 1 7 3.63\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/commerce/barcode","name":"barcode","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Barcode--Streamline-Ultimate\">\n  <desc>\n    Barcode Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M5 7a1 1 0 0 0 -1 1v7.5a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.5 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.5 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 7a1 1 0 0 0 -1 1v7.5a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21 3H3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3h18a3 3 0 0 0 3 -3V6a3 3 0 0 0 -3 -3m1 15a1 1 0 0 1 -1 1H3a1 1 0 0 1 -1 -1V6a1 1 0 0 1 1 -1h18a1 1 0 0 1 1 1Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
