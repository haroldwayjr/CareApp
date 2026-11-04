
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

const BATCH = [{"setName": "icon/status/eye.off", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"View-Off--Streamline-Ultimate\"> <g> <path d=\"M23.19 10.51a20.64 20.64 0 0 0 -4.3 -3.59l4 -4a0.91 0.91 0 0 0 -0.05 -1.34 0.87 0.87 0 0 0 -1.31 0L2 21.07a1 1 0 1 0 1.35 1.35l4.15 -4.15a10.85 10.85 0 0 0 4.61 0.94c4.25 0 8.49 -3 11 -5.8a2.16 2.16 0 0 0 0.08 -2.9m-6.88 2.72a4.59 4.59 0 0 1 -3 3 4.3 4.3 0 0 1 -3.1 -0.19 0.24 0.24 0 0 1 -0.06 -0.4l5.55 -5.56a0.25 0.25 0 0 1 0.41 0.06 4.3 4.3 0 0 1 0.2 3.09\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7.61 13.36a0.24 0.24 0 0 0 0.07 -0.24A4 4 0 0 1 7.5 12 4.51 4.51 0 0 1 12 7.46a4 4 0 0 1 1.16 0.18 0.26 0.26 0 0 0 0.24 -0.06l1.95 -1.95a0.26 0.26 0 0 0 -0.11 -0.42 10.58 10.58 0 0 0 -3.24 -0.5c-4.3 0 -8.6 3 -11.19 5.8a2.16 2.16 0 0 0 0 2.9 21.36 21.36 0 0 0 3.43 3 0.26 0.26 0 0 0 0.33 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/status/flag", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flag-1--Streamline-Ultimate\"> <g> <path d=\"M16.55 7.2a0.27 0.27 0 0 1 0 -0.4l6 -4.78c0.52 -0.42 0.48 -0.81 0.42 -1S22.67 0.5 22 0.5H6a0.5 0.5 0 0 0 -0.5 0.5v12a0.5 0.5 0 0 0 0.5 0.5h16c0.66 0 0.88 -0.32 0.95 -0.52s0.1 -0.58 -0.42 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M2.51 0A1.5 1.5 0 0 0 1 1.5v21a1.5 1.5 0 0 0 3 0v-21A1.5 1.5 0 0 0 2.51 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/status/help", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Question-Circle--Streamline-Ultimate\"> <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m0 19a1.5 1.5 0 1 1 1.5 -1.5A1.5 1.5 0 0 1 12 19m1.6 -6.08a1 1 0 0 0 -0.6 0.92 1 1 0 0 1 -2 0 3 3 0 0 1 1.8 -2.75A2 2 0 1 0 10 9.25a1 1 0 0 1 -2 0 4 4 0 1 1 5.6 3.67\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/status/info", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Information-Circle--Streamline-Ultimate\"> <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m0.25 5a1.5 1.5 0 1 1 -1.5 1.5 1.5 1.5 0 0 1 1.5 -1.5m2.25 13.5h-4a1 1 0 0 1 0 -2h0.75a0.25 0.25 0 0 0 0.25 -0.25v-4.5a0.25 0.25 0 0 0 -0.25 -0.25h-0.75a1 1 0 0 1 0 -2h1a2 2 0 0 1 2 2v4.75a0.25 0.25 0 0 0 0.25 0.25h0.75a1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
