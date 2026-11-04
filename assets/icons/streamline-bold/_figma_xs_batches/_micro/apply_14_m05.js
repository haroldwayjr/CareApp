
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

const BATCH = [{"setName": "icon/commerce/receipt", "name": "receipt", "category": "commerce", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Receipt--Streamline-Ultimate\">\n  <desc>\n    Receipt Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M24 1.24a1 1 0 0 0 -1 -1H10.58c-1.36 0 -2 1.27 -2 2.47A98.4 98.4 0 0 1 7.7 16a0.25 0.25 0 0 1 -0.24 0.21h-3c-2 0 -2.22 2.07 -2.34 3.3C2 21.48 1.73 21.75 1 21.75a1 1 0 1 0 0 2h11.5c2.38 0 2.72 -2.36 2.92 -3.76 0.17 -1.18 0.3 -1.74 0.58 -1.74h0.41a0.25 0.25 0 0 1 0.24 0.17c0.06 0.19 0.12 0.45 0.16 0.64 0.2 0.94 0.56 2.69 2.69 2.69 4.07 0 4.5 -11.54 4.5 -16.48zM12.06 13.5a0.75 0.75 0 0 1 0 -1.5h6a0.75 0.75 0 0 1 0 1.5Zm-0.25 -8.75a0.75 0.75 0 0 1 0.75 -0.75h2a0.75 0.75 0 1 1 0 1.5h-2a0.75 0.75 0 0 1 -0.75 -0.75m6.75 4.75h-5.75a0.75 0.75 0 0 1 0 -1.5h5.75a0.75 0.75 0 0 1 0 1.5m-5.13 10.2c-0.25 1.77 -0.45 2.05 -0.94 2.05H4.11a0.28 0.28 0 0 1 -0.2 -0.1 0.26 0.26 0 0 1 0 -0.21 10.34 10.34 0 0 0 0.27 -1.69 4.61 4.61 0 0 1 0.28 -1.49h9a0.25 0.25 0 0 1 0.24 0.31c-0.16 0.43 -0.22 0.78 -0.27 1.13\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}, {"setName": "icon/commerce/qr.code", "name": "qr-code", "category": "commerce", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Qr-Code--Streamline-Ultimate\">\n  <desc>\n    Qr Code Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M1 8h6a1 1 0 0 0 1 -1V1a1 1 0 0 0 -1 -1H1a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1m1 -5.75A0.25 0.25 0 0 1 2.25 2h3.5a0.25 0.25 0 0 1 0.25 0.25v3.5a0.25 0.25 0 0 1 -0.25 0.25h-3.5A0.25 0.25 0 0 1 2 5.75Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7 16H1a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1m-1 5.75a0.25 0.25 0 0 1 -0.25 0.25h-3.5a0.25 0.25 0 0 1 -0.25 -0.25v-3.5a0.25 0.25 0 0 1 0.25 -0.25h3.5a0.25 0.25 0 0 1 0.25 0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 0h-6a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1V1a1 1 0 0 0 -1 -1m-1 5.75a0.25 0.25 0 0 1 -0.25 0.25h-3.5a0.25 0.25 0 0 1 -0.25 -0.25v-3.5a0.25 0.25 0 0 1 0.25 -0.25h3.5a0.25 0.25 0 0 1 0.25 0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10 4.25h1a0.75 0.75 0 0 0 0 -1.5 0.25 0.25 0 0 1 -0.25 -0.25V1a0.75 0.75 0 0 0 -1.5 0v2.5a0.76 0.76 0 0 0 0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13 1.75a0.25 0.25 0 0 1 0.25 0.25v5.5a0.75 0.75 0 0 0 1.5 0V1A0.76 0.76 0 0 0 14 0.25h-1a0.76 0.76 0 0 0 -0.75 0.75 0.76 0.76 0 0 0 0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.75 10.5a0.76 0.76 0 0 0 0.75 0.75H10a0.76 0.76 0 0 0 0.75 -0.75v-4a0.75 0.75 0 0 0 -1.5 0v3a0.25 0.25 0 0 1 -0.25 0.25H6.5a0.76 0.76 0 0 0 -0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 9.75a0.76 0.76 0 0 0 -0.75 0.75V13a0.25 0.25 0 0 1 -0.25 0.25H1a0.75 0.75 0 0 0 0 1.5h13a0.76 0.76 0 0 0 0.75 -0.75v-3a0.75 0.75 0 0 0 -1.5 0v2a0.25 0.25 0 0 1 -0.25 0.25H4a0.25 0.25 0 0 1 -0.25 -0.25v-2.5A0.76 0.76 0 0 0 3 9.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13.75 17a0.76 0.76 0 0 0 -0.75 -0.75h-3a0.76 0.76 0 0 0 -0.75 0.75v4a0.75 0.75 0 0 0 1.5 0v-3a0.25 0.25 0 0 1 0.25 -0.25h2a0.76 0.76 0 0 0 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 22.25h-8.5a0.25 0.25 0 0 1 -0.25 -0.25v-2a0.75 0.75 0 0 0 -1.5 0v3a0.76 0.76 0 0 0 0.75 0.75H23a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16.5 20.25h3a0.76 0.76 0 0 0 0.75 -0.75v-3a0.76 0.76 0 0 0 -0.75 -0.75h-3a0.76 0.76 0 0 0 -0.75 0.75v3a0.76 0.76 0 0 0 0.75 0.75m0.75 -2.75a0.25 0.25 0 0 1 0.25 -0.25h1a0.25 0.25 0 0 1 0.25 0.25v1a0.25 0.25 0 0 1 -0.25 0.25h-1a0.25 0.25 0 0 1 -0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.5 12.75a0.76 0.76 0 0 0 -0.75 0.75V20a0.75 0.75 0 0 0 1.5 0v-6.5a0.76 0.76 0 0 0 -0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.25 10a0.76 0.76 0 0 0 -0.75 -0.75H17a0.76 0.76 0 0 0 -0.75 0.75v3a0.75 0.75 0 0 0 1.5 0v-2a0.25 0.25 0 0 1 0.25 -0.25h4.5a0.76 0.76 0 0 0 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}, {"setName": "icon/commerce/store", "name": "store", "category": "commerce", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Shop-Open--Streamline-Ultimate\">\n  <desc>\n    Shop Open Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M3 19.92a2.37 2.37 0 0 0 2.37 -2.38v-3a2.38 2.38 0 0 0 -4.75 0v3A2.38 2.38 0 0 0 3 19.92m-0.63 -2.38v-3a0.63 0.63 0 0 1 1.25 0v3a0.63 0.63 0 1 1 -1.25 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.5 12.17a0.87 0.87 0 0 0 -0.88 0.87v1.24a0.25 0.25 0 0 1 -0.47 0.11l-0.87 -1.74a0.87 0.87 0 0 0 -1 -0.46 0.88 0.88 0 0 0 -0.68 0.85v6a0.88 0.88 0 1 0 1.75 0v-1.23a0.24 0.24 0 0 1 0.2 -0.24 0.25 0.25 0 0 1 0.28 0.13l0.87 1.74a0.86 0.86 0 0 0 0.78 0.48l0.2 0a0.89 0.89 0 0 0 0.67 -0.86V13a0.87 0.87 0 0 0 -0.85 -0.83\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.37 14a0.13 0.13 0 0 1 0.13 -0.12h2a0.88 0.88 0 0 0 0 -1.75h-2A1.88 1.88 0 0 0 12.62 14v4a1.88 1.88 0 0 0 1.88 1.88h2a0.88 0.88 0 0 0 0 -1.75h-2a0.13 0.13 0 0 1 -0.13 -0.13v-0.87a0.25 0.25 0 0 1 0.25 -0.25h0.88a0.88 0.88 0 0 0 0 -1.75h-0.88a0.25 0.25 0 0 1 -0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.5 19.92a0.87 0.87 0 0 0 0.87 -0.92v-1.83a0.25 0.25 0 0 1 0.25 -0.25H9a2.38 2.38 0 0 0 0 -4.75H7.5a0.87 0.87 0 0 0 -0.88 0.87v6a0.87 0.87 0 0 0 0.88 0.88m0.87 -5.75a0.25 0.25 0 0 1 0.25 -0.25H9a0.63 0.63 0 0 1 0 1.25h-0.38a0.25 0.25 0 0 1 -0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.5 22h-17a1 1 0 0 0 0 2h17a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.75 5.48a0.13 0.13 0 0 0 0 -0.06c-0.12 -0.42 -1.2 -4.33 -1.44 -5.24a0.26 0.26 0 0 0 -0.25 -0.18H13a0.25 0.25 0 0 0 -0.25 0.25v9.36a0.25 0.25 0 0 0 0.14 0.23 4.81 4.81 0 0 0 2.47 0.46 4.91 4.91 0 0 0 2.38 -0.85Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M24 5.07 22.24 1a1.51 1.51 0 0 0 -1.36 -1h-2.75a0.24 0.24 0 0 0 -0.19 0.1 0.25 0.25 0 0 0 -0.05 0.22l1.33 4.83a0.64 0.64 0 0 1 0 0.2v3.57a0.25 0.25 0 0 0 0.16 0.23 3.34 3.34 0 0 0 4.59 -3v-0.88a0.74 0.74 0 0 0 0.03 -0.2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.25 0.25A0.25 0.25 0 0 0 11 0H7.93a0.26 0.26 0 0 0 -0.24 0.18C7.45 1.09 6.37 5 6.26 5.42a0.13 0.13 0 0 0 0 0.06V9.3a0.24 0.24 0 0 0 0.11 0.21 4.94 4.94 0 0 0 2.29 0.79h0.4a4.68 4.68 0 0 0 2.06 -0.47 0.26 0.26 0 0 0 0.14 -0.23Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M4.75 5.35a1.23 1.23 0 0 1 0 -0.2L6.1 0.32a0.24 0.24 0 0 0 0 -0.22 0.26 0.26 0 0 0 -0.2 -0.1H3.12a1.51 1.51 0 0 0 -1.36 1L0 5.07a0.79 0.79 0 0 0 0 0.2v0.91A3.24 3.24 0 0 0 2 9.1a3.31 3.31 0 0 0 2.6 0.05 0.25 0.25 0 0 0 0.16 -0.23Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
