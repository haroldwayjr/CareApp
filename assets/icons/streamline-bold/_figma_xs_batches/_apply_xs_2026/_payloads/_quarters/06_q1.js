
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

const BATCH = [{"setName": "icon/misc/projector", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Video-Projector--Streamline-Ultimate\"> <g> <path d=\"m9.34 9.94 7.2 -4a0.5 0.5 0 0 0 0 -0.88l-7.2 -4a0.5 0.5 0 0 0 -0.49 0 0.48 0.48 0 0 0 -0.25 0.43v8a0.48 0.48 0 0 0 0.25 0.43 0.55 0.55 0 0 0 0.49 0.02\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.5 10.5a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M4 6a1 1 0 0 0 -1 -1H2a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M2 2a1 1 0 0 0 0 -2H1a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20.5 9.5h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7 15a1 1 0 0 0 -1 -1H5a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19 14h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22 5h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 0h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.5 17h-2.26a0.25 0.25 0 0 0 -0.25 0.23 3 3 0 0 1 -6 0 0.25 0.25 0 0 0 -0.23 -0.23H8.5A2.5 2.5 0 0 0 6 19.5v1a1.52 1.52 0 0 0 0.5 1.11V23a1 1 0 0 0 2 0v-0.75a0.25 0.25 0 0 1 0.25 -0.25h8.5a0.25 0.25 0 0 1 0.25 0.25V23a1 1 0 0 0 2 0v-1.39a1.52 1.52 0 0 0 0.5 -1.11v-1a2.5 2.5 0 0 0 -2.5 -2.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 19a2 2 0 1 0 -2 -2 2 2 0 0 0 2 2m-0.75 -2a0.75 0.75 0 1 1 0.75 0.75 0.76 0.76 0 0 1 -0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/qr.scan", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Iris-Scan--Streamline-Ultimate\"> <g> <path d=\"M8 12a4 4 0 1 0 4 -4 4 4 0 0 0 -4 4m5 0a1 1 0 1 1 -1 -1 1 1 0 0 1 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20.89 13.36a0.23 0.23 0 0 0 -0.08 0.18 0.26 0.26 0 0 0 0.07 0.18l1.06 1.06a0.26 0.26 0 0 0 0.35 0c0.36 -0.34 0.71 -0.69 1 -1a2.6 2.6 0 0 0 0 -3.5c-0.31 -0.34 -0.66 -0.69 -1 -1a0.26 0.26 0 0 0 -0.35 0l-1.06 1.07a0.25 0.25 0 0 0 -0.08 0.18 0.3 0.3 0 0 0 0.08 0.18c0.35 0.32 0.67 0.64 1 1a0.58 0.58 0 0 1 0 0.78c-0.33 0.22 -0.65 0.51 -0.99 0.87\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.46 9.79a1 1 0 0 0 1.41 0 1 1 0 0 0 0 -1.41 0.32 0.32 0 0 1 -0.09 -0.26 0.35 0.35 0 0 1 0.16 -0.23 9.87 9.87 0 0 1 10.12 0 0.31 0.31 0 0 1 0.15 0.23 0.29 0.29 0 0 1 -0.08 0.26 1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0L23.29 5a1 1 0 1 0 -1.41 -1.41l-2.72 2.76a0.51 0.51 0 0 1 -0.61 0.08 12.06 12.06 0 0 0 -13.1 0 0.51 0.51 0 0 1 -0.61 -0.08L2.12 3.63A1 1 0 0 0 0.71 5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1.71 14.78a0.26 0.26 0 0 0 0.35 0l1.06 -1.06a0.26 0.26 0 0 0 0.07 -0.18 0.23 0.23 0 0 0 -0.08 -0.18c-0.34 -0.32 -0.66 -0.65 -1 -1a0.6 0.6 0 0 1 0 -0.79c0.29 -0.31 0.62 -0.63 1 -0.95a0.31 0.31 0 0 0 0.09 -0.18 0.23 0.23 0 0 0 -0.08 -0.18L2.06 9.22a0.26 0.26 0 0 0 -0.35 0c-0.36 0.34 -0.71 0.69 -1 1a2.61 2.61 0 0 0 0 3.5c0.29 0.37 0.63 0.72 1 1.06\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M18.54 14.21a1 1 0 0 0 -1.41 0 1 1 0 0 0 0 1.41 0.33 0.33 0 0 1 0.09 0.28 0.32 0.32 0 0 1 -0.17 0.25 10 10 0 0 1 -10.1 0 0.31 0.31 0 0 1 -0.17 -0.24 0.33 0.33 0 0 1 0.09 -0.28 1 1 0 0 0 0 -1.41 1 1 0 0 0 -1.41 0L0.71 19a1 1 0 0 0 1.41 1.41l2.72 -2.72a0.51 0.51 0 0 1 0.61 -0.08 12 12 0 0 0 13.1 0 0.51 0.51 0 0 1 0.61 0.08l2.72 2.72A1 1 0 0 0 23.29 19Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/rain", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Rain-Umbrella--Streamline-Ultimate\"> <g> <path d=\"M11.32 16.9a0.25 0.25 0 0 0 -0.22 0 0.26 0.26 0 0 0 -0.1 0.2v4.11a2.75 2.75 0 0 0 5.5 0 1 1 0 0 0 -2 0 0.75 0.75 0 0 1 -1.5 0v-4.07a0.26 0.26 0 0 0 -0.1 -0.2 0.25 0.25 0 0 0 -0.22 0 2.36 2.36 0 0 1 -1.36 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 0a1 1 0 0 0 -1 1v0.32a0.25 0.25 0 0 1 -0.22 0.25A12.16 12.16 0 0 0 0 14v0.5a1 1 0 0 0 2 0c0 -0.53 0.7 -1 1.5 -1s1.5 0.5 1.5 1a1 1 0 0 0 2 0c0 -0.41 0.78 -1 2 -1s2 0.59 2 1a1 1 0 0 0 2 0c0 -0.41 0.78 -1 2 -1s2 0.59 2 1a1 1 0 0 0 2 0c0 -0.53 0.7 -1 1.5 -1s1.5 0.47 1.5 1a1 1 0 0 0 2 0V14A12.16 12.16 0 0 0 13.22 1.57a0.25 0.25 0 0 1 -0.22 -0.25V1a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/recycle", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Plastic-Bag-Recycle--Streamline-Ultimate\"> <g> <path d=\"m9.72 19.17 0.28 -0.49a2.25 2.25 0 0 1 0.9 -3.83l2.46 -0.69a2.19 2.19 0 0 1 0.23 -1.67l1.06 -1.85a3.19 3.19 0 0 1 1.14 -1.14 2.94 2.94 0 0 1 2.54 -0.22c0.08 -4 0.37 -7.46 0.87 -7.46 0.71 0 1 4.06 1 9.08a2.53 2.53 0 0 1 0.67 -0.1H21C21 0.06 20 0.05 19.39 0.05h-3.11a1.47 1.47 0 0 0 -1.44 1.12 21.05 21.05 0 0 0 -0.36 2.08H5.89c0.07 -0.58 0.13 -1.11 0.19 -1.5A1.48 1.48 0 0 0 4.62 0.05h-2a1.48 1.48 0 0 0 -1.49 1.16C0.12 5.92 0 12 0.63 20.82a1.5 1.5 0 0 0 1 1.3 30.39 30.39 0 0 0 8.52 1h0.33a3.09 3.09 0 0 1 -0.76 -3.95M5.78 4.75h8.49c-0.07 0.6 -0.14 1.18 -0.19 1.65a0.73 0.73 0 0 1 -0.73 0.64h-7a0.72 0.72 0 0 1 -0.55 -0.24 0.7 0.7 0 0 1 -0.18 -0.55c0 -0.42 0.08 -1 0.14 -1.51Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.2 14.26a0.74 0.74 0 0 0 1 -0.28l1.1 -1.87a0.11 0.11 0 0 1 0.14 0l0.89 1.55 -0.93 0.56a0.73 0.73 0 0 0 -0.36 0.75 0.75 0.75 0 0 0 0.55 0.62l2.48 0.63 0.14 0h0.07a0.61 0.61 0 0 0 0.3 -0.08 0.79 0.79 0 0 0 0.17 -0.14 0.58 0.58 0 0 0 0.13 -0.26l0.64 -2.48a0.75 0.75 0 0 0 -1.11 -0.83l-0.89 0.53 -0.88 -1.53a1.6 1.6 0 0 0 -2.18 -0.6 1.7 1.7 0 0 0 -0.6 0.59l-1.06 1.84a0.76 0.76 0 0 0 0.4 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.64 18.13a0.75 0.75 0 1 0 -1.3 0.75l1 1.84a0.11 0.11 0 0 1 -0.1 0.1h-1.89v-1.17a0.77 0.77 0 0 0 -0.48 -0.69 0.74 0.74 0 0 0 -0.81 0.18L17.26 21a0.78 0.78 0 0 0 -0.21 0.54 0.72 0.72 0 0 0 0.23 0.53l1.83 1.78a0.74 0.74 0 0 0 0.52 0.22 0.59 0.59 0 0 0 0.29 -0.07 0.74 0.74 0 0 0 0.46 -0.69v-0.95h1.91a1.61 1.61 0 0 0 1.39 -2.4Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"m11.18 17.67 0.88 0.5 -1 1.75a1.6 1.6 0 0 0 1.39 2.4h2.25a0.75 0.75 0 0 0 0 -1.5h-2.31a0.1 0.1 0 0 1 0 -0.14l1 -1.77 1 0.54a0.71 0.71 0 0 0 0.37 0.1 0.78 0.78 0 0 0 0.46 -0.16 0.76 0.76 0 0 0 0.26 -0.8l-0.69 -2.44a0.73 0.73 0 0 0 -1.06 -0.5l-2.33 0.66a0.74 0.74 0 0 0 -0.16 1.37Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/robot", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Robot--Streamline-Ultimate\"> <g> <path d=\"M5.5 11h13a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2h-13a2 2 0 0 0 -2 2v7a2 2 0 0 0 2 2M16 4a1.5 1.5 0 1 1 -1.5 1.5A1.5 1.5 0 0 1 16 4M8 4a1.5 1.5 0 1 1 -1.5 1.5A1.5 1.5 0 0 1 8 4\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.5 12.5a1 1 0 0 0 0 2h3a1 1 0 0 0 0 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.3 9.87a1 1 0 0 0 -1.6 1.2 1.46 1.46 0 0 1 0.3 0.9 1.5 1.5 0 0 1 -2.7 0.9 1 1 0 0 0 -1.6 1.2 3.46 3.46 0 0 0 2.56 1.39 0.27 0.27 0 0 1 0.19 0.1 0.25 0.25 0 0 1 0 0.21 3 3 0 0 1 -1.08 1.7l-0.39 0.3a0.31 0.31 0 0 1 -0.44 -0.05A4.61 4.61 0 0 0 15 16H9a4.61 4.61 0 0 0 -3.6 1.72 0.31 0.31 0 0 1 -0.44 0.05l-0.39 -0.3a3 3 0 0 1 -1.08 -1.7 0.25 0.25 0 0 1 0 -0.21 0.27 0.27 0 0 1 0.19 -0.1 3.46 3.46 0 0 0 2.62 -1.39 1 1 0 0 0 -1.6 -1.2A1.5 1.5 0 0 1 2 12a1.46 1.46 0 0 1 0.3 -0.9A1 1 0 0 0 0.7 9.87 3.45 3.45 0 0 0 0 12a3.48 3.48 0 0 0 1.12 2.56 1 1 0 0 1 0.31 0.7 5.06 5.06 0 0 0 1.93 3.82l0.65 0.5a1 1 0 0 1 0.38 0.84 5 5 0 0 0 0.1 1.22c0 0.08 0 -0.06 0.47 1.38a1.51 1.51 0 0 0 1.42 1h11.24A1.51 1.51 0 0 0 19 23c0.49 -1.44 0.45 -1.3 0.47 -1.38a5 5 0 0 0 0.1 -1.22 1 1 0 0 1 0.38 -0.84l0.65 -0.5a5.06 5.06 0 0 0 1.93 -3.82 1 1 0 0 1 0.31 -0.7A3.48 3.48 0 0 0 24 12a3.45 3.45 0 0 0 -0.7 -2.13\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];

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
