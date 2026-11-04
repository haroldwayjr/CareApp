
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

const BATCH = [{"setName": "icon/navigation/search", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"m23.42 20.6-5.06-5.12a10 10 0 1 0-2.81 2.84l5 5.09a2 2 0 0 0 2.83 0 2 2 0 0 0 .04-2.81ZM10 1.76A8.25 8.25 0 1 1 1.75 10 8.26 8.26 0 0 1 10 1.76Z\" fill=\"#000000\"/><path d=\"M3.25 10.01a6.75 6.75 0 1 0 13.5 0 6.75 6.75 0 1 0-13.5 0\" fill=\"#000000\"/></g></svg>"}, {"setName": "icon/navigation/settings", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M22.5 9.5h-1.86a9.51 9.51 0 0 0-.76-1.84l1.31-1.32a1.46 1.46 0 0 0 .44-1.06 1.47 1.47 0 0 0-.44-1.06l-1.41-1.41a1.49 1.49 0 0 0-2.12 0l-1.32 1.32a9 9 0 0 0-1.84-.77V1.5A1.5 1.5 0 0 0 13 0h-2a1.5 1.5 0 0 0-1.5 1.5v1.86a9 9 0 0 0-1.84.77L6.34 2.81a1.49 1.49 0 0 0-2.12 0L2.81 4.22a1.47 1.47 0 0 0-.44 1.06 1.44 1.44 0 0 0 .44 1.06l1.31 1.32a9.51 9.51 0 0 0-.76 1.84H1.5A1.5 1.5 0 0 0 0 11v2a1.5 1.5 0 0 0 1.5 1.5h1.86a9.26 9.26 0 0 0 .76 1.84l-1.31 1.32a1.5 1.5 0 0 0 0 2.12l1.41 1.41a1.53 1.53 0 0 0 2.12 0l1.32-1.31a9.26 9.26 0 0 0 1.84.76v1.86A1.5 1.5 0 0 0 11 24h2a1.5 1.5 0 0 0 1.5-1.5v-1.86a9.26 9.26 0 0 0 1.84-.76l1.32 1.31a1.49 1.49 0 0 0 2.12 0l1.41-1.41a1.5 1.5 0 0 0 0-2.12l-1.31-1.32a9.26 9.26 0 0 0 .76-1.84h1.86A1.5 1.5 0 0 0 24 13v-2a1.5 1.5 0 0 0-1.5-1.5ZM12 17a5 5 0 1 1 5-5 5 5 0 0 1-5 5Z\" fill=\"#000000\"/></svg>"}, {"setName": "icon/navigation/sidebar", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Layout-2--Streamline-Ultimate\"> <path d=\"M22 0H2a2 2 0 0 0 -2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2ZM2.5 8h8a0.5 0.5 0 0 1 0.5 0.5v5a0.5 0.5 0 0 1 -0.5 0.5h-8a0.5 0.5 0 0 1 -0.5 -0.5v-5a0.5 0.5 0 0 1 0.5 -0.5Zm11 0h8a0.5 0.5 0 0 1 0.5 0.5v5a0.5 0.5 0 0 1 -0.5 0.5h-8a0.5 0.5 0 0 1 -0.5 -0.5v-5a0.5 0.5 0 0 1 0.5 -0.5ZM22 2.5v3a0.5 0.5 0 0 1 -0.5 0.5h-19a0.5 0.5 0 0 1 -0.5 -0.5v-3a0.5 0.5 0 0 1 0.5 -0.5h19a0.5 0.5 0 0 1 0.5 0.5ZM2.5 16h8a0.5 0.5 0 0 1 0.5 0.5v5a0.5 0.5 0 0 1 -0.5 0.5h-8a0.5 0.5 0 0 1 -0.5 -0.5v-5a0.5 0.5 0 0 1 0.5 -0.5ZM13 21.5v-5a0.5 0.5 0 0 1 0.5 -0.5h8a0.5 0.5 0 0 1 0.5 0.5v5a0.5 0.5 0 0 1 -0.5 0.5h-8a0.5 0.5 0 0 1 -0.5 -0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/navigation/split", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Split-Subset-Spreadsheet-2--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m8.40917 8.86846 -0.02232 0.00025H1.16054c-0.552287 0 -1.000002 -0.44772 -1.000002 -1V3.08766c0 -1.61214 1.314872 -2.927015 2.927012 -2.927015h5.27698L8.38685 0.1604H20.9124c1.6122 0 2.9271 1.31487 2.9271 2.92702l0 1.42698 0 3.35406c0 0.55229 -0.4478 1 -1 1zM21.8395 3.08742v0.42698h-5.2263v-1.354h4.2992c0.5076 0 0.9271 0.41944 0.9271 0.92702m0 2.42698h-5.2263v1.35406h5.2263zm-7.2263 1.35406V5.51465H9.38685v1.35381zm0 -3.35381V2.1604H9.38685v1.35425zM3.08755 2.16064c-0.50757 0 -0.92701 0.41945 -0.92701 0.92702v0.42674h5.22631V2.16064zm4.2993 4.70807V5.5144H2.16054v1.35431zM1.16054 18.467c-0.552287 0 -1.000002 0.4478 -1.000002 1v1.4453c0 1.6121 1.314872 2.927 2.927012 2.927H20.9124c1.6122 0 2.9271 -1.3149 2.9271 -2.927V19.467c0 -0.5522 -0.4478 -1 -1 -1zm15.45266 2v1.3723h4.2992c0.5076 0 0.9271 -0.4194 0.9271 -0.927v-0.4453zm-2 0H9.38685v1.3723h5.22635zm-12.45266 0.4453v-0.4453h5.22631v1.3723h-4.2993c-0.50757 0 -0.92701 -0.4194 -0.92701 -0.927M6.14156 9.77736c-0.24395 0.0014 -0.4672 0.09015 -0.64006 0.23654l-1.36799 1.14c-0.32344 0.2695 -0.44341 0.7128 -0.30009 1.1086 0.14333 0.3959 0.51925 0.6596 0.94027 0.6596h0.37373v1.4915h-0.37373c-0.42102 0 -0.79695 0.2637 -0.94027 0.6595 -0.14333 0.3959 -0.02335 0.8392 0.30009 1.1087l1.36573 1.1381c0.17456 0.1487 0.40088 0.2385 0.64818 0.2385 0.24706 0 0.4732 -0.0896 0.64769 -0.2381l1.36622 -1.1385c0.32344 -0.2695 0.44342 -0.7128 0.30009 -1.1087 -0.14332 -0.3958 -0.51925 -0.6595 -0.94027 -0.6595h-0.37373v-1.4915h0.37374c0.42102 0 0.79694 -0.2637 0.94027 -0.6596 0.14332 -0.3958 0.02335 -0.8391 -0.30009 -1.1086l-1.36949 -1.1412c-0.17201 -0.14516 -0.39367 -0.23329 -0.63587 -0.23532l-0.00856 -0.00004zm11.06514 0.23654c0.1728 -0.1464 0.3961 -0.23513 0.64 -0.23654 0.0019 -0.00001 0.0039 -0.00002 0.0059 -0.00002 0.0028 0 0.0057 0.00002 0.0085 0.00004 0.2422 0.00203 0.4639 0.09017 0.6359 0.23532l1.3695 1.1412c0.3234 0.2695 0.4434 0.7128 0.3001 1.1086 -0.1433 0.3959 -0.5193 0.6596 -0.9403 0.6596h-0.3737v1.4915h0.3737c0.421 0 0.797 0.2637 0.9403 0.6595 0.1433 0.3959 0.0233 0.8392 -0.3001 1.1087l-1.3663 1.1385c-0.1745 0.1485 -0.4006 0.2381 -0.6476 0.2381 -0.2473 0 -0.4737 -0.0898 -0.6482 -0.2385l-1.3657 -1.1381c-0.3235 -0.2695 -0.4435 -0.7128 -0.3001 -1.1087 0.1433 -0.3958 0.5192 -0.6595 0.9402 -0.6595h0.3738v-1.4915h-0.3738c-0.421 0 -0.7969 -0.2637 -0.9402 -0.6596 -0.1433 -0.3958 -0.0234 -0.8391 0.3001 -1.1086z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
