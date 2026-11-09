
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

const BATCH = [{"setName": "icon/misc/cloud.sun", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Weather-Cloud-Sun-Wind--Streamline-Ultimate\"> <g> <path d=\"M8.25 3a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v1a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3.12 4.54a1 1 0 0 0 0.71 0.29 1 1 0 0 0 0.71 -0.29 1 1 0 0 0 0 -1.42l-0.71 -0.7a1 1 0 0 0 -1.41 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1 9.25h1a1 1 0 0 0 0 -2H1a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14.08 2.42a1 1 0 0 0 -1.41 0l-0.71 0.7a1 1 0 0 0 -0.29 0.67A0.25 0.25 0 0 0 12 4a8.75 8.75 0 0 1 2.12 -0.5 0.23 0.23 0 0 0 0.22 -0.19 1 1 0 0 0 -0.26 -0.89\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.23 9.31A0.24 0.24 0 0 0 5.35 9a3.33 3.33 0 0 1 -0.1 -0.78 3 3 0 0 1 3 -3 2.87 2.87 0 0 1 1.1 0.21 0.25 0.25 0 0 0 0.25 0A8.5 8.5 0 0 1 11 4.5a0.28 0.28 0 0 0 0.13 -0.21 0.25 0.25 0 0 0 -0.13 -0.22 4.94 4.94 0 0 0 -2.74 -0.82 5 5 0 0 0 -5 5 4.94 4.94 0 0 0 0.34 1.81 0.26 0.26 0 0 0 0.17 0.15 0.25 0.25 0 0 0 0.23 -0.05 7.06 7.06 0 0 1 1.23 -0.85\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22 12A7 7 0 0 0 8.34 9.84a0.23 0.23 0 0 1 -0.22 0.17 5.52 5.52 0 0 0 -5 4.18 0.25 0.25 0 0 0 0.24 0.31H5a0.26 0.26 0 0 0 0.24 -0.17A3.51 3.51 0 0 1 8.5 12l0.5 0a1 1 0 0 0 1.11 -0.83A5 5 0 0 1 20 12l0 0.44a1 1 0 0 0 0.5 1A3 3 0 0 1 19 19h-2.85a0.25 0.25 0 0 0 -0.2 0.1 0.22 0.22 0 0 0 0 0.22 2.61 2.61 0 0 1 0 1.36 0.22 0.22 0 0 0 0 0.22 0.25 0.25 0 0 0 0.2 0.1H19a5 5 0 0 0 3 -9\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.5 18a1 1 0 0 0 0 -2H1a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14.5 20a1 1 0 0 0 -1 -1H4a1 1 0 0 0 0 2h9.5a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.5 22H1a1 1 0 0 0 0 2h9.5a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/code", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Folder-Code--Streamline-Ultimate\"> <path d=\"M22.5 4.5H11.74a0.5 0.5 0 0 1 -0.45 -0.28l-0.95 -1.89A1.5 1.5 0 0 0 9 1.5H1.5A1.5 1.5 0 0 0 0 3v18a1.5 1.5 0 0 0 1.5 1.5h21A1.5 1.5 0 0 0 24 21V6a1.5 1.5 0 0 0 -1.5 -1.5m-12.22 13a0.75 0.75 0 0 1 -1.06 0l-4 -4a0.75 0.75 0 0 1 0 -1.06l4 -4a0.75 0.75 0 0 1 1.06 1.06L7 12.82a0.25 0.25 0 0 0 0 0.36l3.29 3.29a0.75 0.75 0 0 1 -0.01 1.06Zm8 -4 -4 4a0.75 0.75 0 0 1 -1.06 -1.06l3.29 -3.29a0.25 0.25 0 0 0 0 -0.36l-3.29 -3.26a0.75 0.75 0 0 1 1.06 -1.06l4 4a0.75 0.75 0 0 1 0 1.06Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
