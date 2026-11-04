
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

const BATCH = [{"setName":"icon/health/blood.pressure","name":"blood-pressure","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M12 0c2.5629 0 4.9251 0.344487 6.6807 0.929688 0.8724 0.290842 1.6508 0.659622 2.2314 1.117192C21.4814 2.4956 22 3.14818 22 4v9c0 1.0337 -0.7533 1.7706 -1.499 2.2422 -0.7886 0.4986 -1.8518 0.8904 -3.0537 1.1758 -1.8785 0.446 -3.4472 -1.0857 -3.4473 -2.8379v-2.5C13.3613 11.0298 12.6919 11 12 11s-1.3613 0.0298 -2 0.0801v2.5c-0.00015 1.7522 -1.56882 3.2839 -3.44727 2.8379 -1.20191 -0.2854 -2.26509 -0.6772 -3.05371 -1.1758 -0.10568 -0.0668 -0.21063 -0.1402 -0.31445 -0.2178l-0.82129 1.2334c-0.23685 0.3555 -0.36324 0.7731 -0.36328 1.2002 0 0.7603 0.39884 1.4652 1.05078 1.8565l0.14258 0.0849c0.38197 0.2292 0.8192 0.3506 1.26465 0.3506h3.01465c0.266 -0.5793 0.74533 -1.0556 1.30175 -1.4033C9.6352 17.8087 10.7774 17.5 12 17.5s2.3648 0.3087 3.2256 0.8467c0.5564 0.3477 1.0357 0.824 1.3017 1.4033H17c0.5523 0 1 0.4477 1 1s-0.4477 1 -1 1h-0.4727c-0.266 0.5793 -0.7453 1.0556 -1.3017 1.4033 -0.8608 0.538 -2.003 0.8467 -3.2256 0.8467s-2.3648 -0.3087 -3.22559 -0.8467c-0.55642 -0.3477 -1.03575 -0.824 -1.30175 -1.4033H4.45801c-0.80792 0 -1.60116 -0.2191 -2.29395 -0.6348l-0.1416 -0.0859C0.768018 20.2766 0 18.9209 0 17.458c0.0000392742 -0.822 0.24334 -1.6256 0.699219 -2.3096l1.308591 -1.9658C2.00257 13.1228 2 13.0619 2 13V4c0 -0.85182 0.51859 -1.5044 1.08789 -1.95312 0.5806 -0.45757 1.35901 -0.82635 2.23145 -1.117192C7.07494 0.344487 9.43715 0 12 0m0 2c-2.40771 0 -4.54609 0.32656 -6.04785 0.82715 -0.75609 0.25203 -1.29581 0.53081 -1.62598 0.79101 -0.16198 0.1277 -0.24859 0.23168 -0.29101 0.30079 -0.01998 0.03258 -0.02879 0.05423 -0.03223 0.06543C3.99978 3.99473 4 3.99927 4 4c0 0.00098 0.00036 0.00265 0.00098 0.00586 0.0007 0.00357 0.00241 0.01128 0.00683 0.02246 0.00904 0.02275 0.03012 0.06441 0.07715 0.12305 0.0987 0.12298 0.28219 0.28521 0.58789 0.46484 0.61309 0.36025 1.55779 0.69921 2.77442 0.95215C8.84852 5.85965 9.99996 7.06513 10 8.60742v0.46387C10.6473 9.02425 11.3165 9 12 9s1.3527 0.02425 2 0.07129v-0.46387c0 -1.54229 1.1515 -2.74777 2.5527 -3.03906 1.2167 -0.25294 2.1614 -0.5919 2.7744 -0.95215 0.3058 -0.17963 0.4892 -0.34186 0.5879 -0.46484 0.0471 -0.05864 0.0682 -0.1003 0.0772 -0.12305 0.0044 -0.01118 0.0061 -0.01889 0.0068 -0.02246C19.9996 4.00265 20 4.00098 20 4c0 -0.00073 0.0002 -0.00527 -0.0029 -0.01562 -0.0035 -0.0112 -0.0123 -0.03285 -0.0323 -0.06543 -0.0424 -0.06911 -0.129 -0.17309 -0.291 -0.30079 -0.3301 -0.2602 -0.8699 -0.53898 -1.6259 -0.79101C16.5461 2.32656 14.4077 2 12 2\" stroke-width=\"1\"></path>\n</svg>"}];
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