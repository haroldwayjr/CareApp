
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

const BATCH = [{"setName": "icon/actions/sort", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"> <path fill=\"#000000\" d=\"M4.27614 1.16797c0.29451 -0.240247 0.72929 -0.222639 1.00391 0.05176l3 3c0.2144 0.21448 0.27911 0.53718 0.16308 0.81738 -0.11609 0.28019 -0.39007 0.46286 -0.69336 0.46289h-2V22c-0.00006 0.5522 -0.44779 1 -1 1 -0.55209 -0.0002 -0.99993 -0.4479 -1 -1V5.5h-2c-0.30317 -0.00013 -0.57728 -0.1828 -0.69335 -0.46289 -0.115906 -0.28014 -0.05125 -0.60296 0.16308 -0.81738l3 -3zM16.7498 15c0.9665 0 1.75 0.7835 1.75 1.75v4.5c0 0.9665 -0.7835 1.75 -1.75 1.75h-4.5c-0.9664 -0.0001 -1.75 -0.7836 -1.75 -1.75v-4.5c0 -0.9664 0.7836 -1.7499 1.75 -1.75zm4.5 -14c0.9665 0 1.75 0.78351 1.75 1.75v9c0 0.9665 -0.7835 1.75 -1.75 1.75h-9c-0.9664 -0.0001 -1.75 -0.7836 -1.75 -1.75v-9c0 -0.96641 0.7836 -1.74988 1.75 -1.75z\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/sort.asc", "svg": "<svg fill=\"none\" viewBox=\"0 0 24 24\" id=\"Ascending-Sort-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\"> <path style=\"-inkscape-stroke:none\" d=\"M1.25 17.949219a1 1 0 0 0 -1 1 1 1 0 0 0 1 1h7a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path4\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path> <path style=\"-inkscape-stroke:none\" d=\"M1.25 10.949219a1 1 0 0 0 -1 1 1 1 0 0 0 1 1h14.199219a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path6\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path> <path style=\"-inkscape-stroke:none\" d=\"M1.25 4.0488281a1 1 0 0 0 -1 1 1 1 0 0 0 1 1h21.5a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path8\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path> </svg>"}];

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
