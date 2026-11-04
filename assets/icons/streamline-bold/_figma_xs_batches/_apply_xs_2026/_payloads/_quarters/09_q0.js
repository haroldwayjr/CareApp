
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

const BATCH = [{"setName": "icon/actions/edit", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"M16.19 3.51a.51.51 0 0 0-.71 0L4.07 14.92a.5.5 0 0 0 0 .71l4.28 4.28a.48.48 0 0 0 .7 0L20.47 8.5a.51.51 0 0 0 0-.71Z\" fill=\"#000000\"/><path d=\"M3 16.71a.51.51 0 0 0-.47-.13.48.48 0 0 0-.36.33L0 23.33a.49.49 0 0 0 .12.51.5.5 0 0 0 .54.16l6.42-2.14a.52.52 0 0 0 .33-.36.49.49 0 0 0-.14-.5Z\" fill=\"#000000\"/><path d=\"M23 1a3.6 3.6 0 0 0-5 0l-.71.71a.5.5 0 0 0 0 .71l4.28 4.28a.51.51 0 0 0 .7 0L23 6a3.53 3.53 0 0 0 0-5Z\" fill=\"#000000\"/></g></svg>"}, {"setName": "icon/actions/empty.trash", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Bin-1--Streamline-Ultimate\"> <g> <path d=\"M19.45 7.5H4.55a0.5 0.5 0 0 0 -0.5 0.54l1.28 14.14a2 2 0 0 0 2 1.82h9.34a2 2 0 0 0 2 -1.82L20 8a0.5 0.5 0 0 0 -0.5 -0.54Zm-9.2 13a0.75 0.75 0 0 1 -1.5 0v-9a0.75 0.75 0 0 1 1.5 0Zm5 0a0.75 0.75 0 0 1 -1.5 0v-9a0.75 0.75 0 0 1 1.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22 4h-4.75a0.25 0.25 0 0 1 -0.25 -0.25V2.5A2.5 2.5 0 0 0 14.5 0h-5A2.5 2.5 0 0 0 7 2.5v1.25a0.25 0.25 0 0 1 -0.25 0.25H2a1 1 0 0 0 0 2h20a1 1 0 0 0 0 -2ZM9 3.75V2.5a0.5 0.5 0 0 1 0.5 -0.5h5a0.5 0.5 0 0 1 0.5 0.5v1.25a0.25 0.25 0 0 1 -0.25 0.25h-5.5A0.25 0.25 0 0 1 9 3.75Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/flag.alt", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flag--Streamline-Ultimate\"> <g> <path d=\"m23.56 15.61 -6.77 -5.41a0.27 0.27 0 0 1 0 -0.4l6 -4.78c0.52 -0.42 0.49 -0.81 0.42 -1s-0.28 -0.52 -0.95 -0.52h-9.5V2A1.5 1.5 0 0 0 11.25 0.5h-6a0.5 0.5 0 0 0 -0.5 0.5v12a0.5 0.5 0 0 0 0.5 0.5h4.23a3.54 3.54 0 0 0 -1.56 1.62 1 1 0 0 0 0.1 0.94 1 1 0 0 0 0.83 0.44h14.4a0.5 0.5 0 0 0 0.31 -0.89Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1.75 0a1.5 1.5 0 0 0 -1.5 1.5v21a1.5 1.5 0 0 0 3 0v-21A1.5 1.5 0 0 0 1.75 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/forward.alt", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Button-Fast-Forward--Streamline-Ultimate\"> <path d=\"M12 24A12 12 0 1 0 0 12a12 12 0 0 0 12 12M7.54 9.79a0.78 0.78 0 0 1 0.36 -0.69 0.74 0.74 0 0 1 0.77 0l3 1.62a0.25 0.25 0 0 0 0.37 -0.22v-0.71a0.78 0.78 0 0 1 0.36 -0.69 0.74 0.74 0 0 1 0.77 0l5.09 2.73a0.76 0.76 0 0 1 0.43 0.66 0.74 0.74 0 0 1 -0.43 0.65l-5.09 2.74a0.74 0.74 0 0 1 -1.13 -0.68v-0.72a0.27 0.27 0 0 0 -0.12 -0.22 0.25 0.25 0 0 0 -0.25 0l-3 1.62a0.87 0.87 0 0 1 -0.41 0.11 0.65 0.65 0 0 1 -0.36 -0.1 0.78 0.78 0 0 1 -0.36 -0.69Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/import", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Import-File--Streamline-Ultimate\"> <path fill=\"#000000\" d=\"M14.25 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75H4.25c-1.51878 0 -2.75 -1.2312 -2.75 -2.75V2.75C1.5 1.23122 2.73122 0 4.25 0h10zm-2.252 3.7832c-0.552 0.00016 -0.9998 0.4479 -1 1v5.2715H9.04102c-0.30319 0.0001 -0.57728 0.1828 -0.69336 0.4629 -0.11599 0.2801 -0.05117 0.6029 0.16308 0.8174l2.95896 2.9599c0.1405 0.1405 0.3316 0.2196 0.5303 0.2197s0.3897 -0.0793 0.5303 -0.2197l2.9599 -2.9599c0.2145 -0.2145 0.2792 -0.5372 0.1631 -0.8174 -0.1161 -0.2801 -0.3901 -0.4629 -0.6933 -0.4629h-1.962v-5.2715c-0.0001 -0.5522 -0.4477 -1 -1 -1M15.8066 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875H16.5c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973C15.8291 6.38962 15.75 6.19891 15.75 6V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path> </svg>"}];

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
