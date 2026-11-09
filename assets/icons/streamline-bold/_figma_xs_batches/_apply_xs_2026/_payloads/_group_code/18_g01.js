
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

const BATCH = [{"setName": "icon/media/pause", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Button-Pause--Streamline-Ultimate\"> <path d=\"M12 24A12 12 0 1 0 0 12a12 12 0 0 0 12 12m-4.74 -7.46v-8A1.5 1.5 0 0 1 8.76 7h0.48a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1 -1.5 1.5h-0.48a1.5 1.5 0 0 1 -1.5 -1.46m6 -8A1.5 1.5 0 0 1 14.71 7h0.53a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1 -1.5 1.5h-0.53a1.5 1.5 0 0 1 -1.5 -1.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/media/play", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Button-Play--Streamline-Ultimate\"> <path fill=\"#000000\" d=\"M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236 3.35977 3.34094 1.8217 5.21509 0.913451 7.4078 0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411s1.605908 4.466 3.284138 6.1442 3.81643 2.8211 6.1442 3.2841c2.32778 0.463 4.74058 0.2254 6.93328 -0.6828 2.1927 -0.9083 4.0669 -2.4464 5.3854 -4.4198C23.2962 16.6935 24 14.3734 24 12c0 -3.1826 -1.2643 -6.23485 -3.5147 -8.48528C18.2348 1.26428 15.1826 0 12 0m4.83 12.89 -7.37999 3.69c-0.15223 0.0767 -0.32155 0.1132 -0.49186 0.1061 -0.17032 -0.0071 -0.33598 -0.0577 -0.48126 -0.1469 -0.14528 -0.0891 -0.26536 -0.214 -0.34882 -0.3626s-0.12755 -0.3161 -0.12806 -0.4866V8.31c-0.0012 -0.17131 0.04163 -0.34006 0.12439 -0.49006 0.08276 -0.14999 0.20266 -0.27622 0.34822 -0.36656 0.14555 -0.09035 0.31188 -0.14179 0.48303 -0.14938 0.17114 -0.0076 0.34137 0.0289 0.49436 0.106L16.83 11.1c0.1664 0.0829 0.3064 0.2106 0.4043 0.3687 0.0978 0.1581 0.1496 0.3404 0.1496 0.5263s-0.0518 0.3682 -0.1496 0.5263c-0.0979 0.1581 -0.2379 0.2858 -0.4043 0.3687\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/media/playlist", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Playlist--Streamline-Ultimate\"> <g> <path d=\"M18 2H6a2 2 0 0 0 -2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2V4a2 2 0 0 0 -2 -2m-3.54 7 -3.41 1.1c-0.21 0 -0.3 0.15 -0.3 0.27v4.92A1.75 1.75 0 1 1 9 13.5h0.15a0.11 0.11 0 0 0 0.07 0 0.09 0.09 0 0 0 0 -0.07v-3.1a1.75 1.75 0 0 1 1.43 -1.72l3.41 -1.1a1.74 1.74 0 0 1 2.19 1.69v4.05a1.75 1.75 0 1 1 -1.75 -1.75 0.24 0.24 0 0 0 0.25 -0.25V9.2a0.25 0.25 0 0 0 -0.29 -0.2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1 6a1 1 0 0 0 -1 1v10.5a1 1 0 0 0 2 0V7a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 6a1 1 0 0 0 -1 1v10.5a1 1 0 0 0 2 0V7a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/media/record", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Phone-Record--Streamline-Ultimate\"> <g> <path d=\"M15 12.5a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22 0H2a2 2 0 0 0 -2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2m-5 16.5a4 4 0 0 1 -3.46 -6h-3.08A4 4 0 1 1 7 8.5h10a4 4 0 0 1 0 8\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5 12.5a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
