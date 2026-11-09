
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

const BATCH = [{"setName": "icon/misc/rocket", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Rocket-Attack--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M22.9755 0.241101c-2.6793 -0.3349143 -5.3632 0.585941 -7.2725 2.495249l-0.3266 0.32662c0.22 0.10511 0.4265 0.24802 0.6098 0.42878l4.5312 4.46875c0.1875 0.18487 0.3391 0.39925 0.4504 0.63233l0.2959 -0.29582c1.9093 -1.90931 2.8301 -4.59317 2.4952 -7.27249l-0.0147 -0.117543c-0.0425 -0.340459 -0.3107 -0.608626 -0.6512 -0.651183zM7.06802 9.25H3.5c-0.19891 0 -0.38968 0.07902 -0.53033 0.21967l-2.5 2.50003c-0.292893 0.2929 -0.292893 0.7677 0 1.0606l1.49954 1.4996c0.10725 -0.2245 0.25385 -0.4349 0.4398 -0.6209zm2.40211 12.7808c0.2245 -0.1073 0.43491 -0.2539 0.62087 -0.4398l4.659 -4.659V20.5c0 0.1989 -0.079 0.3897 -0.2197 0.5303l-2.5 2.5c-0.2929 0.2929 -0.7677 0.2929 -1.0606 0zM12.1446 4.35539c-0.3905 -0.39052 -1.0237 -0.39052 -1.4142 0 -0.3905 0.39053 -0.3905 1.02369 0 1.41422l0.9697 0.96967 -8.23043 8.23042c-0.29289 0.2929 -0.29289 0.7677 0 1.0606l4.5 4.5c0.29289 0.2929 0.76777 0.2929 1.06066 0l8.23037 -8.2304 0.9697 0.9697c0.3905 0.3905 1.0237 0.3905 1.4142 0s0.3905 -1.0237 0 -1.4142l-0.9697 -0.9697 0.7929 -0.7929c0.1413 -0.14126 0.2204 -0.33309 0.2197 -0.5329 -0.0007 -0.19982 -0.0811 -0.39109 -0.2234 -0.5314l-4.5312 -4.46875c-0.2935 -0.28942 -0.7655 -0.28778 -1.057 0.00367l-0.7616 0.76164z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/misc/satellite", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Satellite--Streamline-Ultimate\"> <g> <path d=\"M6.72 17.29A12 12 0 0 1 5.3 15.6L0.2 22.4a1 1 0 0 0 -0.09 1.05A1 1 0 0 0 1 24h11.5a1 1 0 0 0 0.89 -0.54 1 1 0 0 0 -0.07 -1l-1.39 -2a12.71 12.71 0 0 1 -5.21 -3.17\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M9.12 0.29A1 1 0 0 0 7.71 0.3a11.23 11.23 0 0 0 0.07 15.93 11.29 11.29 0 0 0 15.93 -0.08 1 1 0 0 0 0.29 -0.7 1 1 0 0 0 -0.3 -0.71l-6.56 -6.5 2.09 -2a3 3 0 0 0 4.27 -2.75 3 3 0 0 0 -3 -3 3 3 0 0 0 -2.68 4.3l-2.09 2Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
