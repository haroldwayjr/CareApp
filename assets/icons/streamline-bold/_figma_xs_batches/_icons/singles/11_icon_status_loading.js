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
const BATCH = [{"setName":"icon/status/loading","name":"loading","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Loading--Streamline-Ultimate\"><g><path d=\"M12 6.5A1.5 1.5 0 0 0 13.5 5V2a1.5 1.5 0 0 0 -3 0v3A1.5 1.5 0 0 0 12 6.5\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M8.27 6.11 6.15 4A1.53 1.53 0 0 0 4 4a1.48 1.48 0 0 0 -0.44 1.06A1.52 1.52 0 0 0 4 6.11l2.15 2.12a1.5 1.5 0 0 0 1.06 0.44 1.5 1.5 0 0 0 1.06 -2.56\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M0.5 12A1.5 1.5 0 0 0 2 13.5h3a1.5 1.5 0 0 0 0 -3H2A1.5 1.5 0 0 0 0.5 12\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M7 15.52a1.48 1.48 0 0 0 -1.1 0.48l-2.13 2.08a1.51 1.51 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L8 18.08a1.5 1.5 0 0 0 -1 -2.56\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M10.5 22a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0 -3 0Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M16.05 16a1.5 1.5 0 0 0 0 2.12l2.12 2.12a1.52 1.52 0 0 0 1.06 0.44 1.54 1.54 0 0 0 1.07 -0.44 1.51 1.51 0 0 0 0.43 -1.06 1.48 1.48 0 0 0 -0.44 -1.07L18.17 16a1.5 1.5 0 0 0 -2.12 0\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M23.5 12a1.5 1.5 0 0 0 -1.5 -1.5h-3a1.5 1.5 0 0 0 -1.5 1.5 1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M19 3.41a1.52 1.52 0 0 0 -1 0.44L15.86 6a1.5 1.5 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L20.11 6A1.5 1.5 0 0 0 19 3.41\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
