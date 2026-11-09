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
const BATCH = [{"setName":"icon/misc/history","name":"history","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"History-Fan--Streamline-Ultimate\"><path d=\"M23.84 11.89a13 13 0 0 0 -2 -3.8 0.25 0.25 0 0 0 -0.38 0l-4.19 4.41a0.25 0.25 0 0 1 -0.36 0 6.42 6.42 0 0 0 -0.7 -0.66 0.25 0.25 0 0 1 0 -0.36l4.28 -4.54a0.24 0.24 0 0 0 0 -0.35 11.08 11.08 0 0 0 -3.99 -2.37 0.25 0.25 0 0 0 -0.33 0.17l-1.67 6.24a0.25 0.25 0 0 1 -0.31 0.17 6.62 6.62 0 0 0 -0.95 -0.21 0.25 0.25 0 0 1 -0.2 -0.31L14.72 4a0.25 0.25 0 0 0 -0.2 -0.31 15.22 15.22 0 0 0 -5 0 0.25 0.25 0 0 0 -0.2 0.31L11 10.28a0.25 0.25 0 0 1 -0.21 0.31 6.48 6.48 0 0 0 -0.94 0.21 0.26 0.26 0 0 1 -0.32 -0.17l-1.7 -6.24a0.25 0.25 0 0 0 -0.32 -0.17 10.9 10.9 0 0 0 -3.95 2.36 0.24 0.24 0 0 0 0 0.35l4.28 4.54a0.24 0.24 0 0 1 0 0.36 5.49 5.49 0 0 0 -0.69 0.66 0.26 0.26 0 0 1 -0.37 0L2.55 8.07a0.25 0.25 0 0 0 -0.38 0 13.06 13.06 0 0 0 -2 3.8 1 1 0 0 0 0.58 1.24L10.58 17a0.25 0.25 0 0 1 0.07 0.43l-1.46 1.18a0.5 0.5 0 0 0 -0.14 0.61c0.07 0.13 0.7 1.28 2.95 1.28s2.88 -1.15 2.95 -1.28a0.51 0.51 0 0 0 -0.14 -0.61l-1.45 -1.17a0.25 0.25 0 0 1 0.06 -0.43l9.83 -3.88a1 1 0 0 0 0.59 -1.24M12 12.5a4.71 4.71 0 0 1 3.32 1.22 0.25 0.25 0 0 1 -0.09 0.41l-3.14 1.25a0.19 0.19 0 0 1 -0.18 0l-3.14 -1.25a0.25 0.25 0 0 1 -0.08 -0.41A4.62 4.62 0 0 1 12 12.5\" fill=\"#000000\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
