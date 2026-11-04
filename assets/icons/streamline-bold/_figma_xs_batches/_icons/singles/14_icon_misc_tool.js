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
const BATCH = [{"setName":"icon/misc/tool","name":"tool","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Tools-Keys--Streamline-Ultimate\"><g><path d=\"m6 7.56 0.24 0a0.91 0.91 0 0 0 0.64 -0.34 0.92 0.92 0 0 0 0.17 -0.7A3.38 3.38 0 0 1 7 5.78 3.79 3.79 0 0 1 10.76 2a3.74 3.74 0 0 1 3 1.52 1 1 0 0 0 1.4 0.2 1 1 0 0 0 0.2 -1.41A5.79 5.79 0 0 0 5 5.78a5.39 5.39 0 0 0 0.1 1.07 0.88 0.88 0 0 0 0.9 0.71\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M15.33 22h-1.92a0.91 0.91 0 0 1 -0.91 -0.91v-4a0.37 0.37 0 0 1 0 -0.15 2.5 2.5 0 1 0 -2.08 0 0.37 0.37 0 0 1 0 0.15v4A2.92 2.92 0 0 0 13.41 24h1.92a1 1 0 0 0 0 -2m-3.8 -6.36a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M23 3a1 1 0 0 0 -1 1v0.89a0.5 0.5 0 0 1 -0.5 0.5h-0.7a2.5 2.5 0 1 0 0 2h1.74A1.48 1.48 0 0 0 24 5.93V4a1 1 0 0 0 -1 -1m-4.5 4.39a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"m22.3 14 -0.95 1a0.48 0.48 0 0 1 -0.36 0.15 0.51 0.51 0 0 1 -0.36 -0.15l-1.58 -1.68a2.54 2.54 0 0 0 0.26 -1.1 2.5 2.5 0 1 0 -2.5 2.5 2.38 2.38 0 0 0 0.7 -0.11l2 2.14a1.93 1.93 0 0 0 1.37 0.6 1.92 1.92 0 0 0 1.35 -0.54l1.39 -1.32A1 1 0 0 0 22.3 14m-5.49 -0.82a1 1 0 0 1 0 -2 1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M5.76 9.64a2.5 2.5 0 0 0 -2.06 3.91L1 16.79a3.86 3.86 0 0 0 -1 2.81 3.79 3.79 0 0 0 1.33 2.65l1.44 1.26A1 1 0 0 0 4.09 22l-1.44 -1.26a1.85 1.85 0 0 1 -0.19 -2.64l3 -3.49 0.33 0a2.5 2.5 0 0 0 0 -5Zm0 3.5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
