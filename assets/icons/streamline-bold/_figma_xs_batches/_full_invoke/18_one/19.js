
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
const BATCH = [{"setName": "icon/misc/temperature", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Temperature-Up--Streamline-Ultimate\">\n  <desc>\n    Temperature Up Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M10.5 4.5a4.5 4.5 0 0 0 -9 0v9.44a0.23 0.23 0 0 1 -0.06 0.16A6 6 0 1 0 12 18a6 6 0 0 0 -1.44 -3.9 0.23 0.23 0 0 1 -0.06 -0.16ZM6 22a4 4 0 0 1 -2.8 -6.86 1 1 0 0 0 0.3 -0.71V4.5a2.5 2.5 0 0 1 5 0v9.93a1 1 0 0 0 0.3 0.71A4 4 0 0 1 6 22\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.11 16.34a0.26 0.26 0 0 1 -0.11 -0.21V6.5a1 1 0 0 0 -2 0v9.63a0.26 0.26 0 0 1 -0.11 0.21 2 2 0 1 0 2.22 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13 9a1 1 0 0 0 0.66 -0.25l3.28 -2.87a0.26 0.26 0 0 1 0.3 0l2.21 1.47a1 1 0 0 0 1.26 -0.12l3 -3a1 1 0 1 0 -1.42 -1.42L20 5.07a0.26 0.26 0 0 1 -0.32 0l-2.13 -1.4a1 1 0 0 0 -1.21 0.08l-4 3.5a1 1 0 0 0 -0.09 1.41A1 1 0 0 0 13 9\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 11.5H13a1 1 0 0 0 0 2h10a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
