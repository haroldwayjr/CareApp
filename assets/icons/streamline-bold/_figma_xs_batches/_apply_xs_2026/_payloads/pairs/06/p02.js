
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

const BATCH = [{"setName":"icon/misc/printer.alt","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Printer-View--Streamline-Ultimate\"> <g> <path d=\"M6.5 5a1 1 0 0 0 1 -1V2.5A0.5 0.5 0 0 1 8 2h7.37a0.52 0.52 0 0 1 0.36 0.14l0.62 0.63a0.5 0.5 0 0 1 0.14 0.35V4a1 1 0 0 0 2 0V2.5a1 1 0 0 0 -0.29 -0.71L16.7 0.29A1 1 0 0 0 16 0H7a1.5 1.5 0 0 0 -1.5 1.5V4a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12.19 21H8.5a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h4.69a0.25 0.25 0 0 0 0.2 -0.1 6.23 6.23 0 0 1 10.22 0 0.26 0.26 0 0 0 0.28 0.1 0.14 0.14 0 0 0 0.1 -0.14V9a2.5 2.5 0 0 0 -2.5 -2.5H2.5A2.5 2.5 0 0 0 0 9v6a2.5 2.5 0 0 0 2.5 2.5h2.75a0.25 0.25 0 0 1 0.25 0.25v3.75c0 0.86 0.82 1.5 1.92 1.5h4.83a1 1 0 0 0 0.8 -1.45 1 1 0 0 0 -0.86 -0.55M4.5 9.5a1 1 0 1 1 -1 -1 1 1 0 0 1 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.43 21a0.24 0.24 0 0 1 0 -0.3 4.39 4.39 0 0 0 0.6 -2.22 4.5 4.5 0 1 0 -4.5 4.5 4.39 4.39 0 0 0 2.22 -0.6 0.26 0.26 0 0 1 0.31 0l1.27 1.28a1 1 0 0 0 1.42 0 1 1 0 0 0 0 -1.42ZM16 18.49a2.5 2.5 0 1 1 2.5 2.5 2.5 2.5 0 0 1 -2.5 -2.5\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"},{"setName":"icon/misc/projector","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Video-Projector--Streamline-Ultimate\"> <g> <path d=\"m9.34 9.94 7.2 -4a0.5 0.5 0 0 0 0 -0.88l-7.2 -4a0.5 0.5 0 0 0 -0.49 0 0.48 0.48 0 0 0 -0.25 0.43v8a0.48 0.48 0 0 0 0.25 0.43 0.55 0.55 0 0 0 0.49 0.02\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.5 10.5a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M4 6a1 1 0 0 0 -1 -1H2a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M2 2a1 1 0 0 0 0 -2H1a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20.5 9.5h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7 15a1 1 0 0 0 -1 -1H5a1 1 0 0 0 0 2h1a1 1 0 0 0 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19 14h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22 5h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 0h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.5 17h-2.26a0.25 0.25 0 0 0 -0.25 0.23 3 3 0 0 1 -6 0 0.25 0.25 0 0 0 -0.23 -0.23H8.5A2.5 2.5 0 0 0 6 19.5v1a1.52 1.52 0 0 0 0.5 1.11V23a1 1 0 0 0 2 0v-0.75a0.25 0.25 0 0 1 0.25 -0.25h8.5a0.25 0.25 0 0 1 0.25 0.25V23a1 1 0 0 0 2 0v-1.39a1.52 1.52 0 0 0 0.5 -1.11v-1a2.5 2.5 0 0 0 -2.5 -2.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 19a2 2 0 1 0 -2 -2 2 2 0 0 0 2 2m-0.75 -2a0.75 0.75 0 1 1 0.75 0.75 0.76 0.76 0 0 1 -0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
