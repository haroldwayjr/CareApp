
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

const BATCH = [{"setName": "icon/navigation/navigation.pointer", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Navigation-Up-2--Streamline-Ultimate\"> <g> <path d=\"M5.93 4.68a1 1 0 0 0 -0.31 1.09 1 1 0 0 0 0.94 0.66h4a0.25 0.25 0 0 1 0.25 0.25v10.14a0.25 0.25 0 0 1 -0.25 0.25H7.05a1.24 1.24 0 1 0 0 2.47H17a1.24 1.24 0 1 0 0 -2.47h-3.51a0.25 0.25 0 0 1 -0.25 -0.25V6.68a0.25 0.25 0 0 1 0.25 -0.25h4a1 1 0 0 0 0.94 -0.66 1 1 0 0 0 -0.31 -1.09L12.63 0.22a1 1 0 0 0 -1.26 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17 21.52H7.05a1.24 1.24 0 0 0 0 2.48H17a1.24 1.24 0 1 0 0 -2.48Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/navigation/panel.bottom", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Layout-9--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M12 12.7461H1.5V21c0 0.8284 0.67157 1.5 1.5 1.5l18 0c0.8284 0 1.5 -0.6716 1.5 -1.5v-8.2539l-10.5 0ZM11.25 1.5l0 9.7461 -9.75 0V3c0 -0.82843 0.67157 -1.5 1.5 -1.5h8.25Zm1.5 0 0 9.7461 9.75 0L22.5 3c0 -0.82842 -0.6716 -1.5 -1.5 -1.5h-8.25Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];

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
