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
const BATCH = [{"setName":"icon/misc/key","name":"key","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Key-Lock--Streamline-Ultimate\"><g><path d=\"M22 6.5h-0.5V5a5 5 0 0 0 -10 0v1.5a2 2 0 0 0 -2 2v4.09a0.26 0.26 0 0 0 0.1 0.2 7.17 7.17 0 0 1 2.19 2.54 0.24 0.24 0 0 0 0.22 0.14h5.92A3 3 0 0 1 21 18.24a0.25 0.25 0 0 0 0.25 0.23H22a2 2 0 0 0 2 -2v-8a2 2 0 0 0 -2 -1.97M13.5 5a3 3 0 0 1 6 0v1.25a0.25 0.25 0 0 1 -0.25 0.25h-5.5a0.25 0.25 0 0 1 -0.25 -0.25Zm4 7.26v1.21a0.75 0.75 0 0 1 -1.5 0v-1.21a1.5 1.5 0 1 1 1.5 0\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M19.5 18.41A1.54 1.54 0 0 0 17.93 17h-7.1a5.54 5.54 0 0 0 -5.3 -4L5 13a5.6 5.6 0 0 0 -5 5.49A5.52 5.52 0 0 0 5.52 24a5.48 5.48 0 0 0 5.29 -4h0.51a0.25 0.25 0 0 1 0.22 0.13l0.94 1.66a0.48 0.48 0 0 0 0.43 0.25 0.5 0.5 0 0 0 0.43 -0.23l1.06 -1.69a0.24 0.24 0 0 1 0.21 -0.11h0.21a0.25 0.25 0 0 1 0.22 0.13l0.96 1.62a0.48 0.48 0 0 0 0.43 0.25 0.5 0.5 0 0 0 0.43 -0.23L18 20a1.51 1.51 0 0 0 1.5 -1.59m-15 1.32a1.25 1.25 0 1 1 1.25 -1.25 1.25 1.25 0 0 1 -1.25 1.25\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
