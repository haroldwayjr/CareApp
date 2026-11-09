
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

const BATCH = [{"setName":"icon/media/camera","name":"camera","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Camera--Streamline-Ultimate\">\n  <desc>\n    Camera Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M22.5 6h-21A1.5 1.5 0 0 0 0 7.5v12A1.5 1.5 0 0 0 1.5 21h21a1.5 1.5 0 0 0 1.5 -1.5v-12A1.5 1.5 0 0 0 22.5 6m-1 7.5a5 5 0 1 1 -5 -5 5 5 0 0 1 5 5M8 12.25H2.5a0.75 0.75 0 0 1 0 -1.5H8a0.75 0.75 0 0 1 0 1.5m0.75 3.25a0.76 0.76 0 0 1 -0.75 0.75H2.5a0.75 0.75 0 0 1 0 -1.5H8a0.76 0.76 0 0 1 0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 5h4a0.5 0.5 0 0 0 0.5 -0.5A1.5 1.5 0 0 0 6 3H4a1.5 1.5 0 0 0 -1.5 1.5 0.5 0.5 0 0 0 0.5 0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.84 10.78h3.33s1.06 0 1.06 1.06v3.33s0 1.06 -1.06 1.06h-3.33s-1.06 0 -1.06 -1.06v-3.33s0 -1.06 1.06 -1.06\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];

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
