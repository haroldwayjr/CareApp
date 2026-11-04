
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

const BATCH = [{"setName":"icon/health/nurse","name":"nurse","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Nurse-With-Cap-Cloth--Streamline-Ultimate\">\n  <desc>\n    Nurse With Cap Cloth Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M12 16.674c1.027 0 2.02 0.144 2.96 0.41l-2.933 3.496 -3.057 -3.476c0.961 -0.28 1.977 -0.43 3.03 -0.43m-9.901 6.25a11.185 11.185 0 0 1 5.369 -5.26L13.04 24H2.772a0.749 0.749 0 0 1 -0.673 -1.076m10.929 -1.206L15.035 24h6.193a0.749 0.749 0 0 0 0.673 -1.076 11.183 11.183 0 0 0 -5.444 -5.294l-3.43 4.088Zm-5.684 -1.712c0.413 0 0.748 0.335 0.748 0.749v0.222h0.223a0.749 0.749 0 0 1 0 1.498h-0.223v0.222a0.749 0.749 0 1 1 -1.497 0v-0.222h-0.223a0.749 0.749 0 1 1 0 -1.498h0.223v-0.222a0.75 0.75 0 0 1 0.749 -0.75Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M12 5.53c-1.893 0 -3.25 0.58 -4.183 1.472C6.9 7.879 6.46 8.992 6.26 9.95a0.75 0.75 0 0 0 -0.016 0.154c0 3.163 2.63 5.666 5.757 5.666s5.757 -2.503 5.757 -5.666a0.747 0.747 0 0 0 -0.014 -0.147c-0.201 -1.004 -0.64 -2.123 -1.564 -2.993a4.957 4.957 0 0 0 -1.88 -1.097c-0.664 -0.219 -1.427 -0.336 -2.3 -0.336M7.792 10.75c2.647 0.362 5.274 -0.935 6.622 -3.217 0.292 0.152 0.535 0.33 0.738 0.521 0.605 0.57 0.938 1.332 1.107 2.123 -0.04 2.267 -1.948 4.096 -4.259 4.096 -2.113 0 -3.889 -1.529 -4.208 -3.523M12 5.53\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M12 0c4.007 0 7.77 2.277 7.77 5.19 0 0.298 -0.6 1.387 -1.241 2.464a6.401 6.401 0 0 0 -1.324 -1.781 6.243 6.243 0 0 0 -1.164 -0.86l0.435 -0.82a0.749 0.749 0 0 0 -1.323 -0.703l-0.486 0.915a8.432 8.432 0 0 0 -1.918 -0.38v-0.719a0.749 0.749 0 1 0 -1.498 0v0.723a8.46 8.46 0 0 0 -1.911 0.39l-0.493 -0.929a0.749 0.749 0 1 0 -1.323 0.702l0.445 0.84a6.23 6.23 0 0 0 -1.126 0.83 6.549 6.549 0 0 0 -1.37 1.83C4.83 6.622 4.228 5.53 4.228 5.19 4.23 2.277 7.993 0 12 0\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/doctor","name":"doctor","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Doctor-Desktop--Streamline-Ultimate\">\n  <desc>\n    Doctor Desktop Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M7.445 4.122a3.629 3.629 0 1 0 6.845 1.373 7.688 7.688 0 0 1 -6.845 -1.373m3.228 -3.97a5.629 5.629 0 1 0 0 11.258 5.629 5.629 0 0 0 0 -11.257Zm1.193 12.666a2.827 2.827 0 0 0 -0.374 1.41v5.467a2.842 2.842 0 0 0 2.42 2.81A2.525 2.525 0 0 0 14.16 24H0.923a0.75 0.75 0 0 1 -0.75 -0.75 10.5 10.5 0 0 1 11.693 -10.432m-4.713 3.89h-0.939a0.5 0.5 0 0 0 -0.5 0.5v1.146H4.567a0.5 0.5 0 0 0 -0.5 0.5v0.94a0.5 0.5 0 0 0 0.5 0.5h1.147l0 1.146a0.5 0.5 0 0 0 0.5 0.5h0.94a0.5 0.5 0 0 0 0.5 -0.5v-1.146H8.8a0.5 0.5 0 0 0 0.5 -0.5v-0.94a0.5 0.5 0 0 0 -0.5 -0.5H7.653v-1.147a0.5 0.5 0 0 0 -0.5 -0.5Zm7.839 2.329v-4.15h6.896v4.15zm-0.658 -6.15c-0.74 0 -1.342 0.599 -1.342 1.341v5.467c0 0.743 0.602 1.342 1.342 1.342h3.106l0 0.826h-1.053a1 1 0 1 0 0 2h4.106a1 1 0 1 0 0 -2H19.44l0 -0.826h3.106c0.74 0 1.342 -0.6 1.342 -1.342v-5.609a1.2 1.2 0 0 0 -1.2 -1.2h-8.354Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/appointment","name":"appointment","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Waiting-Room-Appointment-Medical-Appointment-2--Streamline-Ultimate\">\n  <desc>\n    Waiting Room Appointment Medical Appointment 2 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M17.5 0c0.2652 0 0.5195 0.105433 0.707 0.292969 0.1876 0.187536 0.293 0.441815 0.293 0.707031v1.5c0 0.13261 0.0527 0.25975 0.1465 0.35352C18.7403 2.94728 18.8674 3 19 3h3c0.5304 0 1.039 0.21086 1.4141 0.58594C23.7891 3.96101 24 4.46957 24 5v17c0 0.5304 -0.2109 1.039 -0.5859 1.4141C23.039 23.7891 22.5304 24 22 24H2c-0.53043 0 -1.03899 -0.2109 -1.414062 -0.5859C0.210865 23.039 0 22.5304 0 22V5c0 -0.53043 0.210865 -1.03899 0.585938 -1.41406C0.96101 3.21086 1.46957 3 2 3h2c0.13261 0 0.25975 0.05272 0.35352 0.14648 0.09376 0.09377 0.14648 0.22091 0.14648 0.35352v2.25c0 0.19891 0.07907 0.38962 0.21973 0.53027 0.14065 0.14066 0.33136 0.21973 0.53027 0.21973s0.38962 -0.07907 0.53027 -0.21973C5.92093 6.13962 6 5.94891 6 5.75V1c0 -0.265216 0.10543 -0.519495 0.29297 -0.707031C6.48051 0.105432 6.73478 0 7 0s0.51949 0.105432 0.70703 0.292969C7.89457 0.480505 8 0.734784 8 1v1.5c0 0.13261 0.05272 0.25975 0.14648 0.35352C8.24025 2.94728 8.36739 3 8.5 3h6c0.1326 0 0.2597 0.05272 0.3535 0.14648 0.0938 0.09377 0.1465 0.22091 0.1465 0.35352v2.25c0 0.19891 0.0791 0.38962 0.2197 0.53027 0.1407 0.14066 0.3314 0.21973 0.5303 0.21973s0.3896 -0.07907 0.5303 -0.21973c0.1406 -0.14065 0.2197 -0.33136 0.2197 -0.53027V1c0 -0.265216 0.1054 -0.519495 0.293 -0.707031C16.9805 0.105433 17.2348 0 17.5 0m-15 9c-0.13261 0 -0.25975 0.05272 -0.35352 0.14648C2.05272 9.24025 2 9.36739 2 9.5v12c0 0.1326 0.05272 0.2597 0.14648 0.3535 0.09377 0.0938 0.22091 0.1465 0.35352 0.1465h19c0.1326 0 0.2597 -0.0527 0.3535 -0.1465S22 21.6326 22 21.5v-12c0 -0.13261 -0.0527 -0.25975 -0.1465 -0.35352C21.7597 9.05272 21.6326 9 21.5 9zm10.333 1.3154c0.2873 0 0.5634 0.1142 0.7666 0.3174 0.203 0.2031 0.3173 0.4785 0.3174 0.7656v2.25h2.25c0.2871 0.0001 0.5625 0.1144 0.7656 0.3174 0.2032 0.2032 0.3174 0.4793 0.3174 0.7666v1.666c0 0.2874 -0.1142 0.5635 -0.3174 0.7666 -0.2031 0.203 -0.4785 0.3173 -0.7656 0.3174h-2.25v2.25c-0.0001 0.2871 -0.1144 0.5626 -0.3174 0.7656 -0.2032 0.2032 -0.4793 0.3174 -0.7666 0.3174h-1.666c-0.2873 0 -0.5634 -0.1142 -0.7666 -0.3174 -0.203 -0.203 -0.3173 -0.4785 -0.3174 -0.7656v-2.25H7.83301c-0.28713 -0.0001 -0.56256 -0.1144 -0.76563 -0.3174 -0.20316 -0.2031 -0.31738 -0.4792 -0.31738 -0.7666v-1.666c0 -0.2873 0.11422 -0.5634 0.31738 -0.7666 0.20307 -0.203 0.4785 -0.3173 0.76563 -0.3174H10.083v-2.25c0.0001 -0.2871 0.1144 -0.5625 0.3174 -0.7656 0.2032 -0.2032 0.4793 -0.3174 0.7666 -0.3174z\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/lab","name":"lab","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Laboratory-Sample--Streamline-Ultimate\">\n  <desc>\n    Laboratory Sample Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.25 9.68a1 1 0 0 0 -0.4 -1.35l-8.79 -4.77A1 1 0 0 0 12.7 4a1 1 0 0 0 0.41 1.35l0.89 0.45a0.5 0.5 0 0 1 0.2 0.68L12 10.43a4 4 0 0 0 0.18 4.3 0.49 0.49 0 0 1 0 0.54l-1.59 2.95a1 1 0 0 0 0.4 1.35 0.89 0.89 0 0 0 0.47 0.12 1 1 0 0 0 0.88 -0.52L14 16.23a0.48 0.48 0 0 1 0.5 -0.23 4 4 0 0 0 3.7 -2.2l2.14 -4a0.52 0.52 0 0 1 0.3 -0.24 0.5 0.5 0 0 1 0.38 0l0.88 0.48a1 1 0 0 0 1.35 -0.41Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16.84 0.52a1 1 0 0 0 0.41 1.36l0.88 0.48a0.5 0.5 0 0 1 0.2 0.68l-0.24 0.43a0.5 0.5 0 0 0 0.2 0.68l1.76 1a0.5 0.5 0 0 0 0.38 0 0.48 0.48 0 0 0 0.3 -0.24l0.27 -0.45a0.53 0.53 0 0 1 0.29 -0.24 0.55 0.55 0 0 1 0.38 0l0.88 0.48a1 1 0 0 0 0.48 0.12A1 1 0 0 0 23.47 3L18.2 0.12a1 1 0 0 0 -1.36 0.4\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21 14a1 1 0 1 0 -1 1.75c1.26 0.7 2 1.54 2 2.3 0 1.89 -4.28 4 -10 4S2 19.89 2 18c0 -1.41 2.5 -3.22 7.13 -3.82a1 1 0 0 0 -0.26 -2C3.48 12.89 0 15.17 0 18c0 3.42 5.16 6 12 6s12 -2.58 12 -6c0 -1.54 -1.07 -3 -3 -4\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5 17.97a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.25 19.47a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18 17.97a1 1 0 1 0 2 0 1 1 0 1 0 -2 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
return { ok, missing, failed, miss, fail, batch: 'apply_05_p4' };
