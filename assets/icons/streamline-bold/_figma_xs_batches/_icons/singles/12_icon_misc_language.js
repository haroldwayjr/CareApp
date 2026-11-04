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
const BATCH = [{"setName":"icon/misc/language","name":"language","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Language-Barrier-Confused--Streamline-Ultimate\"><g><path d=\"m5.7 10.19 1.67 0 0.28 -1.7 -1.67 0z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M22.38 0H1.62A1.59 1.59 0 0 0 0 1.62v16a1.6 1.6 0 0 0 1.6 1.6h3.21V24l6.39 -4.79h11.18a1.6 1.6 0 0 0 1.6 -1.6v-16A1.59 1.59 0 0 0 22.38 0M9.87 8.49h-0.7l-0.28 1.69h0.45a0.75 0.75 0 0 1 0 1.5h-0.7l-0.16 1a0.75 0.75 0 0 1 -0.74 0.62h-0.12a0.75 0.75 0 0 1 -0.62 -0.89l0.12 -0.73H5.45l-0.17 1a0.74 0.74 0 0 1 -0.73 0.62h-0.13a0.74 0.74 0 0 1 -0.61 -0.86l0.12 -0.73h-0.45a0.75 0.75 0 0 1 0 -1.5h0.7l0.28 -1.69H4A0.75 0.75 0 0 1 4 7h0.7l0.16 -1a0.75 0.75 0 1 1 1.48 0.25L6.23 7H7.9l0.16 -1a0.76 0.76 0 0 1 0.87 -0.62 0.75 0.75 0 0 1 0.61 0.87L9.42 7h0.45a0.75 0.75 0 0 1 0 1.5Zm9.1 -3a0.75 0.75 0 0 1 1.5 0V9.2a0.75 0.75 0 0 1 -1.5 0Zm-4.57 7.93a1.15 1.15 0 1 1 1.15 -1.15 1.15 1.15 0 0 1 -1.15 1.15m0.88 -4.12v0.46a0.75 0.75 0 0 1 -1.5 0V8.67a0.76 0.76 0 0 1 0.75 -0.75 0.85 0.85 0 1 0 -0.85 -0.85 0.75 0.75 0 0 1 -1.5 0 2.35 2.35 0 1 1 3.1 2.23m4.31 4.12a1.15 1.15 0 1 1 1.15 -1.15 1.15 1.15 0 0 1 -1.15 1.15\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
