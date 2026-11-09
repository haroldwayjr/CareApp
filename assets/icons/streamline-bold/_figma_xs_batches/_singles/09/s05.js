
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

const BATCH = [{"setName":"icon/actions/cancel","name":"cancel","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Lock-Cancel-Slash--Streamline-Ultimate\">\n  <desc>\n    Lock Cancel Slash Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M16.15 5.93115c0 -2.0477 -1.6523 -3.69995 -3.7 -3.69995 -2.0478 0 -3.70005 1.65225 -3.70005 3.69995v1.92312H16.15zm2 1.92312V5.93115c0 -3.1523 -2.5478 -5.699949 -5.7 -5.699949 -3.15232 0 -5.70005 2.547649 -5.70005 5.699949v1.92312H6.6123L1.89232 3.87511c-0.42225 -0.35598 -1.053134 -0.30225 -1.409114 0.12 -0.355978 0.42226 -0.302252 1.05314 0.120001 1.40912l0.472623 0.39844c0.02362 0.01571 0.0466 0.03292 0.06881 0.05165L22.1867 23.5938c0.4188 0.2878 0.9957 0.2163 1.3301 -0.1803 0.356 -0.4223 0.3023 -1.0531 -0.12 -1.4091l-2.9252 -2.4661c0.0186 -0.109 0.0283 -0.2206 0.0283 -0.3341l0 -9.29988c0 -1.11418 -0.9357 -2.05005 -2.05 -2.05005zM17.0845 21.2543 4.3999 10.5606l0.00005 8.6436c0 1.1142 0.93575 2.0501 2.05 2.0501z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];

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
