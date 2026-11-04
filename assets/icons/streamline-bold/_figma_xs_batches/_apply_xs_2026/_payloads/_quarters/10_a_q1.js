
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

const BATCH = [{"setName": "icon/actions/select.all", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Select-All--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M21.9161 23.916c1.1046 0 2 -0.8954 2 -2v-1.6526c0 -0.5523 -0.4477 -1 -1 -1 -0.5522 0 -1 0.4477 -1 1v1.6526h-1.6526c-0.5523 0 -1 0.4477 -1 1s0.4477 1 1 1h1.6526Zm-4.9579 0c0.5522 0 1 -0.4477 1 -1s-0.4478 -1 -1 -1h-3.3054c-0.5522 0 -1 0.4477 -1 1s0.4478 1 1 1h3.3054Zm-6.6107 0c0.5523 0 1 -0.4477 1 -1s-0.4477 -1 -1 -1H7.04221c-0.55229 0 -1 0.4477 -1 1s0.44771 1 1 1h3.30529Zm-6.61061 0c0.55228 0 1 -0.4477 1 -1s-0.44772 -1 -1 -1H2.08423l0 -1.6526c0 -0.5523 -0.44772 -1 -1 -1 -0.552288 0 -1.0000015 0.4477 -1.0000015 1v1.6526c0 1.1046 0.8954295 2 2.0000015 2h1.65266Zm18.17921 -6.958c0 0.5523 0.4478 1 1 1 0.5523 0 1 -0.4477 1 -1v-3.3053c0 -0.5523 -0.4477 -1 -1 -1 -0.5522 0 -1 0.4477 -1 1v3.3053Zm-21.8318715 0c0 0.5523 0.4477135 1 1.0000015 1 0.55228 0 1 -0.4477 1 -1v-3.3053c0 -0.5523 -0.44772 -1 -1 -1 -0.552288 0 -1.0000015 0.4477 -1.0000015 1v3.3053ZM21.9161 10.3474c0 0.5523 0.4478 1 1 1 0.5523 0 1 -0.4477 1 -1V7.04208c0 -0.55228 -0.4477 -1 -1 -1 -0.5522 0 -1 0.44772 -1 1v3.30532Zm-21.8318715 0c0 0.5523 0.4477135 1 1.0000015 1 0.55228 0 1 -0.4477 1 -1V7.04208c0 -0.55228 -0.44772 -1 -1 -1 -0.552288 0 -1.0000015 0.44772 -1.0000015 1v3.30532ZM21.9161 3.73676c0 0.55229 0.4478 1 1 1 0.5523 0 1 -0.44771 1 -1V2.08411c0 -1.104572 -0.8954 -2.0000036 -2 -2.0000036h-1.6526c-0.5523 0 -1 0.4477156 -1 1.0000036 0 0.55228 0.4477 1 1 1h1.6526v1.65265Zm-21.8318715 0c0 0.55229 0.4477135 1 1.0000015 1 0.55228 0 1 -0.44771 1 -1V2.08411h1.65266c0.55228 0 1 -0.44772 1 -1 0 -0.552288 -0.44772 -1.0000036 -1 -1.0000036H2.08423C0.979658 0.0841064 0.0842285 0.979536 0.0842285 2.08411v1.65265ZM16.9582 2.08411c0.5522 0 1 -0.44772 1 -1 0 -0.552288 -0.4478 -1.0000036 -1 -1.0000036h-3.3054c-0.5522 0 -1 0.4477156 -1 1.0000036 0 0.55228 0.4478 1 1 1h3.3054Zm-6.6107 0c0.5523 0 1 -0.44772 1 -1 0 -0.552288 -0.4477 -1.0000036 -1 -1.0000036H7.0422c-0.55228 0 -1 0.4477156 -1 1.0000036 0 0.55228 0.44772 1 1 1h3.3053Zm9.0198 15.78229c0 0.8284 -0.6716 1.5 -1.5 1.5H6.13464c-0.82843 0 -1.5 -0.6716 -1.5 -1.5V6.13372c0 -0.82842 0.67157 -1.5 1.5 -1.5H17.8673c0.8284 0 1.5 0.67158 1.5 1.5V17.8664Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/send.alt", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Send-Email--Streamline-Ultimate\"> <path d=\"M23.82 1.12a0.5 0.5 0 0 0 -0.51 -0.12l-23 9.5A0.5 0.5 0 0 0 0 11a0.51 0.51 0 0 0 0.32 0.46l6.33 2.45a0.52 0.52 0 0 0 0.47 -0.05l8.4 -6a0.5 0.5 0 0 1 0.64 0.77l-7 6.75a0.51 0.51 0 0 0 -0.15 0.36v6.76a0.49 0.49 0 0 0 0.37 0.48 0.49 0.49 0 0 0 0.56 -0.23l3.17 -5.42a0.25 0.25 0 0 1 0.33 -0.1l5.83 3.21a0.5 0.5 0 0 0 0.73 -0.33l4 -18.5a0.5 0.5 0 0 0 -0.18 -0.49\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/share", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Share--Streamline-Ultimate\"> <path d=\"M19 14a5 5 0 0 0 -3.59 1.53l-5.49 -2.75A4.91 4.91 0 0 0 10 12a4.91 4.91 0 0 0 -0.08 -0.78l5.49 -2.75A5 5 0 1 0 14 5a4.91 4.91 0 0 0 0.08 0.78L8.59 8.53a5 5 0 1 0 0 6.94l5.49 2.75A4.91 4.91 0 0 0 14 19a5 5 0 1 0 5 -5Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/actions/share.alt", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Share-3--Streamline-Ultimate\"> <g> <path d=\"M12.76 10.25a2.64 2.64 0 0 0 -2.51 1.83 2 2 0 0 1 -3.59 0.5 7.25 7.25 0 0 1 -1.16 -4 6.81 6.81 0 0 1 0.18 -1.57 0.31 0.31 0 0 0 0 -0.21 0.25 0.25 0 0 0 -0.2 -0.09H2a2 2 0 0 0 -2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2 -2V10.5a0.25 0.25 0 0 0 -0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M19.37 0.41a0.51 0.51 0 0 0 -0.55 -0.13 0.51 0.51 0 0 0 -0.32 0.47V2.5a0.25 0.25 0 0 1 -0.25 0.25h-5.37A5.88 5.88 0 0 0 7 8.62a5.74 5.74 0 0 0 0.92 3.14 0.51 0.51 0 0 0 0.9 -0.12 4.15 4.15 0 0 1 3.94 -2.89h5.49a0.25 0.25 0 0 1 0.25 0.25v1.75a0.51 0.51 0 0 0 0.32 0.47 0.5 0.5 0 0 0 0.55 -0.14l4.5 -5a0.5 0.5 0 0 0 0 -0.67Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/actions/snooze", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Snooze-Return-Repeat--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M12.048 2.938c-2.902 0 -5.783 1.743 -7.602 4.102l1.347 0.815a1 1 0 0 1 -0.288 1.829l-3.275 0.77a0.995 0.995 0 0 1 -0.98 -0.292 1.006 1.006 0 0 1 -0.234 -0.435L0.149 6.451a1 1 0 0 1 1.484 -1.112l1.095 0.662C4.877 3.111 8.367 0.938 12.048 0.938c4.796 0 8.826 3.088 10.415 7.22a1 1 0 0 1 -1.866 0.718c-1.313 -3.414 -4.637 -5.938 -8.549 -5.938Zm10.313 10.64a0.993 0.993 0 0 0 -0.616 -0.026l-3.277 0.868a1 1 0 0 0 -0.261 1.822l1.357 0.82c-1.782 2.328 -4.65 4 -7.612 4 -3.912 0 -7.236 -2.524 -8.549 -5.938a1 1 0 1 0 -1.866 0.718c1.589 4.132 5.619 7.22 10.415 7.22 3.712 0 7.205 -2.079 9.33 -4.96l1.085 0.656a1 1 0 0 0 1.486 -1.105l-0.866 -3.37a0.997 0.997 0 0 0 -0.626 -0.705ZM11.489 8.715a1 1 0 0 0 -2 0v5.8a1 1 0 0 0 1 1h4a1 1 0 0 0 0 -2h-3v-4.8Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
