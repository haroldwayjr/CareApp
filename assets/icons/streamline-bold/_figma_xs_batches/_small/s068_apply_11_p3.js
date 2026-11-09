
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

const BATCH = [{"setName":"icon/files/magazine","name":"magazine","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Shopping-Magazine-Advertising--Streamline-Ultimate\">\n  <desc>\n    Shopping Magazine Advertising Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M15.5 8.31h-0.75v6h0.75a1.25 1.25 0 0 0 1.25 -1.25v-3.5a1.25 1.25 0 0 0 -1.25 -1.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.5 8.31a1.25 1.25 0 0 0 -1.25 1.25v1.75h2.5V9.56A1.25 1.25 0 0 0 8.5 8.31\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.39 1.57A1.93 1.93 0 0 0 22 1c-3.84 0.11 -7.7 0.87 -9.65 2.31a0.51 0.51 0 0 1 -0.6 0c-2 -1.43 -5.86 -2.19 -9.7 -2.31a1.94 1.94 0 0 0 -1.44 0.56A2 2 0 0 0 0 3v14.5a2 2 0 0 0 2 2c6 0.17 9 1.82 9 2.48a1 1 0 0 0 2 0c0 -0.66 3.08 -2.31 9 -2.48a2 2 0 0 0 2 -2V3a2 2 0 0 0 -0.61 -1.43M11.25 15.06a0.75 0.75 0 1 1 -1.5 0v-2.25h-2.5v2.25a0.75 0.75 0 1 1 -1.5 0v-5.5a2.75 2.75 0 1 1 5.5 0Zm7 -2a2.75 2.75 0 0 1 -2.75 2.75H14a0.76 0.76 0 0 1 -0.75 -0.75v-7.5a0.75 0.75 0 0 1 0.75 -0.75h1.5a2.75 2.75 0 0 1 2.75 2.75Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/portfolio","name":"portfolio","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M13.5 1.25c1.6569 0 3 1.34315 3 3v1.5h4c1.933 0 3.5 1.567 3.5 3.5v10c0 1.933 -1.567 3.5 -3.5 3.5h-17c-1.933 0 -3.5 -1.567 -3.5 -3.5v-10c1.289e-7 -1.933 1.567 -3.5 3.5 -3.5h4v-1.5c0 -1.65685 1.34315 -3 3 -3zm-1.5 13c-2.77614 0 -5 2.2239 -5 5 0 0.2761 0.22386 0.5 0.5 0.5h9c0.2761 0 0.5 -0.2239 0.5 -0.5 0 -2.7761 -2.2239 -5 -5 -5m0 -6c-1.3807 0 -2.5 1.11929 -2.5 2.5 0 1.3807 1.1193 2.5 2.5 2.5s2.5 -1.1193 2.5 -2.5c0 -1.38071 -1.1193 -2.5 -2.5 -2.5m-1.5 -5c-0.55228 0 -1 0.44772 -1 1v1.5h5v-1.5c0 -0.55228 -0.4477 -1 -1 -1z\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/files/letter","name":"letter","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Letter-Balloon--Streamline-Ultimate\">\n  <desc>\n    Letter Balloon Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M22.91 9h-1V8a1 1 0 0 0 -2 0v1h-1a1 1 0 0 0 0 2h1v1a1 1 0 0 0 2 0v-1h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.41 3a1.5 1.5 0 1 0 -1.5 -1.5 1.5 1.5 0 0 0 1.5 1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M4.41 21a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0 -1.5 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12.1 17.55a1 1 0 0 0 -0.27 -1.39l-2.9 -2 -0.2 -0.11 2.46 -0.81 0.68 0.77a1.75 1.75 0 0 0 1.86 0.5l1.27 -0.39a1.74 1.74 0 0 0 0.79 -2.79L6.8 0.62A1.75 1.75 0 0 0 4.91 0.08L2.4 0.91a1.77 1.77 0 0 0 -1.2 1.56l-0.86 14A1.76 1.76 0 0 0 1 17.94a1.79 1.79 0 0 0 1.07 0.36 1.7 1.7 0 0 0 0.54 -0.09l1.3 -0.43a1.73 1.73 0 0 0 1.19 -1.51l0.09 -1 2.32 -0.76 -0.09 0.17 -1.23 3.17a1 1 0 0 0 0.56 1.29 1 1 0 0 0 0.37 0.07 1 1 0 0 0 0.93 -0.63l0.8 -2 1.86 1.26a1 1 0 0 0 1.39 -0.29m-2.78 -7.41L5 11.58l0.5 -5.81Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.44 19.26c-2.19 0.31 -3 0.2 -3.72 -0.47a1 1 0 0 0 -1.39 1.43c1.47 1.44 3.32 1.31 5.4 1 2.5 -0.36 4.27 0.4 4.73 2a1 1 0 0 0 1 0.74 1.26 1.26 0 0 0 0.27 0 1 1 0 0 0 0.7 -1.23c-0.79 -2.65 -3.43 -3.98 -6.99 -3.47\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/parcel","name":"parcel","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M20.0051 4.8479c1.1411 0.03979 2.2694 0.5344 3.0342 1.49121 0.7714 0.96557 1.1134 2.3237 0.835 3.97269 -0.436 2.5803 -1.5923 5.5292 -4.1973 7.4375 -1.3526 0.9907 -3.0521 1.6676 -5.1641 1.8896 2.0958 -1.2025 3.4674 -2.6367 4.3672 -4.0664 1.3518 -2.148 1.5924 -4.2143 1.7256 -5.2285 0.054 -0.4106 -0.2349 -0.78773 -0.6455 -0.8418 -0.4103 -0.05363 -0.7866 0.23525 -0.8408 0.6455 -0.1313 0.9996 -0.3455 2.7763 -1.5088 4.625 -1.082 1.7193 -3.0283 3.563 -6.6543 4.832 -1.10308 -0.1212 -2.29011 -0.3406 -3.56543 -0.6718 -0.93405 -0.214 -1.82528 -0.5729 -2.64453 -1.0381 3.33666 0.1369 5.57356 -0.4383 7.11226 -1.3985 1.3517 -0.8436 2.0939 -1.9415 2.5664 -2.9414 0.2332 -0.4598 0.4238 -0.9351 0.5655 -1.415 0.1422 -0.4815 0.5786 -0.8352 1.0801 -0.8106l0.8378 0.042c0.1798 0.0087 0.351 -0.0803 0.4473 -0.2324 0.0959 -0.1521 0.1034 -0.3443 0.0186 -0.5029l-1.3848 -2.58302c-0.1421 -0.2657 -0.1621 -0.58509 -0.0195 -0.85059 0.2247 -0.41846 0.5011 -0.78599 0.8193 -1.09961 0.8946 -0.88137 2.0748 -1.29429 3.2158 -1.25488M1.25806 4.78833c0.54837 -0.0635 1.04452 0.32969 1.1084 0.87793 0.04297 0.37068 0.15103 0.8376 0.32324 1.36816 0.85065 -0.08764 1.74995 0.24948 2.55664 0.93262 0.47143 0.3994 0.94526 0.97629 1.41308 1.50586 0.49084 0.5556 1.04099 1.1409 1.74024 1.6855 1.04871 0.8167 2.47594 1.5695 4.58784 1.9219 -0.3917 0.7771 -0.9595 1.5418 -1.9238 2.1436 -0.4049 0.2526 -0.8908 0.4796 -1.47557 0.6689 -1.2344 -0.4765 -2.20891 -1.071 -2.99707 -1.7597 -1.25378 -1.096 -2.08891 -2.4699 -2.73828 -4.0977 -0.1534 -0.38459 -0.589 -0.5721 -0.97363 -0.41894 -0.38463 0.15342 -0.57218 0.58894 -0.41894 0.97364 0.70642 1.7709 1.65692 3.3734 3.14355 4.6728 0.45653 0.399 0.96066 0.7626 1.51562 1.0948 -1.22097 0.1011 -2.69956 0.0755 -4.49609 -0.1397 -0.03085 -0.0037 -0.06149 -0.005 -0.0918 -0.0049 -0.1617 -0.1605 -0.31833 -0.3246 -0.46679 -0.4931C0.733645 14.2085 -0.114022 12.3201 0.020752 10.4846c0.0719476 -0.97696 0.374088 -1.84587 0.890625 -2.47166C0.629571 7.21979 0.45054 6.49562 0.381104 5.89673c-0.063186 -0.54783 0.329438 -1.044 0.876956 -1.1084\" stroke-width=\"1\"></path>\n</svg>"}];
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
