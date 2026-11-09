
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
const BATCH = [{"setName": "icon/misc/rain", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Rain-Umbrella--Streamline-Ultimate\">\n  <desc>\n    Rain Umbrella Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M11.32 16.9a0.25 0.25 0 0 0 -0.22 0 0.26 0.26 0 0 0 -0.1 0.2v4.11a2.75 2.75 0 0 0 5.5 0 1 1 0 0 0 -2 0 0.75 0.75 0 0 1 -1.5 0v-4.07a0.26 0.26 0 0 0 -0.1 -0.2 0.25 0.25 0 0 0 -0.22 0 2.36 2.36 0 0 1 -1.36 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 0a1 1 0 0 0 -1 1v0.32a0.25 0.25 0 0 1 -0.22 0.25A12.16 12.16 0 0 0 0 14v0.5a1 1 0 0 0 2 0c0 -0.53 0.7 -1 1.5 -1s1.5 0.5 1.5 1a1 1 0 0 0 2 0c0 -0.41 0.78 -1 2 -1s2 0.59 2 1a1 1 0 0 0 2 0c0 -0.41 0.78 -1 2 -1s2 0.59 2 1a1 1 0 0 0 2 0c0 -0.53 0.7 -1 1.5 -1s1.5 0.47 1.5 1a1 1 0 0 0 2 0V14A12.16 12.16 0 0 0 13.22 1.57a0.25 0.25 0 0 1 -0.22 -0.25V1a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
