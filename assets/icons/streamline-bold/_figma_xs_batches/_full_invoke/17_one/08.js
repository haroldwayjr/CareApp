
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
const BATCH = [{"setName": "icon/misc/water", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Water-Straw--Streamline-Ultimate\">\n  <desc>\n    Water Straw Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M17.91 2h2.34a1 1 0 0 0 0 -2h-2.34a5 5 0 0 0 -4.86 3.84 0.22 0.22 0 0 1 -0.2 0.16h-8.6a1.39 1.39 0 0 0 -1.12 0.51 1.42 1.42 0 0 0 -0.35 1.23c1.52 9.17 0.88 5.32 2.62 15.75A3 3 0 0 0 8.35 24h6.8a3 3 0 0 0 3 -2.51c1.73 -10.43 1.09 -6.59 2.62 -15.73a1.41 1.41 0 0 0 -0.3 -1.18A1.44 1.44 0 0 0 19.25 4h-3.78a0.24 0.24 0 0 1 -0.21 -0.12 0.23 0.23 0 0 1 0 -0.24A3 3 0 0 1 17.91 2m-6.64 9.6a0.25 0.25 0 0 1 -0.3 0.19 3.61 3.61 0 0 1 -2.2 -1.41A1 1 0 0 0 8 10a1 1 0 0 0 -0.8 0.41 3.85 3.85 0 0 1 -1.07 1 0.26 0.26 0 0 1 -0.24 0 0.27 0.27 0 0 1 -0.14 -0.19L4.9 6.29a0.21 0.21 0 0 1 0 -0.2 0.25 0.25 0 0 1 0.24 -0.09h7.1a0.23 0.23 0 0 1 0.19 0.09 0.25 0.25 0 0 1 0.05 0.22Zm5.08 -1.21a1 1 0 0 0 -1.61 0 3.62 3.62 0 0 1 -0.89 0.86 0.26 0.26 0 0 1 -0.29 0 0.26 0.26 0 0 1 -0.1 -0.26l1.1 -4.79a0.25 0.25 0 0 1 0.24 -0.2h3.56a0.25 0.25 0 0 1 0.2 0.09 0.28 0.28 0 0 1 0.05 0.2l-0.81 4.89a0.29 0.29 0 0 1 -0.15 0.19 0.24 0.24 0 0 1 -0.23 0 3.7 3.7 0 0 1 -1.07 -0.98\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
