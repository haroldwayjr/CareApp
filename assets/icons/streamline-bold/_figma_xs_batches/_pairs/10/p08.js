
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

const BATCH = [{"setName":"icon/misc/hammer","name":"hammer","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Hammer--Streamline-Ultimate\">\n  <desc>\n    Hammer Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"m23.05 8.57 -6.24 -6.24a0.51 0.51 0 0 0 -0.62 -0.07 4.5 4.5 0 0 1 -5.49 -0.9 0.51 0.51 0 0 0 -0.71 0L8.78 2.58a1.46 1.46 0 0 0 -0.44 1.06 1.47 1.47 0 0 0 0.44 1.06l9.07 9.07a1.5 1.5 0 0 0 2.12 0l3.08 -3.08a1.49 1.49 0 0 0 0 -2.12\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11 9.28a0.48 0.48 0 0 0 -0.7 0l-9.06 9.07a2.49 2.49 0 0 0 -0.73 1.77 2.77 2.77 0 0 0 2.67 2.67A2.47 2.47 0 0 0 5 22.05L14 13a0.51 0.51 0 0 0 0.15 -0.35 0.53 0.53 0 0 0 -0.15 -0.36Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/face.id","name":"face-id","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Face-Id--Streamline-Ultimate\">\n  <desc>\n    Face Id Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M6.5 22H2.25a0.25 0.25 0 0 1 -0.25 -0.25V17.5a1 1 0 0 0 -2 0V22a2 2 0 0 0 2 2h4.5a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 7.5a1 1 0 0 0 1 -1V2.25A0.25 0.25 0 0 1 2.25 2H6.5a1 1 0 0 0 0 -2H2a2 2 0 0 0 -2 2v4.5a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 16.5a1 1 0 0 0 -1 1v4.25a0.25 0.25 0 0 1 -0.25 0.25H17.5a1 1 0 0 0 0 2H22a2 2 0 0 0 2 -2v-4.5a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22 0h-4.5a1 1 0 0 0 0 2h4.25a0.25 0.25 0 0 1 0.25 0.25V6.5a1 1 0 0 0 2 0V2a2 2 0 0 0 -2 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.77 14.45a1 1 0 1 1 1.68 1.1 6.51 6.51 0 0 1 -10.9 0 1 1 0 1 1 1.68 -1.1 4.49 4.49 0 0 0 7.54 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.5 11.5a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 2 0v3a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 11.5a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 2 0v3a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
