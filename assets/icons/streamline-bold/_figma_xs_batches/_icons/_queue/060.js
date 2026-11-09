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
const BATCH = [{"setName":"icon/misc/flash.off","name":"flash-off","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flash-Off--Streamline-Ultimate\"><g><path d=\"M23.43 23.15a1 1 0 0 0 0 -1.41l-7.16 -7.17 3.41 -4.78a0.49 0.49 0 0 0 0 -0.52 0.5 0.5 0 0 0 -0.4 -0.27H11.9L13.76 0.61a0.49 0.49 0 0 0 -0.28 -0.61 0.5 0.5 0 0 0 -0.61 0.17L8.3 6.61 2 0.29A1 1 0 0 0 0.57 1.7l21.51 21.5a1 1 0 0 0 0.64 0.25 1 1 0 0 0 0.71 -0.3\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M6.45 9.69a0.25 0.25 0 0 0 -0.38 0l-3.2 4.49a0.51 0.51 0 0 0 0 0.52 0.52 0.52 0 0 0 0.45 0.27h7.37l-1.9 8.42a0.5 0.5 0 0 0 0.28 0.56 0.54 0.54 0 0 0 0.21 0.05 0.5 0.5 0 0 0 0.4 -0.21l4.41 -6.17a0.24 0.24 0 0 0 0 -0.32Z\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
