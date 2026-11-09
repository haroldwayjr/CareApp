
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
const BATCH = [{"setName": "icon/misc/barcode.scan", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Barcode-Scan--Streamline-Ultimate\">\n  <desc>\n    Barcode Scan Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M1 8a1 1 0 0 0 1 -1l0 -1.74a0.27 0.27 0 0 1 0 -0.18 0.25 0.25 0 0 1 0.21 -0.08h1.66a1 1 0 0 0 0 -2H2a2 2 0 0 0 -2 2v2a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3.87 19H2.25a0.25 0.25 0 0 1 -0.25 -0.25V17a1 1 0 0 0 -2 0v2a2 2 0 0 0 2 2h1.87a1 1 0 1 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 16a1 1 0 0 0 -1 1l0 1.74a0.27 0.27 0 0 1 -0.07 0.18 0.25 0.25 0 0 1 -0.18 0.08h-1.62a1 1 0 1 0 0 2H22a2 2 0 0 0 2 -2v-2a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22 3h-1.87a1 1 0 0 0 0 2h1.62a0.25 0.25 0 0 1 0.25 0.25V7a1 1 0 0 0 2 0V5a2 2 0 0 0 -2 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5 7a1 1 0 0 0 -1 1v7.5a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.5 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 7a1 1 0 0 0 -1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.5 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 14a1 1 0 0 0 -1 1v0.5a1 1 0 0 0 2 0V15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20 15.5V8a1 1 0 0 0 -2 0v7.5a1 1 0 0 0 2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
