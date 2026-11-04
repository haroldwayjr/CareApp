
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
  xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}

const BATCH = [{"setName":"icon/health/orthopedics","name":"orthopedics","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Medical-Specialty-Broken-Bone--Streamline-Ultimate\">\n  <desc>\n    Medical Specialty Broken Bone Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M11.45 15.59a0.52 0.52 0 0 0 0.14 -0.49 0.51 0.51 0 0 0 -0.34 -0.37l-1.13 -0.37A0.5 0.5 0 0 1 9.8 14l-0.29 -1a0.52 0.52 0 0 0 -0.37 -0.36 0.53 0.53 0 0 0 -0.49 0.14L6.44 15a0.3 0.3 0 0 1 -0.2 0.08 0.27 0.27 0 0 1 -0.18 -0.1l-0.25 -0.29a3.14 3.14 0 0 0 -4.4 -0.06 3 3 0 0 0 2.18 5.21 0.48 0.48 0 0 1 0.5 0.5 3.09 3.09 0 0 0 5.26 2.23 3 3 0 0 0 0 -4.32 0.63 0.63 0 0 0 -0.12 -0.1 0.25 0.25 0 0 1 0 -0.38Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.09 7.71a3.1 3.1 0 0 0 -3.51 -4.52 0.46 0.46 0 0 1 -0.38 0 0.5 0.5 0 0 1 -0.2 -0.36A3.07 3.07 0 0 0 13.32 2a3.2 3.2 0 0 0 1.25 4.3 2.9 2.9 0 0 0 0.35 0.17 0.24 0.24 0 0 1 0.13 0.15 0.23 0.23 0 0 1 0 0.2l-1.71 2.91a0.52 0.52 0 0 0 0 0.51 0.52 0.52 0 0 0 0.43 0.27l1 0.05a0.52 0.52 0 0 1 0.39 0.22l0.67 1a0.49 0.49 0 0 0 0.44 0.23 0.51 0.51 0 0 0 0.43 -0.26l1.7 -2.91a0.25 0.25 0 0 1 0.16 -0.12 0.28 0.28 0 0 1 0.2 0 0.71 0.71 0 0 0 0.14 0.1 3.05 3.05 0 0 0 4.19 -1.11\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M4 10h2a1 1 0 0 0 0 -2H4a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.3 6.69a1 1 0 0 0 1.4 -1.44l-1 -1a1 1 0 0 0 -1.43 1.43Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10 6a1 1 0 0 0 1 -1V3a1 1 0 0 0 -2 0v2a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20 14h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.72 17.27a1 1 0 1 0 -1.44 1.4l1 1.06A1 1 0 0 0 18 20a1 1 0 0 0 0.71 -1.7Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14 18a1 1 0 0 0 -1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

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
