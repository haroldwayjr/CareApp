
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

const BATCH = [{"setName": "icon/actions/quote.reply", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Quote--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M23 2a1 1 0 1 0 0 -2H1a1 1 0 0 0 0 2h22ZM0 23a1 1 0 1 0 2 0l0 -11a1 1 0 1 0 -2 0v11Zm24 -11a1 1 0 0 1 -1 1H4.687a1 1 0 1 1 0 -2H23a1 1 0 0 1 1 1Zm-1 -4.5a1 1 0 1 0 0 -2l-22 0a1 1 0 0 0 0 2l22 0Zm1 10a1 1 0 0 1 -1 1H4.687a1 1 0 1 1 0 -2H23a1 1 0 0 1 1 1ZM23 24a1 1 0 1 0 0 -2H4.687a1 1 0 1 0 0 2H23Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/redo", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Redo--Streamline-Ultimate\"> <path d=\"M22.61 0.16a0.51 0.51 0 0 0 -0.55 0.11l-2.59 2.59a0.24 0.24 0 0 1 -0.29 0.05 12.54 12.54 0 0 0 -13 0.86 12.25 12.25 0 0 0 -0.08 19.86 1.25 1.25 0 0 0 0.73 0.24 1.22 1.22 0 0 0 1 -0.51 1.25 1.25 0 0 0 -0.27 -1.75 9.74 9.74 0 0 1 0.1 -15.8 10 10 0 0 1 9.46 -1.1 0.26 0.26 0 0 1 0.16 0.18 0.25 0.25 0 0 1 -0.07 0.22L15.37 7a0.49 0.49 0 0 0 -0.11 0.55 0.5 0.5 0 0 0 0.46 0.31h6.7a0.51 0.51 0 0 0 0.5 -0.5V0.62a0.51 0.51 0 0 0 -0.31 -0.46Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/refresh", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"M9.74 2.5a10.25 10.25 0 0 0-7.36 7.11.26.26 0 0 1-.27.18l-1-.13a.47.47 0 0 0-.47.22.47.47 0 0 0 0 .52l2.47 4.35a.51.51 0 0 0 .44.25.52.52 0 0 0 .36-.16l3.47-3.59a.48.48 0 0 0 .12-.51.5.5 0 0 0-.5-.33l-1.88-.24a.23.23 0 0 1-.12-.12.22.22 0 0 1 0-.21 7.67 7.67 0 0 1 5.37-4.9 7.23 7.23 0 0 1 7.1 2.25 1.25 1.25 0 1 0 1.87-1.66 9.72 9.72 0 0 0-9.6-3.03Z\" fill=\"#000000\"/><path d=\"M4.79 16.7a1.24 1.24 0 0 0-.11 1.76 9.72 9.72 0 0 0 9.55 3 10.24 10.24 0 0 0 7.37-7.12.24.24 0 0 1 .27-.17l1.06.12H23a.52.52 0 0 0 .42-.23.49.49 0 0 0 0-.52l-2.5-4.33a.51.51 0 0 0-.37-.21.52.52 0 0 0-.43.15l-3.45 3.62a.5.5 0 0 0-.11.51.49.49 0 0 0 .41.33l1.85.22A.25.25 0 0 1 19 14a.22.22 0 0 1 0 .21 7.67 7.67 0 0 1-5.36 4.9 7.26 7.26 0 0 1-7.11-2.25 1.24 1.24 0 0 0-1.74-.16Z\" fill=\"#000000\"/><path d=\"M9.49 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0\" fill=\"#000000\"/></g></svg>"}, {"setName": "icon/actions/remind", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"> <path fill=\"#000000\" d=\"M12.5 7.25c0.3205 0.00065 0.6337 0.09576 0.9004 0.27344 0.2668 0.17787 0.4757 0.43081 0.5996 0.72656v2.5c0 0.1326 0.0527 0.2597 0.1465 0.3535s0.2209 0.1465 0.3535 0.1465c0.1318 -0.0026 0.2574 -0.0562 0.3506 -0.1494s0.1468 -0.2188 0.1494 -0.3506V8.5c-0.0001 -0.06442 0.0248 -0.12629 0.0693 -0.17285 0.0448 -0.04661 0.1064 -0.07457 0.1709 -0.07715h0.25c0.3205 0.0007 0.6337 0.09573 0.9004 0.27344 0.2668 0.17787 0.4757 0.43081 0.5996 0.72656v2.4697c0 0.1326 0.0528 0.2598 0.1465 0.3535 0.0938 0.0938 0.2209 0.1465 0.3535 0.1465 0.1318 -0.0026 0.2575 -0.0562 0.3506 -0.1494s0.1469 -0.2189 0.1494 -0.3506V9.59961c0.0007 -0.03997 0.0102 -0.07913 0.0274 -0.11523 0.0172 -0.03624 0.0415 -0.06894 0.0722 -0.09473 0.036 -0.01693 0.0755 -0.02539 0.1153 -0.02539 0.0397 0.00001 0.0793 0.00847 0.1152 0.02539 0.4888 0.16423 0.9148 0.47557 1.2207 0.89065 0.306 0.4151 0.4771 0.9142 0.4893 1.4297v2.5996c-0.0045 0.9735 -0.1394 1.9429 -0.4004 2.8808l-1.749 6.086c-0.1233 0.4284 -0.5152 0.7236 -0.961 0.7236H7.55957c-0.27594 -0.0002 -0.5 -0.224 -0.5 -0.5V22l-1.73926 -1.7305C4.47713 19.4258 4.00215 18.2827 4 17.0898V14.25c0.00205 -0.5865 0.15153 -1.1631 0.43457 -1.6768 0.28307 -0.5137 0.6908 -0.9486 1.18555 -1.2636 0.03717 -0.024 0.08075 -0.0362 0.125 -0.0362 0.04427 0.0001 0.08782 0.0121 0.125 0.0362 0.03939 0.019 0.07267 0.0497 0.0957 0.0869 0.02278 0.037 0.03463 0.0796 0.03418 0.123v4.8203c0 0.1326 0.05277 0.2598 0.14648 0.3536 0.09377 0.0937 0.22091 0.1464 0.35352 0.1464s0.25975 -0.0527 0.35352 -0.1464c0.09371 -0.0938 0.14648 -0.221 0.14648 -0.3536v-5.8281c0.00014 -0.077 0.03569 -0.1499 0.0957 -0.1982 0.48685 -0.39148 0.8685 -0.80589 1.13282 -1.12307 0.16613 -0.19936 0.31737 -0.39659 0.45214 -0.58398 0.04756 -0.06613 0.12364 -0.10641 0.20508 -0.10645H10.75c0.1381 0 0.25 0.11193 0.25 0.25v2c0 0.1326 0.0527 0.2597 0.1465 0.3535s0.2209 0.1465 0.3535 0.1465c0.1318 -0.0026 0.2574 -0.0562 0.3506 -0.1494s0.1468 -0.2188 0.1494 -0.3506V7.5c0 -0.0663 0.0264 -0.12987 0.0732 -0.17676 0.0469 -0.04688 0.1105 -0.07324 0.1768 -0.07324zM9 0.75c0.53043 0 1.039 0.210865 1.4141 0.58594 0.375 0.37507 0.5859 0.88363 0.5859 1.41406v4c0 0.13807 -0.1119 0.25 -0.25 0.25H7.9375c-0.02054 0.03445 -0.04046 0.07171 -0.06348 0.10938 -0.1848 0.30241 -0.45546 0.71022 -0.79785 1.12109C6.43122 9.00436 5.361 10 4 10c-1.24264 0 -2.25 -1.00736 -2.25 -2.25 0 -0.57681 0.21831 -1.1018 0.5752 -1.5 -0.35689 -0.3982 -0.5752 -0.92319 -0.5752 -1.5C1.75 3.50736 2.75736 2.5 4 2.5c1.30978 0 2.3487 0.92345 3 1.68262V2.75c0 -0.53043 0.21087 -1.03899 0.58594 -1.41406C7.96101 0.960865 8.46957 0.75 9 0.75M4 7c-0.41421 0 -0.75 0.33579 -0.75 0.75s0.33579 0.75 0.75 0.75c0.63889 0 1.31876 -0.50438 1.92383 -1.23047 0.07499 -0.09 0.14575 -0.18061 0.21289 -0.26953zm0 -3c-0.41421 0 -0.75 0.33579 -0.75 0.75s0.33579 0.75 0.75 0.75h2.13672c-0.06714 -0.08892 -0.1379 -0.17953 -0.21289 -0.26953C5.31876 4.50438 4.63889 4 4 4\" stroke-width=\"1\"></path> </svg>"}];
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
