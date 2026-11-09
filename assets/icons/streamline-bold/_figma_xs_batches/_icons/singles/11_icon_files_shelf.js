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
const BATCH = [{"setName":"icon/files/shelf","name":"shelf","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Shelf-Tv--Streamline-Ultimate\"><path d=\"M24 13.5a1.5 1.5 0 0 0 -1.5 -1.5h-9a0.5 0.5 0 0 1 -0.5 -0.5V11a0.5 0.5 0 0 1 0.5 -0.5H18a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2H6a2 2 0 0 0 -2 2v6.5a2 2 0 0 0 2 2h4.5a0.5 0.5 0 0 1 0.5 0.5v0.5a0.5 0.5 0 0 1 -0.5 0.5h-9A1.5 1.5 0 0 0 0 13.5v10a0.5 0.5 0 0 0 0.5 0.5H4a0.48 0.48 0 0 0 0.48 -0.37L5 21.58A1.29 1.29 0 0 1 6 21h12a1.31 1.31 0 0 1 1 0.58l0.57 2.06A0.5 0.5 0 0 0 20 24h3.5a0.5 0.5 0 0 0 0.5 -0.5Zm-13.5 4a0.5 0.5 0 0 1 -0.5 0.5H3a0.5 0.5 0 0 1 -0.5 -0.5v-2A0.5 0.5 0 0 1 3 15h7a0.5 0.5 0 0 1 0.5 0.5Zm-4 -9A0.5 0.5 0 0 1 6 8V2.5a0.5 0.5 0 0 1 0.5 -0.5h11a0.5 0.5 0 0 1 0.5 0.5V8a0.5 0.5 0 0 1 -0.5 0.5Zm15 9a0.5 0.5 0 0 1 -0.5 0.5h-7a0.5 0.5 0 0 1 -0.5 -0.5v-2a0.5 0.5 0 0 1 0.5 -0.5h7a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
