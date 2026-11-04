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
const BATCH = [{"setName":"icon/misc/keyboard","name":"keyboard","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Keyboard--Streamline-Ultimate\"><path d=\"M21.5 13H4.75a0.25 0.25 0 0 1 -0.25 -0.25v-0.25a2 2 0 0 1 2 -2h13a4.5 4.5 0 0 0 0 -9H13a0.5 0.5 0 0 1 -0.5 -0.5 1 1 0 0 0 -2 0A2.5 2.5 0 0 0 13 3.5h6.5a2.5 2.5 0 0 1 0 5h-13a4 4 0 0 0 -4 4v0.26a0.25 0.25 0 0 1 -0.23 0.25A2.51 2.51 0 0 0 0 15.5v6A2.5 2.5 0 0 0 2.5 24h19a2.5 2.5 0 0 0 2.5 -2.5v-6a2.5 2.5 0 0 0 -2.5 -2.5m-0.25 7.5h-0.5a0.5 0.5 0 0 1 0 -1h0.5a0.5 0.5 0 0 1 0 1m0 -3h-0.5a0.5 0.5 0 0 1 0 -1h0.5a0.5 0.5 0 0 1 0 1m-14.75 2h11a0.5 0.5 0 0 1 0 1h-11a0.5 0.5 0 0 1 0 -1m-0.75 -2a0.5 0.5 0 0 1 0 -1h0.5a0.5 0.5 0 0 1 0 1Zm2.5 -0.5a0.5 0.5 0 0 1 0.5 -0.5h0.5a0.5 0.5 0 0 1 0 1h-0.5a0.5 0.5 0 0 1 -0.5 -0.5m3 0a0.5 0.5 0 0 1 0.5 -0.5h0.5a0.5 0.5 0 0 1 0 1h-0.5a0.5 0.5 0 0 1 -0.5 -0.5m3 0a0.5 0.5 0 0 1 0.5 -0.5h0.5a0.5 0.5 0 0 1 0 1h-0.5a0.5 0.5 0 0 1 -0.5 -0.5m3.51 0.5a0.5 0.5 0 0 1 0 -1h0.49a0.5 0.5 0 0 1 0 1Zm-14.51 -1a0.5 0.5 0 0 1 0 1h-0.5a0.5 0.5 0 0 1 0 -1Zm-0.5 3h0.5a0.5 0.5 0 0 1 0 1h-0.5a0.5 0.5 0 0 1 0 -1\" fill=\"#000000\" stroke-width=\"1\"></path></svg>"},{"setName":"icon/misc/tablet","name":"tablet","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Tablet--Streamline-Ultimate\"><g><path d=\"M19 0H5a2.5 2.5 0 0 0 -2.5 2.5v19A2.5 2.5 0 0 0 5 24h14a2.5 2.5 0 0 0 2.5 -2.5v-19A2.5 2.5 0 0 0 19 0M5 4.5a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1H6a1 1 0 0 1 -1 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M7.5 6.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75V7s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M11.5 6.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75V7s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M15.5 6.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75V7s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M7.5 10.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M11.5 10.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M7.5 14.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M11.5 14.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M15.5 10.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"},{"setName":"icon/misc/scanner","name":"scanner","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Scanner--Streamline-Ultimate\"><g><path d=\"M0.33 20a0.25 0.25 0 0 0 -0.19 0.09 0.28 0.28 0 0 0 -0.05 0.2C0.46 22.59 2.45 24 5.5 24h13c3.05 0 5 -1.41 5.41 -3.71a0.28 0.28 0 0 0 -0.05 -0.2 0.25 0.25 0 0 0 -0.19 -0.09Zm19.17 1a0.75 0.75 0 1 1 -0.75 0.75 0.76 0.76 0 0 1 0.75 -0.75m-3 0a0.75 0.75 0 1 1 -0.75 0.75 0.76 0.76 0 0 1 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M4 9.75a0.25 0.25 0 0 0 -0.23 0.16L0.3 18.66a0.27 0.27 0 0 0 0 0.23 0.26 0.26 0 0 0 0.23 0.11h22.94a0.26 0.26 0 0 0 0.21 -0.11 0.27 0.27 0 0 0 0 -0.23L20.2 9.91a0.25 0.25 0 0 0 -0.2 -0.16Zm15.88 7.53a0.48 0.48 0 0 1 -0.41 0.22H4.5a0.48 0.48 0 0 1 -0.41 -0.22 0.45 0.45 0 0 1 0 -0.46l2 -5a0.48 0.48 0 0 1 0.46 -0.32h11a0.48 0.48 0 0 1 0.46 0.32l2 5a0.45 0.45 0 0 1 -0.1 0.46Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M20.09 8.25a0.24 0.24 0 0 0 0.24 -0.2L22 0.61a0.49 0.49 0 0 0 -0.1 -0.42 0.51 0.51 0 0 0 -0.4 -0.19h-19a0.51 0.51 0 0 0 -0.39 0.19 0.49 0.49 0 0 0 -0.11 0.42l1.67 7.44a0.24 0.24 0 0 0 0.24 0.2Z\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
