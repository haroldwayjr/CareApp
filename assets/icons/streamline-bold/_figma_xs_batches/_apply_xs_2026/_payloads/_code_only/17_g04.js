
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

const BATCH = [{"setName": "icon/media/film", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Movies-Film--Streamline-Ultimate\"> <g> <path d=\"M1 0a1 1 0 0 0 -1 1v22a1 1 0 0 0 2 0V1a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 0a1 1 0 0 0 -1 1v22a1 1 0 0 0 2 0V1a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8 0h8s2 0 2 2v6s0 2 -2 2H8s-2 0 -2 -2V2s0 -2 2 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8 14h8s2 0 2 2v6s0 2 -2 2H8s-2 0 -2 -2v-6s0 -2 2 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3 3a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19 3a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3 9a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19 9a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3 15a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19 15a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3 21a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19 21a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/media/flip", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flip-Vertical-Up--Streamline-Ultimate\"> <g> <path d=\"M0.75 9.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0.75 5.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0.75 1.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.75 1.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.75 1.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.75 1.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20.75 9.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20.75 5.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20.75 1.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0 12.5a0.76 0.76 0 0 0 0.75 0.75 0.25 0.25 0 0 1 0.25 0.25v8.75A1.76 1.76 0 0 0 2.75 24h18.5A1.76 1.76 0 0 0 23 22.25V13.5a0.25 0.25 0 0 1 0.25 -0.25 0.75 0.75 0 0 0 0 -1.5H13a0.25 0.25 0 0 0 -0.25 0.23l0 0.52a8 8 0 0 0 2 5.25 2 2 0 0 1 -0.2 2.83 2 2 0 0 1 -1.31 0.49 2 2 0 0 1 -1.51 -0.69 12 12 0 0 1 -3.01 -7.88l0 -0.49a0.26 0.26 0 0 0 -0.07 -0.18 0.25 0.25 0 0 0 -0.18 -0.08H0.75a0.75 0.75 0 0 0 -0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10 12.5a10.77 10.77 0 0 0 2.64 7.06 0.76 0.76 0 0 0 0.57 0.26 0.72 0.72 0 0 0 0.49 -0.19 0.74 0.74 0 0 0 0.08 -1.05 9.27 9.27 0 0 1 -2.28 -6.08 9 9 0 0 1 0.44 -2.79 0.24 0.24 0 0 1 0.15 -0.16 0.25 0.25 0 0 1 0.22 0l1.55 0.95a0.76 0.76 0 0 0 0.83 0 0.75 0.75 0 0 0 0.31 -0.8l-0.52 -2.13L14 5.7a0.79 0.79 0 0 0 -0.9 -0.55l-2.2 0.53 -1.79 0.43a0.78 0.78 0 0 0 -0.56 0.62 0.73 0.73 0 0 0 0.35 0.75l1.67 1a0.25 0.25 0 0 1 0.1 0.3A10.76 10.76 0 0 0 10 12.5\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/media/gallery", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Print-Picture--Streamline-Ultimate\"> <g> <path d=\"M5.75 6a1 1 0 0 0 1 -1V2h8.84l2.16 2.16V5a1 1 0 0 0 2 0V3.75a1 1 0 0 0 -0.29 -0.75L17 0.59A2 2 0 0 0 15.59 0H6.75a2 2 0 0 0 -2 2v3a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21.5 7h-19A2.5 2.5 0 0 0 0 9.5V14a2.5 2.5 0 0 0 2.5 2.5H5v6.25A1.25 1.25 0 0 0 6.25 24h12a1.25 1.25 0 0 0 1.25 -1.25V16.5h2A2.5 2.5 0 0 0 24 14V9.5A2.5 2.5 0 0 0 21.5 7m-18 4.5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1m14 10a0.5 0.5 0 0 1 -0.5 0.5H7.5a0.5 0.5 0 0 1 -0.5 -0.5v-9a0.5 0.5 0 0 1 0.5 -0.5H17a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14.69 15.89a0.5 0.5 0 0 0 -0.42 -0.3 0.48 0.48 0 0 0 -0.46 0.22l-1.66 2.47 -1.65 -1.35a0.5 0.5 0 0 0 -0.41 -0.1 0.52 0.52 0 0 0 -0.35 0.26L8.1 20.27a0.5 0.5 0 0 0 0 0.49 0.52 0.52 0 0 0 0.43 0.24H16a0.51 0.51 0 0 0 0.42 -0.22 0.49 0.49 0 0 0 0 -0.47Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/media/headphones", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Headphones--Streamline-Ultimate\"> <g> <path d=\"M7.44 14a5 5 0 0 0 0.23 10 0.31 0.31 0 0 0 0.33 -0.33v-9.15a0.51 0.51 0 0 0 -0.56 -0.52\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M16.56 14a0.51 0.51 0 0 0 -0.56 0.5v9.12a0.35 0.35 0 0 0 0.37 0.34 5 5 0 0 0 0.19 -10Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 0A12 12 0 0 0 0 12v6a1 1 0 0 0 2 0v-6a10 10 0 0 1 20 0v6a1 1 0 0 0 2 0v-6A12 12 0 0 0 12 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
