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
const BATCH = [{"setName":"icon/misc/printer.alt","name":"printer-alt","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Printer-View--Streamline-Ultimate\"><g><path d=\"M6.5 5a1 1 0 0 0 1 -1V2.5A0.5 0.5 0 0 1 8 2h7.37a0.52 0.52 0 0 1 0.36 0.14l0.62 0.63a0.5 0.5 0 0 1 0.14 0.35V4a1 1 0 0 0 2 0V2.5a1 1 0 0 0 -0.29 -0.71L16.7 0.29A1 1 0 0 0 16 0H7a1.5 1.5 0 0 0 -1.5 1.5V4a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M12.19 21H8.5a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h4.69a0.25 0.25 0 0 0 0.2 -0.1 6.23 6.23 0 0 1 10.22 0 0.26 0.26 0 0 0 0.28 0.1 0.14 0.14 0 0 0 0.1 -0.14V9a2.5 2.5 0 0 0 -2.5 -2.5H2.5A2.5 2.5 0 0 0 0 9v6a2.5 2.5 0 0 0 2.5 2.5h2.75a0.25 0.25 0 0 1 0.25 0.25v3.75c0 0.86 0.82 1.5 1.92 1.5h4.83a1 1 0 0 0 0.8 -1.45 1 1 0 0 0 -0.86 -0.55M4.5 9.5a1 1 0 1 1 -1 -1 1 1 0 0 1 1 1\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M22.43 21a0.24 0.24 0 0 1 0 -0.3 4.39 4.39 0 0 0 0.6 -2.22 4.5 4.5 0 1 0 -4.5 4.5 4.39 4.39 0 0 0 2.22 -0.6 0.26 0.26 0 0 1 0.31 0l1.27 1.28a1 1 0 0 0 1.42 0 1 1 0 0 0 0 -1.42ZM16 18.49a2.5 2.5 0 1 1 2.5 2.5 2.5 2.5 0 0 1 -2.5 -2.5\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
