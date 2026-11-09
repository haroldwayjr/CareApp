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
const BATCH = [{"setName":"icon/files/manual","name":"manual","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Manual-Book-Content-Sign--Streamline-Ultimate\"><path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M2.312 4.036A3.892 3.892 0 0 1 6.208 0.14h13.756a1.73 1.73 0 0 1 1.724 1.724v15.928a1.73 1.73 0 0 1 -1.449 1.702v2.366h0.449a1 1 0 1 1 0 2H5.484a3.175 3.175 0 0 1 -3.172 -3.172zm2 16.652c0 0.645 0.527 1.172 1.172 1.172h12.755v-2.344H5.484c-0.645 0 -1.172 0.527 -1.172 1.172m5.615 -14.02c0 -1.1 0.88 -2.073 2.073 -2.073 1.1 0 2.073 0.88 2.073 2.073 0 1.1 -0.88 2.073 -2.073 2.073a1 1 0 0 0 -1 1v1.8a1 1 0 0 0 2 0v-0.921c1.832 -0.455 3.073 -2.132 3.073 -3.952 0 -2.366 -1.938 -4.073 -4.073 -4.073 -2.366 0 -4.073 1.937 -4.073 4.073a1 1 0 1 0 2 0M12 16.26A1.13 1.13 0 1 0 12 14a1.13 1.13 0 0 0 0 2.26\" clip-rule=\"evenodd\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
