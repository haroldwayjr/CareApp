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
const BATCH = [{"setName":"icon/files/resume","name":"resume","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Recruiting-Resume-Document--Streamline-Ultimate\"><g><g><path d=\"M12.56 13.71H3.85a0.75 0.75 0 0 0 0 1.5h8.71a0.75 0.75 0 1 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M11.25 18.16h-7.4a0.75 0.75 0 1 0 0 1.5h7.4a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path></g><path d=\"M4.44 3.49h3.89s1.04 0 1.04 1.04v4.64s0 1.04 -1.04 1.04H4.44s-1.04 0 -1.04 -1.04V4.53s0 -1.04 1.04 -1.04\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M24 15.64a3.66 3.66 0 0 0 -7.32 0v3.13h1.66l0.43 5.23h3.14l0.43 -5.23H24Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M17.46 7.56a2.88 2.88 0 1 0 5.76 0 2.88 2.88 0 1 0 -5.76 0\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M17.14 22.46H1.84a0.27 0.27 0 0 1 -0.27 -0.26V1.81a0.27 0.27 0 0 1 0.27 -0.26h20.63v2.19A4.37 4.37 0 0 1 24 5.11V0.8a0.75 0.75 0 0 0 -0.75 -0.75H1.84A1.76 1.76 0 0 0 0.07 1.81V22.2A1.76 1.76 0 0 0 1.84 24h15.42Z\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
