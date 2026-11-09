
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
const BATCH = [{"setName": "icon/misc/ticket", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Ticket--Streamline-Ultimate\">\n  <desc>\n    Ticket Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M11.5 9.75h-3a0.75 0.75 0 0 0 0 1.5h3a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11.5 12.75h-3a0.75 0.75 0 0 0 0 1.5h3a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.16 9.52a1 1 0 0 0 0.84 -1V5a1 1 0 0 0 -1 -1h-3.75a0.5 0.5 0 0 0 -0.5 0.5V6a0.75 0.75 0 0 1 -1.5 0V4.5a0.5 0.5 0 0 0 -0.5 -0.5H1a1 1 0 0 0 -1 1v3.54a1 1 0 0 0 0.86 1 2.5 2.5 0 0 1 0 4.94 1 1 0 0 0 -0.86 1V19a1 1 0 0 0 1 1h15.75a0.5 0.5 0 0 0 0.5 -0.5V18a0.75 0.75 0 0 1 1.5 0v1.5a0.5 0.5 0 0 0 0.5 0.5H23a1 1 0 0 0 1 -1v-3.53a1 1 0 0 0 -0.84 -1 2.5 2.5 0 0 1 0 -5ZM14.5 16a0.5 0.5 0 0 1 -0.5 0.5H6a0.5 0.5 0 0 1 -0.5 -0.5V8a0.5 0.5 0 0 1 0.5 -0.5h8a0.5 0.5 0 0 1 0.5 0.5Zm4.25 -2.5a0.75 0.75 0 0 1 -1.5 0v-3a0.75 0.75 0 0 1 1.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
