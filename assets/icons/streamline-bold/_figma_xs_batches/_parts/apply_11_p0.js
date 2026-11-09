
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

const BATCH = [{"setName":"icon/status/lock","name":"lock","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Lock--Streamline-Ultimate\">\n  <desc>\n    Lock Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M8.65 21.5H2.5v-6.15a1.25 1.25 0 0 0 -2.5 0v6.4A2.25 2.25 0 0 0 2.25 24h6.4a1.25 1.25 0 0 0 0 -2.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1.25 9.9A1.25 1.25 0 0 0 2.5 8.65V2.5h6.15a1.25 1.25 0 0 0 0 -2.5h-6.4A2.25 2.25 0 0 0 0 2.25v6.4A1.25 1.25 0 0 0 1.25 9.9\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.75 14.1a1.25 1.25 0 0 0 -1.25 1.25v6.15h-6.15a1.25 1.25 0 0 0 0 2.5h6.4A2.25 2.25 0 0 0 24 21.75v-6.4a1.25 1.25 0 0 0 -1.25 -1.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21.75 0h-6.4a1.25 1.25 0 0 0 0 2.5h6.15v6.15a1.25 1.25 0 0 0 2.5 0v-6.4A2.25 2.25 0 0 0 21.75 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 3.76a4.49 4.49 0 0 0 -4.5 4.46V9h-0.38a1.62 1.62 0 0 0 -1.62 1.65v7.24a1.62 1.62 0 0 0 1.62 1.61h9.76a1.62 1.62 0 0 0 1.62 -1.61v-7.24A1.62 1.62 0 0 0 16.88 9h-0.38v-0.78A4.49 4.49 0 0 0 12 3.76M9.5 8.22a2.5 2.5 0 0 1 5 0V9h-5ZM12 15a1.5 1.5 0 1 1 1.5 -1.5A1.5 1.5 0 0 1 12 15\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/status/star","name":"star","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Rating-Star--Streamline-Ultimate\">\n  <desc>\n    Rating Star Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.56 8.73a1.51 1.51 0 0 0 -1.41 -1h-6.09a0.5 0.5 0 0 1 -0.47 -0.33l-2.18 -6.2A1.52 1.52 0 0 0 12 0.25a1.49 1.49 0 0 0 -1.4 1L8.41 7.42a0.5 0.5 0 0 1 -0.47 0.33H1.85a1.5 1.5 0 0 0 -1.41 1 1.52 1.52 0 0 0 0.45 1.65l5.18 4.3a0.5 0.5 0 0 1 0.16 0.54l-2.18 6.53a1.5 1.5 0 0 0 2.31 1.69l5.34 -3.92a0.49 0.49 0 0 1 0.59 0l5.35 3.92A1.5 1.5 0 0 0 20 21.77l-2.18 -6.53a0.5 0.5 0 0 1 0.16 -0.54l5.19 -4.31a1.51 1.51 0 0 0 0.39 -1.66\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/status/shield.check","name":"shield-check","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-Shield--Streamline-Ultimate\">\n  <desc>\n    Check Shield Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M20.42 0H3.58a1.5 1.5 0 0 0 -1.49 1.5v6.26a18.26 18.26 0 0 0 9.68 16.18 0.47 0.47 0 0 0 0.46 0 18.26 18.26 0 0 0 9.68 -16.18V1.5A1.5 1.5 0 0 0 20.42 0M17.9 7.94l-7.11 6.7a1 1 0 0 1 -0.68 0.27 1 1 0 0 1 -0.71 -0.29L7 12.22a1 1 0 0 1 0 -1.41 1 1 0 0 1 1.42 0l1.68 1.7 6.4 -6a1 1 0 0 1 1.4 1.43\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/status/loading","name":"loading","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Loading--Streamline-Ultimate\">\n  <desc>\n    Loading Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M12 6.5A1.5 1.5 0 0 0 13.5 5V2a1.5 1.5 0 0 0 -3 0v3A1.5 1.5 0 0 0 12 6.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.27 6.11 6.15 4A1.53 1.53 0 0 0 4 4a1.48 1.48 0 0 0 -0.44 1.06A1.52 1.52 0 0 0 4 6.11l2.15 2.12a1.5 1.5 0 0 0 1.06 0.44 1.5 1.5 0 0 0 1.06 -2.56\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M0.5 12A1.5 1.5 0 0 0 2 13.5h3a1.5 1.5 0 0 0 0 -3H2A1.5 1.5 0 0 0 0.5 12\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7 15.52a1.48 1.48 0 0 0 -1.1 0.48l-2.13 2.08a1.51 1.51 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L8 18.08a1.5 1.5 0 0 0 -1 -2.56\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.5 22a1.5 1.5 0 0 0 3 0v-3a1.5 1.5 0 0 0 -3 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M16.05 16a1.5 1.5 0 0 0 0 2.12l2.12 2.12a1.52 1.52 0 0 0 1.06 0.44 1.54 1.54 0 0 0 1.07 -0.44 1.51 1.51 0 0 0 0.43 -1.06 1.48 1.48 0 0 0 -0.44 -1.07L18.17 16a1.5 1.5 0 0 0 -2.12 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.5 12a1.5 1.5 0 0 0 -1.5 -1.5h-3a1.5 1.5 0 0 0 -1.5 1.5 1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19 3.41a1.52 1.52 0 0 0 -1 0.44L15.86 6a1.5 1.5 0 0 0 0 2.12 1.51 1.51 0 0 0 2.13 0L20.11 6A1.5 1.5 0 0 0 19 3.41\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/skip.forward","name":"skip-forward","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Button-Next--Streamline-Ultimate\">\n  <desc>\n    Button Next Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0M7 8.62a1 1 0 0 1 1.67 -0.74l3.75 3.38a1 1 0 0 1 0 1.48l-3.75 3.38A1 1 0 0 1 7 15.38ZM17 16a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1V8a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/media/image","name":"image","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Image-File-Landscape--Streamline-Ultimate\">\n  <desc>\n    Image File Landscape Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M14.25 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75H4.25c-1.51878 0 -2.75 -1.2312 -2.75 -2.75V2.75C1.5 1.23122 2.73122 0 4.25 0h10zm-0.9727 6.1719c-0.1176 0 -0.2341 0.0221 -0.3427 0.0654l-0.1055 0.0508c-0.1373 0.0761 -0.2537 0.1863 -0.3369 0.3193l-1.8233 2.916 -0.4912 -0.7871h-0.0009c-0.0832 -0.1329 -0.19879 -0.2433 -0.33598 -0.3193 -0.13727 -0.076 -0.2923 -0.1162 -0.44922 -0.1162 -0.11772 0 -0.23409 0.023 -0.34277 0.0664l-0.10547 0.0498c-0.10293 0.057 -0.19449 0.1331 -0.26856 0.2236l-0.06835 0.0957 -2.56641 4.1065c-0.09626 0.154 -0.10155 0.3489 -0.01367 0.5078 0.08811 0.159 0.25573 0.2578 0.4375 0.2578H17.5361c0.1818 0 0.3494 -0.0988 0.4375 -0.2578 0.0879 -0.1588 0.0825 -0.3529 -0.0136 -0.5068l-3.8975 -6.2364c-0.0624 -0.0997 -0.1431 -0.1867 -0.2373 -0.2558l-0.0986 -0.0635 -0.1065 -0.0508c-0.1086 -0.0432 -0.2252 -0.0654 -0.3428 -0.0654M8.96875 7.6416c-1.07861 0.00016 -1.95296 0.87452 -1.95313 1.95313 0.00014 1.07867 0.8745 1.95397 1.95313 1.95407 1.07875 0 1.95395 -0.8753 1.95415 -1.95407 -0.0002 -1.07871 -0.8754 -1.95313 -1.95415 -1.95313M15.8066 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875H16.5c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973C15.8291 6.38962 15.75 6.19891 15.75 6V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/media/mic.off","name":"mic-off","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Microphone-Off--Streamline-Ultimate\">\n  <desc>\n    Microphone Off Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M12 20a7.5 7.5 0 0 1 -7.5 -7.5V10a1 1 0 0 0 -2 0v2.5a9.51 9.51 0 0 0 8.28 9.42 0.26 0.26 0 0 1 0.22 0.25V23a1 1 0 0 0 2 0v-0.83a0.26 0.26 0 0 1 0.22 -0.25 9.58 9.58 0 0 0 3.86 -1.39 0.27 0.27 0 0 0 0.11 -0.19 0.25 0.25 0 0 0 -0.07 -0.2L16 19.05a0.24 0.24 0 0 0 -0.3 0A7.47 7.47 0 0 1 12 20\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.43 9.45a0.26 0.26 0 0 0 -0.28 -0.06 0.25 0.25 0 0 0 -0.15 0.23v2.88a6 6 0 0 0 8.47 5.5 0.22 0.22 0 0 0 0.14 -0.18 0.25 0.25 0 0 0 -0.07 -0.23Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m23.71 22.3 -4 -4a0.26 0.26 0 0 1 0 -0.32 9.48 9.48 0 0 0 1.79 -5.48V10a1 1 0 0 0 -2 0v2.5a7.4 7.4 0 0 1 -1.16 4 0.23 0.23 0 0 1 -0.18 0.11 0.24 0.24 0 0 1 -0.21 -0.07l-0.72 -0.72a0.26 0.26 0 0 1 0 -0.31 6 6 0 0 0 0.81 -3V6a6 6 0 0 0 -11.8 -1.69 0.24 0.24 0 0 1 -0.17 0.17 0.26 0.26 0 0 1 -0.24 -0.06L1.71 0.3A1 1 0 0 0 0.29 0.3a1 1 0 0 0 0 1.41l22 22a1 1 0 0 0 1.41 -1.42Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/attachment","name":"attachment","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Attachment-1--Streamline-Ultimate\">\n  <desc>\n    Attachment 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12 0a7 7 0 0 0 -7 7v11.87a5.13 5.13 0 1 0 10.25 0V9.71a3.29 3.29 0 1 0 -6.58 0v7.79a1 1 0 0 0 2 0V9.71a1.29 1.29 0 1 1 2.58 0v9.16a3.13 3.13 0 1 1 -6.25 0V7a5 5 0 0 1 10 0v7.5a1 1 0 0 0 2 0V7a7 7 0 0 0 -7 -7\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/files/file.zip","name":"file-zip","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Zip-File--Streamline-Ultimate\">\n  <desc>\n    Zip File Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M21.56 4.15 17.85 0.44A1.5 1.5 0 0 0 16.79 0H3.5A1.5 1.5 0 0 0 2 1.5v21A1.5 1.5 0 0 0 3.5 24h17a1.5 1.5 0 0 0 1.5 -1.5V5.21a1.5 1.5 0 0 0 -0.44 -1.06M9.5 22a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1m0 -3.5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1m0 -3.5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1m0 -3.5a1 1 0 1 1 1 -1 1 1 0 0 1 -1 1M11 6.6a2 2 0 0 1 -1.48 0.67A2 2 0 0 1 8 6.6a2 2 0 0 1 -0.47 -1.55L8 1.92a0.49 0.49 0 0 1 0.5 -0.42h2a0.51 0.51 0 0 1 0.5 0.42L11.48 5A2 2 0 0 1 11 6.6\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
return { ok, missing, failed, miss, fail, batch: 'apply_11_p0' };
