
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

const BATCH = [{"setName": "icon/comms/message", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Chat-Consultation-Phone--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m15.23 11.16 -4.669 1.334a0.5 0.5 0 0 1 -0.63 -0.563l0.645 -3.874V1.852A1.551 1.551 0 0 1 12.128 0.3h10.084a1.552 1.552 0 0 1 1.551 1.552v7.757a1.552 1.552 0 0 1 -1.551 1.551zm1.252 -8.956 1.55 0a0.5 0.5 0 0 1 0.5 0.5V4.37h1.666a0.5 0.5 0 0 1 0.5 0.5v1.55a0.5 0.5 0 0 1 -0.5 0.5h-1.666v1.666a0.5 0.5 0 0 1 -0.5 0.5h-1.55a0.5 0.5 0 0 1 -0.5 -0.5V6.92h-1.666a0.5 0.5 0 0 1 -0.5 -0.5V4.87a0.5 0.5 0 0 1 0.5 -0.5h1.666V2.704a0.5 0.5 0 0 1 0.5 -0.5m-0.67 10.456h-0.371l-1.63 0.466v8.322c0 0.197 -0.16 0.358 -0.358 0.358H2.587a0.358 0.358 0 0 1 -0.359 -0.358V6.506c0 -0.198 0.16 -0.358 0.359 -0.358h6.49v-2h-6.49A2.358 2.358 0 0 0 0.228 6.506v14.942a2.358 2.358 0 0 0 2.359 2.358h10.866a2.358 2.358 0 0 0 2.358 -2.358V12.66Zm-9.81 6.424a1 1 0 0 1 1 -1h2.037a1 1 0 1 1 0 2H7a1 1 0 0 1 -1 -1Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/comms/messages", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Chat-Consultation-Phone--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m15.23 11.16 -4.669 1.334a0.5 0.5 0 0 1 -0.63 -0.563l0.645 -3.874V1.852A1.551 1.551 0 0 1 12.128 0.3h10.084a1.552 1.552 0 0 1 1.551 1.552v7.757a1.552 1.552 0 0 1 -1.551 1.551zm1.252 -8.956 1.55 0a0.5 0.5 0 0 1 0.5 0.5V4.37h1.666a0.5 0.5 0 0 1 0.5 0.5v1.55a0.5 0.5 0 0 1 -0.5 0.5h-1.666v1.666a0.5 0.5 0 0 1 -0.5 0.5h-1.55a0.5 0.5 0 0 1 -0.5 -0.5V6.92h-1.666a0.5 0.5 0 0 1 -0.5 -0.5V4.87a0.5 0.5 0 0 1 0.5 -0.5h1.666V2.704a0.5 0.5 0 0 1 0.5 -0.5m-0.67 10.456h-0.371l-1.63 0.466v8.322c0 0.197 -0.16 0.358 -0.358 0.358H2.587a0.358 0.358 0 0 1 -0.359 -0.358V6.506c0 -0.198 0.16 -0.358 0.359 -0.358h6.49v-2h-6.49A2.358 2.358 0 0 0 0.228 6.506v14.942a2.358 2.358 0 0 0 2.359 2.358h10.866a2.358 2.358 0 0 0 2.358 -2.358V12.66Zm-9.81 6.424a1 1 0 0 1 1 -1h2.037a1 1 0 1 1 0 2H7a1 1 0 0 1 -1 -1Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/comms/phone", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Phone--Streamline-Ultimate\"> <path d=\"m22.67 17 -2.45 -2.45a2.8 2.8 0 0 0 -4 0l-0.49 0.49a54 54 0 0 1 -6.81 -6.8l0.5 -0.5a2.83 2.83 0 0 0 0 -4L7 1.32a2.87 2.87 0 0 0 -4 0L1.66 2.66a4 4 0 0 0 -0.5 5 54.24 54.24 0 0 0 15.17 15.17 4 4 0 0 0 5 -0.5L22.67 21a2.8 2.8 0 0 0 0 -4\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/comms/phone.off", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Phone-Off--Streamline-Ultimate\"> <g> <path d=\"m19.2 14.71 -1.55 -1.55a1.55 1.55 0 0 0 -2.18 0.11l-0.57 0.58 -0.27 -0.22a0.26 0.26 0 0 0 -0.34 0l-2.1 2.11a0.26 0.26 0 0 0 0 0.37 20.62 20.62 0 0 0 3 2.16 2.37 2.37 0 0 0 2.92 -0.45l0.95 -0.94a1.55 1.55 0 0 0 0.14 -2.17\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0M2.09 10.65a10 10 0 0 1 16 -6.57 0.25 0.25 0 0 1 0 0.38l-6.26 6.27a0.25 0.25 0 0 1 -0.37 0L10.15 9.1l0.58 -0.57a1.55 1.55 0 0 0 0.11 -2.18L9.29 4.8a1.55 1.55 0 0 0 -2.18 0.11l-0.94 1a2.37 2.37 0 0 0 -0.45 2.92 48.21 48.21 0 0 0 3.35 4.37 0.26 0.26 0 0 1 0 0.34l-4.61 4.58a0.25 0.25 0 0 1 -0.38 0 10 10 0 0 1 -1.99 -7.47m19.82 2.7a10 10 0 0 1 -16 6.57 0.25 0.25 0 0 1 0 -0.38L19.54 5.88a0.25 0.25 0 0 1 0.38 0 10 10 0 0 1 1.99 7.47\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/comms/presentation", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Presentation--Streamline-Ultimate\"> <g> <path d=\"M8.5 9h7a0.51 0.51 0 0 0 0.4 -0.2 0.5 0.5 0 0 0 0.1 -0.44 4.21 4.21 0 0 0 -2.61 -2.84 0.25 0.25 0 0 1 -0.16 -0.2 0.24 0.24 0 0 1 0.1 -0.24 2.25 2.25 0 1 0 -2.62 0 0.22 0.22 0 0 1 0.1 0.24 0.25 0.25 0 0 1 -0.16 0.2A4.21 4.21 0 0 0 8 8.36a0.5 0.5 0 0 0 0.08 0.44 0.51 0.51 0 0 0 0.42 0.2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M24 17.86A4.21 4.21 0 0 0 21.37 15a0.25 0.25 0 0 1 -0.16 -0.2 0.24 0.24 0 0 1 0.1 -0.24 2.25 2.25 0 1 0 -2.62 0 0.22 0.22 0 0 1 0.1 0.24 0.25 0.25 0 0 1 -0.16 0.2 3.62 3.62 0 0 0 -1 0.53 0.24 0.24 0 0 0 -0.1 0.25L18 18.3a0.26 0.26 0 0 0 0.25 0.2h5.25a0.51 0.51 0 0 0 0.4 -0.2 0.5 0.5 0 0 0 0.1 -0.44\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6.48 15.8a0.24 0.24 0 0 0 -0.1 -0.25 3.62 3.62 0 0 0 -1 -0.53 0.25 0.25 0 0 1 -0.16 -0.2 0.24 0.24 0 0 1 0.1 -0.24 2.25 2.25 0 1 0 -2.62 0 0.22 0.22 0 0 1 0.1 0.24 0.25 0.25 0 0 1 -0.16 0.2A4.21 4.21 0 0 0 0 17.86a0.5 0.5 0 0 0 0.08 0.44 0.51 0.51 0 0 0 0.4 0.2h5.23a0.26 0.26 0 0 0 0.29 -0.2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.67 11.8a1 1 0 0 0 -1 -0.8H9.31a1 1 0 0 0 -1 0.8l-2.08 10a1 1 0 0 0 0.2 0.83 1 1 0 0 0 0.78 0.37h9.54a1 1 0 0 0 0.78 -0.37 1 1 0 0 0 0.2 -0.83Zm-1.37 9a0.49 0.49 0 0 1 -0.38 0.17h-3.84a0.49 0.49 0 0 1 -0.38 -0.17 0.49 0.49 0 0 1 -0.12 -0.4l0.36 -2.5a0.49 0.49 0 0 1 0.49 -0.43h3.14a0.49 0.49 0 0 1 0.49 0.43l0.36 2.5a0.49 0.49 0 0 1 -0.12 0.43Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
