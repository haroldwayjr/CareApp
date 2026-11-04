
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

const BATCH = [{"setName": "icon/actions/sort", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"> <path fill=\"#000000\" d=\"M4.27614 1.16797c0.29451 -0.240247 0.72929 -0.222639 1.00391 0.05176l3 3c0.2144 0.21448 0.27911 0.53718 0.16308 0.81738 -0.11609 0.28019 -0.39007 0.46286 -0.69336 0.46289h-2V22c-0.00006 0.5522 -0.44779 1 -1 1 -0.55209 -0.0002 -0.99993 -0.4479 -1 -1V5.5h-2c-0.30317 -0.00013 -0.57728 -0.1828 -0.69335 -0.46289 -0.115906 -0.28014 -0.05125 -0.60296 0.16308 -0.81738l3 -3zM16.7498 15c0.9665 0 1.75 0.7835 1.75 1.75v4.5c0 0.9665 -0.7835 1.75 -1.75 1.75h-4.5c-0.9664 -0.0001 -1.75 -0.7836 -1.75 -1.75v-4.5c0 -0.9664 0.7836 -1.7499 1.75 -1.75zm4.5 -14c0.9665 0 1.75 0.78351 1.75 1.75v9c0 0.9665 -0.7835 1.75 -1.75 1.75h-9c-0.9664 -0.0001 -1.75 -0.7836 -1.75 -1.75v-9c0 -0.96641 0.7836 -1.74988 1.75 -1.75z\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/sort.asc", "svg": "<svg fill=\"none\" viewBox=\"0 0 24 24\" id=\"Ascending-Sort-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\"> <path style=\"-inkscape-stroke:none\" d=\"M1.25 17.949219a1 1 0 0 0 -1 1 1 1 0 0 0 1 1h7a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path4\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path> <path style=\"-inkscape-stroke:none\" d=\"M1.25 10.949219a1 1 0 0 0 -1 1 1 1 0 0 0 1 1h14.199219a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path6\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path> <path style=\"-inkscape-stroke:none\" d=\"M1.25 4.0488281a1 1 0 0 0 -1 1 1 1 0 0 0 1 1h21.5a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path8\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/sort.desc", "svg": "<svg fill=\"none\" viewBox=\"0 0 24 24\" id=\"Descending-Sort-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\"> <path style=\"-inkscape-stroke:none\" d=\"M1.3007812 4.0507812a1 1 0 0 0 -0.99999995 1 1 1 0 0 0 0.99999995 1h6.8984376a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path4\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path> <path style=\"-inkscape-stroke:none\" d=\"M1.3007812 11.050781a1 1 0 0 0 -0.99999995 1 1 1 0 0 0 0.99999995 1H15.400391a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path6\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path> <path style=\"-inkscape-stroke:none\" d=\"M1.3007812 17.949219a1 1 0 0 0 -0.99999995 1 1 1 0 0 0 0.99999995 1H22.699219a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path8\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/star.add", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Rating-Star-Add--Streamline-Ultimate\"> <g> <path d=\"M21.39 11.58a1.47 1.47 0 0 0 0.43 -1.58 1.48 1.48 0 0 0 -1.38 -1H14.5l-2.13 -6a1.46 1.46 0 0 0 -2.75 0L7.5 9H1.56a1.46 1.46 0 0 0 -0.94 2.59l5 4.14 -2.08 6.34a1.46 1.46 0 0 0 2.25 1.65L11 19.9l5.21 3.82a1.49 1.49 0 0 0 1.73 0 1.45 1.45 0 0 0 0.52 -1.65l-2.11 -6.34Zm-6.84 3.05a1 1 0 0 0 -0.31 1.09l1.55 4.64a0.26 0.26 0 0 1 -0.09 0.28 0.24 0.24 0 0 1 -0.3 0l-3.81 -2.79a1 1 0 0 0 -0.59 -0.19 1 1 0 0 0 -0.59 0.19L6.6 20.64a0.24 0.24 0 0 1 -0.3 0 0.25 0.25 0 0 1 -0.09 -0.28l1.55 -4.64a1 1 0 0 0 -0.31 -1.09l-3.87 -3.19a0.25 0.25 0 0 1 -0.08 -0.27 0.26 0.26 0 0 1 0.24 -0.17h4.47a1 1 0 0 0 0.94 -0.67l1.61 -4.59a0.26 0.26 0 0 1 0.48 0l1.61 4.59a1 1 0 0 0 0.94 0.67h4.47a0.26 0.26 0 0 1 0.24 0.17 0.25 0.25 0 0 1 -0.08 0.27Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.91 3h-2V1a1 1 0 0 0 -2 0v2h-2a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0V5h2a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/swap", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Folder-Exchange--Streamline-Ultimate\"> <g> <path d=\"M13 10.5a3 3 0 0 1 1.57 0.46c0.1 0.06 0.34 0.1 0.38 -0.09a1.5 1.5 0 0 0 0.05 -0.37v-7A1.5 1.5 0 0 0 13.5 2h-7a0.49 0.49 0 0 1 -0.4 -0.2L5.2 0.6A1.49 1.49 0 0 0 4 0H1.5A1.5 1.5 0 0 0 0 1.5v9A1.5 1.5 0 0 0 1.5 12h6.28a0.25 0.25 0 0 0 0.22 -0.11 3 3 0 0 1 2.5 -1.39Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.5 14h-7a0.48 0.48 0 0 1 -0.4 -0.2l-0.9 -1.2A1.49 1.49 0 0 0 13 12h-2.5A1.5 1.5 0 0 0 9 13.5v9a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5 -1.5v-7a1.5 1.5 0 0 0 -1.5 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.35 17.15a0.48 0.48 0 0 0 -0.54 -0.15 0.5 0.5 0 0 0 -0.31 0.46v1a0.25 0.25 0 0 1 -0.25 0.25H2.5a0.76 0.76 0 0 1 -0.75 -0.71v-1.5a0.76 0.76 0 0 0 -0.75 -0.75 0.76 0.76 0 0 0 -0.75 0.75V18a2.25 2.25 0 0 0 2.25 2.25h1.75a0.25 0.25 0 0 1 0.25 0.25v1a0.5 0.5 0 0 0 0.31 0.46A0.43 0.43 0 0 0 5 22a0.47 0.47 0 0 0 0.35 -0.15l2 -2a0.48 0.48 0 0 0 0 -0.7Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M18.65 6.85A0.47 0.47 0 0 0 19 7a0.43 0.43 0 0 0 0.19 0 0.5 0.5 0 0 0 0.31 -0.46v-1a0.25 0.25 0 0 1 0.25 -0.25h1.75a0.76 0.76 0 0 1 0.75 0.75V7.5a0.75 0.75 0 0 0 1.5 0V6a2.25 2.25 0 0 0 -2.25 -2.25h-1.75a0.25 0.25 0 0 1 -0.25 -0.25v-1a0.5 0.5 0 0 0 -0.31 -0.5 0.48 0.48 0 0 0 -0.54 0.11l-2 2a0.48 0.48 0 0 0 0 0.7Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/sync", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Synchronize-Arrow-2--Streamline-Ultimate\"> <g> <path d=\"M12.57 1.26a10.8 10.8 0 0 0 -9.75 7.13 0.26 0.26 0 0 1 -0.27 0.17L0.86 8.31a0.52 0.52 0 0 0 -0.49 0.21 0.51 0.51 0 0 0 0 0.53L3 13.75a0.51 0.51 0 0 0 0.4 0.25 0.51 0.51 0 0 0 0.42 -0.15l3.77 -3.74a0.5 0.5 0 0 0 -0.28 -0.85L5.59 9a0.29 0.29 0 0 1 -0.18 -0.13 0.24 0.24 0 0 1 0 -0.22 8.32 8.32 0 0 1 7.26 -4.9 8.25 8.25 0 1 1 0.61 16.49 1.25 1.25 0 1 0 0.09 2.49 10.75 10.75 0 1 0 -0.79 -21.48Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.46 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0 -5 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/trash", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Bin--Streamline-Ultimate\"> <g> <path d=\"M19.5 7.5h-15A0.5 0.5 0 0 0 4 8v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2V8a0.5 0.5 0 0 0 -0.5 -0.5Zm-9.25 13a0.75 0.75 0 0 1 -1.5 0v-9a0.75 0.75 0 0 1 1.5 0Zm5 0a0.75 0.75 0 0 1 -1.5 0v-9a0.75 0.75 0 0 1 1.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22 4h-4.75a0.25 0.25 0 0 1 -0.25 -0.25V2.5A2.5 2.5 0 0 0 14.5 0h-5A2.5 2.5 0 0 0 7 2.5v1.25a0.25 0.25 0 0 1 -0.25 0.25H2a1 1 0 0 0 0 2h20a1 1 0 0 0 0 -2ZM9 3.75V2.5a0.5 0.5 0 0 1 0.5 -0.5h5a0.5 0.5 0 0 1 0.5 0.5v1.25a0.25 0.25 0 0 1 -0.25 0.25h-5.5A0.25 0.25 0 0 1 9 3.75Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/undo", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Undo--Streamline-Ultimate\"> <path d=\"M17.79 3.77a12.54 12.54 0 0 0 -13 -0.86 0.24 0.24 0 0 1 -0.29 -0.05L1.94 0.27a0.53 0.53 0 0 0 -0.55 -0.11 0.51 0.51 0 0 0 -0.31 0.46v6.7a0.51 0.51 0 0 0 0.5 0.5h6.7a0.5 0.5 0 0 0 0.46 -0.31 0.49 0.49 0 0 0 -0.11 -0.51L6.78 5.11a0.22 0.22 0 0 1 -0.06 -0.22 0.23 0.23 0 0 1 0.15 -0.18 9.94 9.94 0 0 1 9.46 1.1 9.74 9.74 0 0 1 0.1 15.8 1.25 1.25 0 0 0 -0.27 1.75 1.22 1.22 0 0 0 1 0.51 1.25 1.25 0 0 0 0.73 -0.24 12.25 12.25 0 0 0 -0.11 -19.86Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/upload", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Upload-Menu--Streamline-Ultimate\"> <g> <path d=\"M16.42 16.38a1 1 0 0 0 -0.21 -1.09l-3.5 -3.5a1 1 0 0 0 -1.42 0l-3.5 3.5a1 1 0 0 0 -0.21 1.09 1 1 0 0 0 0.92 0.62h1.75a0.25 0.25 0 0 1 0.25 0.25v5.25a1.5 1.5 0 0 0 3 0v-5.25a0.25 0.25 0 0 1 0.25 -0.25h1.75a1 1 0 0 0 0.92 -0.62Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.5 2h13a1 1 0 0 0 0 -2h-13a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.5 5.5h13a1 1 0 0 0 0 -2h-13a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.5 9h13a1 1 0 0 0 0 -2h-13a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/check.circle", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-Circle-1--Streamline-Ultimate\"> <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm6.93 8.2 -6.85 9.29a1 1 0 0 1 -1.43 0.19l-4.89 -3.91a1 1 0 0 1 -0.15 -1.41A1 1 0 0 1 7 12.21l4.08 3.26L17.32 7a1 1 0 0 1 1.39 -0.21 1 1 0 0 1 0.22 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
