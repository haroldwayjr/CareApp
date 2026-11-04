
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

const BATCH = [{"setName": "icon/comms/user.check", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Messages-People-User-Check--Streamline-Ultimate\"> <g> <path d=\"M13.24 9.91a1.82 1.82 0 0 0 2.76 -0.2l3.19 -4.24a1 1 0 1 0 -1.6 -1.2L14.5 8.35 13 6.85a1 1 0 0 0 -1.41 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22 0H9a2 2 0 0 0 -2 2v11a2 2 0 0 0 2 2h0.5v2.5a1 1 0 0 0 1.71 0.71l3.2 -3.21H22a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2m0 12.75a0.25 0.25 0 0 1 -0.25 0.25H14a1 1 0 0 0 -0.71 0.29l-1.79 1.8V14a1 1 0 0 0 -1 -1H9.25a0.25 0.25 0 0 1 -0.25 -0.25V2.25A0.25 0.25 0 0 1 9.25 2h12.5a0.25 0.25 0 0 1 0.25 0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3.5 13a2.75 2.75 0 1 0 -2.75 -2.75A2.75 2.75 0 0 0 3.5 13 3.5 3.5 0 0 0 0 16.5v2a0.47 0.47 0 0 0 0.15 0.35 0.47 0.47 0 0 0 0.35 0.15h0.82a0.25 0.25 0 0 1 0.25 0.23L2 23.55a0.5 0.5 0 0 0 0.5 0.45h2a0.5 0.5 0 0 0 0.5 -0.45l0.43 -4.32a0.25 0.25 0 0 1 0.25 -0.23h0.82a0.5 0.5 0 0 0 0.5 -0.5v-2A3.5 3.5 0 0 0 3.5 13\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/comms/user.remove", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Phone-Action-Remove-User--Streamline-Ultimate\"> <g> <path d=\"M17 0H7a3 3 0 0 0 -3 3v18a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3V3a3 3 0 0 0 -3 -3m1 19a0.5 0.5 0 0 1 -0.5 0.5h-11A0.5 0.5 0 0 1 6 19V3.5a0.5 0.5 0 0 1 0.5 -0.5h11a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13.6 13.5H15a0.26 0.26 0 0 0 0.25 -0.33 4 4 0 0 0 -2.63 -2.49 2.25 2.25 0 1 0 -3.37 -1.93 2.22 2.22 0 0 0 1.12 1.93A4 4 0 0 0 7.5 14.5v1a0.5 0.5 0 0 0 0.5 0.5h3a0.25 0.25 0 0 0 0.25 -0.27 1.59 1.59 0 0 1 0.2 -1 2.42 2.42 0 0 1 2.15 -1.23\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.75 14.75h-2.5a0.75 0.75 0 0 0 0 1.5h2.5a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/comms/users", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Multiple-Users-1--Streamline-Ultimate\"> <g> <path d=\"M15.87 10.46a0.49 0.49 0 0 0 0.29 -0.39 0.48 0.48 0 0 0 -0.16 -0.45 6.06 6.06 0 0 0 -1.45 -0.9 0.27 0.27 0 0 1 -0.15 -0.21 0.27 0.27 0 0 1 0.12 -0.23A4.5 4.5 0 0 0 12.05 0a4.53 4.53 0 0 0 -4.52 4.52 4.46 4.46 0 0 0 2.06 3.76 0.26 0.26 0 0 1 0.11 0.23 0.27 0.27 0 0 1 -0.15 0.21 6.66 6.66 0 0 0 -1.48 0.92 0.5 0.5 0 0 0 -0.17 0.46 0.48 0.48 0 0 0 0.29 0.38 6.12 6.12 0 0 1 2.35 1.86 0.47 0.47 0 0 0 0.39 0.2h2.14a0.47 0.47 0 0 0 0.39 -0.2 6 6 0 0 1 2.41 -1.88M9.67 3.7a0.26 0.26 0 0 1 0.16 -0.15 0.25 0.25 0 0 1 0.22 0 5.74 5.74 0 0 0 3.17 0.95 5.8 5.8 0 0 0 1 -0.1 0.26 0.26 0 0 1 0.3 0.26 2.51 2.51 0 0 1 -5 -0.16 2.48 2.48 0 0 1 0.15 -0.8\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.27 16a4.52 4.52 0 1 0 -7 3.76 0.24 0.24 0 0 1 0.13 0.24 0.24 0.24 0 0 1 -0.14 0.21 6.14 6.14 0 0 0 -1.09 0.62A6 6 0 0 0 0.32 22.9a0.75 0.75 0 0 0 0 0.74A0.77 0.77 0 0 0 1 24h9.54a0.77 0.77 0 0 0 0.65 -0.36 0.75 0.75 0 0 0 0 -0.74 6 6 0 0 0 -1.85 -2.1 6.14 6.14 0 0 0 -1.09 -0.62 0.24 0.24 0 0 1 -0.15 -0.18 0.24 0.24 0 0 1 0.11 -0.23A4.49 4.49 0 0 0 10.27 16m-6.89 -0.82a0.23 0.23 0 0 1 0.15 -0.18 0.24 0.24 0 0 1 0.22 0 5.74 5.74 0 0 0 3.17 1 5.91 5.91 0 0 0 1 -0.1 0.27 0.27 0 0 1 0.21 0.06 0.22 0.22 0 0 1 0.08 0.2 2.51 2.51 0 1 1 -4.87 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21.83 20.8a6.14 6.14 0 0 0 -1.09 -0.62 0.24 0.24 0 0 1 -0.14 -0.18 0.24 0.24 0 0 1 0.11 -0.23 4.52 4.52 0 1 0 -4.92 0 0.24 0.24 0 0 1 0.11 0.23 0.24 0.24 0 0 1 -0.14 0.21 6.14 6.14 0 0 0 -1.09 0.62 6 6 0 0 0 -1.85 2.1 0.75 0.75 0 0 0 0 0.74 0.77 0.77 0 0 0 0.65 0.36H23a0.77 0.77 0 0 0 0.65 -0.36 0.75 0.75 0 0 0 0 -0.74 6 6 0 0 0 -1.82 -2.13m-5.95 -5.64A0.23 0.23 0 0 1 16 15a0.24 0.24 0 0 1 0.22 0 5.74 5.74 0 0 0 3.17 1 5.91 5.91 0 0 0 1 -0.1 0.27 0.27 0 0 1 0.21 0.06 0.22 0.22 0 0 1 0.08 0.2 2.51 2.51 0 1 1 -4.87 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/comms/video.call", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Video-Call--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M3.44727 20.2466c-1.38071 0 -2.500004 -1.1192 -2.500004 -2.5V6.25293c0 -1.38071 1.119284 -2.5 2.500004 -2.5H15.1614c1.3807 0 2.5 1.11929 2.5 2.5v2.55004l3.1231 -1.8622c0.9999 -0.59617 2.2682 0.12427 2.2682 1.28836v7.54447c0 1.1641 -1.2683 1.8846 -2.2682 1.2884l-3.1231 -1.8622v2.5468c0 1.3808 -1.1193 2.5 -2.5 2.5zm3.02861 -7.6342c-0.16392 -0.3804 -0.60517 -0.5559 -0.98557 -0.392s-0.55589 0.6052 -0.39197 0.9856c0.70105 1.6269 2.31974 2.7681 4.2067 2.7681s3.50566 -1.1412 4.20666 -2.7681c0.164 -0.3804 -0.0115 -0.8217 -0.3919 -0.9856s-0.8217 0.0116 -0.9856 0.392c-0.4725 1.0965 -1.5623 1.8617 -2.82916 1.8617 -1.26685 0 -2.35666 -0.7652 -2.82916 -1.8617m-0.48174 -2.3556c0.63319 0 1.14648 -0.51326 1.14648 -1.14645 0 -0.63318 -0.51329 -1.14648 -1.14648 -1.14648s-1.14648 0.5133 -1.14648 1.14648c0 0.63319 0.51329 1.14645 1.14648 1.14645m7.76756 -1.14645c0 0.63319 -0.5133 1.14645 -1.1465 1.14645s-1.1464 -0.51326 -1.1464 -1.14645c0 -0.63318 0.5132 -1.14648 1.1464 -1.14648s1.1465 0.5133 1.1465 1.14648\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
