
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

const BATCH = [{"setName": "icon/health/meditation", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Yoga-Meditation-Pose2--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M8.75104 3.24902C8.75104 1.45464 10.2057 0 12.0001 0c1.7943 0 3.249 1.45464 3.249 3.24902 0 1.79439 -1.4547 3.24902 -3.249 3.24902 -1.7944 0 -3.24906 -1.45463 -3.24906 -3.24902m3.19726 4.20773c-3.08096 0 -5.6909 2.30922 -6.17105 5.26885 -0.98912 0.3056 -1.70224 1.2235 -1.70224 2.3167 0 0.5539 0.18307 1.0627 0.49235 1.4698 0.72817 -0.3266 1.56979 -0.391 2.38362 -0.1229l1.74732 0.5501v-1.9325c0 -0.4143 0.33579 -0.75 0.75 -0.75 0.41422 0 0.75 0.3357 0.75 0.75v2.4047l1.3054 0.411 2.1946 -0.6909v-2.1248c0 -0.4143 0.3358 -0.75 0.75 -0.75s0.75 0.3357 0.75 0.75v1.6526l1.8507 -0.5827c0.8736 -0.2878 1.7792 -0.1924 2.5421 0.199 0.2125 -0.3611 0.3339 -0.7828 0.3339 -1.2334 0 -1.1328 -0.7657 -2.0773 -1.8107 -2.3474 -0.4932 -2.94491 -3.0957 -5.23815 -6.166 -5.23815M6.56678 17.5843l6.59112 2.0749c1.0985 0.3662 1.7087 1.5868 1.4646 2.6853 -0.3661 1.2205 -1.5867 1.8308 -2.6852 1.4647l-6.59109 -2.075c-1.22056 -0.3662 -1.83084 -1.5867 -1.46467 -2.6853 0.36617 -1.2205 1.58673 -1.8308 2.68524 -1.4646m9.33212 4.7047c0.1923 -1.5678 -0.6868 -3.2454 -2.3153 -3.8053l3.8496 -1.2119c1.0985 -0.3662 2.3191 0.2441 2.6852 1.4646 0.3662 1.0986 -0.2441 2.3191 -1.4646 2.6853z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
;
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
