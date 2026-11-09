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
const BATCH = [{"setName":"icon/commerce/cart","name":"cart","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Shopping-Cart--Streamline-Ultimate\"><g><path d=\"M3.75 21.75a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 1 0 -4.5 0\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M13 21.75a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 1 0 -4.5 0\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M23 0h-2.32a1.5 1.5 0 0 0 -1.48 1.25l-2.76 15.29a0.26 0.26 0 0 1 -0.25 0.21H5a0.5 0.5 0 0 1 0 -1h7.76a2.5 2.5 0 0 0 0 -5H3.5a0.5 0.5 0 0 1 0 -1h10.75a2.5 2.5 0 0 0 0 -5H1a1 1 0 0 0 0 2h13.25a0.5 0.5 0 0 1 0 1H3.5a2.5 2.5 0 0 0 0 5h9.26a0.5 0.5 0 0 1 0 1H5a2.5 2.5 0 0 0 0 5h11.82a1.5 1.5 0 0 0 1.48 -1.25l2.76 -15.29a0.26 0.26 0 0 1 0.25 -0.21H23a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
