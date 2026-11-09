
const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);
const colorVar = await figma.variables.getVariableByIdAsync('VariableID:34:2');
const FILL = { r: 0.062745, g: 0.094118, b: 0.156863 };
function paint(node) {
  node.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: FILL }, 'color', colorVar)];
  node.strokes = [];
}
function bindFills(root) {
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    if ('constraints' in n) n.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    if (n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION' || n.type === 'ELLIPSE' || n.type === 'STAR' || n.type === 'POLYGON') paint(n);
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
    if ('children' in n) for (const c of n.children) stack.push(c);
  }
}
function applyBoldXs(set, svg) {
  const xs = set.children.find(c => c.name === 'Size=xs');
  if (!xs) return { ok: false, reason: 'no-xs' };
  for (const c of [...xs.children]) c.remove();
  const node = figma.createNodeFromSvg(svg);
  node.name = set.name.split('/').pop() + ' · bold';
  try { node.resize(16, 16); } catch (e) {}
  node.x = 0; node.y = 0;
  node.clipsContent = false;
  if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
  xs.appendChild(node);
  bindFills(node);
  try { xs.resizeWithoutConstraints(16, 16); } catch (e) { try { xs.resize(16, 16); } catch (e2) {} }
  xs.clipsContent = false;
  xs.visible = true;
  for (const v of set.children) v.visible = true;
  set.clipsContent = true;
  set.counterAxisAlignItems = 'MIN';
  set.primaryAxisAlignItems = 'MIN';
  if (set.layoutMode !== 'NONE') {
    set.primaryAxisSizingMode = 'FIXED';
    set.counterAxisSizingMode = 'FIXED';
  }
  set.resize(16, 16);
  try { set.layoutSizingHorizontal = 'FIXED'; set.layoutSizingVertical = 'FIXED'; } catch (e) {}
  return { ok: true };
}

const BATCH = [{"setName": "icon/misc/face.id", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Face-Id--Streamline-Ultimate\"> <g> <path d=\"M6.5 22H2.25a0.25 0.25 0 0 1 -0.25 -0.25V17.5a1 1 0 0 0 -2 0V22a2 2 0 0 0 2 2h4.5a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1 7.5a1 1 0 0 0 1 -1V2.25A0.25 0.25 0 0 1 2.25 2H6.5a1 1 0 0 0 0 -2H2a2 2 0 0 0 -2 2v4.5a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 16.5a1 1 0 0 0 -1 1v4.25a0.25 0.25 0 0 1 -0.25 0.25H17.5a1 1 0 0 0 0 2H22a2 2 0 0 0 2 -2v-4.5a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22 0h-4.5a1 1 0 0 0 0 2h4.25a0.25 0.25 0 0 1 0.25 0.25V6.5a1 1 0 0 0 2 0V2a2 2 0 0 0 -2 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.77 14.45a1 1 0 1 1 1.68 1.1 6.51 6.51 0 0 1 -10.9 0 1 1 0 1 1 1.68 -1.1 4.49 4.49 0 0 0 7.54 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.5 11.5a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 2 0v3a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.5 11.5a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 2 0v3a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/factory", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Factory-Belt--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M15.182 3.583c1.902 -1.901 5.08 -1.922 7.101 0.015a1 1 0 1 0 1.384 -1.444c-2.778 -2.662 -7.2 -2.684 -9.899 0.015a1 1 0 1 0 1.414 1.414m4.906 2.569c-0.687 -0.75 -1.928 -0.796 -2.756 0.031a1 1 0 1 1 -1.414 -1.414c1.573 -1.573 4.132 -1.619 5.644 0.031a1 1 0 1 1 -1.474 1.352M2.85 6.956a1.5 1.5 0 0 1 1.5 -1.5h7.8a1.5 1.5 0 0 1 1.5 1.5v6.5a1.5 1.5 0 0 1 -1.5 1.5h-7.8a1.5 1.5 0 0 1 -1.5 -1.5zm4 0h2.8v3h-2.8zm13.086 9.394c2.009 -0.109 3.714 1.646 3.714 3.7 0 2.086 -1.734 3.7 -3.7 3.7h-16c-2.086 0 -3.7 -1.734 -3.7 -3.7 0 -2.086 1.734 -3.7 3.7 -3.7zM4.45 19.425a0.625 0.625 0 1 0 0 1.25h2a0.625 0.625 0 1 0 0 -1.25zm5.775 0.625c0 -0.345 0.28 -0.625 0.625 -0.625h2a0.625 0.625 0 1 1 0 1.25h-2a0.625 0.625 0 0 1 -0.625 -0.625m7.025 -0.625a0.625 0.625 0 1 0 0 1.25h2a0.625 0.625 0 1 0 0 -1.25zm0.493 -11.931a1.4 1.4 0 0 1 0.982 -0.418 1.4 1.4 0 0 1 0.982 0.418 1.4 1.4 0 0 1 0.418 0.982 1.4 1.4 0 0 1 -0.418 0.982 1.4 1.4 0 0 1 -0.982 0.418 1.4 1.4 0 0 1 -0.982 -0.418 1.4 1.4 0 0 1 -0.418 -0.982 1.4 1.4 0 0 1 0.418 -0.982\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
let ok=0, missing=0, failed=0; const miss=[], fail=[];
for (const item of BATCH) {
  const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<8) miss.push(item.setName); continue; }
  try {
    const r = applyBoldXs(set, item.svg);
    if (r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); }
  } catch(e) { failed++; if (fail.length<8) fail.push({name:item.setName,err:String(e)}); }
}
return { ok, missing, failed, miss, fail };
