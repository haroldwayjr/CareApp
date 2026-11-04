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
const BATCH = [{"setName":"icon/files/letter","name":"letter","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Letter-Balloon--Streamline-Ultimate\"><g><path d=\"M22.91 9h-1V8a1 1 0 0 0 -2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0v-1h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M15.41 3a1.5 1.5 0 1 0 -1.5 -1.5 1.5 1.5 0 0 0 1.5 1.5\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M4.41 21a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0 -1.5 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M12.1 17.55a1 1 0 0 0 -0.27 -1.39l-2.9 -2 -0.2 -0.11 2.46 -0.81 0.68 0.77a1.75 1.75 0 0 0 1.86 0.5l1.27 -0.39a1.74 1.74 0 0 0 0.79 -2.79L6.8 0.62A1.75 1.75 0 0 0 4.91 0.08L2.4 0.91a1.77 1.77 0 0 0 -1.2 1.56l-0.86 14A1.76 1.76 0 0 0 1 17.94a1.79 1.79 0 0 0 1.07 0.36 1.7 1.7 0 0 0 0.54 -0.09l1.3 -0.43a1.73 1.73 0 0 0 1.19 -1.51l0.09 -1 2.32 -0.76 -0.09 0.17 -1.23 3.17a1 1 0 0 0 0.56 1.29 1 1 0 0 0 0.37 0.07 1 1 0 0 0 0.93 -0.63l0.8 -2 1.86 1.26a1 1 0 0 0 1.39 -0.29m-2.78 -7.41L5 11.58l0.5 -5.81Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M14.44 19.26c-2.19 0.31 -3 0.2 -3.72 -0.47a1 1 0 0 0 -1.39 1.43c1.47 1.44 3.32 1.31 5.4 1 2.5 -0.36 4.27 0.4 4.73 2a1 1 0 0 0 1 0.74 1.26 1.26 0 0 0 0.27 0 1 1 0 0 0 0.7 -1.23c-0.79 -2.65 -3.43 -3.98 -6.99 -3.47\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
