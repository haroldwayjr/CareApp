
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

const BATCH = [{"setName":"icon/misc/signal","name":"signal","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Signal-Wave--Streamline-Ultimate\">\n  <desc>\n    Signal Wave Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M18.6094 0.361858c-0.3775 -0.4031119 -1.0103 -0.4238603 -1.4135 -0.046343 -0.4031 0.377518 -0.4238 1.010345 -0.0463 1.413455 5.3849 5.75002 5.3849 14.79203 0 20.54203 -0.3775 0.4031 -0.3568 1.036 0.0463 1.4135 0.4032 0.3775 1.036 0.3568 1.4135 -0.0464 6.1052 -6.5191 6.1052 -16.75712 0 -23.276242M13.2848 2.96745c0.3905 -0.39052 1.0237 -0.39052 1.4142 0 4.9671 4.96711 4.9671 13.00075 0 17.96785 -0.3905 0.3905 -1.0237 0.3905 -1.4142 0 -0.3905 -0.3906 -0.3905 -1.0237 0 -1.4142 4.1861 -4.1861 4.1861 -10.95337 0 -15.13943 -0.3905 -0.39053 -0.3905 -1.02369 0 -1.41422m-2.0361 3.21338c-0.3905 -0.39052 -1.0237 -0.39052 -1.41423 0 -0.39052 0.39053 -0.39052 1.02369 0 1.41422 2.43333 2.43335 2.43333 6.47405 0 8.90745 -0.39052 0.3905 -0.39052 1.0237 0 1.4142 0.39053 0.3905 1.02373 0.3905 1.41423 0 3.2144 -3.2144 3.2144 -8.52149 0 -11.73587M1.4875 12.0498c0 -2.07106 1.67894 -3.75 3.75 -3.75 2.07107 0 3.75 1.67894 3.75 3.75 0 2.0711 -1.67893 3.75 -3.75 3.75 -2.07106 0 -3.75 -1.6789 -3.75 -3.75\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];

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
