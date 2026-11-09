
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

const BATCH = [{"setName":"icon/commerce/credit.card","name":"credit-card","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Credit-Card--Streamline-Ultimate\">\n  <desc>\n    Credit Card Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M21 0H6a3 3 0 0 0 -3 3v4.5a1 1 0 0 0 1 1 1 1 0 0 0 1 -1v-0.25A0.25 0.25 0 0 1 5.25 7h16.5a0.25 0.25 0 0 1 0.25 0.25V12a1 1 0 0 1 -0.54 0.89 0.92 0.92 0 0 0 -0.46 0.84 1 1 0 0 0 1.45 0.9A3 3 0 0 0 24 12V3a3 3 0 0 0 -3 -3M5.25 4A0.25 0.25 0 0 1 5 3.75V3a1 1 0 0 1 1 -1h15a1 1 0 0 1 1 1v0.75a0.25 0.25 0 0 1 -0.25 0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17 10H2a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h15a2 2 0 0 0 2 -2V12a2 2 0 0 0 -2 -2M6 15.5a0.5 0.5 0 0 1 -0.5 0.5h-2a0.5 0.5 0 0 1 -0.5 -0.5v-2a0.5 0.5 0 0 1 0.5 -0.5h2a0.5 0.5 0 0 1 0.5 0.5Zm8.5 5.5a2 2 0 0 1 -1.33 -0.51 0.27 0.27 0 0 0 -0.34 0 2 2 0 0 1 -1.33 0.51 2 2 0 0 1 0 -4 2 2 0 0 1 1.33 0.51 0.26 0.26 0 0 0 0.34 0A2 2 0 0 1 14.5 17a2 2 0 0 1 0 4\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/commerce/wallet","name":"wallet","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Money-Wallet--Streamline-Ultimate\">\n  <desc>\n    Money Wallet Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M19.62 18.5a3.75 3.75 0 0 1 0 -7.5h2.26a0.25 0.25 0 0 0 0.24 -0.25v-2.5a2.5 2.5 0 0 0 -2.5 -2.5h-17a2.51 2.51 0 0 0 -2.5 2.5v13a2.51 2.51 0 0 0 2.5 2.5h17a2.5 2.5 0 0 0 2.5 -2.5v-2.5a0.25 0.25 0 0 0 -0.24 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.62 12.5h-3a2.25 2.25 0 0 0 0 4.5h3a1.51 1.51 0 0 0 1.26 -1.5V14a1.51 1.51 0 0 0 -1.26 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19.81 1.18a1.21 1.21 0 0 0 -0.56 -0.76 1.24 1.24 0 0 0 -0.94 -0.13L5.44 3.76a0.24 0.24 0 0 0 -0.18 0.24 0.25 0.25 0 0 0 0.24 0.22l14.77 0a0.24 0.24 0 0 0 0.19 -0.1 0.23 0.23 0 0 0 0.05 -0.12Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/commerce/coupon","name":"coupon","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Coupon-Cut--Streamline-Ultimate\">\n  <desc>\n    Coupon Cut Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M10.5 17.43H10a1 1 0 0 0 0 2h0.5a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15 17.43h-1.5a1 1 0 0 0 0 2H15a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19.5 17.43H18a1 1 0 0 0 0 2h1.5a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 17.43h-0.5a1 1 0 0 0 0 2h0.5a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.92 15.93a0.25 0.25 0 0 0 0.21 -0.11 0.39 0.39 0 0 0 0.06 -0.11 1 1 0 0 0 -0.57 -1.3l-5.73 -2.19a0.25 0.25 0 0 1 0 -0.46l11.47 -4.48a1 1 0 0 0 0.06 -1.84 11 11 0 0 0 -10.88 0.64 14 14 0 0 0 -3.61 3.43 0.28 0.28 0 0 1 -0.24 0.1 0.27 0.27 0 0 1 -0.2 -0.17 12.53 12.53 0 0 1 -0.75 -4.14 3.87 3.87 0 1 0 -3.87 3.87 3.81 3.81 0 0 0 2 -0.53 0.26 0.26 0 0 1 0.23 0 0.24 0.24 0 0 1 0.14 0.17 17.72 17.72 0 0 0 1.15 3.09 0.22 0.22 0 0 1 0 0.22 15.93 15.93 0 0 0 -1.19 3.09 0.28 0.28 0 0 1 -0.15 0.17 0.25 0.25 0 0 1 -0.22 0 3.87 3.87 0 1 0 1.91 3.32 12.51 12.51 0 0 1 0.75 -4.16 0.27 0.27 0 0 1 0.2 -0.17 0.28 0.28 0 0 1 0.24 0.1 15.42 15.42 0 0 0 1.15 1.39 0.23 0.23 0 0 0 0.18 0.07Zm-14 -8.76A1.87 1.87 0 1 1 5.74 5.3a1.87 1.87 0 0 1 -1.87 1.87Zm0 13.4a1.87 1.87 0 1 1 1.82 -1.87 1.87 1.87 0 0 1 -1.87 1.87Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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