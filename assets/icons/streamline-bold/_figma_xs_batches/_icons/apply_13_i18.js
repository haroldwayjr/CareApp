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
const BATCH = [{"setName":"icon/misc/building","name":"building","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Building--Streamline-Ultimate\"><path d=\"M23 24a1 1 0 0 0 1 -1 0.5 0.5 0 0 0 -0.5 -0.5h-9a0.5 0.5 0 0 1 0 -1h9a0.5 0.5 0 0 0 0.5 -0.5v-0.5a0.5 0.5 0 0 0 -0.5 -0.5h-9a0.5 0.5 0 0 1 0 -1h9a0.5 0.5 0 0 0 0.5 -0.5V18a0.48 0.48 0 0 0 -0.25 -0.43 0.52 0.52 0 0 1 -0.25 -0.44V1a1 1 0 0 0 -1 -1H16a0.5 0.5 0 0 0 -0.5 0.5V17a0.5 0.5 0 0 1 -0.5 0.5h-0.5a0.5 0.5 0 0 1 -0.5 -0.5V0.5a0.5 0.5 0 0 0 -0.5 -0.5h-12A1.5 1.5 0 0 0 0 1.5v21A1.5 1.5 0 0 0 1.5 24ZM19.5 2.5a2 2 0 1 1 -2 2 2 2 0 0 1 2 -2m-2 12a2 2 0 0 1 4 0V17a0.5 0.5 0 0 1 -0.5 0.5h-3a0.5 0.5 0 0 1 -0.5 -0.5ZM5.5 19a0.5 0.5 0 0 1 -0.5 0.5H2.5A0.5 0.5 0 0 1 2 19v-3.25a1.75 1.75 0 0 1 3.5 0Zm0 -10a0.5 0.5 0 0 1 -0.5 0.5H2.5A0.5 0.5 0 0 1 2 9V5.75a1.75 1.75 0 0 1 3.5 0ZM12 19a0.5 0.5 0 0 1 -0.5 0.5H9a0.5 0.5 0 0 1 -0.5 -0.5v-3.25a1.75 1.75 0 0 1 3.5 0Zm0 -10a0.5 0.5 0 0 1 -0.5 0.5H9a0.5 0.5 0 0 1 -0.5 -0.5V5.75a1.75 1.75 0 0 1 3.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path></svg>"},{"setName":"icon/misc/book","name":"book","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Book-Pin--Streamline-Ultimate\"><g><path d=\"M20.15 4a0.5 0.5 0 0 1 -0.4 -0.49V2a2 2 0 0 0 -2 -2H5.25a3 3 0 0 0 -3 3v18a3 3 0 0 0 3 3h14.5a2 2 0 0 0 2 -2V6a2 2 0 0 0 -1.6 -2m-3.49 8.12c0 1.38 -1.59 4.13 -4.25 7.36a0.53 0.53 0 0 1 -0.41 0.19 0.51 0.51 0 0 1 -0.4 -0.19c-2.67 -3.23 -4.26 -6 -4.26 -7.36a4.66 4.66 0 0 1 9.32 0m1.09 -8.41a0.25 0.25 0 0 1 -0.25 0.29H5.25a1 1 0 0 1 0 -2H17.5a0.25 0.25 0 0 1 0.25 0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M10.03 12.16a1.97 1.97 0 1 0 3.94 0 1.97 1.97 0 1 0 -3.94 0\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"},{"setName":"icon/misc/passport","name":"passport","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Passport--Streamline-Ultimate\"><g><path d=\"M8.3 13.5a0.49 0.49 0 0 0 0.5 -0.5 16.52 16.52 0 0 1 0.38 -2.62 0.48 0.48 0 0 0 -0.18 -0.5 0.5 0.5 0 0 0 -0.58 0 5.54 5.54 0 0 0 -2 3 0.5 0.5 0 0 0 0.09 0.44 0.49 0.49 0 0 0 0.39 0.19Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M14.7 13a0.5 0.5 0 0 0 0.5 0.47h1.39a0.49 0.49 0 0 0 0.39 -0.19 0.5 0.5 0 0 0 0.09 -0.44 5.54 5.54 0 0 0 -2 -3 0.5 0.5 0 0 0 -0.58 0 0.48 0.48 0 0 0 -0.21 0.53A16.52 16.52 0 0 1 14.7 13\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M11.39 8.81a9.77 9.77 0 0 0 -1.1 4.19 0.48 0.48 0 0 0 0.13 0.38 0.51 0.51 0 0 0 0.37 0.16h1.92a0.51 0.51 0 0 0 0.37 -0.16 0.48 0.48 0 0 0 0.13 -0.38 9.77 9.77 0 0 0 -1.1 -4.15 0.12 0.12 0 0 0 -0.11 -0.09h-0.58a0.12 0.12 0 0 0 -0.03 0.05\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M8.81 15.47a0.5 0.5 0 0 0 -0.5 -0.47h-1.4a0.49 0.49 0 0 0 -0.39 0.19 0.5 0.5 0 0 0 -0.09 0.44 5.5 5.5 0 0 0 2 3 0.5 0.5 0 0 0 0.58 0 0.51 0.51 0 0 0 0.21 -0.54 14.6 14.6 0 0 1 -0.41 -2.62\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M12.1 19.71a10.44 10.44 0 0 0 1.1 -4.17 0.45 0.45 0 0 0 -0.13 -0.38 0.48 0.48 0 0 0 -0.36 -0.16h-1.92a0.48 0.48 0 0 0 -0.36 0.16 0.45 0.45 0 0 0 -0.13 0.38 10.44 10.44 0 0 0 1.1 4.17l0.31 0 0.31 0Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M20.8 5.17a0.48 0.48 0 0 1 -0.3 -0.45V2a2 2 0 0 0 -2 -2h-13A3.5 3.5 0 0 0 2 3.5V21a3 3 0 0 0 3 3h15a2 2 0 0 0 2 -2V7a2 2 0 0 0 -1.2 -1.83M4 3.5A1.5 1.5 0 0 1 5.5 2H18a0.5 0.5 0 0 1 0.5 0.5v2a0.5 0.5 0 0 1 -0.5 0.5H5.5A1.5 1.5 0 0 1 4 3.5m7.75 17.75a7 7 0 1 1 7 -7 7 7 0 0 1 -7 7\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M15.19 15a0.5 0.5 0 0 0 -0.5 0.47 14.6 14.6 0 0 1 -0.4 2.63 0.51 0.51 0 0 0 0.21 0.54 0.5 0.5 0 0 0 0.58 0 5.5 5.5 0 0 0 2 -3 0.5 0.5 0 0 0 -0.09 -0.44 0.49 0.49 0 0 0 -0.39 -0.19Z\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
