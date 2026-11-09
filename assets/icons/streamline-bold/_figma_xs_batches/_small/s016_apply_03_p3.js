
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

const BATCH = [{"setName":"icon/media/equalizer","name":"equalizer","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Equalizer-1--Streamline-Ultimate\">\n  <desc>\n    Equalizer 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M24 2A1.5 1.5 0 0 0 22.5 0.5h-21A1.5 1.5 0 0 0 0 2v20a1.5 1.5 0 0 0 1.5 1.5h21A1.5 1.5 0 0 0 24 22Zm-6 16.5a1 1 0 0 1 0 -2h0.5a0.25 0.25 0 0 0 0.25 -0.25V9a0.75 0.75 0 0 1 1.5 0v7.25a0.25 0.25 0 0 0 0.25 0.25h0.5a1 1 0 0 1 0 2h-0.5a0.25 0.25 0 0 0 -0.25 0.25V21a0.75 0.75 0 0 1 -1.5 0v-2.25a0.25 0.25 0 0 0 -0.25 -0.25Zm-7.5 -4a1 1 0 0 1 0 -2h0.5a0.25 0.25 0 0 0 0.25 -0.25V9a0.75 0.75 0 0 1 1.5 0v3.25a0.25 0.25 0 0 0 0.25 0.25h0.5a1 1 0 0 1 0 2H13a0.25 0.25 0 0 0 -0.25 0.25V21a0.75 0.75 0 0 1 -1.5 0v-6.25a0.25 0.25 0 0 0 -0.25 -0.25ZM3.5 5a1 1 0 0 1 0 -2h17a1 1 0 0 1 0 2ZM3 18.5a1 1 0 0 1 0 -2h0.5a0.25 0.25 0 0 0 0.25 -0.25V9a0.75 0.75 0 0 1 1.5 0v7.25a0.25 0.25 0 0 0 0.25 0.25H6a1 1 0 0 1 0 2h-0.5a0.25 0.25 0 0 0 -0.25 0.25V21a0.75 0.75 0 0 1 -1.5 0v-2.25a0.25 0.25 0 0 0 -0.25 -0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/media/playlist","name":"playlist","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Playlist--Streamline-Ultimate\">\n  <desc>\n    Playlist Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M18 2H6a2 2 0 0 0 -2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2V4a2 2 0 0 0 -2 -2m-3.54 7 -3.41 1.1c-0.21 0 -0.3 0.15 -0.3 0.27v4.92A1.75 1.75 0 1 1 9 13.5h0.15a0.11 0.11 0 0 0 0.07 0 0.09 0.09 0 0 0 0 -0.07v-3.1a1.75 1.75 0 0 1 1.43 -1.72l3.41 -1.1a1.74 1.74 0 0 1 2.19 1.69v4.05a1.75 1.75 0 1 1 -1.75 -1.75 0.24 0.24 0 0 0 0.25 -0.25V9.2a0.25 0.25 0 0 0 -0.29 -0.2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 6a1 1 0 0 0 -1 1v10.5a1 1 0 0 0 2 0V7a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23 6a1 1 0 0 0 -1 1v10.5a1 1 0 0 0 2 0V7a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/comms/mail","name":"mail","category":"comms","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Email-Action-Home--Streamline-Ultimate\">\n  <desc>\n    Email Action Home Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M18.41 15.13a0.73 0.73 0 0 1 -0.41 0.12H6a0.72 0.72 0 0 1 -0.4 -0.12L0.39 11.78a0.27 0.27 0 0 0 -0.26 0A0.26 0.26 0 0 0 0 12v10a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V12a0.26 0.26 0 0 0 -0.13 -0.22 0.27 0.27 0 0 0 -0.26 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.12 13a0.25 0.25 0 0 0 0.25 0 0.24 0.24 0 0 0 0.14 -0.22V2.25a0.29 0.29 0 0 1 0.07 -0.18 0.29 0.29 0 0 1 0.17 -0.07h12.5a0.25 0.25 0 0 1 0.25 0.25v10.57a0.24 0.24 0 0 0 0.13 0.22 0.24 0.24 0 0 0 0.26 0L23 10.43a0.25 0.25 0 0 0 0.11 -0.21A0.28 0.28 0 0 0 23 10l-2.5 -1.7V2.21a2.11 2.11 0 0 0 -2 -2.21h-13a2.12 2.12 0 0 0 -2 2.21V8.3L1 10a0.28 0.28 0 0 0 -0.1 0.21 0.26 0.26 0 0 0 0.11 0.21Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 3.58 7.12 7.41a0.33 0.33 0 0 0 -0.1 0.37 0.35 0.35 0 0 0 0.32 0.22h0.91a0.25 0.25 0 0 1 0.25 0.25v3.25a0.5 0.5 0 0 0 0.5 0.5h1.5a0.5 0.5 0 0 0 0.5 -0.5v-1.25a1.25 1.25 0 0 1 2.5 0v1.25a0.5 0.5 0 0 0 0.5 0.5h1.5a0.5 0.5 0 0 0 0.5 -0.5V8.25a0.25 0.25 0 0 1 0.25 -0.25h0.91a0.35 0.35 0 0 0 0.32 -0.22 0.33 0.33 0 0 0 -0.1 -0.37l-4.91 -3.83a0.33 0.33 0 0 0 -0.47 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/comms/message","name":"message","category":"comms","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Chat-Consultation-Phone--Streamline-Ultimate\">\n  <desc>\n    Chat Consultation Phone Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m15.23 11.16 -4.669 1.334a0.5 0.5 0 0 1 -0.63 -0.563l0.645 -3.874V1.852A1.551 1.551 0 0 1 12.128 0.3h10.084a1.552 1.552 0 0 1 1.551 1.552v7.757a1.552 1.552 0 0 1 -1.551 1.551zm1.252 -8.956 1.55 0a0.5 0.5 0 0 1 0.5 0.5V4.37h1.666a0.5 0.5 0 0 1 0.5 0.5v1.55a0.5 0.5 0 0 1 -0.5 0.5h-1.666v1.666a0.5 0.5 0 0 1 -0.5 0.5h-1.55a0.5 0.5 0 0 1 -0.5 -0.5V6.92h-1.666a0.5 0.5 0 0 1 -0.5 -0.5V4.87a0.5 0.5 0 0 1 0.5 -0.5h1.666V2.704a0.5 0.5 0 0 1 0.5 -0.5m-0.67 10.456h-0.371l-1.63 0.466v8.322c0 0.197 -0.16 0.358 -0.358 0.358H2.587a0.358 0.358 0 0 1 -0.359 -0.358V6.506c0 -0.198 0.16 -0.358 0.359 -0.358h6.49v-2h-6.49A2.358 2.358 0 0 0 0.228 6.506v14.942a2.358 2.358 0 0 0 2.359 2.358h10.866a2.358 2.358 0 0 0 2.358 -2.358V12.66Zm-9.81 6.424a1 1 0 0 1 1 -1h2.037a1 1 0 1 1 0 2H7a1 1 0 0 1 -1 -1Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/comms/phone","name":"phone","category":"comms","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Phone--Streamline-Ultimate\">\n  <desc>\n    Phone Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m22.67 17 -2.45 -2.45a2.8 2.8 0 0 0 -4 0l-0.49 0.49a54 54 0 0 1 -6.81 -6.8l0.5 -0.5a2.83 2.83 0 0 0 0 -4L7 1.32a2.87 2.87 0 0 0 -4 0L1.66 2.66a4 4 0 0 0 -0.5 5 54.24 54.24 0 0 0 15.17 15.17 4 4 0 0 0 5 -0.5L22.67 21a2.8 2.8 0 0 0 0 -4\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/comms/phone.off","name":"phone-off","category":"comms","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Phone-Off--Streamline-Ultimate\">\n  <desc>\n    Phone Off Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"m19.2 14.71 -1.55 -1.55a1.55 1.55 0 0 0 -2.18 0.11l-0.57 0.58 -0.27 -0.22a0.26 0.26 0 0 0 -0.34 0l-2.1 2.11a0.26 0.26 0 0 0 0 0.37 20.62 20.62 0 0 0 3 2.16 2.37 2.37 0 0 0 2.92 -0.45l0.95 -0.94a1.55 1.55 0 0 0 0.14 -2.17\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0M2.09 10.65a10 10 0 0 1 16 -6.57 0.25 0.25 0 0 1 0 0.38l-6.26 6.27a0.25 0.25 0 0 1 -0.37 0L10.15 9.1l0.58 -0.57a1.55 1.55 0 0 0 0.11 -2.18L9.29 4.8a1.55 1.55 0 0 0 -2.18 0.11l-0.94 1a2.37 2.37 0 0 0 -0.45 2.92 48.21 48.21 0 0 0 3.35 4.37 0.26 0.26 0 0 1 0 0.34l-4.61 4.58a0.25 0.25 0 0 1 -0.38 0 10 10 0 0 1 -1.99 -7.47m19.82 2.7a10 10 0 0 1 -16 6.57 0.25 0.25 0 0 1 0 -0.38L19.54 5.88a0.25 0.25 0 0 1 0.38 0 10 10 0 0 1 1.99 7.47\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
