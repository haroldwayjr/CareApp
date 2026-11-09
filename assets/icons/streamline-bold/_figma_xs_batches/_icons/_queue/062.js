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
const BATCH = [{"setName":"icon/misc/weather","name":"weather","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Weather-Rain--Streamline-Ultimate\"><g><g><path d=\"M22.09 12.07a0.25 0.25 0 0 1 -0.09 -0.19 7 7 0 0 0 -13.66 -2 0.23 0.23 0 0 1 -0.22 0.17A5.5 5.5 0 0 0 5.34 20a0.28 0.28 0 0 0 0.18 0A2.59 2.59 0 0 1 6 20h0.12a0.25 0.25 0 0 0 0.22 -0.11 1.42 1.42 0 0 1 0.25 -0.3l0.51 -0.51a0.25 0.25 0 0 0 0.06 -0.22 0.25 0.25 0 0 0 -0.16 -0.19A3.5 3.5 0 0 1 8.5 12l0.5 0a1 1 0 0 0 1.11 -0.83A5 5 0 0 1 20 12l0 0.43a1 1 0 0 0 0.5 1 3 3 0 0 1 0.57 4.8 0.29 0.29 0 0 0 -0.08 0.14 1.89 1.89 0 0 1 -0.56 1.08L19 20.88a0.08 0.08 0 0 0 0 0.08 0.1 0.1 0 0 0 0 0.04 5 5 0 0 0 3.09 -8.93\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M5 23a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M9 23a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M13 23a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M7.47 21.53a0.75 0.75 0 0 0 1.06 0l3 -3a0.75 0.75 0 0 0 -1.06 -1.06l-3 3a0.75 0.75 0 0 0 0 1.06\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M15.53 18.53a0.75 0.75 0 0 0 -1.06 -1.06l-3 3a0.75 0.75 0 0 0 0 1.06 0.75 0.75 0 0 0 1.06 0Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M19.53 18.53a0.75 0.75 0 0 0 -1.06 -1.06l-3 3a0.75 0.75 0 0 0 0 1.06 0.75 0.75 0 0 0 1.06 0Z\" fill=\"#000000\" stroke-width=\"1\"></path></g><path d=\"M8.25 3a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v1a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M2.88 4.3a1 1 0 0 0 0.71 0.29 1 1 0 0 0 0.71 -0.29 1 1 0 0 0 0 -1.42l-0.71 -0.7a1 1 0 0 0 -1.41 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M3 8.25a1 1 0 0 0 -1 -1H1a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M14.08 2.42a1 1 0 0 0 -1.41 0l-0.71 0.7a1 1 0 0 0 -0.29 0.67A0.25 0.25 0 0 0 12 4a8.75 8.75 0 0 1 2.12 -0.5 0.23 0.23 0 0 0 0.22 -0.19 1 1 0 0 0 -0.26 -0.89\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M5.46 9.54a0.25 0.25 0 0 0 0.12 -0.29 2.76 2.76 0 0 1 -0.1 -0.77 3 3 0 0 1 3 -3 2.91 2.91 0 0 1 1.1 0.21 0.28 0.28 0 0 0 0.25 0 8 8 0 0 1 1.37 -0.92 0.23 0.23 0 0 0 0.13 -0.21 0.22 0.22 0 0 0 -0.11 -0.22 5 5 0 0 0 -7.74 4.14 5.13 5.13 0 0 0 0.33 1.8 0.26 0.26 0 0 0 0.18 0.16 0.23 0.23 0 0 0 0.22 -0.06 7.19 7.19 0 0 1 1.25 -0.84\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
