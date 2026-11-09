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
const BATCH = [{"setName":"icon/files/magazine","name":"magazine","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Shopping-Magazine-Advertising--Streamline-Ultimate\"><g><path d=\"M15.5 8.31h-0.75v6h0.75a1.25 1.25 0 0 0 1.25 -1.25v-3.5a1.25 1.25 0 0 0 -1.25 -1.25\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M8.5 8.31a1.25 1.25 0 0 0 -1.25 1.25v1.75h2.5V9.56A1.25 1.25 0 0 0 8.5 8.31\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M23.39 1.57A1.93 1.93 0 0 0 22 1c-3.84 0.11 -7.7 0.87 -9.65 2.31a0.51 0.51 0 0 1 -0.6 0c-2 -1.43 -5.86 -2.19 -9.7 -2.31a1.94 1.94 0 0 0 -1.44 0.56A2 2 0 0 0 0 3v14.5a2 2 0 0 0 2 2c6 0.17 9 1.82 9 2.48a1 1 0 0 0 2 0c0 -0.66 3.08 -2.31 9 -2.48a2 2 0 0 0 2 -2V3a2 2 0 0 0 -0.61 -1.43M11.25 15.06a0.75 0.75 0 1 1 -1.5 0v-2.25h-2.5v2.25a0.75 0.75 0 1 1 -1.5 0v-5.5a2.75 2.75 0 1 1 5.5 0Zm7 -2a2.75 2.75 0 0 1 -2.75 2.75H14a0.76 0.76 0 0 1 -0.75 -0.75v-7.5a0.75 0.75 0 0 1 0.75 -0.75h1.5a2.75 2.75 0 0 1 2.75 2.75Z\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"},{"setName":"icon/files/portfolio","name":"portfolio","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"><path fill=\"#000000\" d=\"M13.5 1.25c1.6569 0 3 1.34315 3 3v1.5h4c1.933 0 3.5 1.567 3.5 3.5v10c0 1.933 -1.567 3.5 -3.5 3.5h-17c-1.933 0 -3.5 -1.567 -3.5 -3.5v-10c1.289e-7 -1.933 1.567 -3.5 3.5 -3.5h4v-1.5c0 -1.65685 1.34315 -3 3 -3zm-1.5 13c-2.77614 0 -5 2.2239 -5 5 0 0.2761 0.22386 0.5 0.5 0.5h9c0.2761 0 0.5 -0.2239 0.5 -0.5 0 -2.7761 -2.2239 -5 -5 -5m0 -6c-1.3807 0 -2.5 1.11929 -2.5 2.5 0 1.3807 1.1193 2.5 2.5 2.5s2.5 -1.1193 2.5 -2.5c0 -1.38071 -1.1193 -2.5 -2.5 -2.5m-1.5 -5c-0.55228 0 -1 0.44772 -1 1v1.5h5v-1.5c0 -0.55228 -0.4477 -1 -1 -1z\" stroke-width=\"1\"></path></svg>"},{"setName":"icon/files/letter","name":"letter","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Letter-Balloon--Streamline-Ultimate\"><g><path d=\"M22.91 9h-1V8a1 1 0 0 0 -2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0v-1h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M15.41 3a1.5 1.5 0 1 0 -1.5 -1.5 1.5 1.5 0 0 0 1.5 1.5\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M4.41 21a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0 -1.5 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M12.1 17.55a1 1 0 0 0 -0.27 -1.39l-2.9 -2 -0.2 -0.11 2.46 -0.81 0.68 0.77a1.75 1.75 0 0 0 1.86 0.5l1.27 -0.39a1.74 1.74 0 0 0 0.79 -2.79L6.8 0.62A1.75 1.75 0 0 0 4.91 0.08L2.4 0.91a1.77 1.77 0 0 0 -1.2 1.56l-0.86 14A1.76 1.76 0 0 0 1 17.94a1.79 1.79 0 0 0 1.07 0.36 1.7 1.7 0 0 0 0.54 -0.09l1.3 -0.43a1.73 1.73 0 0 0 1.19 -1.51l0.09 -1 2.32 -0.76 -0.09 0.17 -1.23 3.17a1 1 0 0 0 0.56 1.29 1 1 0 0 0 0.37 0.07 1 1 0 0 0 0.93 -0.63l0.8 -2 1.86 1.26a1 1 0 0 0 1.39 -0.29m-2.78 -7.41L5 11.58l0.5 -5.81Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M14.44 19.26c-2.19 0.31 -3 0.2 -3.72 -0.47a1 1 0 0 0 -1.39 1.43c1.47 1.44 3.32 1.31 5.4 1 2.5 -0.36 4.27 0.4 4.73 2a1 1 0 0 0 1 0.74 1.26 1.26 0 0 0 0.27 0 1 1 0 0 0 0.7 -1.23c-0.79 -2.65 -3.43 -3.98 -6.99 -3.47\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
