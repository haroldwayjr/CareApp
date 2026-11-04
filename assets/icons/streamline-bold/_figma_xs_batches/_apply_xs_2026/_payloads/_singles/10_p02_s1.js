
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

const BATCH = [{"setName": "icon/actions/select.all", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Select-All--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M21.9161 23.916c1.1046 0 2 -0.8954 2 -2v-1.6526c0 -0.5523 -0.4477 -1 -1 -1 -0.5522 0 -1 0.4477 -1 1v1.6526h-1.6526c-0.5523 0 -1 0.4477 -1 1s0.4477 1 1 1h1.6526Zm-4.9579 0c0.5522 0 1 -0.4477 1 -1s-0.4478 -1 -1 -1h-3.3054c-0.5522 0 -1 0.4477 -1 1s0.4478 1 1 1h3.3054Zm-6.6107 0c0.5523 0 1 -0.4477 1 -1s-0.4477 -1 -1 -1H7.04221c-0.55229 0 -1 0.4477 -1 1s0.44771 1 1 1h3.30529Zm-6.61061 0c0.55228 0 1 -0.4477 1 -1s-0.44772 -1 -1 -1H2.08423l0 -1.6526c0 -0.5523 -0.44772 -1 -1 -1 -0.552288 0 -1.0000015 0.4477 -1.0000015 1v1.6526c0 1.1046 0.8954295 2 2.0000015 2h1.65266Zm18.17921 -6.958c0 0.5523 0.4478 1 1 1 0.5523 0 1 -0.4477 1 -1v-3.3053c0 -0.5523 -0.4477 -1 -1 -1 -0.5522 0 -1 0.4477 -1 1v3.3053Zm-21.8318715 0c0 0.5523 0.4477135 1 1.0000015 1 0.55228 0 1 -0.4477 1 -1v-3.3053c0 -0.5523 -0.44772 -1 -1 -1 -0.552288 0 -1.0000015 0.4477 -1.0000015 1v3.3053ZM21.9161 10.3474c0 0.5523 0.4478 1 1 1 0.5523 0 1 -0.4477 1 -1V7.04208c0 -0.55228 -0.4477 -1 -1 -1 -0.5522 0 -1 0.44772 -1 1v3.30532Zm-21.8318715 0c0 0.5523 0.4477135 1 1.0000015 1 0.55228 0 1 -0.4477 1 -1V7.04208c0 -0.55228 -0.44772 -1 -1 -1 -0.552288 0 -1.0000015 0.44772 -1.0000015 1v3.30532ZM21.9161 3.73676c0 0.55229 0.4478 1 1 1 0.5523 0 1 -0.44771 1 -1V2.08411c0 -1.104572 -0.8954 -2.0000036 -2 -2.0000036h-1.6526c-0.5523 0 -1 0.4477156 -1 1.0000036 0 0.55228 0.4477 1 1 1h1.6526v1.65265Zm-21.8318715 0c0 0.55229 0.4477135 1 1.0000015 1 0.55228 0 1 -0.44771 1 -1V2.08411h1.65266c0.55228 0 1 -0.44772 1 -1 0 -0.552288 -0.44772 -1.0000036 -1 -1.0000036H2.08423C0.979658 0.0841064 0.0842285 0.979536 0.0842285 2.08411v1.65265ZM16.9582 2.08411c0.5522 0 1 -0.44772 1 -1 0 -0.552288 -0.4478 -1.0000036 -1 -1.0000036h-3.3054c-0.5522 0 -1 0.4477156 -1 1.0000036 0 0.55228 0.4478 1 1 1h3.3054Zm-6.6107 0c0.5523 0 1 -0.44772 1 -1 0 -0.552288 -0.4477 -1.0000036 -1 -1.0000036H7.0422c-0.55228 0 -1 0.4477156 -1 1.0000036 0 0.55228 0.44772 1 1 1h3.3053Zm9.0198 15.78229c0 0.8284 -0.6716 1.5 -1.5 1.5H6.13464c-0.82843 0 -1.5 -0.6716 -1.5 -1.5V6.13372c0 -0.82842 0.67157 -1.5 1.5 -1.5H17.8673c0.8284 0 1.5 0.67158 1.5 1.5V17.8664Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];

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
