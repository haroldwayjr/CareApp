
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
const BATCH = [{"setName": "icon/misc/coffee", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Coffee-Jar--Streamline-Ultimate\">\n  <desc>\n    Coffee Jar Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M5.5 3.5h13A0.5 0.5 0 0 0 19 3V1.5A1.5 1.5 0 0 0 17.5 0h-11A1.5 1.5 0 0 0 5 1.5V3a0.5 0.5 0 0 0 0.5 0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m21 10.31 -2 -5a0.49 0.49 0 0 0 -0.5 -0.31h-13a0.49 0.49 0 0 0 -0.5 0.31l-2 5a0.43 0.43 0 0 0 0 0.19v11A2.5 2.5 0 0 0 5.5 24h13a2.5 2.5 0 0 0 2.5 -2.5v-11a0.43 0.43 0 0 0 0 -0.19M9.52 19.08a0.25 0.25 0 0 1 -0.34 0c-1.37 -1.35 -1.6 -3.94 -0.41 -6.31a5.81 5.81 0 0 1 4.79 -3.5 0.25 0.25 0 0 1 0.24 0.16 0.27 0.27 0 0 1 -0.08 0.28c-1.93 1.54 -2 3.55 -2.1 5.21 -0.17 3.58 -1.09 3.28 -2.1 4.16m6.71 -2.59A5.92 5.92 0 0 1 11.66 20a0.26 0.26 0 0 1 -0.24 -0.16 0.23 0.23 0 0 1 0.06 -0.28c1.48 -1.31 1.57 -3 1.64 -4.57 0.16 -3.57 1 -3.56 2.47 -4.72a0.25 0.25 0 0 1 0.34 0c1.27 1.4 1.45 3.91 0.3 6.22\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
