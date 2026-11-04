
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

const BATCH = [{"setName": "icon/commerce/discount", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Discount--Streamline-Ultimate\"> <g> <path d=\"M0.5 4.5a4 4 0 1 0 8 0 4 4 0 1 0 -8 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M15.5 19.5a4 4 0 1 0 8 0 4 4 0 1 0 -8 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.41 1.59a2 2 0 0 0 -2.82 0l-18 18a2 2 0 0 0 0 2.82 2 2 0 0 0 2.82 0l18 -18a2 2 0 0 0 0 -2.82\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/commerce/dollar", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Currency-Dollar--Streamline-Ultimate\"> <path d=\"M18.13 16.1a4.79 4.79 0 0 0 -3 -4.47l-5.1 -2a1.82 1.82 0 0 1 0.67 -3.5h5a1.5 1.5 0 0 0 0 -3h-2a0.25 0.25 0 0 1 -0.25 -0.25V1.5a1.5 1.5 0 0 0 -3 0v1.37a0.25 0.25 0 0 1 -0.23 0.25 4.81 4.81 0 0 0 -1.38 9.25l5.1 2a1.82 1.82 0 0 1 -0.67 3.5h-5a1.5 1.5 0 1 0 0 3h2a0.25 0.25 0 0 1 0.25 0.25v1.38a1.5 1.5 0 0 0 3 0v-1.37a0.25 0.25 0 0 1 0.23 -0.25 4.81 4.81 0 0 0 4.38 -4.78\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/commerce/gift", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Gift-Box--Streamline-Ultimate\"> <g> <path d=\"M13 12a0.5 0.5 0 0 0 0.5 0.5H22a1.76 1.76 0 0 0 1.75 -1.75v-2A1.75 1.75 0 0 0 22 7h-8.5a0.5 0.5 0 0 0 -0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M3.75 12.5H11a0.5 0.5 0 0 0 0.5 -0.5V7.5A0.5 0.5 0 0 0 11 7H2A1.75 1.75 0 0 0 0.25 8.75v2A1.76 1.76 0 0 0 2 12.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.5 14.5a0.5 0.5 0 0 0 -0.5 -0.5H2.75a0.5 0.5 0 0 0 -0.5 0.5v7.75A1.76 1.76 0 0 0 4 24h7a0.5 0.5 0 0 0 0.5 -0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13.5 14a0.5 0.5 0 0 0 -0.5 0.5v9a0.5 0.5 0 0 0 0.5 0.5H20a1.76 1.76 0 0 0 1.75 -1.75V14.5a0.5 0.5 0 0 0 -0.5 -0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13 6.71A1 1 0 0 0 14 7c1.18 -0.29 4 -1 4.89 -1.92A3 3 0 0 0 14.7 0.86c-0.75 0.76 -1.48 3.08 -1.92 4.9a1 1 0 0 0 0.22 0.95m3.08 -4.43a1 1 0 1 1 1.35 1.35 8.79 8.79 0 0 1 -2.28 0.93 8.79 8.79 0 0 1 0.97 -2.28Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.72 5.76c-0.44 -1.82 -1.17 -4.14 -1.92 -4.9a3 3 0 1 0 -4.18 4.19c0.86 0.87 3.71 1.63 4.89 1.92a1 1 0 0 0 1 -0.26 1 1 0 0 0 0.21 -0.95M7 3.63a1 1 0 0 1 1.38 -1.35 8.79 8.79 0 0 1 0.93 2.28A8.79 8.79 0 0 1 7 3.63\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/commerce/invoice", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Accounting-Invoice--Streamline-Ultimate\"> <path fill=\"#000000\" d=\"M14.25 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75H4.25c-1.51878 0 -2.75 -1.2312 -2.75 -2.75V2.75C1.5 1.23122 2.73122 0 4.25 0h10zm-3.4912 14.4092H17c0.4039 0 0.75 -0.3159 0.75 -0.7285v-2.7022c-0.0001 -0.4125 -0.3462 -0.7285 -0.75 -0.7285h-6.2412zM7 16.25c-0.40379 0 -0.74989 0.316 -0.75 0.7285v2.7022c0 0.4126 0.34615 0.7285 0.75 0.7285h2.25879V16.25zm0.79199 -12.5c-0.41421 0 -0.75 0.33579 -0.75 0.75v0.26172c-0.40764 0.04268 -0.79583 0.20388 -1.11426 0.4668 -0.3745 0.30927 -0.62951 0.73992 -0.72168 1.21679 -0.09208 0.47679 -0.01544 0.971 0.2168 1.39746 0.2323 0.42643 0.60614 0.75917 1.05664 0.94043h0.00098l2.06348 0.8252c0.12723 0.05136 0.23222 0.14609 0.29785 0.2666 0.06572 0.1207 0.0876 0.2606 0.06152 0.3955 -0.02609 0.1348 -0.09828 0.2563 -0.2041 0.3438 -0.10598 0.0875 -0.23951 0.1356 -0.37695 0.1357H6.28809c-0.41422 0 -0.75 0.3358 -0.75 0.75s0.33578 0.75 0.75 0.75h0.7539v0.25c0 0.4142 0.33579 0.75 0.75 0.75 0.41422 0 0.75 -0.3358 0.75 -0.75v-0.2627c0.40689 -0.043 0.79434 -0.2033 1.11231 -0.4658 0.3745 -0.3093 0.6295 -0.7399 0.7217 -1.2168 0.0921 -0.4768 0.0154 -0.97101 -0.2168 -1.39747 -0.23232 -0.42642 -0.60617 -0.75917 -1.05666 -0.94043h-0.00098l-2.06445 -0.82618c-0.1267 -0.05146 -0.23146 -0.14549 -0.29688 -0.26562 -0.06572 -0.1207 -0.0876 -0.26057 -0.06152 -0.39551 0.02609 -0.13479 0.09829 -0.25628 0.2041 -0.34375 0.07938 -0.06555 0.17416 -0.10929 0.27442 -0.12695L7.25977 6.25h2.02832c0.41419 -0.00003 0.75001 -0.3358 0.75001 -0.75s-0.33582 -0.74997 -0.75001 -0.75h-0.7461V4.5c0 -0.41421 -0.33578 -0.75 -0.75 -0.75M15.8066 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875H16.5c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973C15.8291 6.38962 15.75 6.19891 15.75 6V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/commerce/payment", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Credit-Card-Payment--Streamline-Ultimate\"> <g> <path d=\"M3.93 5.6a1 1 0 0 0 1 -1V3.05A0.24 0.24 0 0 1 5 2.84a0.25 0.25 0 0 1 0.25 0l0.18 0.09a1 1 0 0 0 1 -0.06l0.78 -0.53a0.28 0.28 0 0 1 0.28 0l0.79 0.53a1 1 0 0 0 1 0.06l0.18 -0.09a0.23 0.23 0 0 1 0.24 0 0.24 0.24 0 0 1 0.12 0.21v1.57a1 1 0 1 0 2 0V1.85A1.47 1.47 0 0 0 9.63 0.54L9 0.85a0.25 0.25 0 0 1 -0.25 0L8.16 0.43a1.45 1.45 0 0 0 -1.62 0l-0.61 0.4a0.25 0.25 0 0 1 -0.25 0L5.07 0.54A1.47 1.47 0 0 0 3 1.85v2.77a1 1 0 0 0 0.93 0.98\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M22.5 2.29h-3.64a0.25 0.25 0 0 0 -0.25 0.25V12.8a0.25 0.25 0 0 0 0.25 0.25h3.64a1 1 0 0 0 1 -1V3.29a1 1 0 0 0 -1 -1M22 5.71a0.49 0.49 0 0 1 -1 0V4.24a0.49 0.49 0 0 1 1 0Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.63 2.54a0.25 0.25 0 0 0 -0.25 -0.25h-0.71a1 1 0 0 0 -1 1v8.76a1 1 0 0 0 1 1h0.71a0.25 0.25 0 0 0 0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M21.54 19.41h-0.73a0.25 0.25 0 0 1 -0.25 -0.25V16a1 1 0 1 0 -1.95 0v3.17a0.25 0.25 0 0 1 -0.25 0.25h-0.73a0.5 0.5 0 0 0 -0.35 0.84l2 2a0.5 0.5 0 0 0 0.35 0.14 0.49 0.49 0 0 0 0.34 -0.14l2 -2a0.5 0.5 0 0 0 -0.35 -0.84Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.27 6.33H3.44A2.94 2.94 0 0 0 0.5 9.27v11.61a2.87 2.87 0 0 0 2.79 2.94h8.13a2.87 2.87 0 0 0 2.78 -2.94V9.27a2.94 2.94 0 0 0 -2.93 -2.94m0.49 14h-1a0.74 0.74 0 1 1 0 -1.47h1a0.74 0.74 0 0 1 0 1.47m-3.92 -3.48h-1a0.73 0.73 0 1 1 0 -1.46h1a0.73 0.73 0 1 1 0 1.46m0.73 2.7a0.73 0.73 0 0 1 -0.73 0.73h-1a0.74 0.74 0 0 1 0 -1.47h1a0.73 0.73 0 0 1 0.73 0.74M3 15.39h1a0.73 0.73 0 0 1 0 1.46H3a0.73 0.73 0 1 1 0 -1.46m0 3.42h1a0.74 0.74 0 0 1 0 1.47H3a0.74 0.74 0 1 1 0 -1.47m8.81 -2h-1a0.73 0.73 0 1 1 0 -1.46h1a0.73 0.73 0 1 1 0 1.46M2.46 9.27a1 1 0 0 1 1 -1h7.83a1 1 0 0 1 1 1v1.94a1 1 0 0 1 -1 1H3.46a1 1 0 0 1 -1 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
