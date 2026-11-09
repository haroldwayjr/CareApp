
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

const BATCH = [{"setName": "icon/media/gallery", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Print-Picture--Streamline-Ultimate\"> <g> <path d=\"M5.75 6a1 1 0 0 0 1 -1V2h8.84l2.16 2.16V5a1 1 0 0 0 2 0V3.75a1 1 0 0 0 -0.29 -0.75L17 0.59A2 2 0 0 0 15.59 0H6.75a2 2 0 0 0 -2 2v3a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21.5 7h-19A2.5 2.5 0 0 0 0 9.5V14a2.5 2.5 0 0 0 2.5 2.5H5v6.25A1.25 1.25 0 0 0 6.25 24h12a1.25 1.25 0 0 0 1.25 -1.25V16.5h2A2.5 2.5 0 0 0 24 14V9.5A2.5 2.5 0 0 0 21.5 7m-18 4.5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1m14 10a0.5 0.5 0 0 1 -0.5 0.5H7.5a0.5 0.5 0 0 1 -0.5 -0.5v-9a0.5 0.5 0 0 1 0.5 -0.5H17a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14.69 15.89a0.5 0.5 0 0 0 -0.42 -0.3 0.48 0.48 0 0 0 -0.46 0.22l-1.66 2.47 -1.65 -1.35a0.5 0.5 0 0 0 -0.41 -0.1 0.52 0.52 0 0 0 -0.35 0.26L8.1 20.27a0.5 0.5 0 0 0 0 0.49 0.52 0.52 0 0 0 0.43 0.24H16a0.51 0.51 0 0 0 0.42 -0.22 0.49 0.49 0 0 0 0 -0.47Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/media/headphones", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Headphones--Streamline-Ultimate\"> <g> <path d=\"M7.44 14a5 5 0 0 0 0.23 10 0.31 0.31 0 0 0 0.33 -0.33v-9.15a0.51 0.51 0 0 0 -0.56 -0.52\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M16.56 14a0.51 0.51 0 0 0 -0.56 0.5v9.12a0.35 0.35 0 0 0 0.37 0.34 5 5 0 0 0 0.19 -10Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 0A12 12 0 0 0 0 12v6a1 1 0 0 0 2 0v-6a10 10 0 0 1 20 0v6a1 1 0 0 0 2 0v-6A12 12 0 0 0 12 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
