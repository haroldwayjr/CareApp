
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

const BATCH = [{"setName": "icon/comms/meeting", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Meeting-Remote--Streamline-Ultimate\"> <g> <path d=\"M6.76 12.59h11.48A2.77 2.77 0 0 0 21 9.82V2.76A2.77 2.77 0 0 0 18.24 0H6.76A2.77 2.77 0 0 0 4 2.76v7.06a2.77 2.77 0 0 0 2.76 2.77M6 2.76A0.76 0.76 0 0 1 6.76 2h11.48a0.76 0.76 0 0 1 0.76 0.76v7.06a0.77 0.77 0 0 1 -0.76 0.77h-1.76a0.25 0.25 0 0 1 -0.18 -0.08 5.31 5.31 0 0 0 -2.16 -1.29A0.25 0.25 0 0 1 14 9a0.27 0.27 0 0 1 0.12 -0.25 2.84 2.84 0 1 0 -2.93 0 0.24 0.24 0 0 1 0.13 0.24 0.26 0.26 0 0 1 -0.18 0.21A5.27 5.27 0 0 0 9 10.51a0.25 0.25 0 0 1 -0.18 0.08H6.76A0.77 0.77 0 0 1 6 9.82Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.39 23.19a5.17 5.17 0 0 0 -2.54 -1.71 0.28 0.28 0 0 1 -0.18 -0.21 0.25 0.25 0 0 1 0.12 -0.24 2.86 2.86 0 1 0 -2.93 0 0.26 0.26 0 0 1 -0.05 0.46 4.91 4.91 0 0 0 -1.91 1.08 0.27 0.27 0 0 1 -0.34 0 5.22 5.22 0 0 0 -2 -1.1 0.28 0.28 0 0 1 -0.18 -0.21 0.25 0.25 0 0 1 0.12 -0.24 2.86 2.86 0 1 0 -2.93 0 0.26 0.26 0 0 1 0 0.46 5 5 0 0 0 -2 1.18 0.26 0.26 0 0 1 -0.35 0 5 5 0 0 0 -2 -1.19 0.25 0.25 0 0 1 -0.22 -0.19 0.25 0.25 0 0 1 0.11 -0.28 2.85 2.85 0 1 0 -2.93 0 0.24 0.24 0 0 1 0.12 0.24 0.25 0.25 0 0 1 -0.17 0.21 5.16 5.16 0 0 0 -2.52 1.7 0.51 0.51 0 0 0 -0.06 0.53A0.5 0.5 0 0 0 1 24h22a0.5 0.5 0 0 0 0.45 -0.28 0.51 0.51 0 0 0 -0.06 -0.53\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/comms/message", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Chat-Consultation-Phone--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m15.23 11.16 -4.669 1.334a0.5 0.5 0 0 1 -0.63 -0.563l0.645 -3.874V1.852A1.551 1.551 0 0 1 12.128 0.3h10.084a1.552 1.552 0 0 1 1.551 1.552v7.757a1.552 1.552 0 0 1 -1.551 1.551zm1.252 -8.956 1.55 0a0.5 0.5 0 0 1 0.5 0.5V4.37h1.666a0.5 0.5 0 0 1 0.5 0.5v1.55a0.5 0.5 0 0 1 -0.5 0.5h-1.666v1.666a0.5 0.5 0 0 1 -0.5 0.5h-1.55a0.5 0.5 0 0 1 -0.5 -0.5V6.92h-1.666a0.5 0.5 0 0 1 -0.5 -0.5V4.87a0.5 0.5 0 0 1 0.5 -0.5h1.666V2.704a0.5 0.5 0 0 1 0.5 -0.5m-0.67 10.456h-0.371l-1.63 0.466v8.322c0 0.197 -0.16 0.358 -0.358 0.358H2.587a0.358 0.358 0 0 1 -0.359 -0.358V6.506c0 -0.198 0.16 -0.358 0.359 -0.358h6.49v-2h-6.49A2.358 2.358 0 0 0 0.228 6.506v14.942a2.358 2.358 0 0 0 2.359 2.358h10.866a2.358 2.358 0 0 0 2.358 -2.358V12.66Zm-9.81 6.424a1 1 0 0 1 1 -1h2.037a1 1 0 1 1 0 2H7a1 1 0 0 1 -1 -1Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/comms/messages", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Chat-Consultation-Phone--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m15.23 11.16 -4.669 1.334a0.5 0.5 0 0 1 -0.63 -0.563l0.645 -3.874V1.852A1.551 1.551 0 0 1 12.128 0.3h10.084a1.552 1.552 0 0 1 1.551 1.552v7.757a1.552 1.552 0 0 1 -1.551 1.551zm1.252 -8.956 1.55 0a0.5 0.5 0 0 1 0.5 0.5V4.37h1.666a0.5 0.5 0 0 1 0.5 0.5v1.55a0.5 0.5 0 0 1 -0.5 0.5h-1.666v1.666a0.5 0.5 0 0 1 -0.5 0.5h-1.55a0.5 0.5 0 0 1 -0.5 -0.5V6.92h-1.666a0.5 0.5 0 0 1 -0.5 -0.5V4.87a0.5 0.5 0 0 1 0.5 -0.5h1.666V2.704a0.5 0.5 0 0 1 0.5 -0.5m-0.67 10.456h-0.371l-1.63 0.466v8.322c0 0.197 -0.16 0.358 -0.358 0.358H2.587a0.358 0.358 0 0 1 -0.359 -0.358V6.506c0 -0.198 0.16 -0.358 0.359 -0.358h6.49v-2h-6.49A2.358 2.358 0 0 0 0.228 6.506v14.942a2.358 2.358 0 0 0 2.359 2.358h10.866a2.358 2.358 0 0 0 2.358 -2.358V12.66Zm-9.81 6.424a1 1 0 0 1 1 -1h2.037a1 1 0 1 1 0 2H7a1 1 0 0 1 -1 -1Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/comms/phone", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Phone--Streamline-Ultimate\"> <path d=\"m22.67 17 -2.45 -2.45a2.8 2.8 0 0 0 -4 0l-0.49 0.49a54 54 0 0 1 -6.81 -6.8l0.5 -0.5a2.83 2.83 0 0 0 0 -4L7 1.32a2.87 2.87 0 0 0 -4 0L1.66 2.66a4 4 0 0 0 -0.5 5 54.24 54.24 0 0 0 15.17 15.17 4 4 0 0 0 5 -0.5L22.67 21a2.8 2.8 0 0 0 0 -4\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];
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
