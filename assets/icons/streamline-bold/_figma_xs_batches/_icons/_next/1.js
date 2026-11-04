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
const BATCH = [{"setName":"icon/commerce/gift","name":"gift","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Gift-Box--Streamline-Ultimate\"><g><path d=\"M13 12a0.5 0.5 0 0 0 0.5 0.5H22a1.76 1.76 0 0 0 1.75 -1.75v-2A1.75 1.75 0 0 0 22 7h-8.5a0.5 0.5 0 0 0 -0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M3.75 12.5H11a0.5 0.5 0 0 0 0.5 -0.5V7.5A0.5 0.5 0 0 0 11 7H2A1.75 1.75 0 0 0 0.25 8.75v2A1.76 1.76 0 0 0 2 12.5Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M11.5 14.5a0.5 0.5 0 0 0 -0.5 -0.5H2.75a0.5 0.5 0 0 0 -0.5 0.5v7.75A1.76 1.76 0 0 0 4 24h7a0.5 0.5 0 0 0 0.5 -0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M13.5 14a0.5 0.5 0 0 0 -0.5 0.5v9a0.5 0.5 0 0 0 0.5 0.5H20a1.76 1.76 0 0 0 1.75 -1.75V14.5a0.5 0.5 0 0 0 -0.5 -0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M13 6.71A1 1 0 0 0 14 7c1.18 -0.29 4 -1 4.89 -1.92A3 3 0 0 0 14.7 0.86c-0.75 0.76 -1.48 3.08 -1.92 4.9a1 1 0 0 0 0.22 0.95m3.08 -4.43a1 1 0 1 1 1.35 1.35 8.79 8.79 0 0 1 -2.28 0.93 8.79 8.79 0 0 1 0.97 -2.28Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M11.72 5.76c-0.44 -1.82 -1.17 -4.14 -1.92 -4.9a3 3 0 1 0 -4.18 4.19c0.86 0.87 3.71 1.63 4.89 1.92a1 1 0 0 0 1 -0.26 1 1 0 0 0 0.21 -0.95M7 3.63a1 1 0 0 1 1.38 -1.35 8.79 8.79 0 0 1 0.93 2.28A8.79 8.79 0 0 1 7 3.63\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
