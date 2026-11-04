
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

const BATCH = [{"setName":"icon/actions/save","name":"save","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Floppy-Disk--Streamline-Ultimate\">\n  <desc>\n    Floppy Disk Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M22 0H5.91A2 2 0 0 0 4.5 0.59L0.59 4.5A2 2 0 0 0 0 5.91V22a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2Zm-3.5 2a0.5 0.5 0 0 1 0.5 0.5v4A1.5 1.5 0 0 1 17.5 8h-10A1.5 1.5 0 0 1 6 6.5v-4a0.5 0.5 0 0 1 0.5 -0.5ZM5 22a0.5 0.5 0 0 1 -0.5 -0.5v-8A1.5 1.5 0 0 1 6 12h13a1.5 1.5 0 0 1 1.5 1.5v8a0.5 0.5 0 0 1 -0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15 4.25v1.5a0.75 0.75 0 0 0 1.5 0v-1.5a0.75 0.75 0 0 0 -1.5 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7 16.25h6.5a0.75 0.75 0 0 0 0 -1.5H7a0.75 0.75 0 0 0 0 1.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7 20.25h11a0.75 0.75 0 0 0 0 -1.5H7a0.75 0.75 0 0 0 0 1.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/actions/copy","name":"copy","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M4.8039 18.7899c0 .5523-.44772 1-1 1H2.11816c-1.10456 0-1.999996-.8954-1.999996-2v-1.6857c0-.5523.447716-1 .999996-1 .55229 0 1 .4477 1 1v1.6857H3.8039c.55228 0 1 .4477 1 1Zm-3.68574-6.181c-.55228 0-.999996-.4477-.999996-1V8.23743c0-.55229.447716-1 .999996-1 .55229 0 1 .44771 1 1v3.37147c0 .5523-.44771 1-1 1Zm0-7.86677c-.55228 0-.999996-.44771-.999996-1V2.0564c0-1.10457.895426-2.0000035 1.999996-2.0000035H3.8039c.55229 0 1 .4477155 1 1.0000035 0 .55228-.44771 1-1 1l-1.68574 0v1.68573c0 .55229-.44771 1-1 1Zm17.73354 0c-.5523 0-1-.44771-1-1V2.0564H16.166c-.5523 0-1-.44772-1-1 0-.552288.4477-1.0000035 1-1.0000035h1.6857c1.1046 0 2 .8954295 2 2.0000035v1.68573c0 .55229-.4477 1-1 1Zm-6.181-3.68573c0 .55228-.4477 1-1 1H8.2992c-.55229 0-1-.44772-1-1 0-.552288.44771-1.0000035 1-1.0000035h3.3715c.5523 0 1 .4477155 1 1.0000035Zm9.4622 22.8869c.9665 0 1.75-.7835 1.75-1.75V7.46278c0-.9665-.7835-1.75-1.75-1.75H7.40248c-.9665 0-1.75.7835-1.75 1.75V22.1933c0 .9664.7835 1.75 1.75 1.75H22.1329Z\" clip-rule=\"evenodd\"/></svg>"},{"setName":"icon/actions/download","name":"download","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"M11.33 14.08a.94.94 0 0 0 1.34 0l9-9A.95.95 0 0 0 21 3.5h-1.44a.93.93 0 0 0-.67.28l-6.54 6.53a.48.48 0 0 1-.7 0L5.11 3.78a1 1 0 0 0-.67-.28H3a.95.95 0 0 0-.67 1.61Z\" fill=\"#000000\"/><path d=\"M22.39 17.67H1.61a1.42 1.42 0 1 0 0 2.83h20.78a1.42 1.42 0 1 0 0-2.83Z\" fill=\"#000000\"/></g></svg>"},{"setName":"icon/actions/upload","name":"upload","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Upload-Menu--Streamline-Ultimate\">\n  <desc>\n    Upload Menu Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M16.42 16.38a1 1 0 0 0 -0.21 -1.09l-3.5 -3.5a1 1 0 0 0 -1.42 0l-3.5 3.5a1 1 0 0 0 -0.21 1.09 1 1 0 0 0 0.92 0.62h1.75a0.25 0.25 0 0 1 0.25 0.25v5.25a1.5 1.5 0 0 0 3 0v-5.25a0.25 0.25 0 0 1 0.25 -0.25h1.75a1 1 0 0 0 0.92 -0.62Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.5 2h13a1 1 0 0 0 0 -2h-13a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.5 5.5h13a1 1 0 0 0 0 -2h-13a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.5 9h13a1 1 0 0 0 0 -2h-13a1 1 0 0 0 0 2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/actions/share","name":"share","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Share--Streamline-Ultimate\">\n  <desc>\n    Share Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M19 14a5 5 0 0 0 -3.59 1.53l-5.49 -2.75A4.91 4.91 0 0 0 10 12a4.91 4.91 0 0 0 -0.08 -0.78l5.49 -2.75A5 5 0 1 0 14 5a4.91 4.91 0 0 0 0.08 0.78L8.59 8.53a5 5 0 1 0 0 6.94l5.49 2.75A4.91 4.91 0 0 0 14 19a5 5 0 1 0 5 -5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/actions/refresh","name":"refresh","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"M9.74 2.5a10.25 10.25 0 0 0-7.36 7.11.26.26 0 0 1-.27.18l-1-.13a.47.47 0 0 0-.47.22.47.47 0 0 0 0 .52l2.47 4.35a.51.51 0 0 0 .44.25.52.52 0 0 0 .36-.16l3.47-3.59a.48.48 0 0 0 .12-.51.5.5 0 0 0-.5-.33l-1.88-.24a.23.23 0 0 1-.12-.12.22.22 0 0 1 0-.21 7.67 7.67 0 0 1 5.37-4.9 7.23 7.23 0 0 1 7.1 2.25 1.25 1.25 0 1 0 1.87-1.66 9.72 9.72 0 0 0-9.6-3.03Z\" fill=\"#000000\"/><path d=\"M4.79 16.7a1.24 1.24 0 0 0-.11 1.76 9.72 9.72 0 0 0 9.55 3 10.24 10.24 0 0 0 7.37-7.12.24.24 0 0 1 .27-.17l1.06.12H23a.52.52 0 0 0 .42-.23.49.49 0 0 0 0-.52l-2.5-4.33a.51.51 0 0 0-.37-.21.52.52 0 0 0-.43.15l-3.45 3.62a.5.5 0 0 0-.11.51.49.49 0 0 0 .41.33l1.85.22A.25.25 0 0 1 19 14a.22.22 0 0 1 0 .21 7.67 7.67 0 0 1-5.36 4.9 7.26 7.26 0 0 1-7.11-2.25 1.24 1.24 0 0 0-1.74-.16Z\" fill=\"#000000\"/><path d=\"M9.49 12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 1 0-5 0\" fill=\"#000000\"/></g></svg>"}];
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
