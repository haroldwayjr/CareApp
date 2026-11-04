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
const BATCH = [{"setName":"icon/files/folder.star","name":"folder-star","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Folder-Star--Streamline-Ultimate\"><g><path d=\"M12.26 13h1a0.51 0.51 0 0 0 0.46 -0.3c0.25 -0.59 0.8 -1.84 0.81 -1.87a3.3 3.3 0 0 1 5.89 0l0.15 0.35a0.21 0.21 0 0 0 0.41 0V4.5A1.5 1.5 0 0 0 19.5 3H9.62a0.51 0.51 0 0 1 -0.45 -0.28L8.22 0.83A1.49 1.49 0 0 0 6.88 0H1.5A1.5 1.5 0 0 0 0 1.5v15A1.5 1.5 0 0 0 1.5 18h7.63a0.25 0.25 0 0 0 0.22 -0.37A3.18 3.18 0 0 1 9.24 15a3.23 3.23 0 0 1 3.02 -2\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M23.61 17.14a1.28 1.28 0 0 0 0.3 -1.38 1.23 1.23 0 0 0 -1.17 -0.76h-2.5a0.25 0.25 0 0 1 -0.23 -0.15l-1.35 -3.12a1.29 1.29 0 0 0 -2.3 0L15 14.85a0.25 0.25 0 0 1 -0.23 0.15h-2.5a1.23 1.23 0 0 0 -1.17 0.76 1.28 1.28 0 0 0 0.3 1.38l2.21 2a0.26 0.26 0 0 1 0.07 0.29l-1.23 2.81a1.29 1.29 0 0 0 1.82 1.62l3.12 -1.75a0.21 0.21 0 0 1 0.24 0l3.12 1.75a1.29 1.29 0 0 0 1.82 -1.62l-1.24 -2.84a0.26 0.26 0 0 1 0.07 -0.29Z\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
