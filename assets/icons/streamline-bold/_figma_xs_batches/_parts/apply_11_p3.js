
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

const BATCH = [{"setName":"icon/health/mri","name":"mri","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Radiology-Scan-Mri--Streamline-Ultimate\">\n  <desc>\n    Radiology Scan Mri Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M24 4.51A2.51 2.51 0 0 0 21.5 2l-3.8 0a0.25 0.25 0 0 1 -0.17 0A8.34 8.34 0 0 0 12 0a8.4 8.4 0 0 0 -5.52 1.94 0.25 0.25 0 0 1 -0.17 0.06H2.5A2.5 2.5 0 0 0 0 4.5v19a0.5 0.5 0 0 0 0.5 0.5h23a0.5 0.5 0 0 0 0.5 -0.5Zm-9.54 -0.12a0.52 0.52 0 0 1 0.31 0.29 0.47 0.47 0 0 1 0 0.43L14 6.45a0.5 0.5 0 0 1 -0.57 0.24 5.48 5.48 0 0 0 -2.86 0 0.49 0.49 0 0 1 -0.57 -0.24l-0.74 -1.34a0.47 0.47 0 0 1 0 -0.43 0.52 0.52 0 0 1 0.31 -0.29 8 8 0 0 1 4.92 0Zm2.84 15.34a1 1 0 0 1 0.2 0.6V21a1 1 0 0 1 -1 1h-9a1 1 0 0 1 -1 -1v-0.67a1 1 0 0 1 0.2 -0.6l2.5 -4.33a1 1 0 0 1 0.8 -0.4h4a1 1 0 0 1 0.8 0.4ZM7.17 5.63a0.51 0.51 0 0 1 0.41 -0.09 0.49 0.49 0 0 1 0.33 0.25l0.74 1.32a0.51 0.51 0 0 1 -0.12 0.63A5.48 5.48 0 0 0 6.5 12a5.37 5.37 0 0 0 0.89 3 0.51 0.51 0 0 1 0 0.53l-0.81 1.41a0.54 0.54 0 0 1 -0.4 0.25 0.52 0.52 0 0 1 -0.42 -0.19A8 8 0 0 1 7.17 5.63M18.24 17a0.52 0.52 0 0 1 -0.43 0.19 0.54 0.54 0 0 1 -0.4 -0.25l-0.81 -1.41a0.51 0.51 0 0 1 0 -0.53 5.37 5.37 0 0 0 0.89 -3 5.48 5.48 0 0 0 -2 -4.26 0.49 0.49 0 0 1 -0.12 -0.63l0.74 -1.32a0.49 0.49 0 0 1 0.33 -0.25 0.51 0.51 0 0 1 0.41 0.09A8 8 0 0 1 18.24 17\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/prosthetic","name":"prosthetic","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Prosthetic-Leg-1--Streamline-Ultimate\">\n  <desc>\n    Prosthetic Leg 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M11.8615 2.01136c2.3345 -1.894194 5.7341 -1.9299513 7.3781 0.56891 0.8164 1.24096 0.8379 2.67397 0.4064 3.89676 -0.4282 1.21366 -1.3197 2.2732 -2.4146 2.78755l-5.6833 2.66982c0.1347 -0.4308 0.2073 -0.8885 0.2073 -1.3625 0 -2.40899 -1.87561 -4.39665 -4.24019 -4.57637L11.8386 2.0311c0.0074 -0.00681 0.0151 -0.01339 0.0229 -0.01974M5.15192 8.23441c-0.61649 0.53239 -1.02254 1.30284 -1.07089 2.16409 -0.00322 0.0574 -0.00486 0.1152 -0.00486 0.1734 0 1.4962 1.06537 2.7395 2.46931 3.027 0.20057 0.0411 0.40804 0.0626 0.6203 0.0626 0.07512 0 0.14963 -0.0027 0.22345 -0.0081 1.59504 -0.1156 2.86617 -1.4585 2.86617 -3.0815 0 -1.6981 -1.39151 -3.0896 -3.08962 -3.0896 -0.76723 0 -1.47187 0.28406 -2.01386 0.75211m2.98963 6.82229 1.45324 2.7105h-0.05958c-0.33488 0 -0.66554 0.0748 -0.96785 0.2188l-3.26873 1.5576c-0.69781 0.3325 -1.14226 1.0366 -1.14226 1.8095 0 1.1071 0.89745 2.0046 2.00452 2.0046h5.59891c1.2426 0 2.25 -1.0074 2.25 -2.25v-1.0905c0 -1.2072 -0.9508 -2.1924 -2.1444 -2.2475l-1.90833 -3.5594c-0.52725 0.4058 -1.14444 0.6999 -1.81552 0.8464\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
return { ok, missing, failed, miss, fail, batch: 'apply_11_p3' };
