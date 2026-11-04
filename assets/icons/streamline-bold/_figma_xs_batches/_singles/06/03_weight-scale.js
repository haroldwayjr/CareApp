
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

const BATCH = [{"setName":"icon/health/weight.scale","name":"weight-scale","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Diet-Scale--Streamline-Ultimate\">\n  <desc>\n    Diet Scale Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.44 5.08a1.49 1.49 0 0 0 -0.55 -1.32A17.2 17.2 0 0 0 12 0 17.2 17.2 0 0 0 1.11 3.76a1.47 1.47 0 0 0 -0.55 1.32l1.85 17.58A1.5 1.5 0 0 0 3.9 24h16.2a1.5 1.5 0 0 0 1.49 -1.34ZM20.5 8.5a0.5 0.5 0 0 1 -0.5 0.5h-6.28a0.5 0.5 0 0 1 -0.47 -0.34l-0.78 -2.32a0.51 0.51 0 0 0 -0.94 0l-0.78 2.32a0.49 0.49 0 0 1 -0.47 0.34H4a0.5 0.5 0 0 1 -0.5 -0.5V5.37A0.5 0.5 0 0 1 3.73 5 14.22 14.22 0 0 1 5.8 3.83a0.47 0.47 0 0 1 0.4 0 0.46 0.46 0 0 1 0.27 0.29l0.74 2.08a0.75 0.75 0 0 0 0.71 0.5 0.73 0.73 0 0 0 0.25 0 0.76 0.76 0 0 0 0.46 -1l-0.78 -2.19a0.37 0.37 0 0 1 0 -0.31 0.39 0.39 0 0 1 0.27 -0.2 14.75 14.75 0 0 1 2.59 -0.44 0.48 0.48 0 0 1 0.38 0.13 0.51 0.51 0 0 1 0.16 0.37V4a0.75 0.75 0 0 0 1.5 0v-0.94a0.51 0.51 0 0 1 0.16 -0.37 0.48 0.48 0 0 1 0.38 -0.13 14.75 14.75 0 0 1 2.59 0.44 0.39 0.39 0 0 1 0.25 0.2 0.37 0.37 0 0 1 0 0.31l-0.76 2.19a0.76 0.76 0 0 0 0.46 1 0.73 0.73 0 0 0 0.25 0 0.75 0.75 0 0 0 0.71 -0.5l0.74 -2.08a0.46 0.46 0 0 1 0.27 -0.29 0.47 0.47 0 0 1 0.4 0A14.22 14.22 0 0 1 20.27 5a0.5 0.5 0 0 1 0.23 0.42Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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