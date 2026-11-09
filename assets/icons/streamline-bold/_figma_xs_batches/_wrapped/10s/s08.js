
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

const BATCH = [
{
  setName: "icon/health/inhaler",
  name: "inhaler",
  category: "health",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Inha"+
    "ler--Streamline-Ultimate\">\n  <desc>\n    Inhaler Streamline Icon: https://streaml"+
    "inehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m7.52403 3.746"+
    "59 -0.4166 -1.99806C6.91497 0.825451 6.02576 0.220831 5.09658 0.381232L2.50046 0"+
    ".829389C1.51905 0.998806 0.876679 1.95195 1.088 2.9252l0.40441 1.8626zM19.9236 1"+
    "6.2298v5.9982l2.3122 0.0015c0.199 0.0001 0.3899 -0.0789 0.5306 -0.2195 0.1408 -0"+
    ".1407 0.2199 -0.3315 0.2199 -0.5305v-4.5012c0 -0.199 -0.0791 -0.3899 -0.2199 -0."+
    "5305 -0.1407 -0.1407 -0.3316 -0.2197 -0.5306 -0.2195zM8.5433 5.09285c0.53096 -0."+
    "09166 1.03908 0.25384 1.14906 0.78131l1.90324 9.12794 5.8268 -0.0068c0.5528 -0.0"+
    "006 1.0012 0.4473 1.0012 1v6.4665c0 0.5528 -0.4484 1.0007 -1.0012 1l-2.2097 -0.0"+
    "025v-2.5088c0 -0.5523 -0.4478 -1 -1 -1 -0.5523 0 -1 0.4477 -1 1v2.5126h-2.3282v-"+
    "2.5126c0 -0.5523 -0.4477 -1 -0.99996 -1 -0.55229 0 -1 0.4477 -1 1v2.5126H7.25408"+
    "c-1.68516 0 -3.14237 -1.1747 -3.49993 -2.8215L0.894591 7.47149c-0.120752 -0.5561"+
    "5 0.246319 -1.1008 0.807119 -1.19761z\" clip-rule=\"evenodd\" stroke-width=\"1\"></pa"+
    "th>\n</svg>")
}
];

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
