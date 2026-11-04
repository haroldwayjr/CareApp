
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

const BATCH = [{"setName":"icon/actions/close.alt","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Close--Streamline-Ultimate\"> <path d=\"M14.3 12.18a0.24 0.24 0 0 1 0 -0.35l9.26 -9.27a1.49 1.49 0 0 0 0 -2.12 1.51 1.51 0 0 0 -2.12 0L12.18 9.7a0.25 0.25 0 0 1 -0.36 0L2.56 0.44a1.51 1.51 0 0 0 -2.12 0 1.49 1.49 0 0 0 0 2.12l9.26 9.27a0.24 0.24 0 0 1 0 0.35L0.44 21.44a1.49 1.49 0 0 0 0 2.12 1.51 1.51 0 0 0 2.12 0l9.26 -9.26a0.25 0.25 0 0 1 0.36 0l9.26 9.26a1.51 1.51 0 0 0 2.12 0 1.49 1.49 0 0 0 0 -2.12Z\" fill=\"#000000\" stroke-width=\"1\"></path> </svg>"},{"setName":"icon/actions/copy","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M4.8039 18.7899c0 .5523-.44772 1-1 1H2.11816c-1.10456 0-1.999996-.8954-1.999996-2v-1.6857c0-.5523.447716-1 .999996-1 .55229 0 1 .4477 1 1v1.6857H3.8039c.55228 0 1 .4477 1 1Zm-3.68574-6.181c-.55228 0-.999996-.4477-.999996-1V8.23743c0-.55229.447716-1 .999996-1 .55229 0 1 .44771 1 1v3.37147c0 .5523-.44771 1-1 1Zm0-7.86677c-.55228 0-.999996-.44771-.999996-1V2.0564c0-1.10457.895426-2.0000035 1.999996-2.0000035H3.8039c.55229 0 1 .4477155 1 1.0000035 0 .55228-.44771 1-1 1l-1.68574 0v1.68573c0 .55229-.44771 1-1 1Zm17.73354 0c-.5523 0-1-.44771-1-1V2.0564H16.166c-.5523 0-1-.44772-1-1 0-.552288.4477-1.0000035 1-1.0000035h1.6857c1.1046 0 2 .8954295 2 2.0000035v1.68573c0 .55229-.4477 1-1 1Zm-6.181-3.68573c0 .55228-.4477 1-1 1H8.2992c-.55229 0-1-.44772-1-1 0-.552288.44771-1.0000035 1-1.0000035h3.3715c.5523 0 1 .4477155 1 1.0000035Zm9.4622 22.8869c.9665 0 1.75-.7835 1.75-1.75V7.46278c0-.9665-.7835-1.75-1.75-1.75H7.40248c-.9665 0-1.75.7835-1.75 1.75V22.1933c0 .9664.7835 1.75 1.75 1.75H22.1329Z\" clip-rule=\"evenodd\"/></svg>"}];
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
