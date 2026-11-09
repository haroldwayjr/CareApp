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

const BATCH = [{"setName": "icon/navigation/arrow.up", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Arrow-Up--Streamline-Ultimate\"> <path d=\"M23.42 11.76 13.77 0.8A2.67 2.67 0 0 0 12 0a2.67 2.67 0 0 0 -1.77 0.8l-9.65 11a1.41 1.41 0 1 0 2.12 1.83l7.45 -8.46a0.25 0.25 0 0 1 0.28 -0.07 0.25 0.25 0 0 1 0.16 0.23v17.26a1.41 1.41 0 1 0 2.82 0V5.33a0.25 0.25 0 0 1 0.16 -0.23 0.25 0.25 0 0 1 0.28 0.07l7.45 8.46a1.41 1.41 0 1 0 2.12 -1.87Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/navigation/back", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Arrow-Circle-Left--Streamline-Ultimate\"> <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm3.91 17a1.25 1.25 0 1 1 -1.53 2L7 13.36a1.72 1.72 0 0 1 0 -2.72L14.38 5a1.25 1.25 0 1 1 1.53 2l-6.28 4.8a0.27 0.27 0 0 0 0 0.4Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/navigation/breadcrumb", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Hierarchy--Streamline-Ultimate\"> <path d=\"M22.13 18.23A0.25 0.25 0 0 1 22 18a7 7 0 0 0 -7 -6.52h-1.75a0.25 0.25 0 0 1 -0.25 -0.25V6a0.24 0.24 0 0 1 0.15 -0.23 3 3 0 1 0 -2.3 0A0.24 0.24 0 0 1 11 6v5.26a0.25 0.25 0 0 1 -0.25 0.25H8.5A6.56 6.56 0 0 0 2 18a0.23 0.23 0 0 1 -0.15 0.21 3 3 0 1 0 2.32 0A0.26 0.26 0 0 1 4 18a4.52 4.52 0 0 1 4.5 -4.5h2.25a0.25 0.25 0 0 1 0.25 0.25V18a0.25 0.25 0 0 1 -0.15 0.23 3 3 0 1 0 2.3 0A0.25 0.25 0 0 1 13 18v-4.25a0.25 0.25 0 0 1 0.25 -0.25H15a5 5 0 0 1 5 4.5 0.26 0.26 0 0 1 -0.14 0.26 3 3 0 1 0 2.32 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/navigation/chevron.down", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 19.5c-.7 0-1.3-.3-1.7-.8L.4 7.6c-.6-.8-.5-2 .3-2.6.8-.6 1.9-.6 2.5.2l8.6 9.8c.1.1.2.1.4 0l8.6-9.8c.7-.8 1.8-.9 2.6-.2s.9 1.8.2 2.6l-.1.1-9.8 11.1c-.4.4-1.1.7-1.7.7z\" fill=\"#000000\"/></svg>"}, {"setName": "icon/navigation/chevron.left", "svg": "<svg version=\"1.1\" id=\"Arrow-Left-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" enable-background=\"new 0 0 24 24\"> <path d=\"M4.5 12c0 -0.7 0.3 -1.3 0.8 -1.7L16.5 0.5c0.8 -0.7 1.9 -0.6 2.6 0.2 0.6 0.8 0.6 1.9 -0.2 2.5l-9.8 8.6c-0.1 0.1 -0.1 0.2 0 0.3l9.8 8.6c0.8 0.7 0.9 1.8 0.2 2.6s-1.8 0.9 -2.6 0.2l-0.1 -0.1 -11.1 -9.7c-0.5 -0.4 -0.8 -1.1 -0.8 -1.7z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/navigation/chevron.right", "svg": "<svg version=\"1.1\" id=\"Arrow-Right-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" enable-background=\"new 0 0 24 24\"> <path d=\"M19.5 12c0 0.7 -0.3 1.3 -0.8 1.7L7.5 23.6c-0.8 0.7 -2 0.6 -2.6 -0.2 -0.6 -0.8 -0.6 -1.9 0.2 -2.6l9.8 -8.6c0.1 -0.1 0.1 -0.2 0 -0.4L5.1 3.2c-0.8 -0.7 -0.8 -1.9 -0.1 -2.6 0.7 -0.7 1.8 -0.8 2.6 -0.2l11.2 9.8c0.4 0.5 0.7 1.1 0.7 1.8z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/navigation/chevron.up", "svg": "<svg version=\"1.1\" id=\"Arrow-Up-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" enable-background=\"new 0 0 24 24\"> <path d=\"M12.1 4.5c0.7 0 1.3 0.3 1.7 0.8l9.7 11c0.7 0.7 0.6 1.9 -0.1 2.6s-1.9 0.6 -2.6 -0.1l-0.1 -0.1 -8.5 -9.6c-0.1 -0.1 -0.2 -0.1 -0.4 0l-8.5 9.6c-0.7 0.8 -1.8 0.9 -2.6 0.2s-0.9 -1.8 -0.2 -2.6l0.1 -0.1 9.7 -11c0.5 -0.4 1.1 -0.7 1.8 -0.7z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/navigation/close", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M.44 21.44a1.49 1.49 0 0 0 0 2.12 1.5 1.5 0 0 0 2.12 0l9.26-9.26a.25.25 0 0 1 .36 0l9.26 9.26a1.5 1.5 0 0 0 2.12 0 1.49 1.49 0 0 0 0-2.12l-9.26-9.26a.25.25 0 0 1 0-.36l9.26-9.26A1.5 1.5 0 0 0 21.44.44L12.18 9.7a.25.25 0 0 1-.36 0L2.56.44A1.5 1.5 0 0 0 .44 2.56l9.26 9.26a.25.25 0 0 1 0 .36Z\" fill=\"#000000\"/></svg>"}, {"setName": "icon/navigation/compass", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Compass--Streamline-Ultimate\"> <g> <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm3.29 7.29 2 -2a1 1 0 1 1 1.42 1.42l-2 2a1 1 0 0 1 -1.42 0 1 1 0 0 1 0 -1.42Zm-10 -2a1 1 0 0 1 1.42 0l2 2a1 1 0 0 1 0 1.42 1 1 0 0 1 -1.42 0l-2 -2a1 1 0 0 1 0 -1.42Zm3.42 11.42 -2 2a1 1 0 0 1 -1.42 0 1 1 0 0 1 0 -1.42l2 -2a1 1 0 0 1 1.42 1.42Zm10 2a1 1 0 0 1 -1.42 0l-2 -2a1 1 0 0 1 1.42 -1.42l2 2a1 1 0 0 1 0 1.42Zm3.52 -6.36L14.6 13.7a0.73 0.73 0 0 0 -0.51 0.51l-1.75 8a0.35 0.35 0 0 1 -0.35 0.27 0.37 0.37 0 0 1 -0.35 -0.27l-1.75 -8a0.72 0.72 0 0 0 -0.5 -0.51L2 12.35a0.36 0.36 0 0 1 0 -0.7l7.53 -1.4a0.54 0.54 0 0 0 0.47 -0.41l1.67 -8.07A0.37 0.37 0 0 1 12 1.5a0.35 0.35 0 0 1 0.35 0.27L14 9.84a0.54 0.54 0 0 0 0.42 0.41l7.79 1.4a0.37 0.37 0 0 1 0 0.7Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.5 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/navigation/exit.fullscreen", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Shrink--Streamline-Ultimate\"> <g> <path d=\"M23.38 0.62a1.24 1.24 0 0 0 -1.76 0l-3.77 3.76a0.24 0.24 0 0 1 -0.35 0l-1.33 -1.33a0.5 0.5 0 0 0 -0.85 0.36v4.77a0.5 0.5 0 0 0 0.5 0.5h4.77a0.49 0.49 0 0 0 0.46 -0.31 0.48 0.48 0 0 0 -0.11 -0.54L19.62 6.5a0.24 0.24 0 0 1 -0.07 -0.18 0.22 0.22 0 0 1 0.07 -0.17l3.76 -3.77a1.24 1.24 0 0 0 0 -1.76Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0.62 23.38a1.21 1.21 0 0 0 0.88 0.37 1.21 1.21 0 0 0 0.88 -0.37l3.77 -3.76a0.24 0.24 0 0 1 0.35 0l1.33 1.32a0.47 0.47 0 0 0 0.35 0.15 0.41 0.41 0 0 0 0.19 0 0.5 0.5 0 0 0 0.31 -0.46v-4.81a0.5 0.5 0 0 0 -0.5 -0.5H3.41a0.49 0.49 0 0 0 -0.46 0.31 0.48 0.48 0 0 0 0.11 0.54l1.32 1.33a0.24 0.24 0 0 1 0 0.35L0.62 21.62a1.24 1.24 0 0 0 0 1.76Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.63 21.05a0.41 0.41 0 0 0 0.19 0 0.47 0.47 0 0 0 0.35 -0.15l1.33 -1.32a0.24 0.24 0 0 1 0.35 0l3.77 3.76a1.23 1.23 0 0 0 1.76 0 1.24 1.24 0 0 0 0 -1.76l-3.76 -3.77a0.24 0.24 0 0 1 0 -0.35l1.32 -1.33a0.48 0.48 0 0 0 0.11 -0.54 0.49 0.49 0 0 0 -0.46 -0.31h-4.77a0.5 0.5 0 0 0 -0.5 0.5v4.77a0.5 0.5 0 0 0 0.31 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.68 3.41a0.5 0.5 0 0 0 -0.85 -0.36L6.5 4.38a0.22 0.22 0 0 1 -0.17 0.07 0.24 0.24 0 0 1 -0.18 -0.07L2.38 0.62A1.24 1.24 0 0 0 0.62 2.38l3.76 3.77a0.24 0.24 0 0 1 0 0.35L3.06 7.83a0.48 0.48 0 0 0 -0.06 0.54 0.49 0.49 0 0 0 0.46 0.31h4.72a0.5 0.5 0 0 0 0.5 -0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M9.09 12a2.91 2.91 0 1 0 5.82 0 2.91 2.91 0 1 0 -5.82 0\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];

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
