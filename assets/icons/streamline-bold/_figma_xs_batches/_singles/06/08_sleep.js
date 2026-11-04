
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

const BATCH = [{"setName":"icon/health/sleep","name":"sleep","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Sleep-Zzz--Streamline-Ultimate\">\n  <desc>\n    Sleep Zzz Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M11.6831 7.79864c0.165 0.35047 0.5175 0.57417 0.9048 0.57417h5.2707c0.5522 0 1 -0.44772 1 -1 0 -0.55229 -0.4478 -1 -1 -1h-3.1459l3.9164 -4.73549c0.2469 -0.29848 0.2992 -0.712688 0.1342 -1.063158C18.5984 0.223692 18.2459 0 17.8585 0h-5.2706c-0.5523 0 -1 0.447715 -1 1 0 0.55228 0.4477 1 1 1h3.1459l-3.9165 4.73548c-0.2469 0.29849 -0.2991 0.71269 -0.1342 1.06316M0.108384 16.3442c0.164947 0.3505 0.517454 0.5742 0.904796 0.5742h7.0678c0.55229 0 1 -0.4477 1 -1s-0.44771 -1 -1 -1H3.13793l5.71365 -6.90843c0.24686 -0.29849 0.29915 -0.71269 0.1342 -1.06316 -0.16494 -0.35047 -0.51745 -0.57416 -0.9048 -0.57416h-7.0678c-0.552281 0 -0.9999964 0.44771 -0.9999964 1 0 0.55228 0.4477154 1 0.9999964 1h4.94305L0.242587 15.2811c-0.24686411 0.2985 -0.2991493 0.7127 -0.134203 1.0631M14.2974 24.0001c-0.3874 0 -0.7399 -0.2237 -0.9048 -0.5742 -0.165 -0.3505 -0.1127 -0.7647 0.1342 -1.0631l7.0222 -8.4907h-6.2516c-0.5523 0 -1 -0.4477 -1 -1s0.4477 -1 1 -1h8.3763c0.3874 0 0.7399 0.2237 0.9048 0.5742 0.165 0.3504 0.1127 0.7646 -0.1342 1.0631l-7.0222 8.4907h6.2516c0.5523 0 1 0.4477 1 1s-0.4477 1 -1 1z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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