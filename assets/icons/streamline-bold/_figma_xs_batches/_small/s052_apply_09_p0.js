
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

const BATCH = [{"setName":"icon/misc/mouse","name":"mouse","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Mouse--Streamline-Ultimate\">\n  <desc>\n    Mouse Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23 1.32a1 1 0 0 0 -1 1V8c0 2.08 -1.2 3 -2.4 3s-2.39 -0.93 -2.39 -3V5.63c0 -4.17 -3.59 -5.63 -6 -5.63 -2.72 0 -5.48 1.64 -5.69 4.77a0.25 0.25 0 0 1 -0.25 0.23H3.5A3.5 3.5 0 0 0 0 8.5v9a6.5 6.5 0 0 0 13 0v-9A3.5 3.5 0 0 0 9.5 5H7.79a0.27 0.27 0 0 1 -0.19 -0.08 0.25 0.25 0 0 1 -0.06 -0.2C7.79 2.86 9.55 2 11.22 2c0.39 0 4 0.14 4 3.63V8c0 3.29 2.21 5 4.39 5S24 11.28 24 8V2.32a1 1 0 0 0 -1 -1M8 11.11a1.45 1.45 0 0 1 -1.5 1.39A1.45 1.45 0 0 1 5 11.11V8.89A1.45 1.45 0 0 1 6.5 7.5 1.45 1.45 0 0 1 8 8.89Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/smartphone","name":"smartphone","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Smartphone-Pay-Dollar-2--Streamline-Ultimate\">\n  <desc>\n    Smartphone Pay Dollar 2 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M14.485 2.5a2.5 2.5 0 0 0 -2.5 -2.5h-9a2.5 2.5 0 0 0 -2.5 2.5v19a2.5 2.5 0 0 0 2.5 2.5h9.24a8.099 8.099 0 0 1 -3.243 -5H2.735a0.25 0.25 0 0 1 -0.25 -0.25V4.25a0.25 0.25 0 0 1 0.25 -0.25h9.5a0.25 0.25 0 0 1 0.25 0.25v4.133a1 1 0 0 0 2 0zM10.518 19a6.596 6.596 0 1 1 12.803 -3.191A6.596 6.596 0 0 1 10.518 19m-4.035 2.5a1 1 0 1 1 2 0 1 1 0 0 1 -2 0M17.7 15.093a1.528 1.528 0 0 0 -0.744 -0.145c-0.429 0 -0.793 0.138 -1.036 0.326 -0.245 0.19 -0.328 0.394 -0.328 0.545 0 0.148 0.08 0.342 0.32 0.524 0.241 0.182 0.607 0.317 1.044 0.317 0.728 0 1.418 0.216 1.943 0.607 0.528 0.393 0.92 0.994 0.92 1.723 0 0.728 -0.391 1.33 -0.917 1.725 -0.34 0.256 -0.75 0.439 -1.196 0.535v0.387a0.75 0.75 0 0 1 -1.5 0v-0.378a3.032 3.032 0 0 1 -1.757 -1.13 0.75 0.75 0 1 1 1.197 -0.904 1.528 1.528 0 0 0 1.31 0.605c0.439 0 0.805 -0.134 1.045 -0.314 0.238 -0.179 0.319 -0.372 0.319 -0.526s-0.08 -0.343 -0.317 -0.52c-0.239 -0.178 -0.606 -0.31 -1.047 -0.31 -0.733 0 -1.424 -0.225 -1.947 -0.62 -0.524 -0.395 -0.917 -0.996 -0.917 -1.72 0 -0.721 0.39 -1.329 0.909 -1.731 0.34 -0.264 0.753 -0.456 1.205 -0.558v-0.359a0.75 0.75 0 0 1 1.5 0v0.347a3.026 3.026 0 0 1 1.757 1.13 0.75 0.75 0 1 1 -1.197 0.904 1.528 1.528 0 0 0 -0.566 -0.46\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/misc/projector","name":"projector","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Video-Projector--Streamline-Ultimate\">\n  <desc>\n    Video Projector Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"m9.34 9.94 7.2 -4a0.5 0.5 0 0 0 0 -0.88l-7.2 -4a0.5 0.5 0 0 0 -0.49 0 0.48 0.48 0 0 0 -0.25 0.43v8a0.48 0.48 0 0 0 0.25 0.43 0.55 0.55 0 0 0 0.49 0.02\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.5 10.5a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M4 6a1 1 0 0 0 -1 -1H2a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M2 2a1 1 0 0 0 0 -2H1a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.5 9.5h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7 15a1 1 0 0 0 -1 -1H5a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 14h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22 5h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 0h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.5 17h-2.26a0.25 0.25 0 0 0 -0.25 0.23 3 3 0 0 1 -6 0 0.25 0.25 0 0 0 -0.23 -0.23H8.5A2.5 2.5 0 0 0 6 19.5v1a1.52 1.52 0 0 0 0.5 1.11V23a1 1 0 0 0 2 0v-0.75a0.25 0.25 0 0 1 0.25 -0.25h8.5a0.25 0.25 0 0 1 0.25 0.25V23a1 1 0 0 0 2 0v-1.39a1.52 1.52 0 0 0 0.5 -1.11v-1a2.5 2.5 0 0 0 -2.5 -2.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 19a2 2 0 1 0 -2 -2 2 2 0 0 0 2 2m-0.75 -2a0.75 0.75 0 1 1 0.75 0.75 0.76 0.76 0 0 1 -0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/wrench","name":"wrench","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wrench--Streamline-Ultimate\">\n  <desc>\n    Wrench Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.58 5a0.5 0.5 0 0 0 -0.36 -0.34 0.5 0.5 0 0 0 -0.47 0.13l-3.56 3.55a0.48 0.48 0 0 1 -0.39 0.15l-2.6 -0.24a0.49 0.49 0 0 1 -0.45 -0.45l-0.24 -2.6a0.52 0.52 0 0 1 0.15 -0.4l3.56 -3.55a0.53 0.53 0 0 0 0.13 -0.48 0.48 0.48 0 0 0 -0.35 -0.35 7.17 7.17 0 0 0 -7.13 1.84 7 7 0 0 0 -1.59 7.51 0.5 0.5 0 0 1 -0.11 0.53L0.91 19.56a2.6 2.6 0 0 0 -0.6 2.85 2.52 2.52 0 0 0 4.06 0.76l9.33 -9.34a0.49 0.49 0 0 1 0.53 -0.1 7 7 0 0 0 7.5 -1.57A7.19 7.19 0 0 0 23.58 5\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
