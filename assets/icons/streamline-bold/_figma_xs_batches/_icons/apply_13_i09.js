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
const BATCH = [{"setName":"icon/misc/school","name":"school","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"School-Bell--Streamline-Ultimate\"><g><path d=\"M13.24 19.67a0.49 0.49 0 0 1 -0.24 -0.42v-0.92a0.5 0.5 0 0 0 -0.5 -0.5h-1a0.5 0.5 0 0 0 -0.5 0.5v0.92a0.49 0.49 0 0 1 -0.24 0.42 2.34 2.34 0 1 0 2.48 0\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"m20.54 15.56 -0.21 -0.21c-1.25 -1.28 -1.76 -1.81 -1.76 -3.45V9.5c0 -3.7 -2 -6.53 -5 -7.3a0.48 0.48 0 0 1 -0.37 -0.48v-0.47a1.25 1.25 0 0 0 -2.5 0v0.47a0.48 0.48 0 0 1 -0.37 0.48c-3 0.77 -5 3.6 -5 7.3v2.4c0 1.64 -0.51 2.17 -1.76 3.45l-0.21 0.21A0.75 0.75 0 0 0 4 16.83h16a0.75 0.75 0 0 0 0.54 -1.27\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"},{"setName":"icon/misc/id.card","name":"id-card","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Single-Man-Id-Card--Streamline-Ultimate\"><g><path d=\"M10 6.5h4a1 1 0 0 0 1 -1V3A3 3 0 0 0 13.82 0.62 3 3 0 0 0 9 3.09V5.5a1 1 0 0 0 1 1m1.25 -3.75a0.75 0.75 0 1 1 0.75 0.75 0.76 0.76 0 0 1 -0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M21.5 5a2 2 0 0 0 -2 -2h-2.75a0.25 0.25 0 0 0 -0.25 0.25v1.5a0.25 0.25 0 0 0 0.25 0.25H19a0.5 0.5 0 0 1 0.5 0.5v16a0.5 0.5 0 0 1 -0.5 0.5H5a0.5 0.5 0 0 1 -0.5 -0.5v-16A0.5 0.5 0 0 1 5 5h2.25a0.25 0.25 0 0 0 0.25 -0.25v-1.5A0.25 0.25 0 0 0 7.25 3H4.5a2 2 0 0 0 -2 2v17a2 2 0 0 0 2 2h15a2 2 0 0 0 2 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M9.88 16.22c-1.71 0.63 -3 1.09 -3.35 1.88A5.44 5.44 0 0 0 6 20.27a0.5 0.5 0 0 0 0.5 0.5h11a0.5 0.5 0 0 0 0.5 -0.5 5.44 5.44 0 0 0 -0.53 -2.17c-0.4 -0.79 -1.64 -1.25 -3.35 -1.88l-0.26 -0.09a0.25 0.25 0 0 1 -0.16 -0.24v-0.58a0.23 0.23 0 0 1 0.07 -0.17 2.32 2.32 0 0 0 0.62 -1.26 0.31 0.31 0 0 1 0 -0.12 1.19 1.19 0 0 0 0.2 -0.47 1.44 1.44 0 0 0 -0.09 -1 0.22 0.22 0 0 1 0 -0.21 3.94 3.94 0 0 0 0.34 -2c-0.19 -0.94 -1.38 -1.31 -2.43 -1.33a2.86 2.86 0 0 0 -2.16 0.66 0.32 0.32 0 0 1 -0.12 0.08 1.1 1.1 0 0 0 -0.63 0.41 2.63 2.63 0 0 0 0 2.16 0.25 0.25 0 0 1 0 0.19 1.44 1.44 0 0 0 -0.11 1 1.19 1.19 0 0 0 0.2 0.47 0.31 0.31 0 0 1 0 0.12 2.32 2.32 0 0 0 0.62 1.26 0.23 0.23 0 0 1 0.07 0.17v0.58a0.25 0.25 0 0 1 -0.16 0.24Z\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"},{"setName":"icon/misc/medal","name":"medal","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Award-Medal--Streamline-Ultimate\"><g><path d=\"M23.42 0.36A0.49 0.49 0 0 0 23 0.12h-5a0.51 0.51 0 0 0 -0.45 0.29l-2.89 6.05a0.26 0.26 0 0 0 0 0.21 0.25 0.25 0 0 0 0.16 0.14A9.48 9.48 0 0 1 19 9.42a0.27 0.27 0 0 0 0.22 0.08 0.26 0.26 0 0 0 0.19 -0.14L23.45 0.84a0.51 0.51 0 0 0 -0.03 -0.48\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M9.18 6.81a0.25 0.25 0 0 0 0.16 -0.14 0.23 0.23 0 0 0 0 -0.2L6.45 0.41A0.51 0.51 0 0 0 6 0.12H1a0.49 0.49 0 0 0 -0.42 0.24 0.51 0.51 0 0 0 0 0.48l4.06 8.52a0.26 0.26 0 0 0 0.18 0.14 0.27 0.27 0 0 0 0.23 -0.08 9.48 9.48 0 0 1 4.13 -2.61\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M12 7.88a8 8 0 1 0 8 8 8 8 0 0 0 -8 -8m3.73 7.25 -1.56 1.53a0.24 0.24 0 0 0 -0.06 0.28l0.87 2a0.51 0.51 0 0 1 -0.73 0.64l-2.13 -1.2a0.25 0.25 0 0 0 -0.24 0l-2.13 1.2a0.51 0.51 0 0 1 -0.75 -0.66l0.86 -2a0.26 0.26 0 0 0 -0.05 -0.28l-1.53 -1.51a0.47 0.47 0 0 1 0.33 -0.83h1.78a0.24 0.24 0 0 0 0.22 -0.15l0.93 -2a0.52 0.52 0 0 1 0.92 0l0.93 2a0.24 0.24 0 0 0 0.22 0.15h1.78a0.48 0.48 0 0 1 0.34 0.83\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
