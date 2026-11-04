
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

const BATCH = [{"setName": "icon/health/microscope", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Microscope-1--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M12.5228 0.599798c0.22 -0.350959 0.6828 -0.457121 1.0338 -0.237119l2.4011 1.505171c0.351 0.22 0.4571 0.68285 0.2371 1.03381l-0.7267 1.1593 0.0971 0.06087c0.468 0.29334 0.6095 0.91048 0.3162 1.37842L12.149 11.4544 6.48942 7.96045c-0.01646 -0.01016 -0.0331 -0.01979 -0.0499 -0.02889 0.00484 -0.00822 0.0098 -0.01639 0.0149 -0.02452l3.74248 -5.97018c0.2933 -0.46794 0.9105 -0.60949 1.3784 -0.31615l0.2208 0.13838zM6.90261 10.566l2.77945 1.7158 -0.79426 1.2671c-0.22 0.3509 -0.68286 0.4571 -1.03382 0.2371l-1.49661 -0.9382c-0.35096 -0.22 -0.45712 -0.6828 -0.23712 -1.0338zM21.5592 24c0.0259 0 0.0516 -0.0009 0.077 -0.0029 0.5163 -0.0393 0.923 -0.4707 0.923 -0.9971v-4.2656c0 -0.5523 -0.4477 -1 -1 -1h-3.944c-1.1046 0 -2 0.8954 -2 2v1.0468H5.12525c-1.10457 0 -2.00001 0.8955 -2.00001 2v0.2189c0 0.5522 0.44772 1 1 1H21.559zm-7.4056 -12.9191 2.5469 -4.06283c1.7814 1.47417 2.9164 3.70203 2.9164 6.19493 0 1.0683 -0.2086 2.0884 -0.5874 3.0214h-1.4143c-1.6797 0 -3.083 1.1832 -3.422 2.7616H2.72656c-0.55228 0 -1 -0.4478 -1 -1 0 -0.5523 0.44772 -1 1 -1h9.58024c0.7072 -0.092 1.3429 -0.5554 1.8362 -1.2301 0.5535 -0.757 0.8623 -1.6972 0.8623 -2.4196 0 -0.7156 -0.3061 -1.5556 -0.8133 -2.2162q-0.01905 -0.02475 -0.0384 -0.0492\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
;
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
