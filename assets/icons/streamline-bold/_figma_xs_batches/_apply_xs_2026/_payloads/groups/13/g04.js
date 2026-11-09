
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

const BATCH = [{"setName": "icon/navigation/chevron.up", "svg": "<svg version=\"1.1\" id=\"Arrow-Up-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" enable-background=\"new 0 0 24 24\"> <path d=\"M12.1 4.5c0.7 0 1.3 0.3 1.7 0.8l9.7 11c0.7 0.7 0.6 1.9 -0.1 2.6s-1.9 0.6 -2.6 -0.1l-0.1 -0.1 -8.5 -9.6c-0.1 -0.1 -0.2 -0.1 -0.4 0l-8.5 9.6c-0.7 0.8 -1.8 0.9 -2.6 0.2s-0.9 -1.8 -0.2 -2.6l0.1 -0.1 9.7 -11c0.5 -0.4 1.1 -0.7 1.8 -0.7z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/navigation/close", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M.44 21.44a1.49 1.49 0 0 0 0 2.12 1.5 1.5 0 0 0 2.12 0l9.26-9.26a.25.25 0 0 1 .36 0l9.26 9.26a1.5 1.5 0 0 0 2.12 0 1.49 1.49 0 0 0 0-2.12l-9.26-9.26a.25.25 0 0 1 0-.36l9.26-9.26A1.5 1.5 0 0 0 21.44.44L12.18 9.7a.25.25 0 0 1-.36 0L2.56.44A1.5 1.5 0 0 0 .44 2.56l9.26 9.26a.25.25 0 0 1 0 .36Z\" fill=\"#000000\"/></svg>"}, {"setName": "icon/navigation/compass", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Compass--Streamline-Ultimate\"> <g> <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm3.29 7.29 2 -2a1 1 0 1 1 1.42 1.42l-2 2a1 1 0 0 1 -1.42 0 1 1 0 0 1 0 -1.42Zm-10 -2a1 1 0 0 1 1.42 0l2 2a1 1 0 0 1 0 1.42 1 1 0 0 1 -1.42 0l-2 -2a1 1 0 0 1 0 -1.42Zm3.42 11.42 -2 2a1 1 0 0 1 -1.42 0 1 1 0 0 1 0 -1.42l2 -2a1 1 0 0 1 1.42 1.42Zm10 2a1 1 0 0 1 -1.42 0l-2 -2a1 1 0 0 1 1.42 -1.42l2 2a1 1 0 0 1 0 1.42Zm3.52 -6.36L14.6 13.7a0.73 0.73 0 0 0 -0.51 0.51l-1.75 8a0.35 0.35 0 0 1 -0.35 0.27 0.37 0.37 0 0 1 -0.35 -0.27l-1.75 -8a0.72 0.72 0 0 0 -0.5 -0.51L2 12.35a0.36 0.36 0 0 1 0 -0.7l7.53 -1.4a0.54 0.54 0 0 0 0.47 -0.41l1.67 -8.07A0.37 0.37 0 0 1 12 1.5a0.35 0.35 0 0 1 0.35 0.27L14 9.84a0.54 0.54 0 0 0 0.42 0.41l7.79 1.4a0.37 0.37 0 0 1 0 0.7Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.5 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/navigation/exit.fullscreen", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Shrink--Streamline-Ultimate\"> <g> <path d=\"M23.38 0.62a1.24 1.24 0 0 0 -1.76 0l-3.77 3.76a0.24 0.24 0 0 1 -0.35 0l-1.33 -1.33a0.5 0.5 0 0 0 -0.85 0.36v4.77a0.5 0.5 0 0 0 0.5 0.5h4.77a0.49 0.49 0 0 0 0.46 -0.31 0.48 0.48 0 0 0 -0.11 -0.54L19.62 6.5a0.24 0.24 0 0 1 -0.07 -0.18 0.22 0.22 0 0 1 0.07 -0.17l3.76 -3.77a1.24 1.24 0 0 0 0 -1.76Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0.62 23.38a1.21 1.21 0 0 0 0.88 0.37 1.21 1.21 0 0 0 0.88 -0.37l3.77 -3.76a0.24 0.24 0 0 1 0.35 0l1.33 1.32a0.47 0.47 0 0 0 0.35 0.15 0.41 0.41 0 0 0 0.19 0 0.5 0.5 0 0 0 0.31 -0.46v-4.81a0.5 0.5 0 0 0 -0.5 -0.5H3.41a0.49 0.49 0 0 0 -0.46 0.31 0.48 0.48 0 0 0 0.11 0.54l1.32 1.33a0.24 0.24 0 0 1 0 0.35L0.62 21.62a1.24 1.24 0 0 0 0 1.76Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.63 21.05a0.41 0.41 0 0 0 0.19 0 0.47 0.47 0 0 0 0.35 -0.15l1.33 -1.32a0.24 0.24 0 0 1 0.35 0l3.77 3.76a1.23 1.23 0 0 0 1.76 0 1.24 1.24 0 0 0 0 -1.76l-3.76 -3.77a0.24 0.24 0 0 1 0 -0.35l1.32 -1.33a0.48 0.48 0 0 0 0.11 -0.54 0.49 0.49 0 0 0 -0.46 -0.31h-4.77a0.5 0.5 0 0 0 -0.5 0.5v4.77a0.5 0.5 0 0 0 0.31 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.68 3.41a0.5 0.5 0 0 0 -0.85 -0.36L6.5 4.38a0.22 0.22 0 0 1 -0.17 0.07 0.24 0.24 0 0 1 -0.18 -0.07L2.38 0.62A1.24 1.24 0 0 0 0.62 2.38l3.76 3.77a0.24 0.24 0 0 1 0 0.35L3.06 7.83a0.48 0.48 0 0 0 -0.06 0.54 0.49 0.49 0 0 0 0.46 0.31h4.72a0.5 0.5 0 0 0 0.5 -0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M9.09 12a2.91 2.91 0 1 0 5.82 0 2.91 2.91 0 1 0 -5.82 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
