
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

const BATCH = [{"setName": "icon/media/crop", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Crop-Rotate--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M17.45 1a0.75 0.75 0 0 0 -1.28 -0.53l-2 2a0.75 0.75 0 0 0 0 1.06l2 2A0.75 0.75 0 0 0 17.45 5V3.77c2.678 0.23 4.8 2.496 4.8 5.23a0.75 0.75 0 0 0 1.5 0c0 -3.563 -2.794 -6.502 -6.3 -6.735zm-8.7 2.75a1 1 0 0 0 -2 0v12.2a1 1 0 0 0 1 1h7.5v3.3a1 1 0 1 0 2 0V7.95a1 1 0 0 0 -1 -1h-7.5zm-7.5 4.2a1 1 0 0 1 1 -1h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 -1 -1m17.5 8a1 1 0 0 1 1 -1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1 -1 -1M6.963 23.693A0.75 0.75 0 0 1 6.5 23v-1.265C2.994 21.502 0.2 18.563 0.2 15a0.75 0.75 0 0 1 1.5 0c0 2.734 2.122 5 4.8 5.23V19a0.75 0.75 0 0 1 1.28 -0.53l2 2a0.75 0.75 0 0 1 0 1.06l-2 2a0.75 0.75 0 0 1 -0.817 0.163\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/media/equalizer", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Equalizer-1--Streamline-Ultimate\"> <path d=\"M24 2A1.5 1.5 0 0 0 22.5 0.5h-21A1.5 1.5 0 0 0 0 2v20a1.5 1.5 0 0 0 1.5 1.5h21A1.5 1.5 0 0 0 24 22Zm-6 16.5a1 1 0 0 1 0 -2h0.5a0.25 0.25 0 0 0 0.25 -0.25V9a0.75 0.75 0 0 1 1.5 0v7.25a0.25 0.25 0 0 0 0.25 0.25h0.5a1 1 0 0 1 0 2h-0.5a0.25 0.25 0 0 0 -0.25 0.25V21a0.75 0.75 0 0 1 -1.5 0v-2.25a0.25 0.25 0 0 0 -0.25 -0.25Zm-7.5 -4a1 1 0 0 1 0 -2h0.5a0.25 0.25 0 0 0 0.25 -0.25V9a0.75 0.75 0 0 1 1.5 0v3.25a0.25 0.25 0 0 0 0.25 0.25h0.5a1 1 0 0 1 0 2H13a0.25 0.25 0 0 0 -0.25 0.25V21a0.75 0.75 0 0 1 -1.5 0v-6.25a0.25 0.25 0 0 0 -0.25 -0.25ZM3.5 5a1 1 0 0 1 0 -2h17a1 1 0 0 1 0 2ZM3 18.5a1 1 0 0 1 0 -2h0.5a0.25 0.25 0 0 0 0.25 -0.25V9a0.75 0.75 0 0 1 1.5 0v7.25a0.25 0.25 0 0 0 0.25 0.25H6a1 1 0 0 1 0 2h-0.5a0.25 0.25 0 0 0 -0.25 0.25V21a0.75 0.75 0 0 1 -1.5 0v-2.25a0.25 0.25 0 0 0 -0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
