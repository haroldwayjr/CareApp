
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

const BATCH = [{"setName":"icon/misc/layout","name":"layout","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Layout-Dashboard--Streamline-Ultimate\">\n  <desc>\n    Layout Dashboard Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M14.748 -0.000244141c-0.9665 0 -1.75 0.783501141 -1.75 1.750004141v4.5c0 0.96649 0.7835 1.75 1.75 1.75h7.5c0.9665 0 1.75 -0.78351 1.75 -1.75v-4.5c0 -0.966503 -0.7835 -1.750004141 -1.75 -1.750004141zM14.748 10c-0.9665 0 -1.75 0.7835 -1.75 1.75v10.5002c0 0.9665 0.7835 1.75 1.75 1.75h7.5c0.9665 0 1.75 -0.7835 1.75 -1.75V11.75c0 -0.9665 -0.7835 -1.75 -1.75 -1.75zM0.00195312 1.75C0.00195312 0.783502 0.785455 0 1.75195 0h7.5C10.2185 0 11.002 0.783501 11.002 1.75v10.5002c0 0.9665 -0.7835 1.75 -1.75005 1.75h-7.5c-0.966495 0 -1.74999688 -0.7835 -1.74999688 -1.75zM1.75195 15.9998c-0.966495 0 -1.74999688 0.7835 -1.74999688 1.75v4.5c0 0.9665 0.78350188 1.75 1.74999688 1.75h7.5c0.96655 0 1.75005 -0.7835 1.75005 -1.75v-4.5c0 -0.9665 -0.7835 -1.75 -1.75005 -1.75z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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