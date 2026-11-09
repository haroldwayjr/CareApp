
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

const BATCH = [{"setName": "icon/files/clipboard", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Insert-Row-From-Clipboard--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M14.4 4.18005c-0.1 0.3 -0.4 0.5 -0.7 0.5H7.30002c-0.3 0 -0.60002 -0.2 -0.70002 -0.5l-1 -3c-0.17812 -0.570675 0.24075 -0.999996 0.70002 -0.999996H14.7c0.5158 0 0.8615 0.515539 0.7 0.999996zm1.423 0.47435c-0.3148 0.94443 -1.2116 1.52565 -2.123 1.52565H7.30002c-0.91128 0 -1.80821 -0.58116 -2.12304 -1.52565L4.29218 2H2.25C1.03579 2 0 3.03579 0 4.25v17.5C0 22.9642 1.03579 24 2.25 24h10.6607c-0.1701 -0.3377 -0.2659 -0.7192 -0.2659 -1.1232V10.0027c0 -1.38073 1.1193 -2.50001 2.5 -2.50001H21V4.25C21 3.03579 19.9642 2 18.75 2h-2.0422zm-1.6782 5.3483c0 -0.5523 0.4477 -1.00001 1 -1.00001h7.6501c0.5523 0 1 0.44771 1 1.00001v12.8741c0 0.5523 -0.4477 1 -1 1h-7.6501c-0.5523 0 -1 -0.4477 -1 -1zm7.6501 1v2.2914h-5.6501v-2.2914zm0 4.2914h-5.6501v2.2913h5.6501zm-5.6501 6.5827v-2.2914h5.6501v2.2914z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/files/cloud", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Cloud--Streamline-Ultimate\"> <path d=\"M23.75 13.87A5.71 5.71 0 0 0 22 9.78a5.61 5.61 0 0 0 -3.37 -1.55 0.28 0.28 0 0 1 -0.19 -0.12 7.53 7.53 0 0 0 -13.8 2.24 0.24 0.24 0 0 1 -0.23 0.19A4.51 4.51 0 0 0 0.25 15a4.25 4.25 0 0 0 1.21 3.15A5.29 5.29 0 0 0 5 19.54h13.67a5.68 5.68 0 0 0 5.08 -5.67m-5.28 3.67H5a3.24 3.24 0 0 1 -2.1 -0.77A2.29 2.29 0 0 1 2.25 15a2.53 2.53 0 0 1 0.92 -1.95 2.56 2.56 0 0 1 1.58 -0.56 2.24 2.24 0 0 1 0.52 0.06 1 1 0 0 0 0.81 -0.19 1 1 0 0 0 0.39 -0.73 5.54 5.54 0 0 1 10.53 -2 1 1 0 0 0 0.94 0.57 3.67 3.67 0 0 1 3.81 3.67 3.7 3.7 0 0 1 -3.28 3.67\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];

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
