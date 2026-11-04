
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

const BATCH = [{"setName": "icon/actions/erase", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Eraser--Streamline-Ultimate\"> <g> <path d=\"M11 21.66H1a1 1 0 0 0 0 2h10a1 1 0 0 0 0 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20.51 6.43 14.86 0.78a1.49 1.49 0 0 0 -2.12 0L5 8.54A1 1 0 0 0 5 10l6.36 6.37a1 1 0 0 0 1.41 0l7.76 -7.76a1.5 1.5 0 0 0 -0.02 -2.18Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1.8 19.11a1.75 1.75 0 0 0 1.2 0.55h4.66a1.84 1.84 0 0 0 1.22 -0.53l1 -1.13a0.5 0.5 0 0 0 0 -0.69L4.1 11.59a0.52 0.52 0 0 0 -0.71 0l-2.65 2.7a2.59 2.59 0 0 0 0 3.6Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M16.5 21.66h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 21.66h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/export", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Export-File--Streamline-Ultimate\"> <path fill=\"#000000\" d=\"M14.25 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75H4.25c-1.51878 0 -2.75 -1.2312 -2.75 -2.75V2.75C1.5 1.23122 2.73122 0 4.25 0h10zM12 9.7832c-0.1986 0.00024 -0.3898 0.07929 -0.5303 0.2197l-2.95896 2.96c-0.21413 0.2145 -0.279 0.5373 -0.16308 0.8174 0.11604 0.28 0.39026 0.4627 0.69336 0.4629H10.998v5.2714c0.0002 0.552 0.4481 0.9998 1 1 0.5523 0 0.9999 -0.4478 1 -1v-5.2714h1.962c0.3032 0 0.5771 -0.1829 0.6933 -0.4629 0.1161 -0.2803 0.0514 -0.6029 -0.1631 -0.8174l-2.9599 -2.96c-0.1406 -0.1403 -0.3316 -0.2197 -0.5303 -0.2197M15.8066 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875H16.5c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973C15.8291 6.38962 15.75 6.19891 15.75 6V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path> </svg>"}];
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
