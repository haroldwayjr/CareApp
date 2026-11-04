
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

const BATCH = [{"setName": "icon/comms/send", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Send-Email-2--Streamline-Ultimate\"> <g> <path d=\"M23 0.64a0.49 0.49 0 0 0 -0.17 -0.51 0.51 0.51 0 0 0 -0.54 0L1.78 10.82A1.45 1.45 0 0 0 1 12.05a1.48 1.48 0 0 0 0.68 1.3l4.56 2.88a0.24 0.24 0 0 0 0.3 0L18.7 5.34a0.25 0.25 0 0 1 0.37 0.34L9.35 17.86a0.25 0.25 0 0 0 -0.06 0.2 0.3 0.3 0 0 0 0.12 0.17l6.43 4.07a1.48 1.48 0 0 0 1.32 0.11 1.43 1.43 0 0 0 0.87 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7.88 19.18a0.25 0.25 0 0 0 -0.25 0 0.26 0.26 0 0 0 -0.13 0.22V23a1 1 0 0 0 1 1 1 1 0 0 0 0.71 -0.3l2 -2a0.27 0.27 0 0 0 0.07 -0.21 0.25 0.25 0 0 0 -0.12 -0.18Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/comms/team", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Team-Idea--Streamline-Ultimate\"> <g> <path d=\"M9.9 10.2a0.26 0.26 0 0 1 0.1 0.2v0.6a0.5 0.5 0 0 0 0.5 0.5h3a0.5 0.5 0 0 0 0.5 -0.5v-0.6a0.26 0.26 0 0 1 0.1 -0.2 3.4 3.4 0 0 0 1.4 -2.7A3.6 3.6 0 0 0 12 4a3.6 3.6 0 0 0 -3.5 3.5 3.4 3.4 0 0 0 1.4 2.7\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 3a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v1a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.41 3.5a1 1 0 0 0 0 -1.41 1 1 0 0 0 -1.41 0l-0.71 0.7a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M18.5 8.5a1 1 0 0 0 0 -2h-1a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.71 2.79 8 2.09a1 1 0 0 0 -1.41 0 1 1 0 0 0 0 1.41l0.7 0.71a1 1 0 0 0 1.42 0 1 1 0 0 0 0 -1.42\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6.5 6.5h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11 14.25h2a0.75 0.75 0 0 0 0 -1.5h-2a0.75 0.75 0 0 0 0 1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3.5 20.4a2.2 2.2 0 1 0 -2.2 -2.2 2.19 2.19 0 0 0 2.2 2.2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0.33 24a0.28 0.28 0 0 1 -0.21 -0.1 0.27 0.27 0 0 1 0 -0.23A3.6 3.6 0 0 1 3.5 21.2a3.6 3.6 0 0 1 3.41 2.47 0.27 0.27 0 0 1 0 0.23 0.28 0.28 0 0 1 -0.21 0.1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 20.4a2.2 2.2 0 1 0 -2.2 -2.2 2.19 2.19 0 0 0 2.2 2.2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20.5 20.4a2.2 2.2 0 1 0 -2.2 -2.2 2.19 2.19 0 0 0 2.2 2.2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.83 24a0.28 0.28 0 0 1 -0.21 -0.1 0.27 0.27 0 0 1 0 -0.23A3.6 3.6 0 0 1 12 21.2a3.6 3.6 0 0 1 3.41 2.47 0.27 0.27 0 0 1 0 0.23 0.28 0.28 0 0 1 -0.21 0.1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.33 24a0.28 0.28 0 0 1 -0.21 -0.1 0.27 0.27 0 0 1 0 -0.23 3.6 3.6 0 0 1 3.38 -2.47 3.6 3.6 0 0 1 3.41 2.47 0.27 0.27 0 0 1 0 0.23 0.28 0.28 0 0 1 -0.21 0.1Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
