
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

const BATCH = [{"setName": "icon/misc/timer", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Timer--Streamline-Ultimate\"> <g> <path d=\"M19.17 3.48a1.23 1.23 0 0 0 -1.53 1.92A9.05 9.05 0 1 1 3.36 9.75 1.23 1.23 0 0 0 1 9a11.7 11.7 0 0 0 -0.53 3.48 11.51 11.51 0 1 0 18.68 -9Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.04 2.2a1.96 1.96 0 1 0 3.92 0 1.96 1.96 0 1 0 -3.92 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.08 13.29a1.21 1.21 0 0 0 0.92 0.42 1.16 1.16 0 0 0 0.8 -0.3 1.21 1.21 0 0 0 0.12 -1.72L3.13 0.42A1.23 1.23 0 0 0 1.28 2Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/tool", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Tools-Keys--Streamline-Ultimate\"> <g> <path d=\"m6 7.56 0.24 0a0.91 0.91 0 0 0 0.64 -0.34 0.92 0.92 0 0 0 0.17 -0.7A3.38 3.38 0 0 1 7 5.78 3.79 3.79 0 0 1 10.76 2a3.74 3.74 0 0 1 3 1.52 1 1 0 0 0 1.4 0.2 1 1 0 0 0 0.2 -1.41A5.79 5.79 0 0 0 5 5.78a5.39 5.39 0 0 0 0.1 1.07 0.88 0.88 0 0 0 0.9 0.71\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.33 22h-1.92a0.91 0.91 0 0 1 -0.91 -0.91v-4a0.37 0.37 0 0 1 0 -0.15 2.5 2.5 0 1 0 -2.08 0 0.37 0.37 0 0 1 0 0.15v4A2.92 2.92 0 0 0 13.41 24h1.92a1 1 0 0 0 0 -2m-3.8 -6.36a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 3a1 1 0 0 0 -1 1v0.89a0.5 0.5 0 0 1 -0.5 0.5h-0.7a2.5 2.5 0 1 0 0 2h1.74A1.48 1.48 0 0 0 24 5.93V4a1 1 0 0 0 -1 -1m-4.5 4.39a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"m22.3 14 -0.95 1a0.48 0.48 0 0 1 -0.36 0.15 0.51 0.51 0 0 1 -0.36 -0.15l-1.58 -1.68a2.54 2.54 0 0 0 0.26 -1.1 2.5 2.5 0 1 0 -2.5 2.5 2.38 2.38 0 0 0 0.7 -0.11l2 2.14a1.93 1.93 0 0 0 1.37 0.6 1.92 1.92 0 0 0 1.35 -0.54l1.39 -1.32A1 1 0 0 0 22.3 14m-5.49 -0.82a1 1 0 0 1 0 -2 1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.76 9.64a2.5 2.5 0 0 0 -2.06 3.91L1 16.79a3.86 3.86 0 0 0 -1 2.81 3.79 3.79 0 0 0 1.33 2.65l1.44 1.26A1 1 0 0 0 4.09 22l-1.44 -1.26a1.85 1.85 0 0 1 -0.19 -2.64l3 -3.49 0.33 0a2.5 2.5 0 0 0 0 -5Zm0 3.5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/train", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Train-Location--Streamline-Ultimate\"> <g> <path d=\"m19.41 23 -1.2 -4a1 1 0 0 0 0.65 -0.93V7.56a2.57 2.57 0 0 0 -1.71 -2.39 0.64 0.64 0 0 0 -0.24 0h-0.22a9.9 9.9 0 0 1 -0.75 1.49h0.81a1.06 1.06 0 0 1 0.61 0.94v4.6H6.67V7.56a1.08 1.08 0 0 1 1.11 -1h0.76A9.58 9.58 0 0 1 7.8 5a2.6 2.6 0 0 0 -2.63 2.56v10.49A1 1 0 0 0 6 19l-1.23 4a0.74 0.74 0 0 0 0.5 0.93 0.78 0.78 0 0 0 0.22 0 0.74 0.74 0 0 0 0.71 -0.53l0.22 -0.73h11.34l0.22 0.73a0.74 0.74 0 0 0 0.71 0.53 0.78 0.78 0 0 0 0.22 0 0.74 0.74 0 0 0 0.5 -0.93m-8.52 -8.16h2.54a0.75 0.75 0 0 1 0 1.5h-2.54a0.75 0.75 0 0 1 0 -1.5m-4 6.36 0.57 -1.9a0.82 0.82 0 0 0 0 -0.27h9.26a0.83 0.83 0 0 0 0 0.27l0.56 1.9Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12.25 8.82s3.31 -3.31 3.31 -5.51a3.31 3.31 0 0 0 -6.56 0c0 2.2 3.25 5.51 3.25 5.51m0 -6.64a1.13 1.13 0 1 1 -1.13 1.13 1.14 1.14 0 0 1 1.13 -1.13\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/translate", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Translate--Streamline-Ultimate\"> <g> <path d=\"M22.92 11H15.5a0.5 0.5 0 0 0 -0.5 0.5v0.41A3.08 3.08 0 0 1 11.92 15h-0.42a0.5 0.5 0 0 0 -0.5 0.5v7.41A1.09 1.09 0 0 0 12.08 24h10.84A1.09 1.09 0 0 0 24 22.91V12.08A1.08 1.08 0 0 0 22.92 11m-2.16 11.2a0.74 0.74 0 0 1 -1 -0.44l-0.51 -1.35a0.25 0.25 0 0 0 -0.23 -0.16h-3.08a0.25 0.25 0 0 0 -0.23 0.16l-0.51 1.35a0.75 0.75 0 1 1 -1.4 -0.53l2.53 -6.75a1.25 1.25 0 0 1 2.34 0l2.53 6.75a0.75 0.75 0 0 1 -0.44 0.97\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M16.46 18.41a0.24 0.24 0 0 0 0 0.23 0.23 0.23 0 0 0 0.2 0.11h1.62a0.23 0.23 0 0 0 0.2 -0.11 0.24 0.24 0 0 0 0 -0.23l-0.81 -2.15a0.25 0.25 0 0 0 -0.46 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7.78 5.61a0.25 0.25 0 0 0 0 -0.24 0.25 0.25 0 0 0 -0.22 -0.12H5.45a0.25 0.25 0 0 0 -0.22 0.12 0.25 0.25 0 0 0 0 0.24 8.07 8.07 0 0 0 1.08 1.66 0.25 0.25 0 0 0 0.38 0 8.07 8.07 0 0 0 1.09 -1.66\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.92 13A1.08 1.08 0 0 0 13 11.91V1.08A1.08 1.08 0 0 0 11.92 0H1.08A1.08 1.08 0 0 0 0 1.08v10.83A1.09 1.09 0 0 0 1.08 13Zm-1.2 -2.31a0.74 0.74 0 0 1 -0.72 0.56 8.52 8.52 0 0 1 -3.35 -1.58 0.24 0.24 0 0 0 -0.3 0A8.49 8.49 0 0 1 3 11.25a0.75 0.75 0 0 1 -0.2 -1.48 7.56 7.56 0 0 0 2.37 -1.1 0.21 0.21 0 0 0 0.1 -0.17 0.29 0.29 0 0 0 0 -0.2 9.48 9.48 0 0 1 -1.74 -2.89 0.25 0.25 0 0 0 -0.23 -0.16h-0.77a0.75 0.75 0 0 1 0 -1.5h3a0.25 0.25 0 0 0 0.25 -0.25v-1a0.75 0.75 0 0 1 1.5 0v1a0.25 0.25 0 0 0 0.25 0.25h3a0.75 0.75 0 0 1 0 1.5H9.7a0.25 0.25 0 0 0 -0.23 0.16A9.48 9.48 0 0 1 7.78 8.3a0.29 0.29 0 0 0 0 0.2 0.21 0.21 0 0 0 0.1 0.17 7.56 7.56 0 0 0 2.37 1.1 0.75 0.75 0 0 1 0.47 0.92\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.65 5.35a0.49 0.49 0 0 0 0.54 0.11 0.5 0.5 0 0 0 0.31 -0.46v-0.31a0.25 0.25 0 0 1 0.37 -0.22A4 4 0 0 1 21 8a1 1 0 0 0 2 0 6 6 0 0 0 -4.32 -5.75 0.26 0.26 0 0 1 -0.18 -0.25V1a0.5 0.5 0 0 0 -0.85 -0.36l-2 2a0.5 0.5 0 0 0 0 0.71Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M2 14a1 1 0 0 0 -1 1 6 6 0 0 0 4.32 5.75 0.25 0.25 0 0 1 0.18 0.25v1a0.5 0.5 0 0 0 0.31 0.46 0.49 0.49 0 0 0 0.54 -0.11l2 -2a0.5 0.5 0 0 0 0 -0.71l-2 -2a0.5 0.5 0 0 0 -0.85 0.36v0.31a0.24 0.24 0 0 1 -0.12 0.21 0.25 0.25 0 0 1 -0.25 0A4 4 0 0 1 3 15a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
