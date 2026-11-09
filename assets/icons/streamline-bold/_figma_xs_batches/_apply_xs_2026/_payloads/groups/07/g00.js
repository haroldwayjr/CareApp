
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

const BATCH = [{"setName": "icon/misc/tablet", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Tablet--Streamline-Ultimate\"> <g> <path d=\"M19 0H5a2.5 2.5 0 0 0 -2.5 2.5v19A2.5 2.5 0 0 0 5 24h14a2.5 2.5 0 0 0 2.5 -2.5v-19A2.5 2.5 0 0 0 19 0M5 4.5a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1H6a1 1 0 0 1 -1 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7.5 6.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75V7s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.5 6.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75V7s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.5 6.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75V7s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7.5 10.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.5 10.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7.5 14.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.5 14.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.5 10.25h1s0.75 0 0.75 0.75v1s0 0.75 -0.75 0.75h-1s-0.75 0 -0.75 -0.75v-1s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/temperature", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Temperature-Up--Streamline-Ultimate\"> <g> <path d=\"M10.5 4.5a4.5 4.5 0 0 0 -9 0v9.44a0.23 0.23 0 0 1 -0.06 0.16A6 6 0 1 0 12 18a6 6 0 0 0 -1.44 -3.9 0.23 0.23 0 0 1 -0.06 -0.16ZM6 22a4 4 0 0 1 -2.8 -6.86 1 1 0 0 0 0.3 -0.71V4.5a2.5 2.5 0 0 1 5 0v9.93a1 1 0 0 0 0.3 0.71A4 4 0 0 1 6 22\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7.11 16.34a0.26 0.26 0 0 1 -0.11 -0.21V6.5a1 1 0 0 0 -2 0v9.63a0.26 0.26 0 0 1 -0.11 0.21 2 2 0 1 0 2.22 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13 9a1 1 0 0 0 0.66 -0.25l3.28 -2.87a0.26 0.26 0 0 1 0.3 0l2.21 1.47a1 1 0 0 0 1.26 -0.12l3 -3a1 1 0 1 0 -1.42 -1.42L20 5.07a0.26 0.26 0 0 1 -0.32 0l-2.13 -1.4a1 1 0 0 0 -1.21 0.08l-4 3.5a1 1 0 0 0 -0.09 1.41A1 1 0 0 0 13 9\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 11.5H13a1 1 0 0 0 0 2h10a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/terminal", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Terminal--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M2.25 1.25C1.036 1.25 0 2.286 0 3.5v17c0 1.214 1.036 2.25 2.25 2.25h19.5c1.214 0 2.25 -1.036 2.25 -2.25v-17c0 -0.62 -0.209 -1.187 -0.607 -1.605a2.106 2.106 0 0 0 -1.543 -0.645zm6.678 8.766a0.75 0.75 0 0 1 0.75 -0.75h4.5a0.75 0.75 0 0 1 0 1.5h-4.5a0.75 0.75 0 0 1 -0.75 -0.75m-4.07 -5.577a0.75 0.75 0 1 0 -0.96 1.153l2.308 1.924 -2.308 1.923a0.75 0.75 0 0 0 0.96 1.153l3 -2.5a0.75 0.75 0 0 0 0 -1.153z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/misc/ticket", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Ticket--Streamline-Ultimate\"> <g> <path d=\"M11.5 9.75h-3a0.75 0.75 0 0 0 0 1.5h3a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.5 12.75h-3a0.75 0.75 0 0 0 0 1.5h3a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.16 9.52a1 1 0 0 0 0.84 -1V5a1 1 0 0 0 -1 -1h-3.75a0.5 0.5 0 0 0 -0.5 0.5V6a0.75 0.75 0 0 1 -1.5 0V4.5a0.5 0.5 0 0 0 -0.5 -0.5H1a1 1 0 0 0 -1 1v3.54a1 1 0 0 0 0.86 1 2.5 2.5 0 0 1 0 4.94 1 1 0 0 0 -0.86 1V19a1 1 0 0 0 1 1h15.75a0.5 0.5 0 0 0 0.5 -0.5V18a0.75 0.75 0 0 1 1.5 0v1.5a0.5 0.5 0 0 0 0.5 0.5H23a1 1 0 0 0 1 -1v-3.53a1 1 0 0 0 -0.84 -1 2.5 2.5 0 0 1 0 -5ZM14.5 16a0.5 0.5 0 0 1 -0.5 0.5H6a0.5 0.5 0 0 1 -0.5 -0.5V8a0.5 0.5 0 0 1 0.5 -0.5h8a0.5 0.5 0 0 1 0.5 0.5Zm4.25 -2.5a0.75 0.75 0 0 1 -1.5 0v-3a0.75 0.75 0 0 1 1.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
