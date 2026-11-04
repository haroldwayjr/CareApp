
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
const BATCH = [{"setName": "icon/misc/building", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Building--Streamline-Ultimate\">\n  <desc>\n    Building Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23 24a1 1 0 0 0 1 -1 0.5 0.5 0 0 0 -0.5 -0.5h-9a0.5 0.5 0 0 1 0 -1h9a0.5 0.5 0 0 0 0.5 -0.5v-0.5a0.5 0.5 0 0 0 -0.5 -0.5h-9a0.5 0.5 0 0 1 0 -1h9a0.5 0.5 0 0 0 0.5 -0.5V18a0.48 0.48 0 0 0 -0.25 -0.43 0.52 0.52 0 0 1 -0.25 -0.44V1a1 1 0 0 0 -1 -1H16a0.5 0.5 0 0 0 -0.5 0.5V17a0.5 0.5 0 0 1 -0.5 0.5h-0.5a0.5 0.5 0 0 1 -0.5 -0.5V0.5a0.5 0.5 0 0 0 -0.5 -0.5h-12A1.5 1.5 0 0 0 0 1.5v21A1.5 1.5 0 0 0 1.5 24ZM19.5 2.5a2 2 0 1 1 -2 2 2 2 0 0 1 2 -2m-2 12a2 2 0 0 1 4 0V17a0.5 0.5 0 0 1 -0.5 0.5h-3a0.5 0.5 0 0 1 -0.5 -0.5ZM5.5 19a0.5 0.5 0 0 1 -0.5 0.5H2.5A0.5 0.5 0 0 1 2 19v-3.25a1.75 1.75 0 0 1 3.5 0Zm0 -10a0.5 0.5 0 0 1 -0.5 0.5H2.5A0.5 0.5 0 0 1 2 9V5.75a1.75 1.75 0 0 1 3.5 0ZM12 19a0.5 0.5 0 0 1 -0.5 0.5H9a0.5 0.5 0 0 1 -0.5 -0.5v-3.25a1.75 1.75 0 0 1 3.5 0Zm0 -10a0.5 0.5 0 0 1 -0.5 0.5H9a0.5 0.5 0 0 1 -0.5 -0.5V5.75a1.75 1.75 0 0 1 3.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
