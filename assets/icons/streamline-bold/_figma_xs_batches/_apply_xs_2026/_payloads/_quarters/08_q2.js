
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

const BATCH = [{"setName": "icon/actions/erase", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Eraser--Streamline-Ultimate\"> <g> <path d=\"M11 21.66H1a1 1 0 0 0 0 2h10a1 1 0 0 0 0 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20.51 6.43 14.86 0.78a1.49 1.49 0 0 0 -2.12 0L5 8.54A1 1 0 0 0 5 10l6.36 6.37a1 1 0 0 0 1.41 0l7.76 -7.76a1.5 1.5 0 0 0 -0.02 -2.18Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M1.8 19.11a1.75 1.75 0 0 0 1.2 0.55h4.66a1.84 1.84 0 0 0 1.22 -0.53l1 -1.13a0.5 0.5 0 0 0 0 -0.69L4.1 11.59a0.52 0.52 0 0 0 -0.71 0l-2.65 2.7a2.59 2.59 0 0 0 0 3.6Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M16.5 21.66h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23 21.66h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/export", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Export-File--Streamline-Ultimate\"> <path fill=\"#000000\" d=\"M14.25 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75H4.25c-1.51878 0 -2.75 -1.2312 -2.75 -2.75V2.75C1.5 1.23122 2.73122 0 4.25 0h10zM12 9.7832c-0.1986 0.00024 -0.3898 0.07929 -0.5303 0.2197l-2.95896 2.96c-0.21413 0.2145 -0.279 0.5373 -0.16308 0.8174 0.11604 0.28 0.39026 0.4627 0.69336 0.4629H10.998v5.2714c0.0002 0.552 0.4481 0.9998 1 1 0.5523 0 0.9999 -0.4478 1 -1v-5.2714h1.962c0.3032 0 0.5771 -0.1829 0.6933 -0.4629 0.1161 -0.2803 0.0514 -0.6029 -0.1631 -0.8174l-2.9599 -2.96c-0.1406 -0.1403 -0.3316 -0.2197 -0.5303 -0.2197M15.8066 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875H16.5c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973C15.8291 6.38962 15.75 6.19891 15.75 6V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/explore", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Space-Explore--Streamline-Ultimate\"> <g> <path d=\"M9.6 3.56h0.25a0.51 0.51 0 0 1 0.5 0.5v0.25a0.75 0.75 0 1 0 1.5 0v-0.25a0.5 0.5 0 0 1 0.5 -0.5h0.25a0.75 0.75 0 0 0 0 -1.5h-0.25a0.5 0.5 0 0 1 -0.5 -0.5v-0.25a0.75 0.75 0 0 0 -1.5 0v0.25a0.5 0.5 0 0 1 -0.5 0.5H9.6a0.75 0.75 0 0 0 0 1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.25 11.13H23a0.5 0.5 0 0 1 -0.5 -0.5v-0.25a0.75 0.75 0 0 0 -1.5 0v0.25a0.5 0.5 0 0 1 -0.5 0.5h-0.25a0.75 0.75 0 0 0 0 1.5h0.25a0.5 0.5 0 0 1 0.5 0.5v0.25a0.75 0.75 0 1 0 1.5 0v-0.25a0.5 0.5 0 0 1 0.5 -0.5h0.25a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.25 3A2.25 2.25 0 0 1 21 0.75a0.75 0.75 0 0 0 -1.5 0A2.25 2.25 0 0 1 17.25 3a0.75 0.75 0 0 0 0 1.5 2.25 2.25 0 0 1 2.25 2.25 0.75 0.75 0 0 0 1.5 0 2.25 2.25 0 0 1 2.25 -2.25 0.75 0.75 0 0 0 0 -1.5m-2.48 0.94a2.57 2.57 0 0 0 -0.33 0.33 0.25 0.25 0 0 1 -0.38 0 2.57 2.57 0 0 0 -0.33 -0.33 0.25 0.25 0 0 1 0 -0.38 2.57 2.57 0 0 0 0.33 -0.33 0.25 0.25 0 0 1 0.38 0 2.57 2.57 0 0 0 0.33 0.33 0.25 0.25 0 0 1 0 0.38\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0.65 16.81h13.21a0.45 0.45 0 0 0 0.45 -0.51 0.86 0.86 0 0 0 -1 -0.74 1 1 0 0 1 -0.24 0 5.38 5.38 0 0 1 -5.35 -4.75 0.88 0.88 0 0 0 -0.9 -0.76 7.16 7.16 0 0 0 -6.74 6.1 0.59 0.59 0 0 0 0.13 0.46 0.57 0.57 0 0 0 0.44 0.2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13.8 18H0.58a0.58 0.58 0 0 0 -0.58 0.58v4.6a0.87 0.87 0 0 0 0.86 0.82H5a0.87 0.87 0 0 0 0.86 -0.86v-1.29a1.31 1.31 0 0 1 2.61 0v1.29a0.87 0.87 0 0 0 0.86 0.86h4.15a0.87 0.87 0 0 0 0.87 -0.86v-4.6a0.58 0.58 0 0 0 -0.55 -0.54\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13.14 6.59a0.87 0.87 0 0 0 -1.22 0 2.57 2.57 0 0 0 -0.76 1.83 2.62 2.62 0 0 0 0.22 1 0.58 0.58 0 0 1 -0.12 0.64l-1.47 1.51a0.57 0.57 0 0 0 -0.08 0.71 3.94 3.94 0 0 0 2.14 1.66 0.59 0.59 0 0 0 0.59 -0.14l1.26 -1.26a0.57 0.57 0 0 1 0.64 -0.12 2.63 2.63 0 0 0 2.87 -0.54 0.88 0.88 0 0 0 0 -1.22Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/find", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Monitor-Find--Streamline-Ultimate\"> <path fill=\"#000000\" d=\"M12.2627 0c-0.2706 0.212755 -0.5279 0.443406 -0.7656 0.695312 -0.3743 0.396698 -0.6981 0.835828 -0.9688 1.304688H3.00098c-0.55229 0 -1 0.44772 -1 1v13.25H22.001v-2.0801c0.3425 0.1496 0.7171 0.2227 1.0967 0.208 0.3141 -0.0122 0.6201 -0.0833 0.9033 -0.207V17c0 1.6567 -1.3434 2.9997 -3 3h-6.1006l0.375 2h1.2256c0.552 0.0003 1 0.4479 1 1s-0.448 0.9997 -1 1H7.50098c-0.55229 0 -1 -0.4477 -1 -1s0.44771 -1 1 -1h1.22558l0.375 -2H3.00098C1.34412 20 0.000976562 18.6569 0.000976562 17V3c0 -1.65685 1.343143438 -3 3.000003438 -3zm2.582 0.283203c0.8595 -0.28719603 1.7767 -0.3568119 2.6699 -0.2041014 0.8935 0.1527784 1.7359 0.5234344 2.4512 1.0800784 0.7153 0.55663 1.2818 1.28188 1.6494 2.11035 0.3676 0.82846 0.5243 1.73484 0.4571 2.63867 -0.0673 0.90388 -0.3566 1.77706 -0.8428 2.542 -0.0341 0.04256 -0.0527 0.09586 -0.0527 0.15039 0 0.05433 0.0188 0.10694 0.0527 0.14941l2.5303 2.4805c0.1636 0.1911 0.2488 0.437 0.2392 0.6884 -0.0097 0.2517 -0.1139 0.4909 -0.292 0.669 -0.178 0.178 -0.4164 0.2822 -0.6679 0.292 -0.2517 0.0097 -0.4982 -0.0755 -0.6895 -0.2393l-2.5098 -2.5097c-0.0425 -0.0341 -0.0958 -0.0528 -0.1503 -0.0528 -0.0545 0.0001 -0.1069 0.0187 -0.1495 0.0528 -0.7407 0.4743 -1.585 0.7636 -2.4609 0.8437 -0.876 0.08 -1.7587 -0.0525 -2.5732 -0.3848 -0.8146 -0.3322 -1.5374 -0.85536 -2.1075 -1.52535 -0.5701 -0.66998 -0.9713 -1.46699 -1.1689 -2.32422 -0.2044 -0.88301 -0.1871 -1.80288 0.0498 -2.67773 0.2369 -0.87487 0.6866 -1.67766 1.3086 -2.33691 0.622 -0.65918 1.3972 -1.1551 2.2568 -1.442387m3.0684 1.969727c-0.6392 -0.26798 -1.3442 -0.34079 -2.0244 -0.20801 -0.6801 0.13282 -1.3055 0.46462 -1.7969 0.95313 -0.4915 0.48867 -0.8272 1.11253 -0.9639 1.79199 -0.1366 0.67947 -0.068 1.38468 0.1963 2.02539 0.2643 0.64057 0.7132 1.18783 1.2891 1.57324 0.576 0.38548 1.2532 0.59179 1.9463 0.5918 0.9248 0.00001 1.8119 -0.3665 2.4677 -1.01856 0.6557 -0.65204 1.027 -1.5372 1.0323 -2.46191 0.0039 -0.69285 -0.1981 -1.37118 -0.5801 -1.94922 -0.3821 -0.57811 -0.9274 -1.02986 -1.5664 -1.29785M19.4883 0.824219v0.002929c-0.0212 -0.013165 -0.0421 -0.027165 -0.0635 -0.040039 0.0209 0.012593 0.0427 0.024227 0.0635 0.03711\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/cut", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Scissors--Streamline-Ultimate\"> <path d=\"M20.75 14.12a4 4 0 0 0 -3.43 0.72 11.73 11.73 0 0 0 -1.12 -2.72 0.26 0.26 0 0 1 0 -0.24 11.73 11.73 0 0 0 1.12 -2.72 4 4 0 0 0 3.43 0.71A4 4 0 0 0 19.51 2a4.06 4.06 0 0 0 -3.76 4 10 10 0 0 1 -1 4.28 0.25 0.25 0 0 1 -0.41 0A11.47 11.47 0 0 0 5.75 6.5c-1.06 0 -4.29 0.34 -5.3 1.1a0.5 0.5 0 0 0 0.16 0.88l11.63 3.28a0.25 0.25 0 0 1 0 0.48L0.61 15.52a0.5 0.5 0 0 0 -0.16 0.88c1 0.76 4.24 1.1 5.3 1.1a11.47 11.47 0 0 0 8.59 -3.86 0.25 0.25 0 0 1 0.41 0 10 10 0 0 1 1 4.28 4.06 4.06 0 0 0 3.76 4 4 4 0 0 0 1.24 -7.87Zm-1 5.88a2 2 0 1 1 2 -2 2 2 0 0 1 -2 2Zm0 -16a2 2 0 1 1 -2 2 2 2 0 0 1 2 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}];

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
