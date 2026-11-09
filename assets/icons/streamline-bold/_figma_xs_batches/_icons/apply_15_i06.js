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
const BATCH = [{"setName":"icon/misc/parking","name":"parking","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Parking-P--Streamline-Ultimate\"><g><path d=\"M5.5 21.75h-4a0.25 0.25 0 0 0 -0.25 0.25v0.5a1.25 1.25 0 0 0 1.25 1.25h2a1.25 1.25 0 0 0 1.25 -1.25V22a0.25 0.25 0 0 0 -0.25 -0.25\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M19.5 21.75h-4a0.25 0.25 0 0 0 -0.25 0.25v0.5a1.25 1.25 0 0 0 1.25 1.25h2a1.25 1.25 0 0 0 1.25 -1.25V22a0.25 0.25 0 0 0 -0.25 -0.25\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"m19.3 15.24 -0.11 -0.17 -0.47 -1.16a0.25 0.25 0 0 0 -0.23 -0.16h-1.82a0.25 0.25 0 0 0 -0.22 0.13 0.26 0.26 0 0 1 -0.21 0.12H4.93a0.26 0.26 0 0 1 -0.21 -0.11 0.27 0.27 0 0 1 0 -0.23l1 -2.5a0.24 0.24 0 0 1 0.21 -0.16h4.32a1 1 0 0 0 0 -2H5.42A1.5 1.5 0 0 0 4 9.94l-1.91 4.85L2 15 0.47 16.47a0.75 0.75 0 0 0 -0.22 0.53v2.5a1.25 1.25 0 0 0 1.25 1.25h18a1.25 1.25 0 0 0 1.25 -1.25v-2.29a1.26 1.26 0 0 0 -0.37 -0.89Z\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M17.75 0.25a6 6 0 1 0 6 6 6 6 0 0 0 -6 -6m0.5 7.25h-1a0.25 0.25 0 0 0 -0.25 0.25v2a0.75 0.75 0 0 1 -1.5 0v-7a0.76 0.76 0 0 1 0.75 -0.75h2a2.75 2.75 0 0 1 0 5.5\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M18.25 3.5h-1a0.25 0.25 0 0 0 -0.25 0.25v2a0.25 0.25 0 0 0 0.25 0.25h1a1.25 1.25 0 0 0 0 -2.5\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"},{"setName":"icon/misc/factory","name":"factory","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Factory-Belt--Streamline-Ultimate\"><path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M15.182 3.583c1.902 -1.901 5.08 -1.922 7.101 0.015a1 1 0 1 0 1.384 -1.444c-2.778 -2.662 -7.2 -2.684 -9.899 0.015a1 1 0 1 0 1.414 1.414m4.906 2.569c-0.687 -0.75 -1.928 -0.796 -2.756 0.031a1 1 0 1 1 -1.414 -1.414c1.573 -1.573 4.132 -1.619 5.644 0.031a1 1 0 1 1 -1.474 1.352M2.85 6.956a1.5 1.5 0 0 1 1.5 -1.5h7.8a1.5 1.5 0 0 1 1.5 1.5v6.5a1.5 1.5 0 0 1 -1.5 1.5h-7.8a1.5 1.5 0 0 1 -1.5 -1.5zm4 0h2.8v3h-2.8zm13.086 9.394c2.009 -0.109 3.714 1.646 3.714 3.7 0 2.086 -1.734 3.7 -3.7 3.7h-16c-2.086 0 -3.7 -1.734 -3.7 -3.7 0 -2.086 1.734 -3.7 3.7 -3.7zM4.45 19.425a0.625 0.625 0 1 0 0 1.25h2a0.625 0.625 0 1 0 0 -1.25zm5.775 0.625c0 -0.345 0.28 -0.625 0.625 -0.625h2a0.625 0.625 0 1 1 0 1.25h-2a0.625 0.625 0 0 1 -0.625 -0.625m7.025 -0.625a0.625 0.625 0 1 0 0 1.25h2a0.625 0.625 0 1 0 0 -1.25zm0.493 -11.931a1.4 1.4 0 0 1 0.982 -0.418 1.4 1.4 0 0 1 0.982 0.418 1.4 1.4 0 0 1 0.418 0.982 1.4 1.4 0 0 1 -0.418 0.982 1.4 1.4 0 0 1 -0.982 0.418 1.4 1.4 0 0 1 -0.982 -0.418 1.4 1.4 0 0 1 -0.418 -0.982 1.4 1.4 0 0 1 0.418 -0.982\" clip-rule=\"evenodd\" stroke-width=\"1\"></path></svg>"},{"setName":"icon/misc/briefcase","name":"briefcase","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Briefcase--Streamline-Ultimate\"><path d=\"M3 22.5h18a3 3 0 0 0 3 -3v-11a3 3 0 0 0 -3 -3h-3.9a0.24 0.24 0 0 1 -0.24 -0.22l-0.15 -1.15a3 3 0 0 0 -3 -2.63h-3.44a3 3 0 0 0 -3 2.63l-0.13 1.15a0.24 0.24 0 0 1 -0.24 0.22H3a3 3 0 0 0 -3 3v11a3 3 0 0 0 3 3M9.27 4.38a1 1 0 0 1 1 -0.88h3.46a1 1 0 0 1 1 0.88l0.1 0.84a0.25 0.25 0 0 1 -0.06 0.2 0.26 0.26 0 0 1 -0.19 0.08H9.42a0.26 0.26 0 0 1 -0.19 -0.08 0.25 0.25 0 0 1 -0.06 -0.2ZM5.25 11a0.76 0.76 0 0 1 0.75 -0.75h12a0.76 0.76 0 0 1 0.75 0.75v0.5a0.76 0.76 0 0 1 -0.75 0.75H6a0.76 0.76 0 0 1 -0.75 -0.75Zm0 5.5a0.76 0.76 0 0 1 0.75 -0.75h12a0.76 0.76 0 0 1 0.75 0.75v0.5a0.76 0.76 0 0 1 -0.75 0.75H6a0.76 0.76 0 0 1 -0.75 -0.75Z\" fill=\"#000000\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
