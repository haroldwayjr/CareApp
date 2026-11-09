
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

const BATCH = [{"setName":"icon/actions/sort","name":"sort","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M4.27614 1.16797c0.29451 -0.240247 0.72929 -0.222639 1.00391 0.05176l3 3c0.2144 0.21448 0.27911 0.53718 0.16308 0.81738 -0.11609 0.28019 -0.39007 0.46286 -0.69336 0.46289h-2V22c-0.00006 0.5522 -0.44779 1 -1 1 -0.55209 -0.0002 -0.99993 -0.4479 -1 -1V5.5h-2c-0.30317 -0.00013 -0.57728 -0.1828 -0.69335 -0.46289 -0.115906 -0.28014 -0.05125 -0.60296 0.16308 -0.81738l3 -3zM16.7498 15c0.9665 0 1.75 0.7835 1.75 1.75v4.5c0 0.9665 -0.7835 1.75 -1.75 1.75h-4.5c-0.9664 -0.0001 -1.75 -0.7836 -1.75 -1.75v-4.5c0 -0.9664 0.7836 -1.7499 1.75 -1.75zm4.5 -14c0.9665 0 1.75 0.78351 1.75 1.75v9c0 0.9665 -0.7835 1.75 -1.75 1.75h-9c-0.9664 -0.0001 -1.75 -0.7836 -1.75 -1.75v-9c0 -0.96641 0.7836 -1.74988 1.75 -1.75z\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/actions/sort.asc","name":"sort-asc","category":"actions","svg":"<svg fill=\"none\" viewBox=\"0 0 24 24\" id=\"Ascending-Sort-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\">\n  <desc>\n    Ascending Sort 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path style=\"-inkscape-stroke:none\" d=\"M1.25 17.949219a1 1 0 0 0 -1 1 1 1 0 0 0 1 1h7a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path4\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path>\n  <path style=\"-inkscape-stroke:none\" d=\"M1.25 10.949219a1 1 0 0 0 -1 1 1 1 0 0 0 1 1h14.199219a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path6\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path>\n  <path style=\"-inkscape-stroke:none\" d=\"M1.25 4.0488281a1 1 0 0 0 -1 1 1 1 0 0 0 1 1h21.5a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path8\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/actions/sort.desc","name":"sort-desc","category":"actions","svg":"<svg fill=\"none\" viewBox=\"0 0 24 24\" id=\"Descending-Sort-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\">\n  <desc>\n    Descending Sort 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path style=\"-inkscape-stroke:none\" d=\"M1.3007812 4.0507812a1 1 0 0 0 -0.99999995 1 1 1 0 0 0 0.99999995 1h6.8984376a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path4\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path>\n  <path style=\"-inkscape-stroke:none\" d=\"M1.3007812 11.050781a1 1 0 0 0 -0.99999995 1 1 1 0 0 0 0.99999995 1H15.400391a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path6\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path>\n  <path style=\"-inkscape-stroke:none\" d=\"M1.3007812 17.949219a1 1 0 0 0 -0.99999995 1 1 1 0 0 0 0.99999995 1H22.699219a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path8\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/actions/pin","name":"pin","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Pin--Streamline-Ultimate\">\n  <desc>\n    Pin Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.49 6.27 17.73 0.51a1.48 1.48 0 0 0 -1.05 -0.43 1.5 1.5 0 0 0 -1.25 0.68l-4.1 6.45A7.47 7.47 0 0 0 5.86 8a1.47 1.47 0 0 0 -0.29 2.32l8.1 8.1a1.5 1.5 0 0 0 1.24 0.43 1.53 1.53 0 0 0 1.09 -0.71 7.49 7.49 0 0 0 0.8 -5.47l6.44 -4.1a1.48 1.48 0 0 0 0.25 -2.3Zm-6.2 -2.84 -2.12 3.33a0.5 0.5 0 1 1 -0.84 -0.54l2.12 -3.33a0.5 0.5 0 1 1 0.84 0.54Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.45 15.43 0.51 21.37a1.51 1.51 0 0 0 0 2.12 1.53 1.53 0 0 0 2.13 0l5.94 -5.94a1.5 1.5 0 0 0 -2.13 -2.12Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/actions/attach","name":"attach","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Attachment--Streamline-Ultimate\">\n  <desc>\n    Attachment Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M21.84 3.46a7 7 0 0 0 -9.84 0L1.62 13.83a5.13 5.13 0 0 0 7.25 7.25l8.43 -8.43A3.29 3.29 0 1 0 12.65 8l-5.19 5.18a1 1 0 0 0 0 1.42 1 1 0 0 0 1.41 0l5.19 -5.19a1.3 1.3 0 0 1 2.21 0.91 1.32 1.32 0 0 1 -0.38 0.92l-8.43 8.43a3.13 3.13 0 0 1 -5.34 -2.21A3.09 3.09 0 0 1 3 15.25L13.41 4.87a5 5 0 0 1 7 7l-7.78 7.78a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0l7.78 -7.78a7 7 0 0 0 0 -9.84Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/actions/import","name":"import","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Import-File--Streamline-Ultimate\">\n  <desc>\n    Import File Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M14.25 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75H4.25c-1.51878 0 -2.75 -1.2312 -2.75 -2.75V2.75C1.5 1.23122 2.73122 0 4.25 0h10zm-2.252 3.7832c-0.552 0.00016 -0.9998 0.4479 -1 1v5.2715H9.04102c-0.30319 0.0001 -0.57728 0.1828 -0.69336 0.4629 -0.11599 0.2801 -0.05117 0.6029 0.16308 0.8174l2.95896 2.9599c0.1405 0.1405 0.3316 0.2196 0.5303 0.2197s0.3897 -0.0793 0.5303 -0.2197l2.9599 -2.9599c0.2145 -0.2145 0.2792 -0.5372 0.1631 -0.8174 -0.1161 -0.2801 -0.3901 -0.4629 -0.6933 -0.4629h-1.962v-5.2715c-0.0001 -0.5522 -0.4477 -1 -1 -1M15.8066 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875H16.5c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973C15.8291 6.38962 15.75 6.19891 15.75 6V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path>\n</svg>"}];
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
