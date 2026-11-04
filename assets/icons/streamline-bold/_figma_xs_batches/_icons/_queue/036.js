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
const BATCH = [{"setName":"icon/misc/alarm","name":"alarm","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Alarm-Clock-1--Streamline-Ultimate\"><path d=\"M19.09 0.25a4.82 4.82 0 0 0 -2.89 1 0.53 0.53 0 0 0 -0.2 0.36 0.47 0.47 0 0 0 0.15 0.39l2.38 2.39 -1.28 1.07a8.91 8.91 0 0 0 -10.5 0L5.47 4.35 7.85 2A0.47 0.47 0 0 0 8 1.57a0.49 0.49 0 0 0 -0.2 -0.36 4.82 4.82 0 0 0 -2.89 -1A4.91 4.91 0 0 0 0 5.16a4.82 4.82 0 0 0 1 2.89 0.49 0.49 0 0 0 0.36 0.2 0.47 0.47 0 0 0 0.35 -0.15l2.34 -2.34 1.21 1a9 9 0 0 0 1 12.82L3.79 22a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l2.7 -2.7a8.94 8.94 0 0 0 8.18 0l2.7 2.7a1 1 0 0 0 1.42 0 1 1 0 0 0 0 -1.42l-2.42 -2.41a9 9 0 0 0 0.95 -12.82l1.21 -1 2.34 2.33a0.47 0.47 0 0 0 0.35 0.15 0.49 0.49 0 0 0 0.36 -0.2 4.82 4.82 0 0 0 1 -2.89A4.91 4.91 0 0 0 19.09 0.25M15.5 13.5H12a0.76 0.76 0 0 1 -0.75 -0.75v-5.5a0.75 0.75 0 0 1 1.5 0V12h2.75a0.75 0.75 0 0 1 0 1.5\" fill=\"#000000\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
