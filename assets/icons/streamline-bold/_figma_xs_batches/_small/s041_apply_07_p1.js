
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

const BATCH = [{"setName":"icon/actions/close.alt","name":"close-alt","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Close--Streamline-Ultimate\">\n  <desc>\n    Close Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M14.3 12.18a0.24 0.24 0 0 1 0 -0.35l9.26 -9.27a1.49 1.49 0 0 0 0 -2.12 1.51 1.51 0 0 0 -2.12 0L12.18 9.7a0.25 0.25 0 0 1 -0.36 0L2.56 0.44a1.51 1.51 0 0 0 -2.12 0 1.49 1.49 0 0 0 0 2.12l9.26 9.27a0.24 0.24 0 0 1 0 0.35L0.44 21.44a1.49 1.49 0 0 0 0 2.12 1.51 1.51 0 0 0 2.12 0l9.26 -9.26a0.25 0.25 0 0 1 0.36 0l9.26 9.26a1.51 1.51 0 0 0 2.12 0 1.49 1.49 0 0 0 0 -2.12Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/actions/locate","name":"locate","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Earth-Locate--Streamline-Ultimate\">\n  <desc>\n    Earth Locate Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M15.61 21.68a0.5 0.5 0 0 0 -0.55 -0.16A9.95 9.95 0 0 1 7.64 21a0.24 0.24 0 0 1 -0.14 -0.23v-1.16a2.46 2.46 0 0 1 0.89 -1.91A4.5 4.5 0 0 0 5.5 9.75H2.58a0.24 0.24 0 0 1 -0.19 -0.1 0.23 0.23 0 0 1 -0.05 -0.21 10 10 0 0 1 14.55 -6.16 0.25 0.25 0 0 1 0.12 0.28 0.26 0.26 0 0 1 -0.24 0.19h-2.52a2.75 2.75 0 0 0 0 5.5 2.53 2.53 0 0 1 1 0.2 0.51 0.51 0 0 0 0.45 0 6.46 6.46 0 0 1 7.22 0.39 0.5 0.5 0 0 0 0.79 -0.51A12 12 0 0 0 0 12c0 4.92 4 12 12 12a11.93 11.93 0 0 0 4.07 -0.71 0.52 0.52 0 0 0 0.31 -0.35 0.53 0.53 0 0 0 -0.1 -0.45c-0.22 -0.25 -0.44 -0.49 -0.67 -0.81\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 10a5 5 0 0 0 -5 5c0 3.17 4.46 7.66 4.65 7.85a0.48 0.48 0 0 0 0.7 0C19.54 22.66 24 18.17 24 15a5 5 0 0 0 -5 -5m0 6.75A1.75 1.75 0 1 1 20.75 15 1.76 1.76 0 0 1 19 16.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/actions/open","name":"open","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Open-Eyes--Streamline-Ultimate\">\n  <desc>\n    Open Eyes Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M7.05481 2.09846c0.4979 -0.23899 1.09527 -0.0291 1.33426 0.4688l0.85249 1.77602C10.0985 4.1563 11.0178 4.05005 12 4.05005c0.9822 0 1.9015 0.10625 2.7584 0.29323l0.8525 -1.77602c0.239 -0.4979 0.8364 -0.70779 1.3343 -0.4688 0.4979 0.23899 0.7078 0.83636 0.4688 1.33426l-0.7203 1.50058c1.6307 0.64529 2.9741 1.57027 4.0352 2.52048l1.2984 -1.29834c0.3905 -0.39052 1.0237 -0.39052 1.4142 0 0.3905 0.39053 0.3905 1.02369 0 1.41422l-1.315 1.31502c0.4315 0.50464 0.783 0.98291 1.0563 1.39542 0.2397 0.362 0.4239 0.6803 0.5514 0.9293 0.0629 0.123 0.1176 0.24 0.1589 0.3438 0.0201 0.0505 0.0431 0.1129 0.062 0.1801l0.0011 0.0037c0.0097 0.0337 0.0605 0.2091 0.0382 0.4189 -0.0145 0.136 -0.0556 0.2488 -0.066 0.2774l-0.0011 0.0029c-0.0183 0.0507 -0.0393 0.1009 -0.0595 0.1465 -0.0411 0.0925 -0.0949 0.2016 -0.1589 0.3221 -0.129 0.2425 -0.3136 0.5569 -0.5542 0.9177 -0.4808 0.7211 -1.1986 1.647 -2.1662 2.5637C19.0506 18.2219 16.0743 20.05 12 20.05s-7.05065 -1.8281 -8.9885 -3.6638c-0.96761 -0.9167 -1.6854 -1.8426 -2.16625 -2.5637 -0.240567 -0.3608 -0.425121 -0.6752 -0.55412 -0.9177 -0.064064 -0.1205 -0.117818 -0.2296 -0.158903 -0.3221 -0.020203 -0.0456 -0.041192 -0.0958 -0.0595391 -0.1465l-0.0010886 -0.0029c-0.0104074 -0.0286 -0.0515163 -0.1414 -0.06598965 -0.2774 -0.02232635 -0.2098 0.02845105 -0.3852 0.03821935 -0.4189l0.0010635 -0.0037c0.0188898 -0.0672 0.0418958 -0.1296 0.0620115 -0.1801 0.041309 -0.1038 0.096018 -0.2208 0.158933 -0.3438 0.127414 -0.249 0.311607 -0.5673 0.551363 -0.9293 0.27329 -0.41251 0.6248 -0.89078 1.05633 -1.39543L0.558514 7.56966c-0.390524 -0.39053 -0.390524 -1.02369 0 -1.41422 0.390525 -0.39052 1.023686 -0.39052 1.414216 0l1.29834 1.29834C4.3322 6.50357 5.67561 5.57859 7.3063 4.9333l-0.72028 -1.50058c-0.23899 -0.4979 -0.0291 -1.09527 0.46879 -1.33426ZM12 8.31116c-2.00972 0 -3.63892 1.6292 -3.63892 3.63894 0 2.0097 1.6292 3.6389 3.63892 3.6389 2.0097 0 3.6389 -1.6292 3.6389 -3.6389 0 -2.00974 -1.6292 -3.63894 -3.6389 -3.63894Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/actions/erase","name":"erase","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Eraser--Streamline-Ultimate\">\n  <desc>\n    Eraser Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M11 21.66H1a1 1 0 0 0 0 2h10a1 1 0 0 0 0 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.51 6.43 14.86 0.78a1.49 1.49 0 0 0 -2.12 0L5 8.54A1 1 0 0 0 5 10l6.36 6.37a1 1 0 0 0 1.41 0l7.76 -7.76a1.5 1.5 0 0 0 -0.02 -2.18Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1.8 19.11a1.75 1.75 0 0 0 1.2 0.55h4.66a1.84 1.84 0 0 0 1.22 -0.53l1 -1.13a0.5 0.5 0 0 0 0 -0.69L4.1 11.59a0.52 0.52 0 0 0 -0.71 0l-2.65 2.7a2.59 2.59 0 0 0 0 3.6Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16.5 21.66h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 21.66h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0 -2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
