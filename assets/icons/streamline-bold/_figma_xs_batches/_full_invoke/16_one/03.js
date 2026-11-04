
const page = figma.root.children.find(p => /Icons/i.test(p.name));
await figma.setCurrentPageAsync(page);
const collections = await figma.variables.getLocalVariableCollectionsAsync();
let iconDefault = null;
for (const coll of collections) {
  for (const id of coll.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    if (v && v.name === 'icon/default') iconDefault = v;
  }
}
function bindFills(root) {
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    if ('constraints' in n) n.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    if (n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION' || n.type === 'ELLIPSE' || n.type === 'STAR' || n.type === 'POLYGON') {
      const paint = figma.variables.setBoundVariableForPaint(
        { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', iconDefault);
      n.fills = [paint];
      n.strokes = [];
    }
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
    if ('children' in n) for (const c of n.children) stack.push(c);
  }
}
function applyBoldXs(set, svg) {
  const xs = set.children.find(c => c.name === 'Size=xs');
  const md = set.children.find(c => c.name === 'Size=md');
  if (!xs) return { ok: false, reason: 'no-xs' };
  xs.visible = true;
  for (const c of [...xs.children]) c.remove();
  const node = figma.createNodeFromSvg(svg);
  node.name = set.name.split('/').pop();
  node.resize(16, 16);
  node.x = 0; node.y = 0;
  node.clipsContent = false;
  if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
  xs.appendChild(node);
  try { xs.resizeWithoutConstraints(16, 16); } catch (_) { try { xs.resize(16, 16); } catch(__){} }
  bindFills(node);
  xs.clipsContent = false;
  xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}
const BATCH = [{"setName": "icon/files/guide", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Drug-Guide-Book--Streamline-Ultimate\">\n  <desc>\n    Drug Guide Book Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M6.21361 0.150635c-1.03254 0 -2.02278 0.410172 -2.75289 1.140285 -0.73011 0.73011 -1.14029 1.72035 -1.14029 2.75289V20.6796l0.00001 0.0032c0.00088 0.8395 0.33475 1.6444 0.92843 2.2381 0.59447 0.5945 1.40074 0.9284 2.24144 0.9284H20.6795c0.5523 0 1 -0.4477 1 -1s-0.4477 -1 -1 -1H5.49031c-0.31027 0 -0.60783 -0.1232 -0.82723 -0.3426 -0.21938 -0.2194 -0.34263 -0.5169 -0.34265 -0.8272 0.00002 -0.3102 0.12327 -0.6078 0.34265 -0.8272 0.2194 -0.2194 0.51696 -0.3426 0.82723 -0.3426H19.9562c0.457 0 0.8954 -0.1816 1.2185 -0.5048 0.3232 -0.3231 0.5048 -0.7615 0.5048 -1.2185V1.87393c0 -0.45705 -0.1816 -0.895373 -0.5048 -1.218554 -0.3231 -0.323181 -0.7615 -0.504741 -1.2185 -0.504741zM10.5785 8.19504l3.276 3.27596 -2.26 2.26c-0.4354 0.4141 -1.0148 0.643 -1.61586 0.6381 -0.60362 -0.0048 -1.18152 -0.245 -1.61078 -0.6694 -0.42925 -0.4244 -0.67599 -0.9996 -0.68773 -1.6031 -0.01167 -0.5997 0.20959 -1.1803 0.61698 -1.6201zm3.4775 -3.96517c-0.9938 -0.01397 -1.9539 0.3602 -2.6762 1.04298l-0.0151 0.0147 -4.13768 4.13769c-0.00587 0.00588 -0.01165 0.01184 -0.01732 0.01791 -0.67935 0.72605 -1.04863 1.68845 -1.02929 2.68265 0.01934 0.9941 0.42577 1.9415 1.13284 2.6405 0.70707 0.6991 1.65898 1.0947 2.65326 1.1028 0.99429 0.008 1.95249 -0.3722 2.67079 -1.0597l0.0117 -0.0115 2.7864 -2.7864 0.0102 -0.01 1.3163 -1.3164 0.0147 -0.0151c0.4895 -0.5178 0.8204 -1.15775 0.9633 -1.84474 0.0565 -0.27145 0.0837 -0.55025 0.0798 -0.83174 -0.014 -0.99384 -0.415 -1.94304 -1.1178 -2.64585 -0.7028 -0.70282 -1.652 -1.10383 -2.6459 -1.1178\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
let ok=0, missing=0, failed=0; const miss=[], fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<8) miss.push(item.setName); continue; }
  try {
    const r = applyBoldXs(set, item.svg);
    if (r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); }
  } catch(e) { failed++; if (fail.length<8) fail.push({name:item.setName,err:String(e)}); }
}
return { ok, missing, failed, miss, fail };
