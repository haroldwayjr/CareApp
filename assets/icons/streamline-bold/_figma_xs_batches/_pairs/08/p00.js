
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

const BATCH = [{"setName":"icon/files/file.image","name":"file-image","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Common-File-Horizontal-Image--Streamline-Ultimate\">\n  <desc>\n    Common File Horizontal Image Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M24 8.41a1 1 0 0 0 -0.29 -0.7l-5.42 -5.42a1 1 0 0 0 -0.7 -0.29H2a2 2 0 0 0 -2 2v16a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2ZM22 19.5a0.5 0.5 0 0 1 -0.5 0.5h-19a0.5 0.5 0 0 1 -0.5 -0.5v-15a0.5 0.5 0 0 1 0.5 -0.5H17a0.49 0.49 0 0 1 0.36 0.15l4.53 4.53A0.49 0.49 0 0 1 22 9Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.3 8a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13.72 10.68a0.49 0.49 0 0 0 -0.84 0l-2.43 3.88a0.27 0.27 0 0 1 -0.21 0.12 0.24 0.24 0 0 1 -0.21 -0.12l-0.87 -1.38a0.49 0.49 0 0 0 -0.42 -0.24 0.51 0.51 0 0 0 -0.43 0.24l-2.77 4.44a0.25 0.25 0 0 0 0 0.25 0.26 0.26 0 0 0 0.22 0.13h12.1a0.26 0.26 0 0 0 0.22 -0.13 0.25 0.25 0 0 0 0 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/drawer","name":"drawer","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Drawer-Open--Streamline-Ultimate\">\n  <desc>\n    Drawer Open Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m23.88 11.26 -3.07 -5.5a2 2 0 0 0 -1.7 -1H4.9a2 2 0 0 0 -1.7 1l-3.07 5.5a1.4 1.4 0 0 0 -0.13 0.49v6a1.5 1.5 0 0 0 1.5 1.5h21a1.5 1.5 0 0 0 1.5 -1.5v-6a1.29 1.29 0 0 0 -0.12 -0.49m-19 -4.38a0.25 0.25 0 0 1 0.22 -0.13l13.86 0a0.25 0.25 0 0 1 0.22 0.13l2.24 4a0.25 0.25 0 0 1 0 0.25 0.27 0.27 0 0 1 -0.22 0.12h-3.7a1.5 1.5 0 0 0 -1.06 0.44 1.52 1.52 0 0 0 -0.44 1.06 1.5 1.5 0 0 1 -1.5 1.5h-5a1.5 1.5 0 0 1 -1.5 -1.5 1.5 1.5 0 0 0 -1.5 -1.5H2.84a0.26 0.26 0 0 1 -0.21 -0.12 0.25 0.25 0 0 1 0 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
