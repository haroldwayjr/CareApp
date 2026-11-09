
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
const BATCH = [{"setName": "icon/misc/balloon", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Balloon-Party--Streamline-Ultimate\">\n  <desc>\n    Balloon Party Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M19.6 16.62a2.87 2.87 0 1 0 -2.87 -2.87 2.88 2.88 0 0 0 2.87 2.87\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.66 18.67a1.49 1.49 0 0 1 -1.71 0.09L12.66 18a1.75 1.75 0 0 0 -2.53 0.86 1.82 1.82 0 0 0 0.81 2.14l2.42 1.45a1.72 1.72 0 0 0 0.9 0.25 1.78 1.78 0 0 0 0.61 -0.11l1.89 -1v2h7v-2c-0.03 -3.73 -4.67 -5.59 -8.1 -2.92\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.52 16.25a6.81 6.81 0 0 1 -2.46 -4.93A4.6 4.6 0 0 0 8.5 9.7a5.82 5.82 0 0 0 1.22 -3.81 5.82 5.82 0 0 0 -1.44 -3.73A4.42 4.42 0 0 0 4.83 0.62a4.47 4.47 0 0 0 -3.36 1.74A5.82 5.82 0 0 0 0.26 6.17a5.82 5.82 0 0 0 1.43 3.72 4.53 4.53 0 0 0 2.37 1.44 8.8 8.8 0 0 0 3.12 6.41 1 1 0 0 0 1.34 -1.49M3.18 8.56a3.86 3.86 0 0 1 -0.93 -2.45A3.89 3.89 0 0 1 3 3.61a2.45 2.45 0 0 1 1.85 -1H5a2.47 2.47 0 0 1 1.84 0.88A3.86 3.86 0 0 1 7.72 6a3.83 3.83 0 0 1 -0.78 2.5 2.47 2.47 0 0 1 -1.85 1 2.49 2.49 0 0 1 -1.91 -0.94\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10 14.74a1 1 0 0 0 0.7 1.26 0.9 0.9 0 0 0 0.3 0 1 1 0 0 0 1 -0.71 11 11 0 0 0 0.4 -3.46A5.36 5.36 0 0 0 16.3 7c0.3 -3 -1.58 -5.6 -4.18 -5.86a5.43 5.43 0 0 0 -0.57 0 1 1 0 0 0 -1 1 1 1 0 0 0 1 1h0.3c1.5 0.15 2.57 1.8 2.38 3.67s-1.55 3.28 -3.06 3.13a1.91 1.91 0 0 1 -0.33 -0.06 1 1 0 0 0 -0.6 1.9 8.41 8.41 0 0 1 -0.24 2.96\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
