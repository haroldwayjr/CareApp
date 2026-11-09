
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
const BATCH = [{"setName": "icon/misc/atom", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Science-Atom-Positive-Negative--Streamline-Ultimate\">\n  <desc>\n    Science Atom Positive Negative Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.52 8.62a1 1 0 1 0 -1.92 0.56A10.28 10.28 0 0 1 22 12 10 10 0 1 1 12 2a10.34 10.34 0 0 1 2.42 0.29 1 1 0 0 0 1.21 -0.72A1 1 0 0 0 14.9 0.35 12.24 12.24 0 0 0 12 0a12 12 0 1 0 11.52 8.62\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 5.75A6.25 6.25 0 1 0 18.25 12 6.25 6.25 0 0 0 12 5.75M15 13h-1.5a0.5 0.5 0 0 0 -0.5 0.5V15a1 1 0 0 1 -2 0v-1.5a0.5 0.5 0 0 0 -0.5 -0.5H9a1 1 0 0 1 0 -2h1.5a0.5 0.5 0 0 0 0.5 -0.5V9a1 1 0 0 1 2 0v1.5a0.5 0.5 0 0 0 0.5 0.5H15a1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16.25 4a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 1 0 -6.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
