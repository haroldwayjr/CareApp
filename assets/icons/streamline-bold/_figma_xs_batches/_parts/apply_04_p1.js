
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

const BATCH = [{"setName":"icon/comms/team","name":"team","category":"comms","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Team-Idea--Streamline-Ultimate\">\n  <desc>\n    Team Idea Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M9.9 10.2a0.26 0.26 0 0 1 0.1 0.2v0.6a0.5 0.5 0 0 0 0.5 0.5h3a0.5 0.5 0 0 0 0.5 -0.5v-0.6a0.26 0.26 0 0 1 0.1 -0.2 3.4 3.4 0 0 0 1.4 -2.7A3.6 3.6 0 0 0 12 4a3.6 3.6 0 0 0 -3.5 3.5 3.4 3.4 0 0 0 1.4 2.7\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 3a1 1 0 0 0 1 -1V1a1 1 0 0 0 -2 0v1a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.41 3.5a1 1 0 0 0 0 -1.41 1 1 0 0 0 -1.41 0l-0.71 0.7a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18.5 8.5a1 1 0 0 0 0 -2h-1a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.71 2.79 8 2.09a1 1 0 0 0 -1.41 0 1 1 0 0 0 0 1.41l0.7 0.71a1 1 0 0 0 1.42 0 1 1 0 0 0 0 -1.42\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.5 6.5h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M11 14.25h2a0.75 0.75 0 0 0 0 -1.5h-2a0.75 0.75 0 0 0 0 1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3.5 20.4a2.2 2.2 0 1 0 -2.2 -2.2 2.19 2.19 0 0 0 2.2 2.2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M0.33 24a0.28 0.28 0 0 1 -0.21 -0.1 0.27 0.27 0 0 1 0 -0.23A3.6 3.6 0 0 1 3.5 21.2a3.6 3.6 0 0 1 3.41 2.47 0.27 0.27 0 0 1 0 0.23 0.28 0.28 0 0 1 -0.21 0.1Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 20.4a2.2 2.2 0 1 0 -2.2 -2.2 2.19 2.19 0 0 0 2.2 2.2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20.5 20.4a2.2 2.2 0 1 0 -2.2 -2.2 2.19 2.19 0 0 0 2.2 2.2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.83 24a0.28 0.28 0 0 1 -0.21 -0.1 0.27 0.27 0 0 1 0 -0.23A3.6 3.6 0 0 1 12 21.2a3.6 3.6 0 0 1 3.41 2.47 0.27 0.27 0 0 1 0 0.23 0.28 0.28 0 0 1 -0.21 0.1Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.33 24a0.28 0.28 0 0 1 -0.21 -0.1 0.27 0.27 0 0 1 0 -0.23 3.6 3.6 0 0 1 3.38 -2.47 3.6 3.6 0 0 1 3.41 2.47 0.27 0.27 0 0 1 0 0.23 0.28 0.28 0 0 1 -0.21 0.1Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/comms/presentation","name":"presentation","category":"comms","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Presentation--Streamline-Ultimate\">\n  <desc>\n    Presentation Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M8.5 9h7a0.51 0.51 0 0 0 0.4 -0.2 0.5 0.5 0 0 0 0.1 -0.44 4.21 4.21 0 0 0 -2.61 -2.84 0.25 0.25 0 0 1 -0.16 -0.2 0.24 0.24 0 0 1 0.1 -0.24 2.25 2.25 0 1 0 -2.62 0 0.22 0.22 0 0 1 0.1 0.24 0.25 0.25 0 0 1 -0.16 0.2A4.21 4.21 0 0 0 8 8.36a0.5 0.5 0 0 0 0.08 0.44 0.51 0.51 0 0 0 0.42 0.2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M24 17.86A4.21 4.21 0 0 0 21.37 15a0.25 0.25 0 0 1 -0.16 -0.2 0.24 0.24 0 0 1 0.1 -0.24 2.25 2.25 0 1 0 -2.62 0 0.22 0.22 0 0 1 0.1 0.24 0.25 0.25 0 0 1 -0.16 0.2 3.62 3.62 0 0 0 -1 0.53 0.24 0.24 0 0 0 -0.1 0.25L18 18.3a0.26 0.26 0 0 0 0.25 0.2h5.25a0.51 0.51 0 0 0 0.4 -0.2 0.5 0.5 0 0 0 0.1 -0.44\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.48 15.8a0.24 0.24 0 0 0 -0.1 -0.25 3.62 3.62 0 0 0 -1 -0.53 0.25 0.25 0 0 1 -0.16 -0.2 0.24 0.24 0 0 1 0.1 -0.24 2.25 2.25 0 1 0 -2.62 0 0.22 0.22 0 0 1 0.1 0.24 0.25 0.25 0 0 1 -0.16 0.2A4.21 4.21 0 0 0 0 17.86a0.5 0.5 0 0 0 0.08 0.44 0.51 0.51 0 0 0 0.4 0.2h5.23a0.26 0.26 0 0 0 0.29 -0.2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.67 11.8a1 1 0 0 0 -1 -0.8H9.31a1 1 0 0 0 -1 0.8l-2.08 10a1 1 0 0 0 0.2 0.83 1 1 0 0 0 0.78 0.37h9.54a1 1 0 0 0 0.78 -0.37 1 1 0 0 0 0.2 -0.83Zm-1.37 9a0.49 0.49 0 0 1 -0.38 0.17h-3.84a0.49 0.49 0 0 1 -0.38 -0.17 0.49 0.49 0 0 1 -0.12 -0.4l0.36 -2.5a0.49 0.49 0 0 1 0.49 -0.43h3.14a0.49 0.49 0 0 1 0.49 0.43l0.36 2.5a0.49 0.49 0 0 1 -0.12 0.43Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/comms/meeting","name":"meeting","category":"comms","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Meeting-Remote--Streamline-Ultimate\">\n  <desc>\n    Meeting Remote Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M6.76 12.59h11.48A2.77 2.77 0 0 0 21 9.82V2.76A2.77 2.77 0 0 0 18.24 0H6.76A2.77 2.77 0 0 0 4 2.76v7.06a2.77 2.77 0 0 0 2.76 2.77M6 2.76A0.76 0.76 0 0 1 6.76 2h11.48a0.76 0.76 0 0 1 0.76 0.76v7.06a0.77 0.77 0 0 1 -0.76 0.77h-1.76a0.25 0.25 0 0 1 -0.18 -0.08 5.31 5.31 0 0 0 -2.16 -1.29A0.25 0.25 0 0 1 14 9a0.27 0.27 0 0 1 0.12 -0.25 2.84 2.84 0 1 0 -2.93 0 0.24 0.24 0 0 1 0.13 0.24 0.26 0.26 0 0 1 -0.18 0.21A5.27 5.27 0 0 0 9 10.51a0.25 0.25 0 0 1 -0.18 0.08H6.76A0.77 0.77 0 0 1 6 9.82Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.39 23.19a5.17 5.17 0 0 0 -2.54 -1.71 0.28 0.28 0 0 1 -0.18 -0.21 0.25 0.25 0 0 1 0.12 -0.24 2.86 2.86 0 1 0 -2.93 0 0.26 0.26 0 0 1 -0.05 0.46 4.91 4.91 0 0 0 -1.91 1.08 0.27 0.27 0 0 1 -0.34 0 5.22 5.22 0 0 0 -2 -1.1 0.28 0.28 0 0 1 -0.18 -0.21 0.25 0.25 0 0 1 0.12 -0.24 2.86 2.86 0 1 0 -2.93 0 0.26 0.26 0 0 1 0 0.46 5 5 0 0 0 -2 1.18 0.26 0.26 0 0 1 -0.35 0 5 5 0 0 0 -2 -1.19 0.25 0.25 0 0 1 -0.22 -0.19 0.25 0.25 0 0 1 0.11 -0.28 2.85 2.85 0 1 0 -2.93 0 0.24 0.24 0 0 1 0.12 0.24 0.25 0.25 0 0 1 -0.17 0.21 5.16 5.16 0 0 0 -2.52 1.7 0.51 0.51 0 0 0 -0.06 0.53A0.5 0.5 0 0 0 1 24h22a0.5 0.5 0 0 0 0.45 -0.28 0.51 0.51 0 0 0 -0.06 -0.53\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/file","name":"file","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Common-File-Book--Streamline-Ultimate\">\n  <desc>\n    Common File Book Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m23.47 6.56 -2.85 -3a1.82 1.82 0 0 0 -1.3 -0.56H4.68a1.84 1.84 0 0 0 -1.32 0.56l-2.82 3A1.8 1.8 0 0 0 0 7.84v11.33A1.83 1.83 0 0 0 1.83 21h20.34A1.83 1.83 0 0 0 24 19.17V7.84a1.83 1.83 0 0 0 -0.53 -1.28M2.14 7.77 4.6 5.16A0.52 0.52 0 0 1 5 5h5.5a0.5 0.5 0 0 1 0.5 0.5v13a0.5 0.5 0 0 1 -0.5 0.5h-8a0.5 0.5 0 0 1 -0.5 -0.5V8.11a0.48 0.48 0 0 1 0.14 -0.34M21.5 19h-8a0.5 0.5 0 0 1 -0.5 -0.5v-13a0.5 0.5 0 0 1 0.5 -0.5H19a0.52 0.52 0 0 1 0.37 0.16l2.46 2.61a0.48 0.48 0 0 1 0.14 0.34V18.5a0.5 0.5 0 0 1 -0.47 0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/files/file.text","name":"file-text","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Common-File-Text--Streamline-Ultimate\">\n  <desc>\n    Common File Text Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M14.25 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75H4.25c-1.51878 0 -2.75 -1.2312 -2.75 -2.75V2.75C1.5 1.23122 2.73122 0 4.25 0h10zM6.50098 18.75c-0.41422 0 -0.75 0.3358 -0.75 0.75 0 0.4141 0.33503 0.7497 0.74902 0.75h10.999c0.4142 0 0.751 -0.3358 0.751 -0.75 0 -0.414 -0.3361 -0.7497 -0.75 -0.75zm0 -4c-0.41422 0 -0.75 0.3358 -0.75 0.75 0 0.4141 0.33503 0.7497 0.74902 0.75h10.999c0.4142 0 0.751 -0.3358 0.751 -0.75 0 -0.414 -0.3361 -0.7497 -0.75 -0.75zm0 -4c-0.38819 0 -0.70848 0.2949 -0.74707 0.6729 -0.00259 0.0253 -0.00293 0.0511 -0.00293 0.0771s0.00034 0.0518 0.00293 0.0771c0.03858 0.3779 0.35813 0.6727 0.74609 0.6729h10.999c0.4142 0 0.751 -0.3358 0.751 -0.75 0 -0.414 -0.3361 -0.7497 -0.75 -0.75zm0 -4c-0.41422 0 -0.75 0.33579 -0.75 0.75s0.33578 0.75 0.75 0.75h4.78512c0.4138 -0.00053 0.75 -0.33611 0.75 -0.75s-0.3362 -0.74947 -0.75 -0.75zM15.8066 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875H16.5c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973C15.8291 6.38962 15.75 6.19891 15.75 6V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/commerce/bank","name":"bank","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Blood-Bank--Streamline-Ultimate\">\n  <desc>\n    Blood Bank Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M8.166 10.797a4.03 4.03 0 0 0 1.262 -2.913c0 -3.501 -3.691 -7.62 -4.31 -7.62 -0.618 0 -4.31 4.119 -4.31 7.62a4.03 4.03 0 0 0 1.263 2.913 4.413 4.413 0 0 0 3.048 1.206 4.413 4.413 0 0 0 3.047 -1.206m0.513 1.528v2.673H8.67v3.655a0.75 0.75 0 0 1 -1.5 0v-3.655l-2.435 0a0.75 0.75 0 0 0 -0.75 0.75v7.4c0 0.415 0.335 0.75 0.75 0.75H9.41l0.018 0h2.815v-3.736a0.5 0.5 0 0 1 0.5 -0.5h2.297a0.5 0.5 0 0 1 0.5 0.5v3.737h2.816l0.015 0h4.678a0.75 0.75 0 0 0 0.75 -0.75v-7.4a0.75 0.75 0 0 0 -0.75 -0.75l-2.46 0v3.654a0.75 0.75 0 0 1 -1.5 0v-4.566c0 -0.056 0.005 -0.11 0.017 -0.162v-3.647a0.75 0.75 0 0 0 -0.75 -0.75h-7.683a5.59 5.59 0 0 1 -1.995 2.797Zm5.95 -0.979h-1.345a0.5 0.5 0 0 0 -0.5 0.5v1.136h-1.2a0.5 0.5 0 0 0 -0.5 0.5v1.346a0.5 0.5 0 0 0 0.5 0.5h1.2v1.137a0.5 0.5 0 0 0 0.5 0.5h1.346a0.5 0.5 0 0 0 0.5 -0.5v-1.137h1.072a0.5 0.5 0 0 0 0.5 -0.5v-1.346a0.5 0.5 0 0 0 -0.5 -0.5H15.13v-1.136a0.5 0.5 0 0 0 -0.5 -0.5Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
return { ok, missing, failed, miss, fail, batch: 'apply_04_p1' };
