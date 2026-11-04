
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

const BATCH = [{"setName": "icon/files/file.pdf", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Pdf-Reader--Streamline-Ultimate\"> <path fill=\"#000000\" d=\"M15.0459 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75h-15.5c-1.51878 0 -2.75 -1.2312 -2.75 -2.75v-0.1279h10.1914c1.5188 0 2.75 -1.2312 2.75 -2.75v-3.3467c0 -1.5188 -1.2312 -2.75 -2.75 -2.75H2.2959V2.75c0 -1.51878 1.23122 -2.75 2.75 -2.75h10zm-2.5586 7.7754c0.6904 0 1.25 0.5596 1.25 1.25v3.3467c0 0.6903 -0.5596 1.25 -1.25 1.25H1.9541c-0.69035 0 -1.249998 -0.5597 -1.249998 -1.25v-3.3467c0 -0.6904 0.559648 -1.25 1.249998 -1.25zM6.23926 9.08203c-0.41422 0 -0.75 0.33579 -0.75 0.75 0 0.41417 0.33578 0.74997 0.75 0.74997h7.49804c0.4142 0 0.75 -0.3358 0.75 -0.74997 0 -0.41421 -0.3358 -0.75 -0.75 -0.75zm0 -3.26074c-0.41422 0 -0.75 0.33579 -0.75 0.75s0.33578 0.75 0.75 0.75h5.78904c0.4142 0 0.75 -0.33579 0.75 -0.75s-0.3358 -0.75 -0.75 -0.75zM16.6025 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875h-5.5303c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973 -0.1406 -0.14065 -0.2197 -0.33136 -0.2197 -0.53027V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/files/file.zip", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Zip-File--Streamline-Ultimate\"> <path d=\"M21.56 4.15 17.85 0.44A1.5 1.5 0 0 0 16.79 0H3.5A1.5 1.5 0 0 0 2 1.5v21A1.5 1.5 0 0 0 3.5 24h17a1.5 1.5 0 0 0 1.5 -1.5V5.21a1.5 1.5 0 0 0 -0.44 -1.06M9.5 22a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1m0 -3.5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1m0 -3.5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1m0 -3.5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1M11 6.6a2 2 0 0 1 -1.48 0.67A2 2 0 0 1 8 6.6a2 2 0 0 1 -0.47 -1.55L8 1.92a0.49 0.49 0 0 1 0.5 -0.42h2a0.51 0.51 0 0 1 0.5 0.42L11.48 5A2 2 0 0 1 11 6.6\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
