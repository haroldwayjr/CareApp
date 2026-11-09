
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

const setName = "icon/comms/comment";
const svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Comment-Box--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M0 2.25C0 1.03579 1.03579 0 2.25 0h19.5C22.9642 0 24 1.03579 24 2.25v15c0 1.2142 -1.0358 2.25 -2.25 2.25H11.5l-5.8 4.35c-0.22726 0.1704 -0.53132 0.1979 -0.78541 0.0708C4.6605 23.7938 4.5 23.5341 4.5 23.25V19.5H2.25C1.03579 19.5 0 18.4642 0 17.25zm3.13135 8.7466c-0.41422 0 -0.75 0.3358 -0.75 0.75 0 0.4143 0.33578 0.75 0.75 0.75h8.47945c0.4143 0 0.75 -0.3357 0.75 -0.75 0 -0.4142 -0.3357 -0.75 -0.75 -0.75zm10.89515 0.75c0 -0.4142 0.3358 -0.75 0.75 -0.75h5.9922c0.4142 0 0.75 0.3358 0.75 0.75 0 0.4143 -0.3358 0.75 -0.75 0.75h-5.9922c-0.4142 0 -0.75 -0.3357 -0.75 -0.75M3.13135 14.5999c-0.41422 0 -0.75 0.3357 -0.75 0.75 0 0.4142 0.33578 0.75 0.75 0.75h5.99218c0.41421 0 0.75 -0.3358 0.75 -0.75 0 -0.4143 -0.33579 -0.75 -0.75 -0.75zm13.94785 0.75c0 -0.4143 0.3357 -0.75 0.75 -0.75h2.9395c0.4142 0 0.75 0.3357 0.75 0.75 0 0.4142 -0.3358 0.75 -0.75 0.75h-2.9395c-0.4143 0 -0.75 -0.3358 -0.75 -0.75m-5.0161 -0.75c-0.4142 0 -0.75 0.3357 -0.75 0.75 0 0.4142 0.3358 0.75 0.75 0.75h3.0526c0.4142 0 0.75 -0.3358 0.75 -0.75 0 -0.4143 -0.3358 -0.75 -0.75 -0.75z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>";
const set = figma.currentPage.findOne(n => n.type === 'COMPONENT_SET' && n.name === setName);
if (!set) return { ok:0, missing:1, failed:0, miss:[setName], fail:[] };
try {
  const r = applyBoldXs(set, svg);
  if (r.ok) return { ok:1, missing:0, failed:0, miss:[], fail:[], name:setName };
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,r}] };
} catch(e) {
  return { ok:0, missing:0, failed:1, miss:[], fail:[{name:setName,err:String(e)}] };
}
