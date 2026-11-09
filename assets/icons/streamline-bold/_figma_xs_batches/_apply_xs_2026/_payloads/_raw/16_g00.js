
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

const BATCH = [{"setName": "icon/status/online", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Online-Video-Chat--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M4.294 0.12a2.462 2.462 0 0 0 -2.462 2.462v15.29L0.158 22.893a0.75 0.75 0 0 0 0.893 0.965l6.76 -1.69h13.607a2.462 2.462 0 0 0 2.463 -2.462V2.582A2.462 2.462 0 0 0 21.418 0.119H4.294Zm2.281 6.136h9.08c0.595 0 1.078 0.482 1.078 1.077v7.541c0 0.595 -0.483 1.077 -1.077 1.077h-9.08a1.077 1.077 0 0 1 -1.078 -1.077V7.333c0 -0.595 0.482 -1.077 1.077 -1.077m13.407 8.126 -3.25 -1.218v-4.12l3.25 -1.219a0.488 0.488 0 0 1 0.66 0.456v5.644a0.488 0.488 0 0 1 -0.66 0.457M11.748 8.05h-1.264a0.5 0.5 0 0 0 -0.5 0.5v1.42H8.56a0.5 0.5 0 0 0 -0.5 0.5v1.264a0.5 0.5 0 0 0 0.5 0.5h1.423v1.423a0.5 0.5 0 0 0 0.5 0.5l1.264 0a0.5 0.5 0 0 0 0.5 -0.5v-1.423h1.422a0.5 0.5 0 0 0 0.5 -0.5V10.47a0.5 0.5 0 0 0 -0.5 -0.5h-1.422V8.55a0.5 0.5 0 0 0 -0.5 -0.5Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/status/pending", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Hourglass--Streamline-Ultimate\"> <path d=\"M20.5 22H19v-3.5a7 7 0 0 0 -4.4 -6.5A7 7 0 0 0 19 5.5V2h1.5a1 1 0 0 0 0 -2h-17a1 1 0 0 0 0 2H5v3.5A7 7 0 0 0 9.4 12 7 7 0 0 0 5 18.5V22H3.5a1 1 0 0 0 0 2h17a1 1 0 0 0 0 -2M8.19 6.92a1 1 0 0 1 0.89 -0.54h5.84A1 1 0 0 1 15.73 8a4.58 4.58 0 0 1 -7.46 0 1 1 0 0 1 -0.08 -1.08m-0.27 11.71 3 -2.94a1.55 1.55 0 0 1 2.07 0l3 2.94a1.36 1.36 0 0 1 0.27 1.6A1.46 1.46 0 0 1 15 21H9a1.44 1.44 0 0 1 -1.3 -0.76 1.35 1.35 0 0 1 0.22 -1.61\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/status/shield", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Lock-Shield--Streamline-Ultimate\"> <g> <path d=\"M13.75 7.24a1.75 1.75 0 0 0 -3.5 0v1.5a0.25 0.25 0 0 0 0.25 0.26h3a0.25 0.25 0 0 0 0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M24 2a2 2 0 0 0 -2 -2H2a2 2 0 0 0 -2 2v7.31A15.13 15.13 0 0 0 11.86 24a0.68 0.68 0 0 0 0.2 0 0.71 0.71 0 0 0 0.2 0A15.14 15.14 0 0 0 24 9.2ZM7.5 15.49V10a1 1 0 0 1 1 -1h0.25V7.24a3.25 3.25 0 0 1 6.5 0V9h0.25a1 1 0 0 1 1 1v5.5a1 1 0 0 1 -1 1h-7a1 1 0 0 1 -1 -1.01\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.75 13.24a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/status/shield.check", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-Shield--Streamline-Ultimate\"> <path d=\"M20.42 0H3.58a1.5 1.5 0 0 0 -1.49 1.5v6.26a18.26 18.26 0 0 0 9.68 16.18 0.47 0.47 0 0 0 0.46 0 18.26 18.26 0 0 0 9.68 -16.18V1.5A1.5 1.5 0 0 0 20.42 0M17.9 7.94l-7.11 6.7a1 1 0 0 1 -0.68 0.27 1 1 0 0 1 -0.71 -0.29L7 12.22a1 1 0 0 1 0 -1.41 1 1 0 0 1 1.42 0l1.68 1.7 6.4 -6a1 1 0 0 1 1.4 1.43\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
