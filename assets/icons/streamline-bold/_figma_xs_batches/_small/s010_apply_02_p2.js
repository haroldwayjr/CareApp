
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

const BATCH = [{"setName":"icon/actions/select.all","name":"select-all","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Select-All--Streamline-Ultimate\">\n  <desc>\n    Select All Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M21.9161 23.916c1.1046 0 2 -0.8954 2 -2v-1.6526c0 -0.5523 -0.4477 -1 -1 -1 -0.5522 0 -1 0.4477 -1 1v1.6526h-1.6526c-0.5523 0 -1 0.4477 -1 1s0.4477 1 1 1h1.6526Zm-4.9579 0c0.5522 0 1 -0.4477 1 -1s-0.4478 -1 -1 -1h-3.3054c-0.5522 0 -1 0.4477 -1 1s0.4478 1 1 1h3.3054Zm-6.6107 0c0.5523 0 1 -0.4477 1 -1s-0.4477 -1 -1 -1H7.04221c-0.55229 0 -1 0.4477 -1 1s0.44771 1 1 1h3.30529Zm-6.61061 0c0.55228 0 1 -0.4477 1 -1s-0.44772 -1 -1 -1H2.08423l0 -1.6526c0 -0.5523 -0.44772 -1 -1 -1 -0.552288 0 -1.0000015 0.4477 -1.0000015 1v1.6526c0 1.1046 0.8954295 2 2.0000015 2h1.65266Zm18.17921 -6.958c0 0.5523 0.4478 1 1 1 0.5523 0 1 -0.4477 1 -1v-3.3053c0 -0.5523 -0.4477 -1 -1 -1 -0.5522 0 -1 0.4477 -1 1v3.3053Zm-21.8318715 0c0 0.5523 0.4477135 1 1.0000015 1 0.55228 0 1 -0.4477 1 -1v-3.3053c0 -0.5523 -0.44772 -1 -1 -1 -0.552288 0 -1.0000015 0.4477 -1.0000015 1v3.3053ZM21.9161 10.3474c0 0.5523 0.4478 1 1 1 0.5523 0 1 -0.4477 1 -1V7.04208c0 -0.55228 -0.4477 -1 -1 -1 -0.5522 0 -1 0.44772 -1 1v3.30532Zm-21.8318715 0c0 0.5523 0.4477135 1 1.0000015 1 0.55228 0 1 -0.4477 1 -1V7.04208c0 -0.55228 -0.44772 -1 -1 -1 -0.552288 0 -1.0000015 0.44772 -1.0000015 1v3.30532ZM21.9161 3.73676c0 0.55229 0.4478 1 1 1 0.5523 0 1 -0.44771 1 -1V2.08411c0 -1.104572 -0.8954 -2.0000036 -2 -2.0000036h-1.6526c-0.5523 0 -1 0.4477156 -1 1.0000036 0 0.55228 0.4477 1 1 1h1.6526v1.65265Zm-21.8318715 0c0 0.55229 0.4477135 1 1.0000015 1 0.55228 0 1 -0.44771 1 -1V2.08411h1.65266c0.55228 0 1 -0.44772 1 -1 0 -0.552288 -0.44772 -1.0000036 -1 -1.0000036H2.08423C0.979658 0.0841064 0.0842285 0.979536 0.0842285 2.08411v1.65265ZM16.9582 2.08411c0.5522 0 1 -0.44772 1 -1 0 -0.552288 -0.4478 -1.0000036 -1 -1.0000036h-3.3054c-0.5522 0 -1 0.4477156 -1 1.0000036 0 0.55228 0.4478 1 1 1h3.3054Zm-6.6107 0c0.5523 0 1 -0.44772 1 -1 0 -0.552288 -0.4477 -1.0000036 -1 -1.0000036H7.0422c-0.55228 0 -1 0.4477156 -1 1.0000036 0 0.55228 0.44772 1 1 1h3.3053Zm9.0198 15.78229c0 0.8284 -0.6716 1.5 -1.5 1.5H6.13464c-0.82843 0 -1.5 -0.6716 -1.5 -1.5V6.13372c0 -0.82842 0.67157 -1.5 1.5 -1.5H17.8673c0.8284 0 1.5 0.67158 1.5 1.5V17.8664Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/actions/swap","name":"swap","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Folder-Exchange--Streamline-Ultimate\">\n  <desc>\n    Folder Exchange Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M13 10.5a3 3 0 0 1 1.57 0.46c0.1 0.06 0.34 0.1 0.38 -0.09a1.5 1.5 0 0 0 0.05 -0.37v-7A1.5 1.5 0 0 0 13.5 2h-7a0.49 0.49 0 0 1 -0.4 -0.2L5.2 0.6A1.49 1.49 0 0 0 4 0H1.5A1.5 1.5 0 0 0 0 1.5v9A1.5 1.5 0 0 0 1.5 12h6.28a0.25 0.25 0 0 0 0.22 -0.11 3 3 0 0 1 2.5 -1.39Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.5 14h-7a0.48 0.48 0 0 1 -0.4 -0.2l-0.9 -1.2A1.49 1.49 0 0 0 13 12h-2.5A1.5 1.5 0 0 0 9 13.5v9a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5 -1.5v-7a1.5 1.5 0 0 0 -1.5 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.35 17.15a0.48 0.48 0 0 0 -0.54 -0.15 0.5 0.5 0 0 0 -0.31 0.46v1a0.25 0.25 0 0 1 -0.25 0.25H2.5a0.76 0.76 0 0 1 -0.75 -0.71v-1.5a0.76 0.76 0 0 0 -0.75 -0.75 0.76 0.76 0 0 0 -0.75 0.75V18a2.25 2.25 0 0 0 2.25 2.25h1.75a0.25 0.25 0 0 1 0.25 0.25v1a0.5 0.5 0 0 0 0.31 0.46A0.43 0.43 0 0 0 5 22a0.47 0.47 0 0 0 0.35 -0.15l2 -2a0.48 0.48 0 0 0 0 -0.7Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18.65 6.85A0.47 0.47 0 0 0 19 7a0.43 0.43 0 0 0 0.19 0 0.5 0.5 0 0 0 0.31 -0.46v-1a0.25 0.25 0 0 1 0.25 -0.25h1.75a0.76 0.76 0 0 1 0.75 0.75V7.5a0.75 0.75 0 0 0 1.5 0V6a2.25 2.25 0 0 0 -2.25 -2.25h-1.75a0.25 0.25 0 0 1 -0.25 -0.25v-1a0.5 0.5 0 0 0 -0.31 -0.5 0.48 0.48 0 0 0 -0.54 0.11l-2 2a0.48 0.48 0 0 0 0 0.7Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/actions/sort","name":"sort","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M4.27614 1.16797c0.29451 -0.240247 0.72929 -0.222639 1.00391 0.05176l3 3c0.2144 0.21448 0.27911 0.53718 0.16308 0.81738 -0.11609 0.28019 -0.39007 0.46286 -0.69336 0.46289h-2V22c-0.00006 0.5522 -0.44779 1 -1 1 -0.55209 -0.0002 -0.99993 -0.4479 -1 -1V5.5h-2c-0.30317 -0.00013 -0.57728 -0.1828 -0.69335 -0.46289 -0.115906 -0.28014 -0.05125 -0.60296 0.16308 -0.81738l3 -3zM16.7498 15c0.9665 0 1.75 0.7835 1.75 1.75v4.5c0 0.9665 -0.7835 1.75 -1.75 1.75h-4.5c-0.9664 -0.0001 -1.75 -0.7836 -1.75 -1.75v-4.5c0 -0.9664 0.7836 -1.7499 1.75 -1.75zm4.5 -14c0.9665 0 1.75 0.78351 1.75 1.75v9c0 0.9665 -0.7835 1.75 -1.75 1.75h-9c-0.9664 -0.0001 -1.75 -0.7836 -1.75 -1.75v-9c0 -0.96641 0.7836 -1.74988 1.75 -1.75z\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/actions/sort.asc","name":"sort-asc","category":"actions","svg":"<svg fill=\"none\" viewBox=\"0 0 24 24\" id=\"Ascending-Sort-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\">\n  <desc>\n    Ascending Sort 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path style=\"-inkscape-stroke:none\" d=\"M1.25 17.949219a1 1 0 0 0 -1 1 1 1 0 0 0 1 1h7a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path4\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path>\n  <path style=\"-inkscape-stroke:none\" d=\"M1.25 10.949219a1 1 0 0 0 -1 1 1 1 0 0 0 1 1h14.199219a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path6\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path>\n  <path style=\"-inkscape-stroke:none\" d=\"M1.25 4.0488281a1 1 0 0 0 -1 1 1 1 0 0 0 1 1h21.5a1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1z\" id=\"path8\" color=\"#000000\" fill=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-miterlimit=\"10\" stroke-width=\"1\"></path>\n</svg>"}];
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
