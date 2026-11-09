
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

const BATCH = [{"setName":"icon/misc/accessibility","name":"accessibility","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Tools-Reality-Accessibility--Streamline-Ultimate\">\n  <desc>\n    Tools Reality Accessibility Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M0.208374 12C0.208374 5.48765 5.48768 0.208344 12 0.208344 18.5124 0.208344 23.7917 5.48765 23.7917 12c0 6.5123 -5.2793 11.7916 -11.7917 11.7916C5.48768 23.7916 0.208374 18.5123 0.208374 12M9.93007 5.59725c0 -1.14318 0.92673 -2.06991 2.06993 -2.06991s2.0699 0.92673 2.0699 2.06991 -0.9267 2.0699 -2.0699 2.0699 -2.06993 -0.92672 -2.06993 -2.0699m7.23933 3.53432c0.7401 -0.15461 1.5603 0.19453 1.841 0.94293 0.2748 0.733 -0.0909 1.596 -0.9042 1.7697 -1.0627 0.227 -2.1878 0.2879 -3.2337 0.3446l-0.0815 0.0044v2.6043c0 0.0754 -0.0052 0.1496 -0.0153 0.2225l0.8016 3.75c0.1874 0.8765 -0.4808 1.7027 -1.3772 1.7027 -0.6649 0 -1.2392 -0.4651 -1.3775 -1.1155l-0.628 -2.9545h-0.3892l-0.6281 2.9545c-0.1382 0.6504 -0.7126 1.1155 -1.3775 1.1155 -0.89631 0 -1.56457 -0.8262 -1.3772 -1.7028l0.80158 -3.7496c-0.01014 -0.073 -0.01537 -0.1473 -0.01537 -0.2228v-2.6043l-0.08152 -0.0044c-1.04585 -0.0567 -2.17087 -0.1176 -3.2334 -0.3446 -0.81331 -0.1736 -1.17906 -1.0367 -0.90421 -1.7696 0.28066 -0.74846 1.10094 -1.0976 1.84101 -0.94299 1.41149 0.29488 2.99235 0.28483 4.44061 0.27563l0.0001 0 0.0008 -0.00001c0.247 -0.00157 0.4901 -0.00311 0.7278 -0.00311 0.238 0 0.4814 0.00155 0.7286 0.00312 1.4483 0.00919 3.0292 0.01923 4.4408 -0.27567\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];

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
