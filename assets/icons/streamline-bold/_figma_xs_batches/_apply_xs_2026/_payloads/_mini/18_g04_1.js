
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

const BATCH = [{"setName": "icon/comms/comment", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Comment-Box--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M0 2.25C0 1.03579 1.03579 0 2.25 0h19.5C22.9642 0 24 1.03579 24 2.25v15c0 1.2142 -1.0358 2.25 -2.25 2.25H11.5l-5.8 4.35c-0.22726 0.1704 -0.53132 0.1979 -0.78541 0.0708C4.6605 23.7938 4.5 23.5341 4.5 23.25V19.5H2.25C1.03579 19.5 0 18.4642 0 17.25zm3.13135 8.7466c-0.41422 0 -0.75 0.3358 -0.75 0.75 0 0.4143 0.33578 0.75 0.75 0.75h8.47945c0.4143 0 0.75 -0.3357 0.75 -0.75 0 -0.4142 -0.3357 -0.75 -0.75 -0.75zm10.89515 0.75c0 -0.4142 0.3358 -0.75 0.75 -0.75h5.9922c0.4142 0 0.75 0.3358 0.75 0.75 0 0.4143 -0.3358 0.75 -0.75 0.75h-5.9922c-0.4142 0 -0.75 -0.3357 -0.75 -0.75M3.13135 14.5999c-0.41422 0 -0.75 0.3357 -0.75 0.75 0 0.4142 0.33578 0.75 0.75 0.75h5.99218c0.41421 0 0.75 -0.3358 0.75 -0.75 0 -0.4143 -0.33579 -0.75 -0.75 -0.75zm13.94785 0.75c0 -0.4143 0.3357 -0.75 0.75 -0.75h2.9395c0.4142 0 0.75 0.3357 0.75 0.75 0 0.4142 -0.3358 0.75 -0.75 0.75h-2.9395c-0.4143 0 -0.75 -0.3358 -0.75 -0.75m-5.0161 -0.75c-0.4142 0 -0.75 0.3357 -0.75 0.75 0 0.4142 0.3358 0.75 0.75 0.75h3.0526c0.4142 0 0.75 -0.3358 0.75 -0.75 0 -0.4143 -0.3358 -0.75 -0.75 -0.75z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/comms/contacts", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Book-Address--Streamline-Ultimate\"> <path d=\"M20.15 4a0.5 0.5 0 0 1 -0.4 -0.49V2a2 2 0 0 0 -2 -2H5.25a3 3 0 0 0 -3 3v18a3 3 0 0 0 3 3h14.5a2 2 0 0 0 2 -2V6a2 2 0 0 0 -1.6 -2M4.25 3a1 1 0 0 1 1 -1H17.5a0.25 0.25 0 0 1 0.25 0.25v1.5a0.25 0.25 0 0 1 -0.25 0.25H5.25a1 1 0 0 1 -1 -1m13.57 17a0.46 0.46 0 0 1 -0.38 0.18H6.56a0.46 0.46 0 0 1 -0.38 -0.18 0.46 0.46 0 0 1 -0.11 -0.4 5.81 5.81 0 0 1 0.48 -1.51c0.45 -0.89 1.57 -1.44 3.63 -2.2a1.08 1.08 0 0 0 0 -0.75 5.22 5.22 0 0 1 -1.11 -3.58 2.94 2.94 0 1 1 5.88 0 5.21 5.21 0 0 1 -1.13 3.6 1 1 0 0 0 0 0.74c2 0.75 3.16 1.3 3.61 2.19a5.81 5.81 0 0 1 0.48 1.51 0.46 0.46 0 0 1 -0.09 0.4\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
