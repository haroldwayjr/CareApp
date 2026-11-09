
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

const BATCH = [{"setName": "icon/health/heart", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Heart-Approve-1--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m13.3712 16.8208 9.1336 -8.31944c0.3686 1.85624 -0.0589 3.89474 -1.6682 5.50404 -0.0087 0.0087 -0.0176 0.0173 -0.0268 0.0255l-8.8528 8.0189c-0.2857 0.2588 -0.7212 0.2588 -1.007 0l-8.85275 -8.0189c-0.00915 -0.0082 -0.01809 -0.0168 -0.02683 -0.0255 -2.758379 -2.7584 -2.070065889 -6.75042 0.15224 -8.95706 1.12831 -1.12035 2.68562 -1.82625 4.44446 -1.69881 1.57066 0.1138 3.21256 0.88483 4.78638 2.45503 1.5735 -1.56979 3.2139 -2.33932 4.7831 -2.4506 0.9137 -0.0648 1.7724 0.09604 2.5446 0.42314l-7.438 6.7751 -2.70443 -2.44426C7.40955 6.997 5.51248 7.09287 4.40153 8.32208c-1.11094 1.22922 -1.01507 3.12632 0.21415 4.23722l4.72384 4.2694c1.14568 1.0354 2.89008 1.032 4.03168 -0.0079M22.888 6.12334c0.6124 -0.55785 0.6567 -1.50657 0.0988 -2.11901 -0.5579 -0.61245 -1.5066 -0.6567 -2.119 -0.09884l-9.5207 8.67211 -3.71412 -3.35682c-0.61461 -0.55548 -1.56314 -0.50754 -2.11861 0.10707 -0.55548 0.6146 -0.50754 1.56315 0.10707 2.11865l4.72386 4.2693c0.5728 0.5177 1.445 0.516 2.0158 -0.0039z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/health/hipaa", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"> <path fill=\"#000000\" d=\"M12.0059 0.00195312C15.1007 -0.0258205 18.1707 0.534368 21.0527 1.65234l0.5743 0.23145 0.0039 0.00098c0.4047 0.1718 0.7508 0.45895 0.9941 0.82519 0.2432 0.36615 0.3735 0.7958 0.375 1.23535V11.459c-0.0305 2.6171 -0.865 5.1617 -2.3896 7.289 -1.5227 2.1246 -3.6606 3.7301 -6.125 4.6006l0.0009 0.001 -1.0937 0.4033 -0.002 0.001c-0.8977 0.3296 -1.8835 0.3296 -2.7812 0l-0.002 -0.001 -1.09373 -0.4033v-0.001c-2.46406 -0.8706 -4.60154 -2.4763 -6.12402 -4.6006C1.86502 16.6207 1.03049 14.0761 1 11.459V3.94531l0.00684 -0.16406c0.02928 -0.38173 0.15533 -0.75086 0.36816 -1.07129 0.24329 -0.36624 0.58941 -0.65339 0.99414 -0.82519l0.00391 -0.00098C5.41956 0.612221 8.69216 -0.028514 11.9932 0.000976562c0.0022 -0.000021589 0.0045 0.000997288 0.0068 0.000976558 0.0023 0.00002073 0.0046 -0.000998147 0.0068 -0.000976558zM8.53711 11.0576c-0.28024 -0.116 -0.60291 -0.0514 -0.81738 0.1631l-2.5 2.5c-0.2929 0.2929 -0.29289 0.7677 0 1.0605l2.5 2.5c0.21448 0.2145 0.53714 0.2792 0.81738 0.1631 0.28025 -0.1161 0.46289 -0.39 0.46289 -0.6933v-1.75h9.25c0.4142 0 0.75 -0.3358 0.75 -0.75s-0.3358 -0.75 -0.75 -0.75H9v-1.75c0 -0.3034 -0.18264 -0.5773 -0.46289 -0.6934m7.74319 -6.3369c-0.2145 -0.21447 -0.5372 -0.27912 -0.8174 -0.16308 -0.2803 0.11608 -0.4629 0.39001 -0.4629 0.69336v1.75H5.75c-0.41421 0 -0.75 0.33579 -0.75 0.75s0.33579 0.75 0.75 0.75H15V10.251c0 0.3033 0.1826 0.5772 0.4629 0.6933 0.2802 0.1161 0.6029 0.0514 0.8174 -0.1631l2.5 -2.49995c0.2929 -0.29289 0.2929 -0.76765 0 -1.06055z\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/health/hospital", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Hospital-Pin--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M6.03 2.611a8.443 8.443 0 0 1 14.413 5.97c0 1.233 -0.519 2.797 -1.219 4.37 -0.712 1.602 -1.658 3.315 -2.608 4.88a65.79 65.79 0 0 1 -2.66 4.045c-0.372 0.522 -0.697 0.952 -0.944 1.257 -0.121 0.15 -0.232 0.281 -0.326 0.38 -0.045 0.046 -0.1 0.101 -0.16 0.15a0.98 0.98 0 0 1 -0.135 0.093 0.793 0.793 0 0 1 -0.39 0.105 0.793 0.793 0 0 1 -0.392 -0.105 0.98 0.98 0 0 1 -0.135 -0.093 1.821 1.821 0 0 1 -0.16 -0.15 6.471 6.471 0 0 1 -0.326 -0.38 28.417 28.417 0 0 1 -0.945 -1.257 65.775 65.775 0 0 1 -2.66 -4.045c-0.949 -1.565 -1.895 -3.278 -2.607 -4.88 -0.7 -1.573 -1.218 -3.137 -1.218 -4.37a8.45 8.45 0 0 1 2.472 -5.97m4.65 3.151a1 1 0 1 0 -2 0v6.962a1 1 0 1 0 2 0v-2.77h2.64v2.77a1 1 0 1 0 2 0V5.762a1 1 0 1 0 -2 0v2.191h-2.64v-2.19Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/health/inhaler", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Inhaler--Streamline-Ultimate\"> <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m7.52403 3.74659 -0.4166 -1.99806C6.91497 0.825451 6.02576 0.220831 5.09658 0.381232L2.50046 0.829389C1.51905 0.998806 0.876679 1.95195 1.088 2.9252l0.40441 1.8626zM19.9236 16.2298v5.9982l2.3122 0.0015c0.199 0.0001 0.3899 -0.0789 0.5306 -0.2195 0.1408 -0.1407 0.2199 -0.3315 0.2199 -0.5305v-4.5012c0 -0.199 -0.0791 -0.3899 -0.2199 -0.5305 -0.1407 -0.1407 -0.3316 -0.2197 -0.5306 -0.2195zM8.5433 5.09285c0.53096 -0.09166 1.03908 0.25384 1.14906 0.78131l1.90324 9.12794 5.8268 -0.0068c0.5528 -0.0006 1.0012 0.4473 1.0012 1v6.4665c0 0.5528 -0.4484 1.0007 -1.0012 1l-2.2097 -0.0025v-2.5088c0 -0.5523 -0.4478 -1 -1 -1 -0.5523 0 -1 0.4477 -1 1v2.5126h-2.3282v-2.5126c0 -0.5523 -0.4477 -1 -0.99996 -1 -0.55229 0 -1 0.4477 -1 1v2.5126H7.25408c-1.68516 0 -3.14237 -1.1747 -3.49993 -2.8215L0.894591 7.47149c-0.120752 -0.55615 0.246319 -1.1008 0.807119 -1.19761z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path> </svg>"}];
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
