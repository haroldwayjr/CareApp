
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

const BATCH = [{"setName": "icon/comms/inbox", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"> <path fill=\"#000000\" d=\"M12.5 6c0.5523 0 1 0.44772 1 1s-0.4477 1 -1 1H6.54492l-3.87207 6H6.5c0.77666 0 1.41539 0.5903 1.49219 1.3467l0.01562 0.3066C8.08461 16.4097 8.72334 17 9.5 17h5c0.7767 0 1.4154 -0.5903 1.4922 -1.3467l0.0156 -0.3066C16.0846 14.5903 16.7233 14 17.5 14h3.8262l-1.2637 -1.958c-0.2992 -0.464 -0.1651 -1.0825 0.2988 -1.3818 0.4641 -0.2994 1.0824 -0.1662 1.3819 0.2978l2.0966 3.25c0.1043 0.1616 0.1602 0.3497 0.1602 0.542V21c0 0.5523 -0.4477 1 -1 1H1c-0.552285 0 -1 -0.4477 -1 -1v-6.25c0 -0.1923 0.0559021 -0.3804 0.160156 -0.542L4.86426 6.91602C5.23256 6.34514 5.86555 6 6.54492 6zm7 -6C21.9853 0 24 2.01472 24 4.5S21.9853 9 19.5 9 15 6.98528 15 4.5 17.0147 0 19.5 0\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/comms/mail", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Email-Action-Home--Streamline-Ultimate\"> <g> <path d=\"M18.41 15.13a0.73 0.73 0 0 1 -0.41 0.12H6a0.72 0.72 0 0 1 -0.4 -0.12L0.39 11.78a0.27 0.27 0 0 0 -0.26 0A0.26 0.26 0 0 0 0 12v10a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V12a0.26 0.26 0 0 0 -0.13 -0.22 0.27 0.27 0 0 0 -0.26 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.12 13a0.25 0.25 0 0 0 0.25 0 0.24 0.24 0 0 0 0.14 -0.22V2.25a0.29 0.29 0 0 1 0.07 -0.18 0.29 0.29 0 0 1 0.17 -0.07h12.5a0.25 0.25 0 0 1 0.25 0.25v10.57a0.24 0.24 0 0 0 0.13 0.22 0.24 0.24 0 0 0 0.26 0L23 10.43a0.25 0.25 0 0 0 0.11 -0.21A0.28 0.28 0 0 0 23 10l-2.5 -1.7V2.21a2.11 2.11 0 0 0 -2 -2.21h-13a2.12 2.12 0 0 0 -2 2.21V8.3L1 10a0.28 0.28 0 0 0 -0.1 0.21 0.26 0.26 0 0 0 0.11 0.21Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 3.58 7.12 7.41a0.33 0.33 0 0 0 -0.1 0.37 0.35 0.35 0 0 0 0.32 0.22h0.91a0.25 0.25 0 0 1 0.25 0.25v3.25a0.5 0.5 0 0 0 0.5 0.5h1.5a0.5 0.5 0 0 0 0.5 -0.5v-1.25a1.25 1.25 0 0 1 2.5 0v1.25a0.5 0.5 0 0 0 0.5 0.5h1.5a0.5 0.5 0 0 0 0.5 -0.5V8.25a0.25 0.25 0 0 1 0.25 -0.25h0.91a0.35 0.35 0 0 0 0.32 -0.22 0.33 0.33 0 0 0 -0.1 -0.37l-4.91 -3.83a0.33 0.33 0 0 0 -0.47 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
