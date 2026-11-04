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
const BATCH = [{"setName":"icon/health/pregnancy","name":"pregnancy","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Pregnancy-Vgr--Streamline-Ultimate\"><g><path d=\"M16 5.56a1.08 1.08 0 0 0 -1.51 0l-0.56 0.56a0.3 0.3 0 0 0 0 0.41L15 7.63a0.28 0.28 0 0 0 0.41 0l0.59 -0.55a1.07 1.07 0 0 0 0 -1.52\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M21.19 0.05 5.26 3.49a2.3 2.3 0 0 0 -1.77 1.77L0.05 21.19A2.33 2.33 0 0 0 2.81 24l15.93 -3.44a2.3 2.3 0 0 0 1.77 -1.77L24 2.81A2.33 2.33 0 0 0 21.19 0.05M8 13.49a10.59 10.59 0 0 1 3 6 0.87 0.87 0 0 1 -1 1 10.64 10.64 0 0 1 -6 -3l-1.31 -1.4a0.87 0.87 0 0 1 1.23 -1.23l1.37 1.37a9 9 0 0 0 3.38 2.11c0.12 0 0.29 -0.13 0.25 -0.25a8.87 8.87 0 0 0 -2.11 -3.37l-1.37 -1.38a0.87 0.87 0 1 1 1.23 -1.23Zm5 -4.12a0.87 0.87 0 0 1 -1.23 1.23l-0.45 -0.46a1.07 1.07 0 0 0 -1.52 0 1.06 1.06 0 0 0 0 1.51l2.74 2.75a1.07 1.07 0 0 0 1.52 0 1.09 1.09 0 0 0 0.24 -1.16c0 -0.06 -0.09 -0.19 -0.17 -0.11l-0.21 0.21a0.87 0.87 0 0 1 -1.23 -1.23l0.91 -0.91a0.87 0.87 0 0 1 1.23 0l0.46 0.45a2.81 2.81 0 0 1 -4 4l-2.65 -2.77a2.81 2.81 0 1 1 4 -4Zm8.49 -0.3a0.85 0.85 0 0 1 -0.25 0.61 0.88 0.88 0 0 1 -0.62 0.26h-2.86c-0.19 0 -0.28 0.17 -0.18 0.28l1 1a0.87 0.87 0 1 1 -1.23 1.23l-5.51 -5.51a0.87 0.87 0 0 1 0 -1.23l1.27 -1.27a2.92 2.92 0 0 1 3.83 -0.33 2.8 2.8 0 0 1 0.66 3.66 0.29 0.29 0 0 0 0.25 0.43h2.84a0.87 0.87 0 0 1 0.87 0.87Z\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
