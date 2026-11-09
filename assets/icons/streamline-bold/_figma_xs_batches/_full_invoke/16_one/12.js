
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
const BATCH = [{"setName": "icon/misc/bus", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Bus--Streamline-Ultimate\">\n  <desc>\n    Bus Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M20.25 6.5a0.24 0.24 0 0 1 -0.25 -0.25V2.5A2.5 2.5 0 0 0 17.5 0h-11A2.5 2.5 0 0 0 4 2.5v3.75a0.25 0.25 0 0 1 -0.25 0.25H1.5A1.5 1.5 0 0 0 0 8v5a1.5 1.5 0 0 0 1.5 1.5 1 1 0 0 0 1 -1v-5h1.25a0.25 0.25 0 0 1 0.25 0.25v10.73A1.5 1.5 0 0 0 5.29 21a0.26 0.26 0 0 1 0.21 0.25V23a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-1.77a0.25 0.25 0 0 1 0.25 -0.23h4.5a0.25 0.25 0 0 1 0.25 0.25V23a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-1.79a0.26 0.26 0 0 1 0.21 -0.25A1.5 1.5 0 0 0 20 19.48V8.75a0.25 0.25 0 0 1 0.25 -0.25h1.25v5a1 1 0 0 0 1 1A1.5 1.5 0 0 0 24 13V8a1.5 1.5 0 0 0 -1.5 -1.5Zm-2.75 1a0.5 0.5 0 0 1 0.5 0.5v6a0.5 0.5 0 0 1 -0.5 0.5h-11A0.5 0.5 0 0 1 6 14V8a0.5 0.5 0 0 1 0.5 -0.5ZM9.5 4V3a0.5 0.5 0 0 1 0.5 -0.5h4a0.5 0.5 0 0 1 0.5 0.5v1a0.5 0.5 0 0 1 -0.5 0.5h-4a0.5 0.5 0 0 1 -0.5 -0.5m0.75 14a0.76 0.76 0 0 1 -0.75 0.75h-3a0.75 0.75 0 0 1 0 -1.5h3a0.76 0.76 0 0 1 0.75 0.75m4.25 0.75a0.75 0.75 0 0 1 0 -1.5h3a0.75 0.75 0 0 1 0 1.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
