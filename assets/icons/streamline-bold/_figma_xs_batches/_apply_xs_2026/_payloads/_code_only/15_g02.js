
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

const BATCH = [{"setName": "icon/status/bell.off", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Alarm-Bell-Off-1--Streamline-Ultimate\"> <g> <path d=\"M21 19.5a1 1 0 0 0 0 -2 1.5 1.5 0 0 1 -1.5 -1.5v-4.86a8.65 8.65 0 0 0 -0.4 -2.62l-11 11Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14.24 21H9.76a0.25 0.25 0 0 0 -0.24 0.22 2.64 2.64 0 0 0 0 0.28 2.5 2.5 0 0 0 5 0 2.64 2.64 0 0 0 0 -0.28 0.25 0.25 0 0 0 -0.28 -0.22\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1 24a1 1 0 0 0 0.71 -0.28l22 -22a1 1 0 0 0 0 -1.42 1 1 0 0 0 -1.42 0l-5 5A7.31 7.31 0 0 0 13 3.07V1a1 1 0 0 0 -2 0v2.07a8 8 0 0 0 -6.5 8.07V16A1.5 1.5 0 0 1 3 17.5a1 1 0 0 0 0 2h0.09l-2.8 2.79a1 1 0 0 0 0 1.42A1 1 0 0 0 1 24\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/status/critical", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flash-1--Streamline-Ultimate\"> <path d=\"M20.44 9.27A0.48 0.48 0 0 0 20 9h-7.38L14.49 0.61A0.51 0.51 0 0 0 14.2 0a0.5 0.5 0 0 0 -0.61 0.17l-10 14a0.49 0.49 0 0 0 0 0.52A0.49 0.49 0 0 0 4 15h7.38l-1.87 8.39a0.51 0.51 0 0 0 0.29 0.61 0.52 0.52 0 0 0 0.61 -0.17l10 -14a0.49 0.49 0 0 0 0.03 -0.56\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/status/eye", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"View-1--Streamline-Ultimate\"> <g> <path d=\"M23.43 10.52c-2.64 -2.91 -7 -6 -11.43 -5.92S3.21 7.61 0.57 10.52a2.22 2.22 0 0 0 0 3C2.33 15.42 6.74 19.4 12 19.4s9.66 -4 11.43 -5.93a2.22 2.22 0 0 0 0 -2.95M7.4 12a4.6 4.6 0 1 1 4.6 4.6A4.6 4.6 0 0 1 7.4 12\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10 12a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/status/error", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Remove-Circle--Streamline-Ultimate\"> <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m5.49 16.07a1 1 0 0 1 -1.41 1.42l-3.9 -3.9a0.25 0.25 0 0 0 -0.36 0l-3.9 3.9a1 1 0 1 1 -1.41 -1.42l3.9 -3.89a0.25 0.25 0 0 0 0 -0.36l-3.9 -3.9a1 1 0 0 1 1.41 -1.41l3.9 3.9a0.25 0.25 0 0 0 0.36 0l3.9 -3.9a1 1 0 0 1 1.41 1.41l-3.9 3.9a0.25 0.25 0 0 0 0 0.36Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
