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
const BATCH = [{"setName":"icon/misc/laptop","name":"laptop","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Laptop--Streamline-Ultimate\"><path d=\"m23.3 20.69 -2.11 -6.83a1.34 1.34 0 0 0 -0.34 -0.56 2.62 2.62 0 0 0 0.65 -1.72V2.92A2.68 2.68 0 0 0 18.83 0.25H5.16A2.67 2.67 0 0 0 2.5 2.92v8.66a2.66 2.66 0 0 0 0.64 1.72 1.46 1.46 0 0 0 -0.34 0.56L0.73 20.61a2.17 2.17 0 0 0 1.94 3.14h18.66a2.15 2.15 0 0 0 1.84 -1 2.11 2.11 0 0 0 0.13 -2.06m-7.8 0.46a0.49 0.49 0 0 1 -0.4 0.21H8.9a0.51 0.51 0 0 1 -0.41 -0.21 0.52 0.52 0 0 1 -0.07 -0.45L9 18.9a0.5 0.5 0 0 1 0.48 -0.35h5a0.5 0.5 0 0 1 0.47 0.35l0.6 1.8a0.49 0.49 0 0 1 -0.05 0.45M4.5 2.92a0.67 0.67 0 0 1 0.66 -0.67h13.67a0.67 0.67 0 0 1 0.67 0.67v8.66a0.67 0.67 0 0 1 -0.67 0.67H5.16a0.67 0.67 0 0 1 -0.66 -0.67Z\" fill=\"#000000\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
