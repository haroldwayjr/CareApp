
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

const BATCH = [{"setName": "icon/files/contract", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Business-Contract-Give--Streamline-Ultimate\"> <g> <path d=\"M17.75 2.47h-10a1 1 0 0 0 0 2h9.5a0.5 0.5 0 0 1 0.5 0.5v7.9a0.09 0.09 0 0 0 0 0.07l2.75 2.75a0.75 0.75 0 0 1 0 1.06 0.75 0.75 0 0 1 -1.06 0l-2.04 -2.07a1.26 1.26 0 0 0 -1.32 0.11 1.23 1.23 0 0 0 -0.5 0.9 1.29 1.29 0 0 0 0.35 1l2.75 2.79a0.29 0.29 0 0 1 0.07 0.18V21a6 6 0 0 0 0.94 2.4 0.26 0.26 0 0 0 0.17 0.12 4.09 4.09 0 0 0 3.79 -1.39 0.27 0.27 0 0 0 0 -0.27l-0.9 -1.74a0.27 0.27 0 0 1 0 -0.12v-4.5c0 -1.45 -1.36 -2.76 -2.91 -4.08a0.25 0.25 0 0 1 -0.09 -0.2V4.47a2 2 0 0 0 -2 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6.25 21h10a1 1 0 0 0 0 -2h-9a0.5 0.5 0 0 1 -0.5 -0.5v-6.91a0.26 0.26 0 0 0 -0.13 -0.22 0.79 0.79 0 0 1 -0.15 -0.12L3.72 8.5a0.75 0.75 0 0 1 1.06 -1.06l2 2a1.25 1.25 0 0 0 1.64 -1.13 1.29 1.29 0 0 0 -0.35 -1L5.32 4.55a0.29 0.29 0 0 1 -0.07 -0.18V3A6 6 0 0 0 4.31 0.57a0.26 0.26 0 0 0 -0.17 -0.12A4.09 4.09 0 0 0 0.35 1.84a0.27 0.27 0 0 0 0 0.27l0.9 1.74a0.27 0.27 0 0 1 0 0.12v4.5c0 1.6 1.67 3 3.41 4.51a0.22 0.22 0 0 1 0.09 0.19v6.3A1.5 1.5 0 0 0 6.25 21\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/files/envelope", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Envelope--Streamline-Ultimate\"> <g> <path d=\"M11.11 14.56a1.27 1.27 0 0 0 1.77 0l9.69 -9.69a0.5 0.5 0 0 0 0.12 -0.51 0.51 0.51 0 0 0 -0.4 -0.34L22 4H2l-0.29 0a0.5 0.5 0 0 0 -0.4 0.34 0.48 0.48 0 0 0 0.12 0.51Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.89 5.83a0.18 0.18 0 0 0 -0.2 0l-6.2 6.2a0.24 0.24 0 0 0 0 0.36l5 5a0.75 0.75 0 0 1 -1.06 1.06l-5 -5a0.25 0.25 0 0 0 -0.36 0l-2.13 2.13a2.76 2.76 0 0 1 -3.89 0l-2.12 -2.09a0.24 0.24 0 0 0 -0.36 0l-5 5a0.75 0.75 0 0 1 -1.06 -1.06l5 -5a0.24 0.24 0 0 0 0 -0.36l-6.2 -6.2a0.18 0.18 0 0 0 -0.2 0A0.18 0.18 0 0 0 0 6v12a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V6a0.18 0.18 0 0 0 -0.11 -0.17\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/files/faq", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Contact-Us-Faq--Streamline-Ultimate\"> <path fill=\"#000000\" d=\"M22.25 1c0.4641 0 0.9091 0.18451 1.2373 0.5127S24 2.28587 24 2.75v14.5c0 0.4641 -0.1845 0.9091 -0.5127 1.2373S22.7141 19 22.25 19H11.8105l-3.78023 3.7803c-0.21448 0.2145 -0.53714 0.2791 -0.81738 0.1631 -0.28026 -0.1161 -0.46289 -0.3901 -0.46289 -0.6934V19h-5c-0.46413 0 -0.909115 -0.1845 -1.237305 -0.5127C0.184507 18.1591 0 17.7141 0 17.25V2.75c0 -0.46413 0.184507 -0.90912 0.512695 -1.2373C0.840884 1.18451 1.28587 1 1.75 1zm-4.5 5C16.7835 6 16 6.7835 16 7.75v4.5c0 0.9665 0.7835 1.75 1.75 1.75v0.25c0 0.9665 0.7835 1.75 1.75 1.75 0.4142 0 0.75 -0.3358 0.75 -0.75s-0.3358 -0.75 -0.75 -0.75c-0.1381 0 -0.25 -0.1119 -0.25 -0.25V14c0.9665 0 1.75 -0.7835 1.75 -1.75v-4.5C21 6.7835 20.2165 6 19.25 6zm-13 0C3.7835 6 3 6.7835 3 7.75v5.5c0 0.4142 0.33579 0.75 0.75 0.75s0.75 -0.3358 0.75 -0.75V10.5h1.75c0.41421 0 0.75 -0.3358 0.75 -0.75C7 9.33579 6.66421 9 6.25 9H4.5V7.75c0 -0.13807 0.11193 -0.25 0.25 -0.25h2.5c0.41421 0 0.75 -0.33579 0.75 -0.75S7.66421 6 7.25 6zm6.75 0C10.1193 6 9 7.11929 9 8.5v4.75c0 0.4142 0.33579 0.75 0.75 0.75 0.4142 0 0.75 -0.3358 0.75 -0.75v-2h2v2c0 0.4142 0.3358 0.75 0.75 0.75s0.75 -0.3358 0.75 -0.75V8.5C14 7.11929 12.8807 6 11.5 6m7.75 1.5c0.1381 0 0.25 0.11193 0.25 0.25v4.5c0 0.1381 -0.1119 0.25 -0.25 0.25h-1.5c-0.1381 0 -0.25 -0.1119 -0.25 -0.25v-4.5c0 -0.13807 0.1119 -0.25 0.25 -0.25zm-7.75 0c0.5523 0 1 0.44772 1 1v1.25h-2V8.5c0 -0.55228 0.4477 -1 1 -1\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/files/file.code", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Common-File-Dash--Streamline-Ultimate\"> <g> <path d=\"M3 4a1 1 0 0 1 -1 -1V2a2 2 0 0 1 2 -2h1.5a1 1 0 0 1 0 2H4v1a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M5.5 22a1 1 0 0 1 0 2H4a2 2 0 0 1 -2 -2v-1a1 1 0 0 1 2 0v1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20 24h-1.5a1 1 0 0 1 0 -2H20v-1a1 1 0 0 1 2 0v1a2 2 0 0 1 -2 2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17 3a1 1 0 0 1 -0.71 -0.29l-0.7 -0.71H14.5a1 1 0 0 1 0 -2h1.09A2 2 0 0 1 17 0.59l0.71 0.7a1 1 0 0 1 0 1.42A1 1 0 0 1 17 3\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3 9a1 1 0 0 1 -1 -1V6.5a1 1 0 0 1 2 0V8a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.75 2h-1.5a1 1 0 0 1 0 -2h1.5a1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.5 24H9a1 1 0 0 1 0 -2h1.5a1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15 24h-1.5a1 1 0 0 1 0 -2H15a1 1 0 0 1 0 2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3 13.5a1 1 0 0 1 -1 -1V11a1 1 0 0 1 2 0v1.5a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3 18.5a1 1 0 0 1 -1 -1V16a1 1 0 0 1 2 0v1.5a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21 9a1 1 0 0 1 -1 -1V6.91l-0.71 -0.7a1 1 0 0 1 1.42 -1.42l0.7 0.71A2 2 0 0 1 22 6.91V8a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21 13.5a1 1 0 0 1 -1 -1V11a1 1 0 0 1 2 0v1.5a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21 18.5a1 1 0 0 1 -1 -1V16a1 1 0 0 1 2 0v1.5a1 1 0 0 1 -1 1\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
