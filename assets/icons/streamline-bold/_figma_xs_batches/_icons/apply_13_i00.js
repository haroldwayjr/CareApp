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
const BATCH = [{"setName":"icon/files/resume","name":"resume","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Recruiting-Resume-Document--Streamline-Ultimate\"><g><g><path d=\"M12.56 13.71H3.85a0.75 0.75 0 0 0 0 1.5h8.71a0.75 0.75 0 1 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M11.25 18.16h-7.4a0.75 0.75 0 1 0 0 1.5h7.4a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path></g><path d=\"M4.44 3.49h3.89s1.04 0 1.04 1.04v4.64s0 1.04 -1.04 1.04H4.44s-1.04 0 -1.04 -1.04V4.53s0 -1.04 1.04 -1.04\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M24 15.64a3.66 3.66 0 0 0 -7.32 0v3.13h1.66l0.43 5.23h3.14l0.43 -5.23H24Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M17.46 7.56a2.88 2.88 0 1 0 5.76 0 2.88 2.88 0 1 0 -5.76 0\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M17.14 22.46H1.84a0.27 0.27 0 0 1 -0.27 -0.26V1.81a0.27 0.27 0 0 1 0.27 -0.26h20.63v2.19A4.37 4.37 0 0 1 24 5.11V0.8a0.75 0.75 0 0 0 -0.75 -0.75H1.84A1.76 1.76 0 0 0 0.07 1.81V22.2A1.76 1.76 0 0 0 1.84 24h15.42Z\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"},{"setName":"icon/files/envelope","name":"envelope","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Envelope--Streamline-Ultimate\"><g><path d=\"M11.11 14.56a1.27 1.27 0 0 0 1.77 0l9.69 -9.69a0.5 0.5 0 0 0 0.12 -0.51 0.51 0.51 0 0 0 -0.4 -0.34L22 4H2l-0.29 0a0.5 0.5 0 0 0 -0.4 0.34 0.48 0.48 0 0 0 0.12 0.51Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M23.89 5.83a0.18 0.18 0 0 0 -0.2 0l-6.2 6.2a0.24 0.24 0 0 0 0 0.36l5 5a0.75 0.75 0 0 1 -1.06 1.06l-5 -5a0.25 0.25 0 0 0 -0.36 0l-2.13 2.13a2.76 2.76 0 0 1 -3.89 0l-2.12 -2.09a0.24 0.24 0 0 0 -0.36 0l-5 5a0.75 0.75 0 0 1 -1.06 -1.06l5 -5a0.24 0.24 0 0 0 0 -0.36l-6.2 -6.2a0.18 0.18 0 0 0 -0.2 0A0.18 0.18 0 0 0 0 6v12a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V6a0.18 0.18 0 0 0 -0.11 -0.17\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"},{"setName":"icon/misc/camera.off","name":"camera-off","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Controls-Camera-Off--Streamline-Ultimate\"><g><path d=\"M3.17 6.43a0.27 0.27 0 0 0 -0.28 0A1.5 1.5 0 0 0 2 7.75v9a1.5 1.5 0 0 0 1.5 1.5h10.88a0.25 0.25 0 0 0 0.23 -0.15 0.26 0.26 0 0 0 0 -0.28Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"m21.74 7.45 -3 1.71a1.44 1.44 0 0 0 -0.74 1.25v3.68a1.44 1.44 0 0 0 0.74 1.25l3 1.71A1.5 1.5 0 0 0 24 15.8V8.7a1.5 1.5 0 0 0 -2.26 -1.25\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M17.07 15.66a0.29 0.29 0 0 1 -0.07 -0.18V7.75a1.5 1.5 0 0 0 -1.5 -1.5H7.77a0.29 0.29 0 0 1 -0.18 -0.07L1.71 0.29A1 1 0 0 0 0.44 0.17L0.29 0.29a1 1 0 0 0 0 1.42l22 22a1 1 0 0 0 1.42 -1.42Z\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
