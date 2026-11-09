
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

const BATCH = [{"setName": "icon/actions/share.alt", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Share-3--Streamline-Ultimate\"> <g> <path d=\"M12.76 10.25a2.64 2.64 0 0 0 -2.51 1.83 2 2 0 0 1 -3.59 0.5 7.25 7.25 0 0 1 -1.16 -4 6.81 6.81 0 0 1 0.18 -1.57 0.31 0.31 0 0 0 0 -0.21 0.25 0.25 0 0 0 -0.2 -0.09H2a2 2 0 0 0 -2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2 -2V10.5a0.25 0.25 0 0 0 -0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19.37 0.41a0.51 0.51 0 0 0 -0.55 -0.13 0.51 0.51 0 0 0 -0.32 0.47V2.5a0.25 0.25 0 0 1 -0.25 0.25h-5.37A5.88 5.88 0 0 0 7 8.62a5.74 5.74 0 0 0 0.92 3.14 0.51 0.51 0 0 0 0.9 -0.12 4.15 4.15 0 0 1 3.94 -2.89h5.49a0.25 0.25 0 0 1 0.25 0.25v1.75a0.51 0.51 0 0 0 0.32 0.47 0.5 0.5 0 0 0 0.55 -0.14l4.5 -5a0.5 0.5 0 0 0 0 -0.67Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/snooze", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Snooze-Return-Repeat--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M12.048 2.938c-2.902 0 -5.783 1.743 -7.602 4.102l1.347 0.815a1 1 0 0 1 -0.288 1.829l-3.275 0.77a0.995 0.995 0 0 1 -0.98 -0.292 1.006 1.006 0 0 1 -0.234 -0.435L0.149 6.451a1 1 0 0 1 1.484 -1.112l1.095 0.662C4.877 3.111 8.367 0.938 12.048 0.938c4.796 0 8.826 3.088 10.415 7.22a1 1 0 0 1 -1.866 0.718c-1.313 -3.414 -4.637 -5.938 -8.549 -5.938Zm10.313 10.64a0.993 0.993 0 0 0 -0.616 -0.026l-3.277 0.868a1 1 0 0 0 -0.261 1.822l1.357 0.82c-1.782 2.328 -4.65 4 -7.612 4 -3.912 0 -7.236 -2.524 -8.549 -5.938a1 1 0 1 0 -1.866 0.718c1.589 4.132 5.619 7.22 10.415 7.22 3.712 0 7.205 -2.079 9.33 -4.96l1.085 0.656a1 1 0 0 0 1.486 -1.105l-0.866 -3.37a0.997 0.997 0 0 0 -0.626 -0.705ZM11.489 8.715a1 1 0 0 0 -2 0v5.8a1 1 0 0 0 1 1h4a1 1 0 0 0 0 -2h-3v-4.8Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/sort", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"> <path fill=\"#000000\" d=\"M4.27614 1.16797c0.29451 -0.240247 0.72929 -0.222639 1.00391 0.05176l3 3c0.2144 0.21448 0.27911 0.53718 0.16308 0.81738 -0.11609 0.28019 -0.39007 0.46286 -0.69336 0.46289h-2V22c-0.00006 0.5522 -0.44779 1 -1 1 -0.55209 -0.0002 -0.99993 -0.4479 -1 -1V5.5h-2c-0.30317 -0.00013 -0.57728 -0.1828 -0.69335 -0.46289 -0.115906 -0.28014 -0.05125 -0.60296 0.16308 -0.81738l3 -3zM16.7498 15c0.9665 0 1.75 0.7835 1.75 1.75v4.5c0 0.9665 -0.7835 1.75 -1.75 1.75h-4.5c-0.9664 -0.0001 -1.75 -0.7836 -1.75 -1.75v-4.5c0 -0.9664 0.7836 -1.7499 1.75 -1.75zm4.5 -14c0.9665 0 1.75 0.78351 1.75 1.75v9c0 0.9665 -0.7835 1.75 -1.75 1.75h-9c-0.9664 -0.0001 -1.75 -0.7836 -1.75 -1.75v-9c0 -0.96641 0.7836 -1.74988 1.75 -1.75z\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/sort.asc", "svg": "<svg fill=\"none\" viewBox=\"0 0 24 24\" id=\"Ascending-Sort-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\"> <path style=\"-inkscape-stroke:none\" d=\"M1.25 17.949219a1 1 0 0 0 -1 1 1 1 0 0 0 1 1h7a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path4\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path> <path style=\"-inkscape-stroke:none\" d=\"M1.25 10.949219a1 1 0 0 0 -1 1 1 1 0 0 0 1 1h14.199219a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path6\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path> <path style=\"-inkscape-stroke:none\" d=\"M1.25 4.0488281a1 1 0 0 0 -1 1 1 1 0 0 0 1 1h21.5a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path8\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path> </svg>"}];
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
