
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
const BATCH = [{"setName": "icon/misc/food", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Food-Delivery-Bag--Streamline-Ultimate\">\n  <desc>\n    Food Delivery Bag Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M21 7.64a1.55 1.55 0 0 0 -1.55 -1.46h-2v-1A5.2 5.2 0 0 0 7 5.2c0 4.09 0 3.91 0.14 4.17a0.75 0.75 0 0 1 -1.36 -0.43V6.18h-1.2A1.56 1.56 0 0 0 3 7.64c-1 13.92 -0.93 13.15 -0.93 13.88A2.48 2.48 0 0 0 4.58 24h14.84a2.48 2.48 0 0 0 2.48 -2.48c0 -0.71 0.04 0.11 -0.9 -13.88m-6.28 -1.46H8.53v-1a3.71 3.71 0 0 1 7.41 0c0 4.1 0 3.91 0.14 4.17a0.75 0.75 0 0 1 -1.36 -0.43Zm-1.05 5.21a0.5 0.5 0 0 1 0.66 -0.23 6.58 6.58 0 0 1 3 5.95 0.5 0.5 0 0 1 -0.5 0.5h-2.21v2.78a0.5 0.5 0 0 1 -0.5 0.5 0.51 0.51 0 0 1 -0.5 -0.5c0 -9.3 -0.02 -8.85 0.05 -9m-6.57 0.11a0.5 0.5 0 0 1 1 0v3.13c0 0.3 0.35 0.63 0.9 0.76V11.5a0.5 0.5 0 0 1 0.5 -0.5 0.5 0.5 0 0 1 0.5 0.5v3.89c0.55 -0.13 0.91 -0.46 0.91 -0.76V11.5a0.5 0.5 0 0 1 0.5 -0.5 0.5 0.5 0 0 1 0.5 0.5v3.13A2 2 0 0 1 10 16.41v4a0.5 0.5 0 0 1 -0.5 0.5 0.51 0.51 0 0 1 -0.5 -0.5v-4a2 2 0 0 1 -1.9 -1.78Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
