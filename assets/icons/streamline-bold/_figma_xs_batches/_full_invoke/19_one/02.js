
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
      const paint = figma.variables.setBoundVariableForPaint(
        { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', iconDefault);
      n.fills = [paint];
      n.strokes = [];
    }
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
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
  node.resize(16, 16);
  node.x = 0; node.y = 0;
  node.clipsContent = false;
  if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
  xs.appendChild(node);
  try { xs.resizeWithoutConstraints(16, 16); } catch (_) { try { xs.resize(16, 16); } catch(__){} }
  bindFills(node);
  xs.clipsContent = false;
  xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}
const BATCH = [{"setName": "icon/misc/factory", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Factory-Belt--Streamline-Ultimate\">\n  <desc>\n    Factory Belt Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M15.182 3.583c1.902 -1.901 5.08 -1.922 7.101 0.015a1 1 0 1 0 1.384 -1.444c-2.778 -2.662 -7.2 -2.684 -9.899 0.015a1 1 0 1 0 1.414 1.414m4.906 2.569c-0.687 -0.75 -1.928 -0.796 -2.756 0.031a1 1 0 1 1 -1.414 -1.414c1.573 -1.573 4.132 -1.619 5.644 0.031a1 1 0 1 1 -1.474 1.352M2.85 6.956a1.5 1.5 0 0 1 1.5 -1.5h7.8a1.5 1.5 0 0 1 1.5 1.5v6.5a1.5 1.5 0 0 1 -1.5 1.5h-7.8a1.5 1.5 0 0 1 -1.5 -1.5zm4 0h2.8v3h-2.8zm13.086 9.394c2.009 -0.109 3.714 1.646 3.714 3.7 0 2.086 -1.734 3.7 -3.7 3.7h-16c-2.086 0 -3.7 -1.734 -3.7 -3.7 0 -2.086 1.734 -3.7 3.7 -3.7zM4.45 19.425a0.625 0.625 0 1 0 0 1.25h2a0.625 0.625 0 1 0 0 -1.25zm5.775 0.625c0 -0.345 0.28 -0.625 0.625 -0.625h2a0.625 0.625 0 1 1 0 1.25h-2a0.625 0.625 0 0 1 -0.625 -0.625m7.025 -0.625a0.625 0.625 0 1 0 0 1.25h2a0.625 0.625 0 1 0 0 -1.25zm0.493 -11.931a1.4 1.4 0 0 1 0.982 -0.418 1.4 1.4 0 0 1 0.982 0.418 1.4 1.4 0 0 1 0.418 0.982 1.4 1.4 0 0 1 -0.418 0.982 1.4 1.4 0 0 1 -0.982 0.418 1.4 1.4 0 0 1 -0.982 -0.418 1.4 1.4 0 0 1 -0.418 -0.982 1.4 1.4 0 0 1 0.418 -0.982\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
let ok=0, missing=0, failed=0; const miss=[], fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<8) miss.push(item.setName); continue; }
  try {
    const r = applyBoldXs(set, item.svg);
    if (r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); }
  } catch(e) { failed++; if (fail.length<8) fail.push({name:item.setName,err:String(e)}); }
}
return { ok, missing, failed, miss, fail };
