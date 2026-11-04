
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

const BATCH = [{"setName":"icon/misc/translate","name":"translate","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Translate--Streamline-Ultimate\">\n  <desc>\n    Translate Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M22.92 11H15.5a0.5 0.5 0 0 0 -0.5 0.5v0.41A3.08 3.08 0 0 1 11.92 15h-0.42a0.5 0.5 0 0 0 -0.5 0.5v7.41A1.09 1.09 0 0 0 12.08 24h10.84A1.09 1.09 0 0 0 24 22.91V12.08A1.08 1.08 0 0 0 22.92 11m-2.16 11.2a0.74 0.74 0 0 1 -1 -0.44l-0.51 -1.35a0.25 0.25 0 0 0 -0.23 -0.16h-3.08a0.25 0.25 0 0 0 -0.23 0.16l-0.51 1.35a0.75 0.75 0 1 1 -1.4 -0.53l2.53 -6.75a1.25 1.25 0 0 1 2.34 0l2.53 6.75a0.75 0.75 0 0 1 -0.44 0.97\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16.46 18.41a0.24 0.24 0 0 0 0 0.23 0.23 0.23 0 0 0 0.2 0.11h1.62a0.23 0.23 0 0 0 0.2 -0.11 0.24 0.24 0 0 0 0 -0.23l-0.81 -2.15a0.25 0.25 0 0 0 -0.46 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.78 5.61a0.25 0.25 0 0 0 0 -0.24 0.25 0.25 0 0 0 -0.22 -0.12H5.45a0.25 0.25 0 0 0 -0.22 0.12 0.25 0.25 0 0 0 0 0.24 8.07 8.07 0 0 0 1.08 1.66 0.25 0.25 0 0 0 0.38 0 8.07 8.07 0 0 0 1.09 -1.66\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.92 13A1.08 1.08 0 0 0 13 11.91V1.08A1.08 1.08 0 0 0 11.92 0H1.08A1.08 1.08 0 0 0 0 1.08v10.83A1.09 1.09 0 0 0 1.08 13Zm-1.2 -2.31a0.74 0.74 0 0 1 -0.72 0.56 8.52 8.52 0 0 1 -3.35 -1.58 0.24 0.24 0 0 0 -0.3 0A8.49 8.49 0 0 1 3 11.25a0.75 0.75 0 0 1 -0.2 -1.48 7.56 7.56 0 0 0 2.37 -1.1 0.21 0.21 0 0 0 0.1 -0.17 0.29 0.29 0 0 0 0 -0.2 9.48 9.48 0 0 1 -1.74 -2.89 0.25 0.25 0 0 0 -0.23 -0.16h-0.77a0.75 0.75 0 0 1 0 -1.5h3a0.25 0.25 0 0 0 0.25 -0.25v-1a0.75 0.75 0 0 1 1.5 0v1a0.25 0.25 0 0 0 0.25 0.25h3a0.75 0.75 0 0 1 0 1.5H9.7a0.25 0.25 0 0 0 -0.23 0.16A9.48 9.48 0 0 1 7.78 8.3a0.29 0.29 0 0 0 0 0.2 0.21 0.21 0 0 0 0.1 0.17 7.56 7.56 0 0 0 2.37 1.1 0.75 0.75 0 0 1 0.47 0.92\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.65 5.35a0.49 0.49 0 0 0 0.54 0.11 0.5 0.5 0 0 0 0.31 -0.46v-0.31a0.25 0.25 0 0 1 0.37 -0.22A4 4 0 0 1 21 8a1 1 0 0 0 2 0 6 6 0 0 0 -4.32 -5.75 0.26 0.26 0 0 1 -0.18 -0.25V1a0.5 0.5 0 0 0 -0.85 -0.36l-2 2a0.5 0.5 0 0 0 0 0.71Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M2 14a1 1 0 0 0 -1 1 6 6 0 0 0 4.32 5.75 0.25 0.25 0 0 1 0.18 0.25v1a0.5 0.5 0 0 0 0.31 0.46 0.49 0.49 0 0 0 0.54 -0.11l2 -2a0.5 0.5 0 0 0 0 -0.71l-2 -2a0.5 0.5 0 0 0 -0.85 0.36v0.31a0.24 0.24 0 0 1 -0.12 0.21 0.25 0.25 0 0 1 -0.25 0A4 4 0 0 1 3 15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

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
