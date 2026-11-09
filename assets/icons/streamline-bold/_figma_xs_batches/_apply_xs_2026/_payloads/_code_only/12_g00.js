
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

const BATCH = [{"setName": "icon/files/file.text", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Common-File-Text--Streamline-Ultimate\"> <path fill=\"#000000\" d=\"M14.25 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75H4.25c-1.51878 0 -2.75 -1.2312 -2.75 -2.75V2.75C1.5 1.23122 2.73122 0 4.25 0h10zM6.50098 18.75c-0.41422 0 -0.75 0.3358 -0.75 0.75 0 0.4141 0.33503 0.7497 0.74902 0.75h10.999c0.4142 0 0.751 -0.3358 0.751 -0.75 0 -0.414 -0.3361 -0.7497 -0.75 -0.75zm0 -4c-0.41422 0 -0.75 0.3358 -0.75 0.75 0 0.4141 0.33503 0.7497 0.74902 0.75h10.999c0.4142 0 0.751 -0.3358 0.751 -0.75 0 -0.414 -0.3361 -0.7497 -0.75 -0.75zm0 -4c-0.38819 0 -0.70848 0.2949 -0.74707 0.6729 -0.00259 0.0253 -0.00293 0.0511 -0.00293 0.0771s0.00034 0.0518 0.00293 0.0771c0.03858 0.3779 0.35813 0.6727 0.74609 0.6729h10.999c0.4142 0 0.751 -0.3358 0.751 -0.75 0 -0.414 -0.3361 -0.7497 -0.75 -0.75zm0 -4c-0.41422 0 -0.75 0.33579 -0.75 0.75s0.33578 0.75 0.75 0.75h4.78512c0.4138 -0.00053 0.75 -0.33611 0.75 -0.75s-0.3362 -0.74947 -0.75 -0.75zM15.8066 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875H16.5c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973C15.8291 6.38962 15.75 6.19891 15.75 6V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/files/database", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Database--Streamline-Ultimate\"> <g> <path d=\"M23 20.5h-1a0.75 0.75 0 0 0 0 1.5h1a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M2 20.5H1A0.75 0.75 0 0 0 1 22h1a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.25 18.43a0.26 0.26 0 0 1 -0.17 0.24 2.78 2.78 0 0 0 -1.66 1.66 0.26 0.26 0 0 1 -0.24 0.17H5.5a0.75 0.75 0 0 0 0 1.5h3.68a0.26 0.26 0 0 1 0.24 0.17 2.73 2.73 0 0 0 5.16 0 0.26 0.26 0 0 1 0.24 -0.17h3.68a0.75 0.75 0 0 0 0 -1.5h-3.68a0.26 0.26 0 0 1 -0.24 -0.17 2.78 2.78 0 0 0 -1.66 -1.66 0.25 0.25 0 0 1 -0.17 -0.24v-1.2A0.26 0.26 0 0 1 13 17c4.9 -0.16 8.76 -1.88 8.76 -4v-1.72a0.26 0.26 0 0 0 -0.14 -0.22 0.26 0.26 0 0 0 -0.27 0c-1.93 1.58 -5.59 2.41 -9.09 2.41s-7.16 -0.83 -9.09 -2.41a0.26 0.26 0 0 0 -0.27 0 0.26 0.26 0 0 0 -0.14 0.22V13c0 2 3.6 3.71 8.26 4a0.25 0.25 0 0 1 0.24 0.25Zm2 2.82A1.25 1.25 0 1 1 12 20a1.25 1.25 0 0 1 1.25 1.25\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12.25 12.5c5.25 0 9.5 -1.79 9.5 -4V6.78a0.26 0.26 0 0 0 -0.14 -0.22 0.26 0.26 0 0 0 -0.27 0C19.4 8.17 15.75 9 12.25 9s-7.16 -0.83 -9.09 -2.41a0.26 0.26 0 0 0 -0.27 0 0.26 0.26 0 0 0 -0.14 0.22V8.5c0 2.21 4.25 4 9.5 4\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M2.75 4a9.5 4 0 1 0 19 0 9.5 4 0 1 0 -19 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/files/document", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Document--Streamline-Ultimate\"> <path d=\"M6.48 20.67a9.4 9.4 0 0 1 -6.13 -2.29 1 1 0 0 1 -0.35 -0.76V4.35a1 1 0 0 1 1 -1h22a1 1 0 0 1 1 1v13.27a1 1 0 0 1 -1.62 0.79l-0.15 -0.12a7.63 7.63 0 0 0 -9.6 0.11l-0.49 0.37a9.41 9.41 0 0 1 -5.66 1.9M2 17.15a7.4 7.4 0 0 0 8.94 0l0.46 -0.35A9.59 9.59 0 0 1 22 15.77V5.35H2Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/files/drawer", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Drawer-Open--Streamline-Ultimate\"> <path d=\"m23.88 11.26 -3.07 -5.5a2 2 0 0 0 -1.7 -1H4.9a2 2 0 0 0 -1.7 1l-3.07 5.5a1.4 1.4 0 0 0 -0.13 0.49v6a1.5 1.5 0 0 0 1.5 1.5h21a1.5 1.5 0 0 0 1.5 -1.5v-6a1.29 1.29 0 0 0 -0.12 -0.49m-19 -4.38a0.25 0.25 0 0 1 0.22 -0.13l13.86 0a0.25 0.25 0 0 1 0.22 0.13l2.24 4a0.25 0.25 0 0 1 0 0.25 0.27 0.27 0 0 1 -0.22 0.12h-3.7a1.5 1.5 0 0 0 -1.06 0.44 1.52 1.52 0 0 0 -0.44 1.06 1.5 1.5 0 0 1 -1.5 1.5h-5a1.5 1.5 0 0 1 -1.5 -1.5 1.5 1.5 0 0 0 -1.5 -1.5H2.84a0.26 0.26 0 0 1 -0.21 -0.12 0.25 0.25 0 0 1 0 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
