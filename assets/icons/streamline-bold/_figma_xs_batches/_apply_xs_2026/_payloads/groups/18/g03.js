
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

const BATCH = [{"setName": "icon/media/video", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Video-Player--Streamline-Ultimate\"> <path d=\"M19.5 2h-15A4.51 4.51 0 0 0 0 6.5v11A4.51 4.51 0 0 0 4.5 22h15a4.51 4.51 0 0 0 4.5 -4.5v-11A4.51 4.51 0 0 0 19.5 2m-3.57 11.34 -5.76 2.88A1.5 1.5 0 0 1 8 14.88V9.12a1.49 1.49 0 0 1 2.17 -1.34l5.76 2.88a1.49 1.49 0 0 1 0 2.68\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/media/volume", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Volume--Streamline-Ultimate\"> <g> <path d=\"M4.5 14.25a7.5 7.5 0 1 0 7.5 -7.5 7.5 7.5 0 0 0 -7.5 7.5m9.92 -4.92a1.5 1.5 0 1 1 -1.5 1.5 1.5 1.5 0 0 1 1.5 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.5 3.75a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1.5 9.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19.5 9.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19.5 19.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1.5 19.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/media/volume.off", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Volume-Control-Off--Streamline-Ultimate\"> <g> <path d=\"M14.68 6.06a0.29 0.29 0 0 0 0.07 -0.18V3.75a1 1 0 0 0 -1.75 -0.7L7.12 9a0.25 0.25 0 0 1 -0.18 0.08H4.75a2 2 0 0 0 -2 2v3.41a2 2 0 0 0 1.42 1.91 0.23 0.23 0 0 0 0.25 -0.06Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.71 1.71a1 1 0 0 0 0 -1.41 1 1 0 0 0 -1.42 0l-22 22a1 1 0 0 0 0 1.41 0.79 0.79 0 0 0 0.15 0.12 1 1 0 0 0 1.27 -0.12l6.11 -6.12a0.27 0.27 0 0 1 0.36 0L13 22.46a1 1 0 0 0 1.71 -0.71v-11a0.29 0.29 0 0 1 0.07 -0.18Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/comms/calendar", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Calendar--Streamline-Ultimate\"> <path fill=\"#000000\" d=\"M17.5 0c0.5523 0 1 0.447715 1 1v1.15723h3c1.3807 0 2.5 1.11928 2.5 2.5V21.5c0 1.3807 -1.1193 2.5 -2.5 2.5h-19C1.11929 24 0 22.8807 0 21.5V4.65723c0 -1.38072 1.11929 -2.5 2.5 -2.5h2v2.79004c0.00023 0.41401 0.33593 0.75 0.75 0.75s0.74977 -0.33599 0.75 -0.75V1c0 -0.552285 0.44772 -1 1 -1s1 0.447715 1 1v1.15723h7v2.79004c0.0002 0.41401 0.3359 0.75 0.75 0.75s0.7498 -0.33599 0.75 -0.75V1c0 -0.552285 0.4477 -1 1 -1M2 21.5c0 0.2761 0.22386 0.5 0.5 0.5h19c0.2761 0 0.5 -0.2239 0.5 -0.5V9.01367H2z\" stroke-width=\"1\"></path> </svg>"}];
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
