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
      const paint = figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', iconDefault);
      n.fills = [paint]; n.strokes = [];
    }
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
  node.resize(16, 16); node.x = 0; node.y = 0; node.clipsContent = false;
  if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
  xs.appendChild(node);
  try { xs.resizeWithoutConstraints(16, 16); } catch (_) { try { xs.resize(16, 16); } catch (__) {} }
  bindFills(node); xs.clipsContent = false; xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true; return { ok: true };
}
const BATCH = [{"setName":"icon/misc/parking","name":"parking","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Parking-P--Streamline-Ultimate\"><g><path d=\"M5.5 21.75h-4a0.25 0.25 0 0 0 -0.25 0.25v0.5a1.25 1.25 0 0 0 1.25 1.25h2a1.25 1.25 0 0 0 1.25 -1.25V22a0.25 0.25 0 0 0 -0.25 -0.25\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M19.5 21.75h-4a0.25 0.25 0 0 0 -0.25 0.25v0.5a1.25 1.25 0 0 0 1.25 1.25h2a1.25 1.25 0 0 0 1.25 -1.25V22a0.25 0.25 0 0 0 -0.25 -0.25\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"m19.3 15.24 -0.11 -0.17 -0.47 -1.16a0.25 0.25 0 0 0 -0.23 -0.16h-1.82a0.25 0.25 0 0 0 -0.22 0.13 0.26 0.26 0 0 1 -0.21 0.12H4.93a0.26 0.26 0 0 1 -0.21 -0.11 0.27 0.27 0 0 1 0 -0.23l1 -2.5a0.24 0.24 0 0 1 0.21 -0.16h4.32a1 1 0 0 0 0 -2H5.42A1.5 1.5 0 0 0 4 9.94l-1.91 4.85L2 15 0.47 16.47a0.75 0.75 0 0 0 -0.22 0.53v2.5a1.25 1.25 0 0 0 1.25 1.25h18a1.25 1.25 0 0 0 1.25 -1.25v-2.29a1.26 1.26 0 0 0 -0.37 -0.89Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M17.75 0.25a6 6 0 1 0 6 6 6 6 0 0 0 -6 -6m0.5 7.25h-1a0.25 0.25 0 0 0 -0.25 0.25v2a0.75 0.75 0 0 1 -1.5 0v-7a0.76 0.76 0 0 1 0.75 -0.75h2a2.75 2.75 0 0 1 0 5.5\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M18.25 3.5h-1a0.25 0.25 0 0 0 -0.25 0.25v2a0.25 0.25 0 0 0 0.25 0.25h1a1.25 1.25 0 0 0 0 -2.5\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
