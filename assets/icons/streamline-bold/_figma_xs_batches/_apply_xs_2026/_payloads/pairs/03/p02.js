
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

const BATCH = [{"setName": "icon/health/waiting.room", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Waiting-Room-Lamp--Streamline-Ultimate\"> <g> <path d=\"M5 7.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0 -5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13.24 17h-2.89a0.5 0.5 0 0 1 -0.5 -0.46c0 -0.05 -0.37 -3.31 -0.37 -3.31a1.5 1.5 0 0 0 -3 0.54l0.35 3.09A3.52 3.52 0 0 0 10.35 20h2.89a1.5 1.5 0 0 1 1.49 1.38l0.27 2.17a0.52 0.52 0 0 0 0.5 0.45h2a0.5 0.5 0 0 0 0.37 -0.17 0.52 0.52 0 0 0 0.13 -0.38l-0.24 -2.32A4.52 4.52 0 0 0 13.24 17\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12.5 21.5H8.75a3.52 3.52 0 0 1 -3.43 -2.76l-0.68 -4a1.5 1.5 0 0 0 -1.48 -1.24H1.5a0.5 0.5 0 0 0 -0.5 0.5v9.5a0.5 0.5 0 0 0 0.5 0.5h11.19a0.48 0.48 0 0 0 0.37 -0.17 0.47 0.47 0 0 0 0.12 -0.39l-0.18 -1.5a0.51 0.51 0 0 0 -0.5 -0.44\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20 3.14V1a1 1 0 0 0 -2 0v2.14A4 4 0 0 0 15 7v0.5a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1V7a4 4 0 0 0 -3 -3.86\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/health/weight.scale", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Diet-Scale--Streamline-Ultimate\"> <path d=\"M23.44 5.08a1.49 1.49 0 0 0 -0.55 -1.32A17.2 17.2 0 0 0 12 0 17.2 17.2 0 0 0 1.11 3.76a1.47 1.47 0 0 0 -0.55 1.32l1.85 17.58A1.5 1.5 0 0 0 3.9 24h16.2a1.5 1.5 0 0 0 1.49 -1.34ZM20.5 8.5a0.5 0.5 0 0 1 -0.5 0.5h-6.28a0.5 0.5 0 0 1 -0.47 -0.34l-0.78 -2.32a0.51 0.51 0 0 0 -0.94 0l-0.78 2.32a0.49 0.49 0 0 1 -0.47 0.34H4a0.5 0.5 0 0 1 -0.5 -0.5V5.37A0.5 0.5 0 0 1 3.73 5 14.22 14.22 0 0 1 5.8 3.83a0.47 0.47 0 0 1 0.4 0 0.46 0.46 0 0 1 0.27 0.29l0.74 2.08a0.75 0.75 0 0 0 0.71 0.5 0.73 0.73 0 0 0 0.25 0 0.76 0.76 0 0 0 0.46 -1l-0.78 -2.19a0.37 0.37 0 0 1 0 -0.31 0.39 0.39 0 0 1 0.27 -0.2 14.75 14.75 0 0 1 2.59 -0.44 0.48 0.48 0 0 1 0.38 0.13 0.51 0.51 0 0 1 0.16 0.37V4a0.75 0.75 0 0 0 1.5 0v-0.94a0.51 0.51 0 0 1 0.16 -0.37 0.48 0.48 0 0 1 0.38 -0.13 14.75 14.75 0 0 1 2.59 0.44 0.39 0.39 0 0 1 0.25 0.2 0.37 0.37 0 0 1 0 0.31l-0.76 2.19a0.76 0.76 0 0 0 0.46 1 0.73 0.73 0 0 0 0.25 0 0.75 0.75 0 0 0 0.71 -0.5l0.74 -2.08a0.46 0.46 0 0 1 0.27 -0.29 0.47 0.47 0 0 1 0.4 0A14.22 14.22 0 0 1 20.27 5a0.5 0.5 0 0 1 0.23 0.42Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
