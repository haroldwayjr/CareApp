
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

const BATCH = [{"setName":"icon/health/pharmacy.alt","name":"pharmacy-alt","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M17.3845 12.082c1.5133 -1.5132 3.9672 -1.5132 5.4805 0 1.513 1.5133 1.5132 3.9673 0 5.4805l-5.3037 5.3027c-1.5132 1.5131 -3.9663 1.513 -5.4795 0 -1.5133 -1.5132 -1.5132 -3.9662 0 -5.4795zm-1.0908 -5.21384c0.1107 -0.11598 0.3014 -0.1159 0.4121 0 0.6676 0.69925 1.6238 1.13178 2.669 1.13184 0.2724 0 0.5392 -0.03054 0.7959 -0.08691 0.1649 -0.03596 0.3291 0.08507 0.3291 0.2539v1.02637c-0.0003 0.14471 -0.1229 0.25875 -0.2676 0.25586 -1.4111 -0.02819 -2.8313 0.49536 -3.9082 1.57228l-5.3037 5.3027c-1.1374 1.1375 -1.65706 2.6582 -1.56156 4.1465 0.00939 0.149 -0.10561 0.2791 -0.25488 0.2793h-6.4541C1.78344 20.7499 0.999892 19.9663 0.999756 19V8.16699c0.000006 -0.16876 0.164274 -0.28971 0.329104 -0.2539 0.25669 0.05639 0.52344 0.08689 0.7959 0.08691 1.04521 0 2.00136 -0.4326 2.66894 -1.13184 0.1107 -0.11598 0.30136 -0.1159 0.41211 0C5.87335 7.56741 6.82957 7.99994 7.87476 8c1.04521 0 2.00136 -0.4326 2.66894 -1.13184 0.1107 -0.11598 0.3014 -0.1159 0.4121 0 0.6676 0.69925 1.6238 1.13178 2.669 1.13184 1.0452 0 2.0013 -0.4326 2.6689 -1.13184m5.1572 6.62794c-0.7321 -0.7321 -1.9191 -0.7319 -2.6513 0l-2.4746 2.4746c-0.0977 0.0976 -0.0976 0.2559 0 0.3535l2.2978 2.2988c0.096 0.0956 0.2498 0.0965 0.3477 0.004l2.4804 -2.4795c0.7319 -0.7322 0.7319 -1.9193 0 -2.6514M19.5134 0c0.1021 0.000109171 0.1945 0.062393 0.2324 0.157227l1.6758 4.193363c0.0498 0.12455 0.0778 0.25858 0.0606 0.3916 -0.1257 0.96676 -0.9931 1.75751 -2.1065 1.75781 -1.2053 0 -2.125 -0.9265 -2.125 -2 0 -0.414 -0.336 -0.74966 -0.75 -0.75 -0.4142 0 -0.75 0.33579 -0.75 0.75 0 1.07331 -0.9199 1.99968 -2.125 2 -1.2053 0 -2.125 -0.9265 -2.125 -2 0 -0.414 -0.336 -0.74966 -0.75 -0.75 -0.4142 0 -0.75 0.33579 -0.75 0.75 0 1.07331 -0.9199 1.99968 -2.12497 2 -1.20537 0 -2.125 -0.9265 -2.125 -2 0 -0.414 -0.33607 -0.74966 -0.75 -0.75 -0.41421 0 -0.75 0.33579 -0.75 0.75 0 1.07331 -0.91993 1.99968 -2.125 2C1.0121 6.5 0.143958 5.70915 0.0183105 4.74219c-0.01724928 -0.13297 0.0108045 -0.2671 0.0605469 -0.3916L1.75562 0.157227C1.7936 0.0624838 1.88499 0.0000865802 1.98706 0z\" stroke-width=\"1\"></path>\n</svg>"}];
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