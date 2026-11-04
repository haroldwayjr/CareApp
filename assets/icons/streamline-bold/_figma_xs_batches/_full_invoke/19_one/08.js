
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
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
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
  try { xs.resizeWithoutConstraints(16, 16); } catch (_) { try { xs.resize(16, 16); } catch(__){} }
  bindFills(node);
  xs.clipsContent = false;
  xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}
const BATCH = [{"setName": "icon/misc/robot", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Robot--Streamline-Ultimate\">\n  <desc>\n    Robot Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M5.5 11h13a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2h-13a2 2 0 0 0 -2 2v7a2 2 0 0 0 2 2M16 4a1.5 1.5 0 1 1 -1.5 1.5A1.5 1.5 0 0 1 16 4M8 4a1.5 1.5 0 1 1 -1.5 1.5A1.5 1.5 0 0 1 8 4\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.5 12.5a1 1 0 0 0 0 2h3a1 1 0 0 0 0 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.3 9.87a1 1 0 0 0 -1.6 1.2 1.46 1.46 0 0 1 0.3 0.9 1.5 1.5 0 0 1 -2.7 0.9 1 1 0 0 0 -1.6 1.2 3.46 3.46 0 0 0 2.56 1.39 0.27 0.27 0 0 1 0.19 0.1 0.25 0.25 0 0 1 0 0.21 3 3 0 0 1 -1.08 1.7l-0.39 0.3a0.31 0.31 0 0 1 -0.44 -0.05A4.61 4.61 0 0 0 15 16H9a4.61 4.61 0 0 0 -3.6 1.72 0.31 0.31 0 0 1 -0.44 0.05l-0.39 -0.3a3 3 0 0 1 -1.08 -1.7 0.25 0.25 0 0 1 0 -0.21 0.27 0.27 0 0 1 0.19 -0.1 3.46 3.46 0 0 0 2.62 -1.39 1 1 0 0 0 -1.6 -1.2A1.5 1.5 0 0 1 2 12a1.46 1.46 0 0 1 0.3 -0.9A1 1 0 0 0 0.7 9.87 3.45 3.45 0 0 0 0 12a3.48 3.48 0 0 0 1.12 2.56 1 1 0 0 1 0.31 0.7 5.06 5.06 0 0 0 1.93 3.82l0.65 0.5a1 1 0 0 1 0.38 0.84 5 5 0 0 0 0.1 1.22c0 0.08 0 -0.06 0.47 1.38a1.51 1.51 0 0 0 1.42 1h11.24A1.51 1.51 0 0 0 19 23c0.49 -1.44 0.45 -1.3 0.47 -1.38a5 5 0 0 0 0.1 -1.22 1 1 0 0 1 0.38 -0.84l0.65 -0.5a5.06 5.06 0 0 0 1.93 -3.82 1 1 0 0 1 0.31 -0.7A3.48 3.48 0 0 0 24 12a3.45 3.45 0 0 0 -0.7 -2.13\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
let ok=0, missing=0, failed=0; const miss=[], fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<8) miss.push(item.setName); continue; }
  try {
    const r = applyBoldXs(set, item.svg);
    if (r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); }
  } catch(e) { failed++; if (fail.length<8) fail.push({name:item.setName,err:String(e)}); }
}
return { ok, missing, failed, miss, fail };
