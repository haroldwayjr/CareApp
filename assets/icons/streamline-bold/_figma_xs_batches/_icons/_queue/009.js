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
const BATCH = [{"setName":"icon/health/counseling","name":"counseling","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Counseling-3--Streamline-Ultimate\"><path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M0.417 7.726C0.417 3.523 4.4 0.25 9.135 0.25s8.718 3.273 8.718 7.476c0 0.372 -0.032 0.737 -0.093 1.094a9.07 9.07 0 0 0 -0.895 -0.044c-3.927 0 -7.673 2.57 -8.164 6.417a10.004 10.004 0 0 1 -1.213 -0.124l-3.965 2.586a0.5 0.5 0 0 1 -0.767 -0.501l0.634 -3.802C1.584 11.994 0.417 9.988 0.417 7.726m8.414 -2.57a0.814 0.814 0 0 0 -0.815 0.816 0.75 0.75 0 1 1 -1.5 0c0 -1.212 0.97 -2.316 2.315 -2.316 1.212 0 2.315 0.97 2.315 2.316 0 0.972 -0.623 1.874 -1.565 2.193v0.067a0.75 0.75 0 0 1 -1.5 0v-0.695a0.75 0.75 0 0 1 0.75 -0.75 0.814 0.814 0 1 0 0 -1.63Zm0 4.62c-0.344 0 -0.688 0.344 -0.688 0.688s0.344 0.688 0.688 0.688 0.687 -0.344 0.687 -0.688 -0.343 -0.688 -0.687 -0.688\" clip-rule=\"evenodd\" stroke-width=\"1\"></path><path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M23.583 16.054c0 -3.265 -3.088 -5.778 -6.718 -5.778s-6.718 2.513 -6.718 5.778c0 3.266 3.087 5.78 6.718 5.78 0.416 0 0.823 -0.033 1.219 -0.096l2.96 1.931a0.5 0.5 0 0 0 0.767 -0.5l-0.468 -2.805c1.36 -1.046 2.24 -2.579 2.24 -4.31m-4.2 -0.796a0.75 0.75 0 0 0 -1.061 -1.06l-2.291 2.29 -0.624 -0.624a0.75 0.75 0 0 0 -1.06 1.06L15.5 18.08a0.75 0.75 0 0 0 1.06 0l2.821 -2.821Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
