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
const BATCH = [{"setName":"icon/commerce/receipt","name":"receipt","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Receipt--Streamline-Ultimate\"><path d=\"M24 1.24a1 1 0 0 0 -1 -1H10.58c-1.36 0 -2 1.27 -2 2.47A98.4 98.4 0 0 1 7.7 16a0.25 0.25 0 0 1 -0.24 0.21h-3c-2 0 -2.22 2.07 -2.34 3.3C2 21.48 1.73 21.75 1 21.75a1 1 0 1 0 0 2h11.5c2.38 0 2.72 -2.36 2.92 -3.76 0.17 -1.18 0.3 -1.74 0.58 -1.74h0.41a0.25 0.25 0 0 1 0.24 0.17c0.06 0.19 0.12 0.45 0.16 0.64 0.2 0.94 0.56 2.69 2.69 2.69 4.07 0 4.5 -11.54 4.5 -16.48zM12.06 13.5a0.75 0.75 0 0 1 0 -1.5h6a0.75 0.75 0 0 1 0 1.5Zm-0.25 -8.75a0.75 0.75 0 0 1 0.75 -0.75h2a0.75 0.75 0 1 1 0 1.5h-2a0.75 0.75 0 0 1 -0.75 -0.75m6.75 4.75h-5.75a0.75 0.75 0 0 1 0 -1.5h5.75a0.75 0.75 0 0 1 0 1.5m-5.13 10.2c-0.25 1.77 -0.45 2.05 -0.94 2.05H4.11a0.28 0.28 0 0 1 -0.2 -0.1 0.26 0.26 0 0 1 0 -0.21 10.34 10.34 0 0 0 0.27 -1.69 4.61 4.61 0 0 1 0.28 -1.49h9a0.25 0.25 0 0 1 0.24 0.31c-0.16 0.43 -0.22 0.78 -0.27 1.13\" fill=\"#000000\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
