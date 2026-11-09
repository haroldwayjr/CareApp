
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
  setName: "icon/misc/airplane",
  name: "airplane",
  category: "misc",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Airplane-Mode--S"+
    "treamline-Ultimate\">\n  <desc>\n    Airplane Mode Streamline Icon: https://streaml"+
    "inehq.com\n  </desc>\n  <g>\n    <path d=\"M14.58 19.51a0.25 0.25 0 0 1 -0.08 -0.18V"+
    "13l-4.93 5a0.29 0.29 0 0 0 -0.07 0.18v1.19a0.25 0.25 0 0 1 -0.08 0.18L8 20.92a1."+
    "5 1.5 0 0 0 1 2.58 7.24 7.24 0 0 0 2.85 -1.39 0.24 0.24 0 0 1 0.3 0A7.24 7.24 0 "+
    "0 0 15 23.5a1.5 1.5 0 0 0 1 -2.58Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    "+
    "<path d=\"M18.07 9.8a0.26 0.26 0 0 0 -0.35 0l-3.2 3.2c1.42 1 4.86 3.48 5.48 3.9a2"+
    ".49 2.49 0 0 0 1.5 0.59A2 2 0 0 0 22.82 14Z\" fill=\"#000000\" stroke-width=\"1\"></p"+
    "ath>\n    <path d=\"M23.71 0.29a1 1 0 0 0 -1.42 0l-6.84 6.84 -0.95 -1V3a2.4 2.4 0 "+
    "0 0 -0.2 -1 2.49 2.49 0 0 0 -4.6 0 2.4 2.4 0 0 0 -0.2 1v3.66l-3 2.65L1.18 14A2 2"+
    " 0 0 0 3 17.45a0.19 0.19 0 0 0 0.12 -0.07L9 12.68a0.34 0.34 0 0 1 0.5 0.32 0.37 "+
    "0.37 0 0 1 -0.1 0.24L0.29 22.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l22 -22a1 1 0 0"+
    " 0 0 -1.42\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>")
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
