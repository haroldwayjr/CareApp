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
const BATCH = [{"setName":"icon/health/emergency","name":"emergency","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Hospital-Emergency-Department--Streamline-Ultimate\"><g><path d=\"M5 19.75a0.5 0.5 0 0 0 0.5 0.5h13a0.5 0.5 0 0 0 0.5 -0.5v-7a7 7 0 0 0 -14 0Zm8.25 -9.5v2h2a0.5 0.5 0 0 1 0.5 0.5v1.5a0.5 0.5 0 0 1 -0.5 0.5h-2v2a0.5 0.5 0 0 1 -0.5 0.5h-1.5a0.5 0.5 0 0 1 -0.5 -0.5v-2h-2a0.5 0.5 0 0 1 -0.5 -0.5v-1.5a0.5 0.5 0 0 1 0.5 -0.5h2v-2a0.5 0.5 0 0 1 0.5 -0.5h1.5a0.5 0.5 0 0 1 0.5 0.5\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M12 4.25a0.75 0.75 0 0 0 0.75 -0.75V1.25a0.75 0.75 0 0 0 -1.5 0V3.5a0.76 0.76 0 0 0 0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M18.37 6.89a0.74 0.74 0 0 0 0.53 -0.22l1.59 -1.59a0.75 0.75 0 0 0 0 -1.06 0.74 0.74 0 0 0 -1.06 0l-1.59 1.59a0.74 0.74 0 0 0 0 1.06 0.71 0.71 0 0 0 0.53 0.22\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M23.25 11.75H21a0.75 0.75 0 0 0 0 1.5h2.25a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M5.1 6.67a0.74 0.74 0 0 0 0.53 0.22 0.71 0.71 0 0 0 0.53 -0.22 0.74 0.74 0 0 0 0 -1.06L4.57 4a0.74 0.74 0 0 0 -1.06 0 0.75 0.75 0 0 0 0 1.06Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M3.75 12.5a0.76 0.76 0 0 0 -0.75 -0.75H0.75a0.75 0.75 0 0 0 0 1.5H3a0.75 0.75 0 0 0 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M21 21.75H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
