
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
const BATCH = [{"setName": "icon/misc/train", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Train-Location--Streamline-Ultimate\">\n  <desc>\n    Train Location Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"m19.41 23 -1.2 -4a1 1 0 0 0 0.65 -0.93V7.56a2.57 2.57 0 0 0 -1.71 -2.39 0.64 0.64 0 0 0 -0.24 0h-0.22a9.9 9.9 0 0 1 -0.75 1.49h0.81a1.06 1.06 0 0 1 0.61 0.94v4.6H6.67V7.56a1.08 1.08 0 0 1 1.11 -1h0.76A9.58 9.58 0 0 1 7.8 5a2.6 2.6 0 0 0 -2.63 2.56v10.49A1 1 0 0 0 6 19l-1.23 4a0.74 0.74 0 0 0 0.5 0.93 0.78 0.78 0 0 0 0.22 0 0.74 0.74 0 0 0 0.71 -0.53l0.22 -0.73h11.34l0.22 0.73a0.74 0.74 0 0 0 0.71 0.53 0.78 0.78 0 0 0 0.22 0 0.74 0.74 0 0 0 0.5 -0.93m-8.52 -8.16h2.54a0.75 0.75 0 0 1 0 1.5h-2.54a0.75 0.75 0 0 1 0 -1.5m-4 6.36 0.57 -1.9a0.82 0.82 0 0 0 0 -0.27h9.26a0.83 0.83 0 0 0 0 0.27l0.56 1.9Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12.25 8.82s3.31 -3.31 3.31 -5.51a3.31 3.31 0 0 0 -6.56 0c0 2.2 3.25 5.51 3.25 5.51m0 -6.64a1.13 1.13 0 1 1 -1.13 1.13 1.14 1.14 0 0 1 1.13 -1.13\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
