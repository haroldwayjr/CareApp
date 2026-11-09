
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

const BATCH = [{"setName":"icon/health/otc","name":"otc","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Medicine-Liquid-Cup--Streamline-Ultimate\">\n  <desc>\n    Medicine Liquid Cup Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M0.866215 0.135864c-0.215123 0 -0.419889 0.092375 -0.562259 0.253648C0.161587 0.550786 0.095324 0.765428 0.122007 0.97889l0.357344 2.85876H5.67275c0.41421 0 0.75 0.33578 0.75 0.75 0 0.41421 -0.33579 0.75 -0.75 0.75H0.666851L1.09617 8.7722c0.04556 -0.00864 0.09257 -0.01317 0.14065 -0.01317h4.43546c0.41421 0 0.75 0.33579 0.75 0.75 0 0.41422 -0.33579 0.74997 -0.75 0.74997H1.28202l0.41199 3.2959c0.04691 0.3753 0.36597 0.657 0.74421 0.657h5.68453c0.05036 -0.0575 0.10173 -0.1142 0.1541 -0.1702 0.0227 -0.0242 0.04579 -0.0481 0.06928 -0.0716l5.12007 -5.12011L14.6034 0.993301c0.0312 -0.215416 -0.0328 -0.433751 -0.1752 -0.598315 -0.1425 -0.164564 -0.3494 -0.259122 -0.5671 -0.259122zM14.1995 13.7736l4.3227 4.3226 -2.9841 2.9841c-0.5746 0.5464 -1.339 0.8483 -2.1321 0.8419 -0.7965 -0.0064 -1.559 -0.3234 -2.1254 -0.8834s-0.892 -1.3189 -0.9075 -2.1152c-0.0154 -0.7912 0.2766 -1.5574 0.814 -2.1376zM18.8 8.50917c-1.3168 -0.01851 -2.5889 0.47723 -3.5459 1.38187 -0.0046 0.00438 -0.0092 0.00881 -0.0137 0.01328 -0.0022 0.0021 -0.0043 0.00421 -0.0064 0.00632L9.76034 15.3843c-0.00782 0.0078 -0.01552 0.0158 -0.02309 0.0239 -0.90009 0.962 -1.38936 2.2371 -1.36373 3.5543 0.02562 1.3171 0.56411 2.5723 1.50093 3.4986 0.93685 0.9262 2.19805 1.4504 3.51535 1.461 1.3174 0.0107 2.5869 -0.493 3.5386 -1.404l0.0156 -0.0153 3.682 -3.682c0.006 -0.0057 0.0119 -0.0114 0.0177 -0.0172l1.7414 -1.7415 0.0133 -0.0135 0.0063 -0.0067c0.9047 -0.957 1.4004 -2.229 1.3819 -3.5458 -0.0039 -0.2752 -0.0301 -0.5479 -0.0778 -0.8155 -0.1803 -1.0129 -0.6666 -1.9538 -1.4033 -2.69042 -0.9312 -0.93119 -2.1888 -1.4625 -3.5055 -1.48101\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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