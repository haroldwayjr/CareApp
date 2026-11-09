
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

const BATCH = [{"setName": "icon/files/press", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Force-Touch-Press--Streamline-Ultimate\"> <path fill=\"#000000\" d=\"M11 0c2.2091 0 4 1.79086 4 4v3.77148c-0.1899 -0.16271 -0.3892 -0.31505 -0.5986 -0.4541 -0.4367 -0.28987 -0.9086 -0.51982 -1.4014 -0.68945V4c0 -1.10457 -0.8954 -2 -2 -2H4c-1.10457 0 -2 0.89543 -2 2v16c0 1.1046 0.89543 2 2 2h7c0.1061 0 0.2099 -0.0114 0.3115 -0.0273 0.222 0.5765 0.6046 1.0818 1.1094 1.4492 0.0959 0.0697 0.1967 0.1311 0.2988 0.1894C12.1987 23.8599 11.6158 24 11 24H4c-2.20914 0 -4 -1.7909 -4 -4V4c0 -2.20914 1.79086 -4 4 -4zm-0.0801 10.8027c0.2072 0 0.4124 0.0413 0.6035 0.1211 0.1912 0.0799 0.3652 0.1964 0.5108 0.3438l3.6133 3.6035 1.7236 -1.2285c0.6075 -0.435 1.3501 -0.6407 2.0947 -0.5791s1.443 0.3862 1.9707 0.915L24 16.542V24h-2.1943l-2.6094 -1.9111 -4.7149 0.4414c-0.4189 0.0403 -0.8383 -0.0737 -1.1787 -0.3213 -0.3404 -0.2478 -0.5784 -0.6123 -0.6689 -1.0235 -0.0904 -0.4111 -0.0272 -0.8412 0.1777 -1.2089 0.205 -0.3677 0.5374 -0.6478 0.9346 -0.7871l1.3135 -0.4415 -5.25296 -5.2529c-0.29253 -0.2968 -0.45698 -0.6966 -0.45703 -1.1133 0 -0.4167 0.16446 -0.8174 0.45703 -1.1142 0.14548 -0.1472 0.31886 -0.264 0.50976 -0.3438 0.1911 -0.0798 0.3964 -0.121 0.6035 -0.1211M9.4873 8.04102c0.6753 -0.23078 1.3957 -0.30325 2.1035 -0.21192 0.6194 0.08002 1.2161 0.28346 1.7539 0.59766 0.0766 0.04475 0.1525 0.09143 0.2266 0.14062 0.0369 0.02451 0.0723 0.05164 0.1084 0.07715 -0.036 -0.02542 -0.0716 -0.05175 -0.1084 -0.07617 0.5943 0.39471 1.0903 0.92146 1.4492 1.53804 0.2081 0.358 0.0864 0.8171 -0.2715 1.0254 -0.3578 0.208 -0.817 0.0871 -1.0254 -0.2705 -0.2433 -0.418 -0.5795 -0.7753 -0.9824 -1.04294 -0.403 -0.26753 -0.863 -0.43899 -1.3428 -0.50098 -0.4798 -0.06187 -0.968 -0.01287 -1.42574 0.14356 -0.45771 0.15649 -0.87332 0.41622 -1.21485 0.75876 -0.34162 0.3428 -0.60082 0.7594 -0.75586 1.2178 -0.15495 0.4583 -0.20213 0.9471 -0.13867 1.4268 0.06358 0.4794 0.23709 0.9387 0.50586 1.3408 0.26889 0.4019 0.62717 0.7376 1.0459 0.9795 0.35812 0.2073 0.48133 0.6659 0.27441 1.0244 -0.20711 0.3585 -0.66676 0.4813 -1.02539 0.2744 -0.61779 -0.3569 -1.14537 -0.8522 -1.54199 -1.4453 -0.39653 -0.5932 -0.65239 -1.2702 -0.74609 -1.9776 -0.09359 -0.7074 -0.02348 -1.4275 0.20507 -2.1035 0.22866 -0.6761 0.61039 -1.29035 1.11426 -1.79587 0.50382 -0.50545 1.11671 -0.88925 1.79199 -1.12011\" stroke-width=\"1\"></path> </svg>"}, {"setName": "icon/files/resume", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Recruiting-Resume-Document--Streamline-Ultimate\"> <g> <g> <path d=\"M12.56 13.71H3.85a0.75 0.75 0 0 0 0 1.5h8.71a0.75 0.75 0 1 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M11.25 18.16h-7.4a0.75 0.75 0 1 0 0 1.5h7.4a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path> </g> <path d=\"M4.44 3.49h3.89s1.04 0 1.04 1.04v4.64s0 1.04 -1.04 1.04H4.44s-1.04 0 -1.04 -1.04V4.53s0 -1.04 1.04 -1.04\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M24 15.64a3.66 3.66 0 0 0 -7.32 0v3.13h1.66l0.43 5.23h3.14l0.43 -5.23H24Z\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.46 7.56a2.88 2.88 0 1 0 5.76 0 2.88 2.88 0 1 0 -5.76 0\" fill=\"#000000\" stroke-width=\"1\"></path> <path d=\"M17.14 22.46H1.84a0.27 0.27 0 0 1 -0.27 -0.26V1.81a0.27 0.27 0 0 1 0.27 -0.26h20.63v2.19A4.37 4.37 0 0 1 24 5.11V0.8a0.75 0.75 0 0 0 -0.75 -0.75H1.84A1.76 1.76 0 0 0 0.07 1.81V22.2A1.76 1.76 0 0 0 1.84 24h15.42Z\" fill=\"#000000\" stroke-width=\"1\"></path> </g> </svg>"}];
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
