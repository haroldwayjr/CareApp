
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

const BATCH = [{"setName": "icon/navigation/breadcrumb", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Hierarchy--Streamline-Ultimate\"> <path d=\"M22.13 18.23A0.25 0.25 0 0 1 22 18a7 7 0 0 0 -7 -6.52h-1.75a0.25 0.25 0 0 1 -0.25 -0.25V6a0.24 0.24 0 0 1 0.15 -0.23 3 3 0 1 0 -2.3 0A0.24 0.24 0 0 1 11 6v5.26a0.25 0.25 0 0 1 -0.25 0.25H8.5A6.56 6.56 0 0 0 2 18a0.23 0.23 0 0 1 -0.15 0.21 3 3 0 1 0 2.32 0A0.26 0.26 0 0 1 4 18a4.52 4.52 0 0 1 4.5 -4.5h2.25a0.25 0.25 0 0 1 0.25 0.25V18a0.25 0.25 0 0 1 -0.15 0.23 3 3 0 1 0 2.3 0A0.25 0.25 0 0 1 13 18v-4.25a0.25 0.25 0 0 1 0.25 -0.25H15a5 5 0 0 1 5 4.5 0.26 0.26 0 0 1 -0.14 0.26 3 3 0 1 0 2.32 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/navigation/chevron.down", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 19.5c-.7 0-1.3-.3-1.7-.8L.4 7.6c-.6-.8-.5-2 .3-2.6.8-.6 1.9-.6 2.5.2l8.6 9.8c.1.1.2.1.4 0l8.6-9.8c.7-.8 1.8-.9 2.6-.2s.9 1.8.2 2.6l-.1.1-9.8 11.1c-.4.4-1.1.7-1.7.7z\" fill=\"#000000\"/></svg>"}, {"setName": "icon/navigation/chevron.left", "svg": "<svg version=\"1.1\" id=\"Arrow-Left-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" enable-background=\"new 0 0 24 24\"> <path d=\"M4.5 12c0 -0.7 0.3 -1.3 0.8 -1.7L16.5 0.5c0.8 -0.7 1.9 -0.6 2.6 0.2 0.6 0.8 0.6 1.9 -0.2 2.5l-9.8 8.6c-0.1 0.1 -0.1 0.2 0 0.3l9.8 8.6c0.8 0.7 0.9 1.8 0.2 2.6s-1.8 0.9 -2.6 0.2l-0.1 -0.1 -11.1 -9.7c-0.5 -0.4 -0.8 -1.1 -0.8 -1.7z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/navigation/chevron.right", "svg": "<svg version=\"1.1\" id=\"Arrow-Right-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" enable-background=\"new 0 0 24 24\"> <path d=\"M19.5 12c0 0.7 -0.3 1.3 -0.8 1.7L7.5 23.6c-0.8 0.7 -2 0.6 -2.6 -0.2 -0.6 -0.8 -0.6 -1.9 0.2 -2.6l9.8 -8.6c0.1 -0.1 0.1 -0.2 0 -0.4L5.1 3.2c-0.8 -0.7 -0.8 -1.9 -0.1 -2.6 0.7 -0.7 1.8 -0.8 2.6 -0.2l11.2 9.8c0.4 0.5 0.7 1.1 0.7 1.8z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
