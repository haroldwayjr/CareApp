
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

const BATCH = [{"setName": "icon/comms/reply", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Email-Action-Reply--Streamline-Ultimate\"> <path d=\"M19.62 10.68c-3 -2.67 -7.13 -2.85 -8.86 -2.79a0.29 0.29 0 0 1 -0.18 -0.07 0.27 0.27 0 0 1 -0.08 -0.18V5.06a1 1 0 0 0 -0.57 -0.9 1 1 0 0 0 -1.07 0.14l-7.5 6.37a1 1 0 0 0 -0.36 0.77 1 1 0 0 0 0.35 0.76l7.51 6.63a1 1 0 0 0 1.64 -0.77V15a0.26 0.26 0 0 1 0.2 -0.25c1.91 -0.4 8.13 -1.15 11.36 4.89a0.5 0.5 0 0 0 0.94 -0.23c0 -3.79 -1.14 -6.74 -3.38 -8.73\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/comms/reply.all", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Email-Action-Reply-All--Streamline-Ultimate\"> <g> <path d=\"M20.82 10.74A10.65 10.65 0 0 0 14.24 8a0.24 0.24 0 0 1 -0.24 -0.23V5.56a1 1 0 0 0 -1.63 -0.75l-6.93 5.93a1 1 0 0 0 0 1.52l7 6a0.94 0.94 0 0 0 1 0.14 1 1 0 0 0 0.57 -0.88v-2.47a0.24 0.24 0 0 1 0.19 -0.24c1.47 -0.4 5.84 -1 8.86 4.92a0.51 0.51 0 0 0 0.57 0.26 0.51 0.51 0 0 0 0.37 -0.49c0 -3.81 -1.07 -6.76 -3.18 -8.76\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"m2.29 11.5 7 -5.73A1 1 0 0 0 8 4.23L0.55 10.34a1.5 1.5 0 0 0 0 2.32l7.25 6a1 1 0 1 0 1.27 -1.54Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/comms/send", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Send-Email-2--Streamline-Ultimate\"> <g> <path d=\"M23 0.64a0.49 0.49 0 0 0 -0.17 -0.51 0.51 0.51 0 0 0 -0.54 0L1.78 10.82A1.45 1.45 0 0 0 1 12.05a1.48 1.48 0 0 0 0.68 1.3l4.56 2.88a0.24 0.24 0 0 0 0.3 0L18.7 5.34a0.25 0.25 0 0 1 0.37 0.34L9.35 17.86a0.25 0.25 0 0 0 -0.06 0.2 0.3 0.3 0 0 0 0.12 0.17l6.43 4.07a1.48 1.48 0 0 0 1.32 0.11 1.43 1.43 0 0 0 0.87 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M7.88 19.18a0.25 0.25 0 0 0 -0.25 0 0.26 0.26 0 0 0 -0.13 0.22V23a1 1 0 0 0 1 1 1 1 0 0 0 0.71 -0.3l2 -2a0.27 0.27 0 0 0 0.07 -0.21 0.25 0.25 0 0 0 -0.12 -0.18Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/comms/team", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Team-Idea--Streamline-Ultimate\"> <g> <path d=\"M9.9 10.2a0.26 0.26 0 0 1 0.1 0.2v0.6a0.5 0.5 0 0 0 0.5 0.5h3a0.5 0.5 0 0 0 0.5 -0.5v-0.6a0.26 0.26 0 0 1 0.1 -0.2 3.4 3.4 0 0 0 1.4 -2.7A3.6 3.6 0 0 0 12 4a3.6 3.6 0 0 0 -3.5 3.5 3.4 3.4 0 0 0 1.4 2.7\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 3a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v1a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.41 3.5a1 1 0 0 0 0 -1.41 1 1 0 0 0 -1.41 0l-0.71 0.7a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M18.5 8.5a1 1 0 0 0 0 -2h-1a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.71 2.79 8 2.09a1 1 0 0 0 -1.41 0 1 1 0 0 0 0 1.41l0.7 0.71a1 1 0 0 0 1.42 0 1 1 0 0 0 0 -1.42\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6.5 6.5h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11 14.25h2a0.75 0.75 0 0 0 0 -1.5h-2a0.75 0.75 0 0 0 0 1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3.5 20.4a2.2 2.2 0 1 0 -2.2 -2.2 2.19 2.19 0 0 0 2.2 2.2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M0.33 24a0.28 0.28 0 0 1 -0.21 -0.1 0.27 0.27 0 0 1 0 -0.23A3.6 3.6 0 0 1 3.5 21.2a3.6 3.6 0 0 1 3.41 2.47 0.27 0.27 0 0 1 0 0.23 0.28 0.28 0 0 1 -0.21 0.1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12 20.4a2.2 2.2 0 1 0 -2.2 -2.2 2.19 2.19 0 0 0 2.2 2.2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20.5 20.4a2.2 2.2 0 1 0 -2.2 -2.2 2.19 2.19 0 0 0 2.2 2.2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M8.83 24a0.28 0.28 0 0 1 -0.21 -0.1 0.27 0.27 0 0 1 0 -0.23A3.6 3.6 0 0 1 12 21.2a3.6 3.6 0 0 1 3.41 2.47 0.27 0.27 0 0 1 0 0.23 0.28 0.28 0 0 1 -0.21 0.1Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.33 24a0.28 0.28 0 0 1 -0.21 -0.1 0.27 0.27 0 0 1 0 -0.23 3.6 3.6 0 0 1 3.38 -2.47 3.6 3.6 0 0 1 3.41 2.47 0.27 0.27 0 0 1 0 0.23 0.28 0.28 0 0 1 -0.21 0.1Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/comms/user", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"User-Story--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M10.2689 2.1868c0.5616 -0.09831 1.1399 -0.14969 1.7311 -0.14969s1.1695 0.05138 1.7311 0.14969c0.544 0.09524 1.0622 -0.26857 1.1574 -0.81258C14.9838 0.830212 14.62 0.311998 14.076 0.216759 13.401 0.0986009 12.7073 0.0371094 12 0.0371094S10.599 0.0986009 9.92404 0.216759c-0.54402 0.095239 -0.90782 0.613453 -0.81258 1.157461 0.09524 0.54401 0.61346 0.90782 1.15744 0.81258m7.6043 -0.61096c-0.481 -0.2715 -1.091 -0.10172 -1.3625 0.37922s-0.1017 1.09092 0.3792 1.36242c3.0306 1.71081 5.073 4.95879 5.073 8.68252 0 5.5024 -4.4605 9.9629 -9.9629 9.9629 -4.32199 0 -8.00363 -2.7526 -9.3826 -6.6035 -0.18619 -0.52 -0.75863 -0.7905 -1.27859 -0.6043 -0.519951 0.1862 -0.790519 0.7586 -0.604329 1.2785C2.38917 20.6545 6.80695 23.9629 12 23.9629c6.6069 0 11.9629 -5.356 11.9629 -11.9629 0 -4.47411 -2.4566 -8.37315 -6.0897 -10.42416M6.92127 3.4268c0.47487 -0.28198 0.63124 -0.89553 0.34926 -1.3704 -0.28198 -0.47488 -0.89554 -0.63125 -1.37041 -0.34927 -1.17313 0.69661 -2.21653 1.58777 -3.08605 2.62893 -0.35401 0.4239 -0.29736 1.05453 0.12654 1.40854 0.4239 0.35402 1.05453 0.29737 1.40854 -0.12653 0.72508 -0.86822 1.59498 -1.61104 2.57212 -2.19127M2.6174 8.64061c0.18619 -0.51995 -0.08438 -1.0924 -0.60433 -1.27859 -0.51996 -0.18619 -1.092399 0.08438 -1.278589 0.60433C0.282736 9.22789 0.0371094 10.5864 0.0371094 12c0 0.5523 0.4477156 1 1.0000006 1 0.55228 0 1 -0.4477 1 -1 0 -1.1806 0.20492 -2.31114 0.58029 -3.35939M19.7012 12c0 4.2532 -3.448 7.7012 -7.7012 7.7012 -4.25324 0 -7.70117 -3.448 -7.70117 -7.7012 0 -4.25324 3.44793 -7.70117 7.70117 -7.70117 4.2532 0 7.7012 3.44793 7.7012 7.70117m-5.7073 -2.62416c0 1.10076 -0.8923 1.99306 -1.9931 1.99306 -1.1007 0 -1.993 -0.8923 -1.993 -1.99306 0 -1.10072 0.8923 -1.99303 1.993 -1.99303 1.1008 0 1.9931 0.89231 1.9931 1.99303m1.8728 4.99706c-0.8386 -1.2619 -2.2731 -2.1112 -3.8668 -2.1112 -1.5938 0 -3.02829 0.8493 -3.8669 2.1112 -0.37186 0.5596 0.10254 1.2165 0.7744 1.2165h6.1849c0.6719 0 1.1463 -0.6569 0.7744 -1.2165\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
