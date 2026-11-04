
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
const BATCH = [{"setName": "icon/misc/camera.off", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Controls-Camera-Off--Streamline-Ultimate\">\n  <desc>\n    Controls Camera Off Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M3.17 6.43a0.27 0.27 0 0 0 -0.28 0A1.5 1.5 0 0 0 2 7.75v9a1.5 1.5 0 0 0 1.5 1.5h10.88a0.25 0.25 0 0 0 0.23 -0.15 0.26 0.26 0 0 0 0 -0.28Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m21.74 7.45 -3 1.71a1.44 1.44 0 0 0 -0.74 1.25v3.68a1.44 1.44 0 0 0 0.74 1.25l3 1.71A1.5 1.5 0 0 0 24 15.8V8.7a1.5 1.5 0 0 0 -2.26 -1.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.07 15.66a0.29 0.29 0 0 1 -0.07 -0.18V7.75a1.5 1.5 0 0 0 -1.5 -1.5H7.77a0.29 0.29 0 0 1 -0.18 -0.07L1.71 0.29A1 1 0 0 0 0.44 0.17L0.29 0.29a1 1 0 0 0 0 1.42l22 22a1 1 0 0 0 1.42 -1.42Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
