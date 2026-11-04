
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

const BATCH = [{"setName":"icon/misc/key","name":"key","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Key-Lock--Streamline-Ultimate\">\n  <desc>\n    Key Lock Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M22 6.5h-0.5V5a5 5 0 0 0 -10 0v1.5a2 2 0 0 0 -2 2v4.09a0.26 0.26 0 0 0 0.1 0.2 7.17 7.17 0 0 1 2.19 2.54 0.24 0.24 0 0 0 0.22 0.14h5.92A3 3 0 0 1 21 18.24a0.25 0.25 0 0 0 0.25 0.23H22a2 2 0 0 0 2 -2v-8a2 2 0 0 0 -2 -1.97M13.5 5a3 3 0 0 1 6 0v1.25a0.25 0.25 0 0 1 -0.25 0.25h-5.5a0.25 0.25 0 0 1 -0.25 -0.25Zm4 7.26v1.21a0.75 0.75 0 0 1 -1.5 0v-1.21a1.5 1.5 0 1 1 1.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19.5 18.41A1.54 1.54 0 0 0 17.93 17h-7.1a5.54 5.54 0 0 0 -5.3 -4L5 13a5.6 5.6 0 0 0 -5 5.49A5.52 5.52 0 0 0 5.52 24a5.48 5.48 0 0 0 5.29 -4h0.51a0.25 0.25 0 0 1 0.22 0.13l0.94 1.66a0.48 0.48 0 0 0 0.43 0.25 0.5 0.5 0 0 0 0.43 -0.23l1.06 -1.69a0.24 0.24 0 0 1 0.21 -0.11h0.21a0.25 0.25 0 0 1 0.22 0.13l0.96 1.62a0.48 0.48 0 0 0 0.43 0.25 0.5 0.5 0 0 0 0.43 -0.23L18 20a1.51 1.51 0 0 0 1.5 -1.59m-15 1.32a1.25 1.25 0 1 1 1.25 -1.25 1.25 1.25 0 0 1 -1.25 1.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/barcode.scan","name":"barcode-scan","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Barcode-Scan--Streamline-Ultimate\">\n  <desc>\n    Barcode Scan Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M1 8a1 1 0 0 0 1 -1l0 -1.74a0.27 0.27 0 0 1 0 -0.18 0.25 0.25 0 0 1 0.21 -0.08h1.66a1 1 0 0 0 0 -2H2a2 2 0 0 0 -2 2v2a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3.87 19H2.25a0.25 0.25 0 0 1 -0.25 -0.25V17a1 1 0 0 0 -2 0v2a2 2 0 0 0 2 2h1.87a1 1 0 1 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 16a1 1 0 0 0 -1 1l0 1.74a0.27 0.27 0 0 1 -0.07 0.18 0.25 0.25 0 0 1 -0.18 0.08h-1.62a1 1 0 1 0 0 2H22a2 2 0 0 0 2 -2v-2a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22 3h-1.87a1 1 0 0 0 0 2h1.62a0.25 0.25 0 0 1 0.25 0.25V7a1 1 0 0 0 2 0V5a2 2 0 0 0 -2 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5 7a1 1 0 0 0 -1 1v7.5a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.5 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.5 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20 15.5V8a1 1 0 0 0 -2 0v7.5a1 1 0 0 0 2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/timer","name":"timer","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Timer--Streamline-Ultimate\">\n  <desc>\n    Timer Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M19.17 3.48a1.23 1.23 0 0 0 -1.53 1.92A9.05 9.05 0 1 1 3.36 9.75 1.23 1.23 0 0 0 1 9a11.7 11.7 0 0 0 -0.53 3.48 11.51 11.51 0 1 0 18.68 -9Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.04 2.2a1.96 1.96 0 1 0 3.92 0 1.96 1.96 0 1 0 -3.92 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.08 13.29a1.21 1.21 0 0 0 0.92 0.42 1.16 1.16 0 0 0 0.8 -0.3 1.21 1.21 0 0 0 0.12 -1.72L3.13 0.42A1.23 1.23 0 0 0 1.28 2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/cloud.sun","name":"cloud-sun","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Weather-Cloud-Sun-Wind--Streamline-Ultimate\">\n  <desc>\n    Weather Cloud Sun Wind Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M8.25 3a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v1a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3.12 4.54a1 1 0 0 0 0.71 0.29 1 1 0 0 0 0.71 -0.29 1 1 0 0 0 0 -1.42l-0.71 -0.7a1 1 0 0 0 -1.41 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 9.25h1a1 1 0 0 0 0 -2H1a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.08 2.42a1 1 0 0 0 -1.41 0l-0.71 0.7a1 1 0 0 0 -0.29 0.67A0.25 0.25 0 0 0 12 4a8.75 8.75 0 0 1 2.12 -0.5 0.23 0.23 0 0 0 0.22 -0.19 1 1 0 0 0 -0.26 -0.89\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.23 9.31A0.24 0.24 0 0 0 5.35 9a3.33 3.33 0 0 1 -0.1 -0.78 3 3 0 0 1 3 -3 2.87 2.87 0 0 1 1.1 0.21 0.25 0.25 0 0 0 0.25 0A8.5 8.5 0 0 1 11 4.5a0.28 0.28 0 0 0 0.13 -0.21 0.25 0.25 0 0 0 -0.13 -0.22 4.94 4.94 0 0 0 -2.74 -0.82 5 5 0 0 0 -5 5 4.94 4.94 0 0 0 0.34 1.81 0.26 0.26 0 0 0 0.17 0.15 0.25 0.25 0 0 0 0.23 -0.05 7.06 7.06 0 0 1 1.23 -0.85\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22 12A7 7 0 0 0 8.34 9.84a0.23 0.23 0 0 1 -0.22 0.17 5.52 5.52 0 0 0 -5 4.18 0.25 0.25 0 0 0 0.24 0.31H5a0.26 0.26 0 0 0 0.24 -0.17A3.51 3.51 0 0 1 8.5 12l0.5 0a1 1 0 0 0 1.11 -0.83A5 5 0 0 1 20 12l0 0.44a1 1 0 0 0 0.5 1A3 3 0 0 1 19 19h-2.85a0.25 0.25 0 0 0 -0.2 0.1 0.22 0.22 0 0 0 0 0.22 2.61 2.61 0 0 1 0 1.36 0.22 0.22 0 0 0 0 0.22 0.25 0.25 0 0 0 0.2 0.1H19a5 5 0 0 0 3 -9\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.5 18a1 1 0 0 0 0 -2H1a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.5 20a1 1 0 0 0 -1 -1H4a1 1 0 0 0 0 2h9.5a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.5 22H1a1 1 0 0 0 0 2h9.5a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/temperature","name":"temperature","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Temperature-Up--Streamline-Ultimate\">\n  <desc>\n    Temperature Up Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M10.5 4.5a4.5 4.5 0 0 0 -9 0v9.44a0.23 0.23 0 0 1 -0.06 0.16A6 6 0 1 0 12 18a6 6 0 0 0 -1.44 -3.9 0.23 0.23 0 0 1 -0.06 -0.16ZM6 22a4 4 0 0 1 -2.8 -6.86 1 1 0 0 0 0.3 -0.71V4.5a2.5 2.5 0 0 1 5 0v9.93a1 1 0 0 0 0.3 0.71A4 4 0 0 1 6 22\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.11 16.34a0.26 0.26 0 0 1 -0.11 -0.21V6.5a1 1 0 0 0 -2 0v9.63a0.26 0.26 0 0 1 -0.11 0.21 2 2 0 1 0 2.22 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13 9a1 1 0 0 0 0.66 -0.25l3.28 -2.87a0.26 0.26 0 0 1 0.3 0l2.21 1.47a1 1 0 0 0 1.26 -0.12l3 -3a1 1 0 1 0 -1.42 -1.42L20 5.07a0.26 0.26 0 0 1 -0.32 0l-2.13 -1.4a1 1 0 0 0 -1.21 0.08l-4 3.5a1 1 0 0 0 -0.09 1.41A1 1 0 0 0 13 9\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 11.5H13a1 1 0 0 0 0 2h10a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
return { ok, missing, failed, miss, fail, batch: 'apply_15_p0' };
