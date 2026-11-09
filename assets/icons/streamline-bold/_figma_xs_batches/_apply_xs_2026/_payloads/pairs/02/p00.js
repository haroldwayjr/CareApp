
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

const BATCH = [{"setName": "icon/health/orthopedics", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Medical-Specialty-Broken-Bone--Streamline-Ultimate\"> <g> <path d=\"M11.45 15.59a0.52 0.52 0 0 0 0.14 -0.49 0.51 0.51 0 0 0 -0.34 -0.37l-1.13 -0.37A0.5 0.5 0 0 1 9.8 14l-0.29 -1a0.52 0.52 0 0 0 -0.37 -0.36 0.53 0.53 0 0 0 -0.49 0.14L6.44 15a0.3 0.3 0 0 1 -0.2 0.08 0.27 0.27 0 0 1 -0.18 -0.1l-0.25 -0.29a3.14 3.14 0 0 0 -4.4 -0.06 3 3 0 0 0 2.18 5.21 0.48 0.48 0 0 1 0.5 0.5 3.09 3.09 0 0 0 5.26 2.23 3 3 0 0 0 0 -4.32 0.63 0.63 0 0 0 -0.12 -0.1 0.25 0.25 0 0 1 0 -0.38Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M23.09 7.71a3.1 3.1 0 0 0 -3.51 -4.52 0.46 0.46 0 0 1 -0.38 0 0.5 0.5 0 0 1 -0.2 -0.36A3.07 3.07 0 0 0 13.32 2a3.2 3.2 0 0 0 1.25 4.3 2.9 2.9 0 0 0 0.35 0.17 0.24 0.24 0 0 1 0.13 0.15 0.23 0.23 0 0 1 0 0.2l-1.71 2.91a0.52 0.52 0 0 0 0 0.51 0.52 0.52 0 0 0 0.43 0.27l1 0.05a0.52 0.52 0 0 1 0.39 0.22l0.67 1a0.49 0.49 0 0 0 0.44 0.23 0.51 0.51 0 0 0 0.43 -0.26l1.7 -2.91a0.25 0.25 0 0 1 0.16 -0.12 0.28 0.28 0 0 1 0.2 0 0.71 0.71 0 0 0 0.14 0.1 3.05 3.05 0 0 0 4.19 -1.11\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M4 10h2a1 1 0 0 0 0 -2H4a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M6.3 6.69a1 1 0 0 0 1.4 -1.44l-1 -1a1 1 0 0 0 -1.43 1.43Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M10 6a1 1 0 0 0 1 -1V3a1 1 0 0 0 -2 0v2a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M20 14h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.72 17.27a1 1 0 1 0 -1.44 1.4l1 1.06A1 1 0 0 0 18 20a1 1 0 0 0 0.71 -1.7Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M14 18a1 1 0 0 0 -1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}, {"setName": "icon/health/otc", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Medicine-Liquid-Cup--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M0.866215 0.135864c-0.215123 0 -0.419889 0.092375 -0.562259 0.253648C0.161587 0.550786 0.095324 0.765428 0.122007 0.97889l0.357344 2.85876H5.67275c0.41421 0 0.75 0.33578 0.75 0.75 0 0.41421 -0.33579 0.75 -0.75 0.75H0.666851L1.09617 8.7722c0.04556 -0.00864 0.09257 -0.01317 0.14065 -0.01317h4.43546c0.41421 0 0.75 0.33579 0.75 0.75 0 0.41422 -0.33579 0.74997 -0.75 0.74997H1.28202l0.41199 3.2959c0.04691 0.3753 0.36597 0.657 0.74421 0.657h5.68453c0.05036 -0.0575 0.10173 -0.1142 0.1541 -0.1702 0.0227 -0.0242 0.04579 -0.0481 0.06928 -0.0716l5.12007 -5.12011L14.6034 0.993301c0.0312 -0.215416 -0.0328 -0.433751 -0.1752 -0.598315 -0.1425 -0.164564 -0.3494 -0.259122 -0.5671 -0.259122zM14.1995 13.7736l4.3227 4.3226 -2.9841 2.9841c-0.5746 0.5464 -1.339 0.8483 -2.1321 0.8419 -0.7965 -0.0064 -1.559 -0.3234 -2.1254 -0.8834s-0.892 -1.3189 -0.9075 -2.1152c-0.0154 -0.7912 0.2766 -1.5574 0.814 -2.1376zM18.8 8.50917c-1.3168 -0.01851 -2.5889 0.47723 -3.5459 1.38187 -0.0046 0.00438 -0.0092 0.00881 -0.0137 0.01328 -0.0022 0.0021 -0.0043 0.00421 -0.0064 0.00632L9.76034 15.3843c-0.00782 0.0078 -0.01552 0.0158 -0.02309 0.0239 -0.90009 0.962 -1.38936 2.2371 -1.36373 3.5543 0.02562 1.3171 0.56411 2.5723 1.50093 3.4986 0.93685 0.9262 2.19805 1.4504 3.51535 1.461 1.3174 0.0107 2.5869 -0.493 3.5386 -1.404l0.0156 -0.0153 3.682 -3.682c0.006 -0.0057 0.0119 -0.0114 0.0177 -0.0172l1.7414 -1.7415 0.0133 -0.0135 0.0063 -0.0067c0.9047 -0.957 1.4004 -2.229 1.3819 -3.5458 -0.0039 -0.2752 -0.0301 -0.5479 -0.0778 -0.8155 -0.1803 -1.0129 -0.6666 -1.9538 -1.4033 -2.69042 -0.9312 -0.93119 -2.1888 -1.4625 -3.5055 -1.48101\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
