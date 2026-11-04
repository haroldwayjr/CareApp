
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
  setName: "icon/actions/explore",
  name: "explore",
  category: "actions",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Space-Explore--S"+
    "treamline-Ultimate\">\n  <desc>\n    Space Explore Streamline Icon: https://streaml"+
    "inehq.com\n  </desc>\n  <g>\n    <path d=\"M9.6 3.56h0.25a0.51 0.51 0 0 1 0.5 0.5v0."+
    "25a0.75 0.75 0 1 0 1.5 0v-0.25a0.5 0.5 0 0 1 0.5 -0.5h0.25a0.75 0.75 0 0 0 0 -1."+
    "5h-0.25a0.5 0.5 0 0 1 -0.5 -0.5v-0.25a0.75 0.75 0 0 0 -1.5 0v0.25a0.5 0.5 0 0 1 "+
    "-0.5 0.5H9.6a0.75 0.75 0 0 0 0 1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    "+
    "<path d=\"M23.25 11.13H23a0.5 0.5 0 0 1 -0.5 -0.5v-0.25a0.75 0.75 0 0 0 -1.5 0v0."+
    "25a0.5 0.5 0 0 1 -0.5 0.5h-0.25a0.75 0.75 0 0 0 0 1.5h0.25a0.5 0.5 0 0 1 0.5 0.5"+
    "v0.25a0.75 0.75 0 1 0 1.5 0v-0.25a0.5 0.5 0 0 1 0.5 -0.5h0.25a0.75 0.75 0 0 0 0 "+
    "-1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.25 3A2.25 2.25 0 "+
    "0 1 21 0.75a0.75 0.75 0 0 0 -1.5 0A2.25 2.25 0 0 1 17.25 3a0.75 0.75 0 0 0 0 1.5"+
    " 2.25 2.25 0 0 1 2.25 2.25 0.75 0.75 0 0 0 1.5 0 2.25 2.25 0 0 1 2.25 -2.25 0.75"+
    " 0.75 0 0 0 0 -1.5m-2.48 0.94a2.57 2.57 0 0 0 -0.33 0.33 0.25 0.25 0 0 1 -0.38 0"+
    " 2.57 2.57 0 0 0 -0.33 -0.33 0.25 0.25 0 0 1 0 -0.38 2.57 2.57 0 0 0 0.33 -0.33 "+
    "0.25 0.25 0 0 1 0.38 0 2.57 2.57 0 0 0 0.33 0.33 0.25 0.25 0 0 1 0 0.38\" fill=\"#"+
    "000000\" stroke-width=\"1\"></path>\n    <path d=\"M0.65 16.81h13.21a0.45 0.45 0 0 0 "+
    "0.45 -0.51 0.86 0.86 0 0 0 -1 -0.74 1 1 0 0 1 -0.24 0 5.38 5.38 0 0 1 -5.35 -4.7"+
    "5 0.88 0.88 0 0 0 -0.9 -0.76 7.16 7.16 0 0 0 -6.74 6.1 0.59 0.59 0 0 0 0.13 0.46"+
    " 0.57 0.57 0 0 0 0.44 0.2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\""+
    "M13.8 18H0.58a0.58 0.58 0 0 0 -0.58 0.58v4.6a0.87 0.87 0 0 0 0.86 0.82H5a0.87 0."+
    "87 0 0 0 0.86 -0.86v-1.29a1.31 1.31 0 0 1 2.61 0v1.29a0.87 0.87 0 0 0 0.86 0.86h"+
    "4.15a0.87 0.87 0 0 0 0.87 -0.86v-4.6a0.58 0.58 0 0 0 -0.55 -0.54\" fill=\"#000000\""+
    " stroke-width=\"1\"></path>\n    <path d=\"M13.14 6.59a0.87 0.87 0 0 0 -1.22 0 2.57 "+
    "2.57 0 0 0 -0.76 1.83 2.62 2.62 0 0 0 0.22 1 0.58 0.58 0 0 1 -0.12 0.64l-1.47 1."+
    "51a0.57 0.57 0 0 0 -0.08 0.71 3.94 3.94 0 0 0 2.14 1.66 0.59 0.59 0 0 0 0.59 -0."+
    "14l1.26 -1.26a0.57 0.57 0 0 1 0.64 -0.12 2.63 2.63 0 0 0 2.87 -0.54 0.88 0.88 0 "+
    "0 0 0 -1.22Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>")
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
