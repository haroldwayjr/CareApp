
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

const BATCH = [{"setName": "icon/files/file.pdf", "name": "file-pdf", "category": "files", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Pdf-Reader--Streamline-Ultimate\">\n  <desc>\n    Pdf Reader Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M15.0459 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75h-15.5c-1.51878 0 -2.75 -1.2312 -2.75 -2.75v-0.1279h10.1914c1.5188 0 2.75 -1.2312 2.75 -2.75v-3.3467c0 -1.5188 -1.2312 -2.75 -2.75 -2.75H2.2959V2.75c0 -1.51878 1.23122 -2.75 2.75 -2.75h10zm-2.5586 7.7754c0.6904 0 1.25 0.5596 1.25 1.25v3.3467c0 0.6903 -0.5596 1.25 -1.25 1.25H1.9541c-0.69035 0 -1.249998 -0.5597 -1.249998 -1.25v-3.3467c0 -0.6904 0.559648 -1.25 1.249998 -1.25zM6.23926 9.08203c-0.41422 0 -0.75 0.33579 -0.75 0.75 0 0.41417 0.33578 0.74997 0.75 0.74997h7.49804c0.4142 0 0.75 -0.3358 0.75 -0.74997 0 -0.41421 -0.3358 -0.75 -0.75 -0.75zm0 -3.26074c-0.41422 0 -0.75 0.33579 -0.75 0.75s0.33578 0.75 0.75 0.75h5.78904c0.4142 0 0.75 -0.33579 0.75 -0.75s-0.3358 -0.75 -0.75 -0.75zM16.6025 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875h-5.5303c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973 -0.1406 -0.14065 -0.2197 -0.33136 -0.2197 -0.53027V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path>\n</svg>"}, {"setName": "icon/files/folder.add", "name": "folder-add", "category": "files", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Folder-Add--Streamline-Ultimate\">\n  <desc>\n    Folder Add Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M9.5 17.5a8 8 0 0 1 8 -8 7.86 7.86 0 0 1 3.15 0.66 0.25 0.25 0 0 0 0.35 -0.22V4.5A1.5 1.5 0 0 0 19.5 3H9.62a0.51 0.51 0 0 1 -0.45 -0.28L8.22 0.83A1.49 1.49 0 0 0 6.88 0H1.5A1.5 1.5 0 0 0 0 1.5v15A1.5 1.5 0 0 0 1.5 18h7.64c0.25 0 0.36 -0.33 0.36 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.5 11a6.5 6.5 0 1 0 6.5 6.5 6.51 6.51 0 0 0 -6.5 -6.5m3.25 6.5a0.76 0.76 0 0 1 -0.75 0.75h-1.5a0.25 0.25 0 0 0 -0.25 0.25V20a0.75 0.75 0 0 1 -1.5 0v-1.5a0.25 0.25 0 0 0 -0.25 -0.25H15a0.75 0.75 0 0 1 0 -1.5h1.5a0.25 0.25 0 0 0 0.25 -0.25V15a0.75 0.75 0 0 1 1.5 0v1.5a0.25 0.25 0 0 0 0.25 0.25H20a0.76 0.76 0 0 1 0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}, {"setName": "icon/files/cloud.upload", "name": "cloud-upload", "category": "files", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Cloud-Upload--Streamline-Ultimate\">\n  <desc>\n    Cloud Upload Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M24 10.41a5.82 5.82 0 0 0 -1.77 -4.16 5.7 5.7 0 0 0 -3.45 -1.59 0.25 0.25 0 0 1 -0.19 -0.12 7.68 7.68 0 0 0 -14.1 2.3 0.25 0.25 0 0 1 -0.22 0.16 4.66 4.66 0 0 0 -2.58 1A4.59 4.59 0 0 0 0 11.61a4.33 4.33 0 0 0 1.24 3.21 5.58 5.58 0 0 0 3.6 1.38 1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1 3.36 3.36 0 0 1 -2.17 -0.81A2.35 2.35 0 0 1 2 11.61a2.58 2.58 0 0 1 3.12 -2.53 1 1 0 0 0 0.81 -0.19 1 1 0 0 0 0.39 -0.73 5.68 5.68 0 0 1 10.82 -2.09 1 1 0 0 0 0.94 0.57 3.67 3.67 0 0 1 2.76 1.05A3.74 3.74 0 0 1 22 10.41a3.83 3.83 0 0 1 -3.44 3.79 1 1 0 0 0 0.26 2A5.82 5.82 0 0 0 24 10.41\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12.71 9a1 1 0 0 0 -1.42 0l-3.5 3.5a1 1 0 0 0 0.71 1.7h1.75a0.25 0.25 0 0 1 0.25 0.25v7.25a1.5 1.5 0 1 0 3 0v-7.25a0.25 0.25 0 0 1 0.25 -0.25h1.75a1 1 0 0 0 0.71 -1.71Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
