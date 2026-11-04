
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

const BATCH = [{"setName":"icon/misc/battery","name":"battery","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M0.337891 0.342694c0.390521 -0.3905217 1.023539 -0.3905164 1.414059 0L7.16406 5.7548H18c0.7956 0 1.5585 0.3163 2.1211 0.87891 0.5626 0.5626 0.8789 1.32547 0.8789 2.12109v0.5h1.5c0.3978 0 0.7792 0.15815 1.0605 0.43946 0.2813 0.2813 0.4395 0.66274 0.4395 1.06054v2.5c0 0.3978 -0.1582 0.7793 -0.4395 1.0606 -0.2813 0.2812 -0.6627 0.4394 -1.0605 0.4394H21v0.5c0 0.7956 -0.3163 1.5585 -0.8789 2.1211 -0.2294 0.2294 -0.4937 0.4149 -0.7783 0.5576l4.3193 4.3194c0.3903 0.3905 0.3905 1.0236 0 1.414s-1.0236 0.3903 -1.4141 0L0.337891 1.75676c-0.3904786 -0.39049 -0.3904079 -1.023535 0 -1.414066M14.7236 18.2548H3c-0.79562 0 -1.55849 -0.3163 -2.121094 -0.8789C0.316322 16.8133 0.0000280534 16.0504 0 15.2548v-6.5c0 -0.79562 0.31633 -1.55849 0.878906 -2.12109 0.396214 -0.39621 0.892304 -0.66754 1.428714 -0.79492z\" stroke-width=\"1\"></path>\n</svg>"}];
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