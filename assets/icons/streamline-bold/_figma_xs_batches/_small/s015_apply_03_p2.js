
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

const BATCH = [{"setName":"icon/media/flip","name":"flip","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flip-Vertical-Up--Streamline-Ultimate\">\n  <desc>\n    Flip Vertical Up Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M0.75 9.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M0.75 5.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M0.75 1.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.75 1.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.75 1.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.75 1.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.75 9.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.75 5.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.75 1.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M0 12.5a0.76 0.76 0 0 0 0.75 0.75 0.25 0.25 0 0 1 0.25 0.25v8.75A1.76 1.76 0 0 0 2.75 24h18.5A1.76 1.76 0 0 0 23 22.25V13.5a0.25 0.25 0 0 1 0.25 -0.25 0.75 0.75 0 0 0 0 -1.5H13a0.25 0.25 0 0 0 -0.25 0.23l0 0.52a8 8 0 0 0 2 5.25 2 2 0 0 1 -0.2 2.83 2 2 0 0 1 -1.31 0.49 2 2 0 0 1 -1.51 -0.69 12 12 0 0 1 -3.01 -7.88l0 -0.49a0.26 0.26 0 0 0 -0.07 -0.18 0.25 0.25 0 0 0 -0.18 -0.08H0.75a0.75 0.75 0 0 0 -0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10 12.5a10.77 10.77 0 0 0 2.64 7.06 0.76 0.76 0 0 0 0.57 0.26 0.72 0.72 0 0 0 0.49 -0.19 0.74 0.74 0 0 0 0.08 -1.05 9.27 9.27 0 0 1 -2.28 -6.08 9 9 0 0 1 0.44 -2.79 0.24 0.24 0 0 1 0.15 -0.16 0.25 0.25 0 0 1 0.22 0l1.55 0.95a0.76 0.76 0 0 0 0.83 0 0.75 0.75 0 0 0 0.31 -0.8l-0.52 -2.13L14 5.7a0.79 0.79 0 0 0 -0.9 -0.55l-2.2 0.53 -1.79 0.43a0.78 0.78 0 0 0 -0.56 0.62 0.73 0.73 0 0 0 0.35 0.75l1.67 1a0.25 0.25 0 0 1 0.1 0.3A10.76 10.76 0 0 0 10 12.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/brightness","name":"brightness","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Brightness--Streamline-Ultimate\">\n  <desc>\n    Brightness Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M7.5 12a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0 -9 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 5.83a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v3.83a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 18.17a1 1 0 0 0 -1 1V23a1 1 0 0 0 2 0v-3.83a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.22 7.64a1 1 0 0 0 1.41 0 1 1 0 0 0 0 -1.42l-2.7 -2.7a1 1 0 0 0 -1.42 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.78 16.37a1 1 0 0 0 -1.41 0 1 1 0 0 0 0 1.41l2.7 2.71a1 1 0 0 0 1.42 0 1 1 0 0 0 0 -1.42Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.83 12.5a1 1 0 0 0 -1 -1H1a1 1 0 0 0 0 2h3.83a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 11.5h-3.83a1 1 0 0 0 0 2H23a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m6.22 16.37 -2.71 2.7a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l2.7 -2.71a1 1 0 0 0 -1.41 -1.41\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.07 7.92a1 1 0 0 0 0.71 -0.28l2.71 -2.71a1 1 0 1 0 -1.42 -1.41l-2.7 2.7a1 1 0 0 0 0 1.42 1 1 0 0 0 0.7 0.28\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/contrast","name":"contrast","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M16.25 15c0.9665 0 1.75 0.7835 1.75 1.75v4.5c0 0.9665 -0.7835 1.75 -1.75 1.75s-1.75 -0.7835 -1.75 -1.75v-4.5c0 -0.9665 0.7835 -1.75 1.75 -1.75M12 18c0.5523 0 1 0.4477 1 1s-0.4477 1 -1 1H2c-0.55228 0 -1 -0.4477 -1 -1s0.44772 -1 1 -1zm10 0c0.5523 0 1 0.4477 1 1s-0.4477 1 -1 1h-1.5c-0.5523 0 -1 -0.4477 -1 -1s0.4477 -1 1 -1zM12 1c3.7279 0 6.75 3.02208 6.75 6.75 0 3.7279 -3.0221 6.75 -6.75 6.75 -3.72792 0 -6.75 -3.0221 -6.75 -6.75C5.25 4.02208 8.27208 1 12 1m0 12c2.8995 0 5.25 -2.3505 5.25 -5.25 0 -2.89949 -2.3505 -5.25 -5.25 -5.25z\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/media/record","name":"record","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Phone-Record--Streamline-Ultimate\">\n  <desc>\n    Phone Record Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M15 12.5a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22 0H2a2 2 0 0 0 -2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2m-5 16.5a4 4 0 0 1 -3.46 -6h-3.08A4 4 0 1 1 7 8.5h10a4 4 0 0 1 0 8\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5 12.5a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/cast","name":"cast","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Phone-Cast--Streamline-Ultimate\">\n  <desc>\n    Phone Cast Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M21 2.22H3a3.05 3.05 0 0 0 -3 3v2.56a1 1 0 0 0 2 0V5.27a1 1 0 0 1 1 -1h18a1 1 0 0 1 1 1v13.29a1 1 0 0 1 -1 1h-7a1 1 0 0 0 0 2h7a3 3 0 0 0 3 -3V5.27a3.05 3.05 0 0 0 -3 -3.05\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <g>\n      <path d=\"M1.58 18.78a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0 -1.5 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n      <path d=\"M1.58 14.63a1 1 0 0 0 0 2 3.65 3.65 0 0 1 3.64 3.65 1 1 0 0 0 2 0 5.65 5.65 0 0 0 -5.64 -5.65\" fill=\"#000000\" stroke-width=\"1\"></path>\n      <path d=\"M1.58 10.57a1 1 0 0 0 0 2 7.72 7.72 0 0 1 7.71 7.71 1 1 0 0 0 2 0 9.72 9.72 0 0 0 -9.71 -9.71\" fill=\"#000000\" stroke-width=\"1\"></path>\n    </g>\n  </g>\n</svg>"}];
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
