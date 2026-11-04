
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

const BATCH = [{"setName":"icon/misc/weather","name":"weather","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Weather-Rain--Streamline-Ultimate\">\n  <desc>\n    Weather Rain Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <g>\n      <path d=\"M22.09 12.07a0.25 0.25 0 0 1 -0.09 -0.19 7 7 0 0 0 -13.66 -2 0.23 0.23 0 0 1 -0.22 0.17A5.5 5.5 0 0 0 5.34 20a0.28 0.28 0 0 0 0.18 0A2.59 2.59 0 0 1 6 20h0.12a0.25 0.25 0 0 0 0.22 -0.11 1.42 1.42 0 0 1 0.25 -0.3l0.51 -0.51a0.25 0.25 0 0 0 0.06 -0.22 0.25 0.25 0 0 0 -0.16 -0.19A3.5 3.5 0 0 1 8.5 12l0.5 0a1 1 0 0 0 1.11 -0.83A5 5 0 0 1 20 12l0 0.43a1 1 0 0 0 0.5 1 3 3 0 0 1 0.57 4.8 0.29 0.29 0 0 0 -0.08 0.14 1.89 1.89 0 0 1 -0.56 1.08L19 20.88a0.08 0.08 0 0 0 0 0.08 0.1 0.1 0 0 0 0 0.04 5 5 0 0 0 3.09 -8.93\" fill=\"#000000\" stroke-width=\"1\"></path>\n      <path d=\"M5 23a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n      <path d=\"M9 23a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n      <path d=\"M13 23a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n      <path d=\"M7.47 21.53a0.75 0.75 0 0 0 1.06 0l3 -3a0.75 0.75 0 0 0 -1.06 -1.06l-3 3a0.75 0.75 0 0 0 0 1.06\" fill=\"#000000\" stroke-width=\"1\"></path>\n      <path d=\"M15.53 18.53a0.75 0.75 0 0 0 -1.06 -1.06l-3 3a0.75 0.75 0 0 0 0 1.06 0.75 0.75 0 0 0 1.06 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n      <path d=\"M19.53 18.53a0.75 0.75 0 0 0 -1.06 -1.06l-3 3a0.75 0.75 0 0 0 0 1.06 0.75 0.75 0 0 0 1.06 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    </g>\n    <path d=\"M8.25 3a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v1a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M2.88 4.3a1 1 0 0 0 0.71 0.29 1 1 0 0 0 0.71 -0.29 1 1 0 0 0 0 -1.42l-0.71 -0.7a1 1 0 0 0 -1.41 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 8.25a1 1 0 0 0 -1 -1H1a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.08 2.42a1 1 0 0 0 -1.41 0l-0.71 0.7a1 1 0 0 0 -0.29 0.67A0.25 0.25 0 0 0 12 4a8.75 8.75 0 0 1 2.12 -0.5 0.23 0.23 0 0 0 0.22 -0.19 1 1 0 0 0 -0.26 -0.89\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.46 9.54a0.25 0.25 0 0 0 0.12 -0.29 2.76 2.76 0 0 1 -0.1 -0.77 3 3 0 0 1 3 -3 2.91 2.91 0 0 1 1.1 0.21 0.28 0.28 0 0 0 0.25 0 8 8 0 0 1 1.37 -0.92 0.23 0.23 0 0 0 0.13 -0.21 0.22 0.22 0 0 0 -0.11 -0.22 5 5 0 0 0 -7.74 4.14 5.13 5.13 0 0 0 0.33 1.8 0.26 0.26 0 0 0 0.18 0.16 0.23 0.23 0 0 0 0.22 -0.06 7.19 7.19 0 0 1 1.25 -0.84\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/wind","name":"wind","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wind-West--Streamline-Ultimate\">\n  <desc>\n    Wind West Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"m9.33 10.47 8.5 3a0.51 0.51 0 0 0 0.17 0 0.52 0.52 0 0 0 0.38 -0.17 0.5 0.5 0 0 0 0.07 -0.55l-1.34 -2.67a0.28 0.28 0 0 1 0 -0.22l1.34 -2.67a0.5 0.5 0 0 0 -0.07 -0.55 0.52 0.52 0 0 0 -0.55 -0.14l-8.5 3a0.5 0.5 0 0 0 0 0.94Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M24 10a10 10 0 1 0 -19 4.36 0.24 0.24 0 0 0 0.23 0.14h1.53a0.27 0.27 0 0 0 0.24 -0.08 0.26 0.26 0 0 0 0 -0.19A1.77 1.77 0 0 1 7 14v-0.06a0.31 0.31 0 0 0 0 -0.13A7.9 7.9 0 0 1 6 10a8 8 0 1 1 8 8 0.18 0.18 0 0 0 -0.16 0.11 0.17 0.17 0 0 0 0.06 0.19 3.9 3.9 0 0 1 1.2 1.47 0.26 0.26 0 0 0 0.26 0.14A10 10 0 0 0 24 10\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.5 19H1a1 1 0 0 0 0 2h10.5a0.5 0.5 0 0 1 0 1 1 1 0 0 0 0 2 2.5 2.5 0 0 0 0 -5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 18h8.5a2.5 2.5 0 0 0 0 -5 1 1 0 0 0 0 2 0.5 0.5 0 0 1 0 1H1a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/food","name":"food","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Food-Delivery-Bag--Streamline-Ultimate\">\n  <desc>\n    Food Delivery Bag Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M21 7.64a1.55 1.55 0 0 0 -1.55 -1.46h-2v-1A5.2 5.2 0 0 0 7 5.2c0 4.09 0 3.91 0.14 4.17a0.75 0.75 0 0 1 -1.36 -0.43V6.18h-1.2A1.56 1.56 0 0 0 3 7.64c-1 13.92 -0.93 13.15 -0.93 13.88A2.48 2.48 0 0 0 4.58 24h14.84a2.48 2.48 0 0 0 2.48 -2.48c0 -0.71 0.04 0.11 -0.9 -13.88m-6.28 -1.46H8.53v-1a3.71 3.71 0 0 1 7.41 0c0 4.1 0 3.91 0.14 4.17a0.75 0.75 0 0 1 -1.36 -0.43Zm-1.05 5.21a0.5 0.5 0 0 1 0.66 -0.23 6.58 6.58 0 0 1 3 5.95 0.5 0.5 0 0 1 -0.5 0.5h-2.21v2.78a0.5 0.5 0 0 1 -0.5 0.5 0.51 0.51 0 0 1 -0.5 -0.5c0 -9.3 -0.02 -8.85 0.05 -9m-6.57 0.11a0.5 0.5 0 0 1 1 0v3.13c0 0.3 0.35 0.63 0.9 0.76V11.5a0.5 0.5 0 0 1 0.5 -0.5 0.5 0.5 0 0 1 0.5 0.5v3.89c0.55 -0.13 0.91 -0.46 0.91 -0.76V11.5a0.5 0.5 0 0 1 0.5 -0.5 0.5 0.5 0 0 1 0.5 0.5v3.13A2 2 0 0 1 10 16.41v4a0.5 0.5 0 0 1 -0.5 0.5 0.51 0.51 0 0 1 -0.5 -0.5v-4a2 2 0 0 1 -1.9 -1.78Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
