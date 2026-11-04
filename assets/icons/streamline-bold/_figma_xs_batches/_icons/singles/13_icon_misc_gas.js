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
const BATCH = [{"setName":"icon/misc/gas","name":"gas","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Gas-Station--Streamline-Ultimate\"><path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M23.8321 0.445301c0.3063 0.459529 0.1821 1.080399 -0.2774 1.386749l-1.2 0.8 -0.0178 0.01161C21.5307 3.15668 21 4.13547 21 5.1v1.58005h0.5c0.5523 0 1 0.44772 1 1 0 0.55229 -0.4477 1 -1 1H21V21.2c0 1.5393 -1.376 2.99 -3.145 2.6898 -1.4732 -0.1822 -2.355 -1.4836 -2.355 -2.7898V8.4c0 -0.24772 -0.2523 -0.5 -0.5 -0.5h-0.9747L14.1 22.1c0 1 -0.8 1.8001 -1.8 1.8001H1.8C0.8 23.9001 0 23.1 0 22.1V3.10004c0 -1 0.8 -1.79999 1.8 -1.79999h10.4c1 0 1.8 0.79999 1.8 1.79999L14.0147 5.9H15c1.3523 0 2.5 1.14772 2.5 2.5v12.7c0 0.4836 0.3044 0.7721 0.6104 0.8061 0.023 0.0026 0.0458 0.0059 0.0685 0.01 0.4147 0.0754 0.8211 -0.2652 0.8211 -0.7161V5.1c0 -1.63174 0.8653 -3.24929 2.2536 -4.137586l1.1917 -0.794465c0.4595 -0.306352 1.0804 -0.182177 1.3868 0.277352M2.8 4.50006v3c0 0.3 0.2 0.5 0.5 0.5h7.5c0.3 0 0.5 -0.2 0.5 -0.5v-3c0 -0.3 -0.2 -0.5 -0.5 -0.5H3.3c-0.3 0 -0.5 0.2 -0.5 0.5\" clip-rule=\"evenodd\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
