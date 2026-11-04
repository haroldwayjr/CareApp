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
const BATCH = [{"setName":"icon/misc/cake","name":"cake","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Cake-Flour--Streamline-Ultimate\"><g><path d=\"M18 10.5a4.51 4.51 0 0 1 -2.7 -0.9 0.48 0.48 0 0 0 -0.6 0 4.5 4.5 0 0 1 -5.4 0 0.48 0.48 0 0 0 -0.6 0 4.51 4.51 0 0 1 -2.7 0.9 4.44 4.44 0 0 1 -1.32 -0.2 0.52 0.52 0 0 0 -0.42 0.06 0.47 0.47 0 0 0 -0.22 0.37c-0.45 4.1 -1 9.8 -1 10.77A2.5 2.5 0 0 0 5.5 24h13a2.5 2.5 0 0 0 2.5 -2.5c0 -1 -0.59 -6.67 -1 -10.77a0.49 0.49 0 0 0 -0.22 -0.37 0.52 0.52 0 0 0 -0.42 -0.06 4.44 4.44 0 0 1 -1.36 0.2m-1.5 8a0.5 0.5 0 0 1 -0.5 0.5H8a0.5 0.5 0 0 1 -0.5 -0.5v-4A0.5 0.5 0 0 1 8 14h8a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M3.66 4.5a0.5 0.5 0 0 0 -0.48 0.36A4.12 4.12 0 0 0 3 6a3 3 0 0 0 5.76 1.17 0.26 0.26 0 0 1 0.48 0 3 3 0 0 0 5.52 0 0.26 0.26 0 0 1 0.48 0A3 3 0 0 0 21 6a4.12 4.12 0 0 0 -0.18 -1.14 0.5 0.5 0 0 0 -0.48 -0.36Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M3.5 0h17s1 0 1 1v1s0 1 -1 1h-17s-1 0 -1 -1V1s0 -1 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
