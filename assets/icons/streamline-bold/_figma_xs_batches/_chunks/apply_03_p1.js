
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

const BATCH = [{"setName":"icon/media/gallery","name":"gallery","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Print-Picture--Streamline-Ultimate\">\n  <desc>\n    Print Picture Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M5.75 6a1 1 0 0 0 1 -1V2h8.84l2.16 2.16V5a1 1 0 0 0 2 0V3.75a1 1 0 0 0 -0.29 -0.75L17 0.59A2 2 0 0 0 15.59 0H6.75a2 2 0 0 0 -2 2v3a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21.5 7h-19A2.5 2.5 0 0 0 0 9.5V14a2.5 2.5 0 0 0 2.5 2.5H5v6.25A1.25 1.25 0 0 0 6.25 24h12a1.25 1.25 0 0 0 1.25 -1.25V16.5h2A2.5 2.5 0 0 0 24 14V9.5A2.5 2.5 0 0 0 21.5 7m-18 4.5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1m14 10a0.5 0.5 0 0 1 -0.5 0.5H7.5a0.5 0.5 0 0 1 -0.5 -0.5v-9a0.5 0.5 0 0 1 0.5 -0.5H17a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.69 15.89a0.5 0.5 0 0 0 -0.42 -0.3 0.48 0.48 0 0 0 -0.46 0.22l-1.66 2.47 -1.65 -1.35a0.5 0.5 0 0 0 -0.41 -0.1 0.52 0.52 0 0 0 -0.35 0.26L8.1 20.27a0.5 0.5 0 0 0 0 0.49 0.52 0.52 0 0 0 0.43 0.24H16a0.51 0.51 0 0 0 0.42 -0.22 0.49 0.49 0 0 0 0 -0.47Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/crop","name":"crop","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Crop-Rotate--Streamline-Ultimate\">\n  <desc>\n    Crop Rotate Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M17.45 1a0.75 0.75 0 0 0 -1.28 -0.53l-2 2a0.75 0.75 0 0 0 0 1.06l2 2A0.75 0.75 0 0 0 17.45 5V3.77c2.678 0.23 4.8 2.496 4.8 5.23a0.75 0.75 0 0 0 1.5 0c0 -3.563 -2.794 -6.502 -6.3 -6.735zm-8.7 2.75a1 1 0 0 0 -2 0v12.2a1 1 0 0 0 1 1h7.5v3.3a1 1 0 1 0 2 0V7.95a1 1 0 0 0 -1 -1h-7.5zm-7.5 4.2a1 1 0 0 1 1 -1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 -1 -1m17.5 8a1 1 0 0 1 1 -1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1 -1 -1M6.963 23.693A0.75 0.75 0 0 1 6.5 23v-1.265C2.994 21.502 0.2 18.563 0.2 15a0.75 0.75 0 0 1 1.5 0c0 2.734 2.122 5 4.8 5.23V19a0.75 0.75 0 0 1 1.28 -0.53l2 2a0.75 0.75 0 0 1 0 1.06l-2 2a0.75 0.75 0 0 1 -0.817 0.163\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/media/rotate","name":"rotate","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Rotate--Streamline-Ultimate\">\n  <desc>\n    Rotate Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M10.66 3.33a2 2 0 0 0 -2.82 0L0.58 10.59a2 2 0 0 0 0 2.82l7.26 7.26a2 2 0 0 0 2.82 0l7.26 -7.26a2 2 0 0 0 0 -2.82ZM9.6 18.9a0.51 0.51 0 0 1 -0.71 0l-6.54 -6.55a0.5 0.5 0 0 1 0 -0.7L8.9 5.1a0.5 0.5 0 0 1 0.7 0l6.55 6.55a0.51 0.51 0 0 1 0 0.7Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M24 12a3 3 0 0 0 -0.88 -2.12l-1.41 -1.42 0.35 -0.35a0.5 0.5 0 0 0 -0.28 -0.85l-2.48 -0.35a0.49 0.49 0 0 0 -0.56 0.56l0.35 2.53a0.5 0.5 0 0 0 0.85 0.28l0.35 -0.35 1.42 1.41a1 1 0 0 1 0 1.42l-1.42 1.41 -0.35 -0.35a0.5 0.5 0 0 0 -0.85 0.28l-0.35 2.48a0.49 0.49 0 0 0 0.56 0.56l2.48 -0.35a0.5 0.5 0 0 0 0.28 -0.85l-0.35 -0.35 1.41 -1.42A3 3 0 0 0 24 12\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/flip","name":"flip","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flip-Vertical-Up--Streamline-Ultimate\">\n  <desc>\n    Flip Vertical Up Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M0.75 9.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M0.75 5.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M0.75 1.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.75 1.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.75 1.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.75 1.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.75 9.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.75 5.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.75 1.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M0 12.5a0.76 0.76 0 0 0 0.75 0.75 0.25 0.25 0 0 1 0.25 0.25v8.75A1.76 1.76 0 0 0 2.75 24h18.5A1.76 1.76 0 0 0 23 22.25V13.5a0.25 0.25 0 0 1 0.25 -0.25 0.75 0.75 0 0 0 0 -1.5H13a0.25 0.25 0 0 0 -0.25 0.23l0 0.52a8 8 0 0 0 2 5.25 2 2 0 0 1 -0.2 2.83 2 2 0 0 1 -1.31 0.49 2 2 0 0 1 -1.51 -0.69 12 12 0 0 1 -3.01 -7.88l0 -0.49a0.26 0.26 0 0 0 -0.07 -0.18 0.25 0.25 0 0 0 -0.18 -0.08H0.75a0.75 0.75 0 0 0 -0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10 12.5a10.77 10.77 0 0 0 2.64 7.06 0.76 0.76 0 0 0 0.57 0.26 0.72 0.72 0 0 0 0.49 -0.19 0.74 0.74 0 0 0 0.08 -1.05 9.27 9.27 0 0 1 -2.28 -6.08 9 9 0 0 1 0.44 -2.79 0.24 0.24 0 0 1 0.15 -0.16 0.25 0.25 0 0 1 0.22 0l1.55 0.95a0.76 0.76 0 0 0 0.83 0 0.75 0.75 0 0 0 0.31 -0.8l-0.52 -2.13L14 5.7a0.79 0.79 0 0 0 -0.9 -0.55l-2.2 0.53 -1.79 0.43a0.78 0.78 0 0 0 -0.56 0.62 0.73 0.73 0 0 0 0.35 0.75l1.67 1a0.25 0.25 0 0 1 0.1 0.3A10.76 10.76 0 0 0 10 12.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/brightness","name":"brightness","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Brightness--Streamline-Ultimate\">\n  <desc>\n    Brightness Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M7.5 12a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0 -9 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 5.83a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v3.83a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 18.17a1 1 0 0 0 -1 1V23a1 1 0 0 0 2 0v-3.83a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.22 7.64a1 1 0 0 0 1.41 0 1 1 0 0 0 0 -1.42l-2.7 -2.7a1 1 0 0 0 -1.42 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.78 16.37a1 1 0 0 0 -1.41 0 1 1 0 0 0 0 1.41l2.7 2.71a1 1 0 0 0 1.42 0 1 1 0 0 0 0 -1.42Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.83 12.5a1 1 0 0 0 -1 -1H1a1 1 0 0 0 0 2h3.83a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 11.5h-3.83a1 1 0 0 0 0 2H23a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m6.22 16.37 -2.71 2.7a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l2.7 -2.71a1 1 0 0 0 -1.41 -1.41\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.07 7.92a1 1 0 0 0 0.71 -0.28l2.71 -2.71a1 1 0 1 0 -1.42 -1.41l-2.7 2.7a1 1 0 0 0 0 1.42 1 1 0 0 0 0.7 0.28\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/contrast","name":"contrast","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M16.25 15c0.9665 0 1.75 0.7835 1.75 1.75v4.5c0 0.9665 -0.7835 1.75 -1.75 1.75s-1.75 -0.7835 -1.75 -1.75v-4.5c0 -0.9665 0.7835 -1.75 1.75 -1.75M12 18c0.5523 0 1 0.4477 1 1s-0.4477 1 -1 1H2c-0.55228 0 -1 -0.4477 -1 -1s0.44772 -1 1 -1zm10 0c0.5523 0 1 0.4477 1 1s-0.4477 1 -1 1h-1.5c-0.5523 0 -1 -0.4477 -1 -1s0.4477 -1 1 -1zM12 1c3.7279 0 6.75 3.02208 6.75 6.75 0 3.7279 -3.0221 6.75 -6.75 6.75 -3.72792 0 -6.75 -3.0221 -6.75 -6.75C5.25 4.02208 8.27208 1 12 1m0 12c2.8995 0 5.25 -2.3505 5.25 -5.25 0 -2.89949 -2.3505 -5.25 -5.25 -5.25z\" stroke-width=\"1\"></path>\n</svg>"}];
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
