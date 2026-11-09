
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
const BATCH = [{"setName": "icon/misc/wind", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wind-West--Streamline-Ultimate\">\n  <desc>\n    Wind West Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"m9.33 10.47 8.5 3a0.51 0.51 0 0 0 0.17 0 0.52 0.52 0 0 0 0.38 -0.17 0.5 0.5 0 0 0 0.07 -0.55l-1.34 -2.67a0.28 0.28 0 0 1 0 -0.22l1.34 -2.67a0.5 0.5 0 0 0 -0.07 -0.55 0.52 0.52 0 0 0 -0.55 -0.14l-8.5 3a0.5 0.5 0 0 0 0 0.94Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M24 10a10 10 0 1 0 -19 4.36 0.24 0.24 0 0 0 0.23 0.14h1.53a0.27 0.27 0 0 0 0.24 -0.08 0.26 0.26 0 0 0 0 -0.19A1.77 1.77 0 0 1 7 14v-0.06a0.31 0.31 0 0 0 0 -0.13A7.9 7.9 0 0 1 6 10a8 8 0 1 1 8 8 0.18 0.18 0 0 0 -0.16 0.11 0.17 0.17 0 0 0 0.06 0.19 3.9 3.9 0 0 1 1.2 1.47 0.26 0.26 0 0 0 0.26 0.14A10 10 0 0 0 24 10\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.5 19H1a1 1 0 0 0 0 2h10.5a0.5 0.5 0 0 1 0 1 1 1 0 0 0 0 2 2.5 2.5 0 0 0 0 -5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 18h8.5a2.5 2.5 0 0 0 0 -5 1 1 0 0 0 0 2 0.5 0.5 0 0 1 0 1H1a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
