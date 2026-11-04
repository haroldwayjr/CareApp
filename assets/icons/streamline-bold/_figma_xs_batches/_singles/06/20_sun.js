
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

const BATCH = [{"setName":"icon/misc/sun","name":"sun","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Uv-Sun--Streamline-Ultimate\">\n  <desc>\n    Uv Sun Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M12.35 16.05a0.24 0.24 0 0 0 0 -0.27 0.23 0.23 0 0 0 -0.25 -0.11 4.6 4.6 0 0 1 -0.84 0.08 4.5 4.5 0 1 1 2.89 -1.05 0.15 0.15 0 0 0 -0.05 0.19 0.16 0.16 0 0 0 0.16 0.11 2.26 2.26 0 0 1 1.35 0.45 0.24 0.24 0 0 0 0.3 0 2.15 2.15 0 0 1 0.49 -0.28 0.2 0.2 0 0 0 0.1 -0.08 6.5 6.5 0 1 0 -5.24 2.66l0.52 0a0.25 0.25 0 0 0 0.23 -0.25v-0.23a2.25 2.25 0 0 1 0.34 -1.22\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3.5 11.25a1 1 0 0 0 -1 -1H1a1 1 0 0 0 0 2h1.5a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M4.36 5.77a1 1 0 0 0 0.7 0.29 1 1 0 0 0 0.71 -0.29 1 1 0 0 0 0 -1.41L4.71 3.29a1 1 0 0 0 -1.42 1.42Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.25 3.5a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v1.5a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m4.36 16.73 -1.07 1.06a1 1 0 0 0 0 1.42 1 1 0 0 0 0.71 0.29 1 1 0 0 0 0.71 -0.29l1.06 -1.07a1 1 0 0 0 -1.41 -1.41\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 11.25a1 1 0 0 0 1 1h1.5a1 1 0 0 0 0 -2H20a1 1 0 0 0 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.44 6.06a1 1 0 0 0 0.7 -0.29l1.07 -1.06a1 1 0 1 0 -1.42 -1.42l-1.06 1.07a1 1 0 0 0 0 1.41 1 1 0 0 0 0.71 0.29\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18 17.25a0.75 0.75 0 0 0 -1.5 0v4.5a0.75 0.75 0 0 1 -1.5 0v-4.5a0.75 0.75 0 0 0 -1.5 0v4.5a2.25 2.25 0 0 0 4.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.25 16.5a0.76 0.76 0 0 0 -0.75 0.75v1.5a6.77 6.77 0 0 1 -0.5 2.59 0.25 0.25 0 0 1 -0.46 0 6.77 6.77 0 0 1 -0.54 -2.59v-1.5a0.75 0.75 0 0 0 -1.5 0v1.5a8.34 8.34 0 0 0 1.65 4.95 0.75 0.75 0 0 0 1.2 0A8.34 8.34 0 0 0 24 18.75v-1.5a0.76 0.76 0 0 0 -0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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