
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
    if ('children' in n) for (const c of n.children) stack.push(c);
  }
}

function applyBoldXs(set, svg) {
  const xs = set.children.find(c => c.name === 'Size=xs');
  const md = set.children.find(c => c.name === 'Size=md');
  if (!xs) return { ok: false, reason: 'no-xs' };
  const was = xs.visible;
  xs.visible = true;
  for (const c of [...xs.children]) c.remove();
  const node = figma.createNodeFromSvg(svg);
  node.name = set.name.split('/').pop();
  node.resize(16, 16);
  node.x = 0; node.y = 0;
  node.clipsContent = false;
  if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
  xs.appendChild(node);
  try { xs.resizeWithoutConstraints(16, 16); } catch (_) { try { xs.resize(16, 16); } catch (__) {} }
  bindFills(node);
  xs.clipsContent = false;
  xs.visible = false; // keep catalog md-only
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}

const BATCH = [{"setName": "icon/misc/satellite", "name": "satellite", "category": "misc", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Satellite--Streamline-Ultimate\">\n  <desc>\n    Satellite Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M6.72 17.29A12 12 0 0 1 5.3 15.6L0.2 22.4a1 1 0 0 0 -0.09 1.05A1 1 0 0 0 1 24h11.5a1 1 0 0 0 0.89 -0.54 1 1 0 0 0 -0.07 -1l-1.39 -2a12.71 12.71 0 0 1 -5.21 -3.17\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M9.12 0.29A1 1 0 0 0 7.71 0.3a11.23 11.23 0 0 0 0.07 15.93 11.29 11.29 0 0 0 15.93 -0.08 1 1 0 0 0 0.29 -0.7 1 1 0 0 0 -0.3 -0.71l-6.56 -6.5 2.09 -2a3 3 0 0 0 4.27 -2.75 3 3 0 0 0 -3 -3 3 3 0 0 0 -2.68 4.3l-2.09 2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}, {"setName": "icon/files/box.alt", "name": "box-alt", "category": "files", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Text-Box-2--Streamline-Ultimate\">\n  <desc>\n    Text Box 2 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M3.27577 0.560547C1.77619 0.560547 0.560547 1.77619 0.560547 3.27577c0 1.14629 0.710333 2.12668 1.714843 2.52499l0 12.39924c-1.00451 0.3983 -1.714843 1.3787 -1.714843 2.525 0 1.4996 1.215643 2.7152 2.715223 2.7152 1.14658 0 2.12717 -0.7107 2.52529 -1.7156H18.1997c0.3981 1.0049 1.3787 1.7156 2.5253 1.7156 1.4996 0 2.7152 -1.2156 2.7152 -2.7152 0 -1.1466 -0.7107 -2.1272 -1.7156 -2.5253V5.80106c1.0049 -0.39812 1.7156 -1.37871 1.7156 -2.52529 0 -1.49958 -1.2156 -2.715223 -2.7152 -2.715223 -1.1463 0 -2.1267 0.710333 -2.525 1.714843l-12.39924 0C5.40245 1.27088 4.42206 0.560547 3.27577 0.560547M18.1997 4.27539l-12.39864 0c-0.27555 0.69553 -0.83014 1.25012 -1.52567 1.52567l0 12.39864c0.69528 0.2754 1.24972 0.8297 1.52537 1.5249H18.2c0.2755 -0.6949 0.8297 -1.2491 1.5246 -1.5246V5.80076c-0.6952 -0.27565 -1.2495 -0.83009 -1.5249 -1.52537M7.64648 7.24805c-0.55228 0 -1 0.44771 -1 1 0 0.55228 0.44772 1 1 1H12c0.5523 0 1 -0.44772 1 -1 0 -0.55229 -0.4477 -1 -1 -1zm-1 4.74995c0 -0.5522 0.44772 -1 1 -1h8.70702c0.5523 0 1 0.4478 1 1 0 0.5523 -0.4477 1 -1 1H7.64648c-0.55228 0 -1 -0.4477 -1 -1m1 2.75c-0.55228 0 -1 0.4478 -1 1 0 0.5523 0.44772 1 1 1h8.70702c0.5523 0 1 -0.4477 1 -1 0 -0.5522 -0.4477 -1 -1 -1z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}, {"setName": "icon/commerce/cart", "name": "cart", "category": "commerce", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Shopping-Cart--Streamline-Ultimate\">\n  <desc>\n    Shopping Cart Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M3.75 21.75a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 1 0 -4.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13 21.75a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 1 0 -4.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 0h-2.32a1.5 1.5 0 0 0 -1.48 1.25l-2.76 15.29a0.26 0.26 0 0 1 -0.25 0.21H5a0.5 0.5 0 0 1 0 -1h7.76a2.5 2.5 0 0 0 0 -5H3.5a0.5 0.5 0 0 1 0 -1h10.75a2.5 2.5 0 0 0 0 -5H1a1 1 0 0 0 0 2h13.25a0.5 0.5 0 0 1 0 1H3.5a2.5 2.5 0 0 0 0 5h9.26a0.5 0.5 0 0 1 0 1H5a2.5 2.5 0 0 0 0 5h11.82a1.5 1.5 0 0 0 1.48 -1.25l2.76 -15.29a0.26 0.26 0 0 1 0.25 -0.21H23a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
let ok = 0, missing = 0, failed = 0;
const miss = [], fail = [];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length < 5) miss.push(item.setName); continue; }
  try {
    const r = applyBoldXs(set, item.svg);
    if (r.ok) ok++; else { failed++; fail.push({ name: item.setName, r }); }
  } catch (e) {
    failed++;
    if (fail.length < 5) fail.push({ name: item.setName, err: String(e) });
  }
}
return { ok, missing, failed, miss, fail };
