
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
  setName: "icon/health/glasses",
  name: "glasses",
  category: "health",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Glasses--Streaml"+
    "ine-Ultimate\">\n  <desc>\n    Glasses Streamline Icon: https://streamlinehq.com\n  "+
    "</desc>\n  <path d=\"M20.61 1.43a1 1 0 0 0 0 2A1.4 1.4 0 0 1 22 4.83v7.9a0.25 0.25"+
    " 0 0 1 -0.09 0.2 0.27 0.27 0 0 1 -0.21 0.05 3.08 3.08 0 0 0 -0.61 -0.07H16.3a2.9"+
    "2 2.92 0 0 0 -2.16 1 0.25 0.25 0 0 1 -0.32 0 3.39 3.39 0 0 0 -3.64 0 0.25 0.25 0"+
    " 0 1 -0.32 0 2.92 2.92 0 0 0 -2.16 -1H2.91a3.08 3.08 0 0 0 -0.61 0.09 0.27 0.27 "+
    "0 0 1 -0.21 -0.05 0.25 0.25 0 0 1 -0.09 -0.2V4.83a1.4 1.4 0 0 1 1.39 -1.4 1 1 0 "+
    "0 0 0 -2A3.4 3.4 0 0 0 0 4.83v14.82a2.92 2.92 0 0 0 2.91 2.92H7.7a2.92 2.92 0 0 "+
    "0 2.91 -2.92v-2.87a1.39 1.39 0 0 1 2.78 0v2.87a2.92 2.92 0 0 0 2.91 2.92h4.79A2."+
    "92 2.92 0 0 0 24 19.65V4.83a3.4 3.4 0 0 0 -3.39 -3.4m-12 18.22a0.92 0.92 0 0 1 -"+
    "0.91 0.92H2.91a0.92 0.92 0 0 1 -0.91 -0.92v-3.82a0.92 0.92 0 0 1 0.91 -0.92H7.7a"+
    "0.92 0.92 0 0 1 0.91 0.92Zm13.39 0a0.92 0.92 0 0 1 -0.91 0.92H16.3a0.92 0.92 0 0"+
    " 1 -0.91 -0.92v-3.82a0.92 0.92 0 0 1 0.91 -0.92h4.79a0.92 0.92 0 0 1 0.91 0.92Z\""+
    " fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>")
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
