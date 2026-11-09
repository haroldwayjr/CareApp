
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

const BATCH = [{"setName": "icon/health/waiting.room", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Waiting-Room-Lamp--Streamline-Ultimate\"> <g> <path d=\"M5 7.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0 -5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M13.24 17h-2.89a0.5 0.5 0 0 1 -0.5 -0.46c0 -0.05 -0.37 -3.31 -0.37 -3.31a1.5 1.5 0 0 0 -3 0.54l0.35 3.09A3.52 3.52 0 0 0 10.35 20h2.89a1.5 1.5 0 0 1 1.49 1.38l0.27 2.17a0.52 0.52 0 0 0 0.5 0.45h2a0.5 0.5 0 0 0 0.37 -0.17 0.52 0.52 0 0 0 0.13 -0.38l-0.24 -2.32A4.52 4.52 0 0 0 13.24 17\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M12.5 21.5H8.75a3.52 3.52 0 0 1 -3.43 -2.76l-0.68 -4a1.5 1.5 0 0 0 -1.48 -1.24H1.5a0.5 0.5 0 0 0 -0.5 0.5v9.5a0.5 0.5 0 0 0 0.5 0.5h11.19a0.48 0.48 0 0 0 0.37 -0.17 0.47 0.47 0 0 0 0.12 -0.39l-0.18 -1.5a0.51 0.51 0 0 0 -0.5 -0.44\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20 3.14V1a1 1 0 0 0 -2 0v2.14A4 4 0 0 0 15 7v0.5a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1V7a4 4 0 0 0 -3 -3.86\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/health/weight.scale", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Diet-Scale--Streamline-Ultimate\"> <path d=\"M23.44 5.08a1.49 1.49 0 0 0 -0.55 -1.32A17.2 17.2 0 0 0 12 0 17.2 17.2 0 0 0 1.11 3.76a1.47 1.47 0 0 0 -0.55 1.32l1.85 17.58A1.5 1.5 0 0 0 3.9 24h16.2a1.5 1.5 0 0 0 1.49 -1.34ZM20.5 8.5a0.5 0.5 0 0 1 -0.5 0.5h-6.28a0.5 0.5 0 0 1 -0.47 -0.34l-0.78 -2.32a0.51 0.51 0 0 0 -0.94 0l-0.78 2.32a0.49 0.49 0 0 1 -0.47 0.34H4a0.5 0.5 0 0 1 -0.5 -0.5V5.37A0.5 0.5 0 0 1 3.73 5 14.22 14.22 0 0 1 5.8 3.83a0.47 0.47 0 0 1 0.4 0 0.46 0.46 0 0 1 0.27 0.29l0.74 2.08a0.75 0.75 0 0 0 0.71 0.5 0.73 0.73 0 0 0 0.25 0 0.76 0.76 0 0 0 0.46 -1l-0.78 -2.19a0.37 0.37 0 0 1 0 -0.31 0.39 0.39 0 0 1 0.27 -0.2 14.75 14.75 0 0 1 2.59 -0.44 0.48 0.48 0 0 1 0.38 0.13 0.51 0.51 0 0 1 0.16 0.37V4a0.75 0.75 0 0 0 1.5 0v-0.94a0.51 0.51 0 0 1 0.16 -0.37 0.48 0.48 0 0 1 0.38 -0.13 14.75 14.75 0 0 1 2.59 0.44 0.39 0.39 0 0 1 0.25 0.2 0.37 0.37 0 0 1 0 0.31l-0.76 2.19a0.76 0.76 0 0 0 0.46 1 0.73 0.73 0 0 0 0.25 0 0.75 0.75 0 0 0 0.71 -0.5l0.74 -2.08a0.46 0.46 0 0 1 0.27 -0.29 0.47 0.47 0 0 1 0.4 0A14.22 14.22 0 0 1 20.27 5a0.5 0.5 0 0 1 0.23 0.42Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/health/wheelchair", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Wheelchair-Way--Streamline-Ultimate\"> <g> <path d=\"M23.81 15.54a0.5 0.5 0 0 0 -0.49 0L8.82 23a0.5 0.5 0 0 0 -0.26 0.56 0.51 0.51 0 0 0 0.49 0.39h14.5a0.51 0.51 0 0 0 0.5 -0.5V16a0.5 0.5 0 0 0 -0.24 -0.46\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10.73 18.85a1 1 0 0 0 -1.39 -0.26 4.5 4.5 0 0 1 -5.44 -7.16A1 1 0 0 0 2.61 9.9a6.5 6.5 0 0 0 7.85 10.34 1 1 0 0 0 0.27 -1.39\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M4.43 3.28a2.75 2.75 0 1 0 5.5 0 2.75 2.75 0 1 0 -5.5 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6.4 7.39a1.2 1.2 0 0 0 -0.56 0.53 1.55 1.55 0 0 0 -0.24 0.83v4.47a2.63 2.63 0 0 0 2.63 2.63h2.14a0.53 0.53 0 0 1 0.41 0.19l1.48 1.84a1.55 1.55 0 0 0 1.23 0.59 1.57 1.57 0 0 0 1.23 -2.56l-1.47 -1.84a3.7 3.7 0 0 0 -2.87 -1.38H8.75v-2.42l2.44 0.52a1.24 1.24 0 0 0 0.27 0 1.31 1.31 0 0 0 0.28 -2.6 21.68 21.68 0 0 0 -4.56 -1.02 1.48 1.48 0 0 0 -0.78 0.22\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/misc/accessibility", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Tools-Reality-Accessibility--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M0.208374 12C0.208374 5.48765 5.48768 0.208344 12 0.208344 18.5124 0.208344 23.7917 5.48765 23.7917 12c0 6.5123 -5.2793 11.7916 -11.7917 11.7916C5.48768 23.7916 0.208374 18.5123 0.208374 12M9.93007 5.59725c0 -1.14318 0.92673 -2.06991 2.06993 -2.06991s2.0699 0.92673 2.0699 2.06991 -0.9267 2.0699 -2.0699 2.0699 -2.06993 -0.92672 -2.06993 -2.0699m7.23933 3.53432c0.7401 -0.15461 1.5603 0.19453 1.841 0.94293 0.2748 0.733 -0.0909 1.596 -0.9042 1.7697 -1.0627 0.227 -2.1878 0.2879 -3.2337 0.3446l-0.0815 0.0044v2.6043c0 0.0754 -0.0052 0.1496 -0.0153 0.2225l0.8016 3.75c0.1874 0.8765 -0.4808 1.7027 -1.3772 1.7027 -0.6649 0 -1.2392 -0.4651 -1.3775 -1.1155l-0.628 -2.9545h-0.3892l-0.6281 2.9545c-0.1382 0.6504 -0.7126 1.1155 -1.3775 1.1155 -0.89631 0 -1.56457 -0.8262 -1.3772 -1.7028l0.80158 -3.7496c-0.01014 -0.073 -0.01537 -0.1473 -0.01537 -0.2228v-2.6043l-0.08152 -0.0044c-1.04585 -0.0567 -2.17087 -0.1176 -3.2334 -0.3446 -0.81331 -0.1736 -1.17906 -1.0367 -0.90421 -1.7696 0.28066 -0.74846 1.10094 -1.0976 1.84101 -0.94299 1.41149 0.29488 2.99235 0.28483 4.44061 0.27563l0.0001 0 0.0008 -0.00001c0.247 -0.00157 0.4901 -0.00311 0.7278 -0.00311 0.238 0 0.4814 0.00155 0.7286 0.00312 1.4483 0.00919 3.0292 0.01923 4.4408 -0.27567\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
