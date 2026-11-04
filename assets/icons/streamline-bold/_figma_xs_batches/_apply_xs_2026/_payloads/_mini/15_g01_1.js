
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

const BATCH = [{"setName": "icon/status/bell", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Alarm-Bell--Streamline-Ultimate\"> <path fill=\"#000000\" d=\"M14.4111 21.002c0.2591 0.0002 0.5 0.1344 0.6368 0.3544 0.1366 0.2202 0.1498 0.4953 0.0351 0.7276 -0.238 0.4818 -0.5869 0.904 -1.0215 1.2295 -0.5945 0.4451 -1.3178 0.6864 -2.0605 0.6865 -0.7428 0 -1.4659 -0.2414 -2.06057 -0.6865 -0.43473 -0.3255 -0.78441 -0.7476 -1.02246 -1.2295 -0.11467 -0.2324 -0.1006 -0.5074 0.03613 -0.7276 0.13686 -0.2201 0.37749 -0.3544 0.63672 -0.3544zM12 0c0.5523 0 1 0.447715 1 1v1.3125c1.8195 0.2221 3.5244 1.04398 4.834 2.35352C19.3812 6.21319 20.25 8.31196 20.25 10.5c0 2.8965 0.367 4.8897 0.7217 6.1406 0.1774 0.6257 0.3523 1.067 0.4775 1.3438 0.0626 0.1382 0.1124 0.2358 0.1446 0.2949 0.016 0.0295 0.0278 0.0499 0.0341 0.0605 0.001 0.0016 0.0023 0.0028 0.003 0.004l0.0488 0.0898c0.0996 0.214 0.0934 0.465 -0.0215 0.6758 -0.1315 0.2408 -0.3838 0.3906 -0.6582 0.3906H3c-0.27435 0 -0.52674 -0.1498 -0.6582 -0.3906 -0.13141 -0.241 -0.12125 -0.5349 0.02734 -0.7656 0.00071 -0.0012 0.00198 -0.0024 0.00293 -0.004 0.00632 -0.0106 0.01809 -0.031 0.03418 -0.0605 0.03218 -0.0591 0.08199 -0.1567 0.14453 -0.2949 0.12521 -0.2768 0.3001 -0.7181 0.47754 -1.3438 0.35472 -1.2509 0.72168 -3.2441 0.72168 -6.1406 0 -2.18803 0.86884 -4.28681 2.41602 -5.83398C7.47555 3.35648 9.18047 2.5346 11 2.3125V1c0 -0.552282 0.4477 -0.9999952323 1 -1\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/status/blocked", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Tags-Block--Streamline-Ultimate\"> <g> <path d=\"M9.25 17a7.34 7.34 0 0 1 2.07 -4.73c2.68 -2.88 5 -3.27 7.08 -3a0.54 0.54 0 0 0 0.43 -0.14l0.52 -0.54a4 4 0 0 0 1 -2.41v-4a2 2 0 0 0 -0.6 -1.35 2 2 0 0 0 -1.41 -0.58h-4.26a4 4 0 0 0 -2.42 1L0.84 12.08a2 2 0 0 0 0 2.83l4.83 4.84a2 2 0 0 0 1.42 0.58 1.92 1.92 0 0 0 1.41 -0.6l0.73 -0.73a0.48 0.48 0 0 0 0.13 -0.43A8.62 8.62 0 0 1 9.25 17m3.59 -11.25a2 2 0 1 1 2 2 2 2 0 0 1 -2 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.25 10.75a6.5 6.5 0 1 0 6.5 6.5 6.51 6.51 0 0 0 -6.5 -6.5m0 11a4.51 4.51 0 0 1 -2.1 -0.53A0.29 0.29 0 0 1 15 21a0.27 0.27 0 0 1 0.07 -0.21l5.73 -5.73A0.28 0.28 0 0 1 21 15a0.26 0.26 0 0 1 0.19 0.13 4.48 4.48 0 0 1 -4 6.6Zm2.1 -8.47a0.26 0.26 0 0 1 0.13 0.19 0.28 0.28 0 0 1 -0.07 0.21l-5.73 5.73a0.28 0.28 0 0 1 -0.21 0.07 0.29 0.29 0 0 1 -0.19 -0.13 4.48 4.48 0 0 1 6.07 -6.07\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
