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
const BATCH = [{"setName":"icon/files/clipboard","name":"clipboard","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Insert-Row-From-Clipboard--Streamline-Ultimate\"><path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M14.4 4.18005c-0.1 0.3 -0.4 0.5 -0.7 0.5H7.30002c-0.3 0 -0.60002 -0.2 -0.70002 -0.5l-1 -3c-0.17812 -0.570675 0.24075 -0.999996 0.70002 -0.999996H14.7c0.5158 0 0.8615 0.515539 0.7 0.999996zm1.423 0.47435c-0.3148 0.94443 -1.2116 1.52565 -2.123 1.52565H7.30002c-0.91128 0 -1.80821 -0.58116 -2.12304 -1.52565L4.29218 2H2.25C1.03579 2 0 3.03579 0 4.25v17.5C0 22.9642 1.03579 24 2.25 24h10.6607c-0.1701 -0.3377 -0.2659 -0.7192 -0.2659 -1.1232V10.0027c0 -1.38073 1.1193 -2.50001 2.5 -2.50001H21V4.25C21 3.03579 19.9642 2 18.75 2h-2.0422zm-1.6782 5.3483c0 -0.5523 0.4477 -1.00001 1 -1.00001h7.6501c0.5523 0 1 0.44771 1 1.00001v12.8741c0 0.5523 -0.4477 1 -1 1h-7.6501c-0.5523 0 -1 -0.4477 -1 -1zm7.6501 1v2.2914h-5.6501v-2.2914zm0 4.2914h-5.6501v2.2913h5.6501zm-5.6501 6.5827v-2.2914h5.6501v2.2914z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
