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
const BATCH = [{"setName":"icon/misc/briefcase","name":"briefcase","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Briefcase--Streamline-Ultimate\"><path d=\"M3 22.5h18a3 3 0 0 0 3 -3v-11a3 3 0 0 0 -3 -3h-3.9a0.24 0.24 0 0 1 -0.24 -0.22l-0.15 -1.15a3 3 0 0 0 -3 -2.63h-3.44a3 3 0 0 0 -3 2.63l-0.13 1.15a0.24 0.24 0 0 1 -0.24 0.22H3a3 3 0 0 0 -3 3v11a3 3 0 0 0 3 3M9.27 4.38a1 1 0 0 1 1 -0.88h3.46a1 1 0 0 1 1 0.88l0.1 0.84a0.25 0.25 0 0 1 -0.06 0.2 0.26 0.26 0 0 1 -0.19 0.08H9.42a0.26 0.26 0 0 1 -0.19 -0.08 0.25 0.25 0 0 1 -0.06 -0.2ZM5.25 11a0.76 0.76 0 0 1 0.75 -0.75h12a0.76 0.76 0 0 1 0.75 0.75v0.5a0.76 0.76 0 0 1 -0.75 0.75H6a0.76 0.76 0 0 1 -0.75 -0.75Zm0 5.5a0.76 0.76 0 0 1 0.75 -0.75h12a0.76 0.76 0 0 1 0.75 0.75v0.5a0.76 0.76 0 0 1 -0.75 0.75H6a0.76 0.76 0 0 1 -0.75 -0.75Z\" fill=\"#000000\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
