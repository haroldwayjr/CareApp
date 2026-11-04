
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

const BATCH = [{"setName":"icon/files/file.pdf","name":"file-pdf","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Pdf-Reader--Streamline-Ultimate\">\n  <desc>\n    Pdf Reader Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M15.0459 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75h-15.5c-1.51878 0 -2.75 -1.2312 -2.75 -2.75v-0.1279h10.1914c1.5188 0 2.75 -1.2312 2.75 -2.75v-3.3467c0 -1.5188 -1.2312 -2.75 -2.75 -2.75H2.2959V2.75c0 -1.51878 1.23122 -2.75 2.75 -2.75h10zm-2.5586 7.7754c0.6904 0 1.25 0.5596 1.25 1.25v3.3467c0 0.6903 -0.5596 1.25 -1.25 1.25H1.9541c-0.69035 0 -1.249998 -0.5597 -1.249998 -1.25v-3.3467c0 -0.6904 0.559648 -1.25 1.249998 -1.25zM6.23926 9.08203c-0.41422 0 -0.75 0.33579 -0.75 0.75 0 0.41417 0.33578 0.74997 0.75 0.74997h7.49804c0.4142 0 0.75 -0.3358 0.75 -0.74997 0 -0.41421 -0.3358 -0.75 -0.75 -0.75zm0 -3.26074c-0.41422 0 -0.75 0.33579 -0.75 0.75s0.33578 0.75 0.75 0.75h5.78904c0.4142 0 0.75 -0.33579 0.75 -0.75s-0.3358 -0.75 -0.75 -0.75zM16.6025 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875h-5.5303c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973 -0.1406 -0.14065 -0.2197 -0.33136 -0.2197 -0.53027V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/files/folder.add","name":"folder-add","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Folder-Add--Streamline-Ultimate\">\n  <desc>\n    Folder Add Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M9.5 17.5a8 8 0 0 1 8 -8 7.86 7.86 0 0 1 3.15 0.66 0.25 0.25 0 0 0 0.35 -0.22V4.5A1.5 1.5 0 0 0 19.5 3H9.62a0.51 0.51 0 0 1 -0.45 -0.28L8.22 0.83A1.49 1.49 0 0 0 6.88 0H1.5A1.5 1.5 0 0 0 0 1.5v15A1.5 1.5 0 0 0 1.5 18h7.64c0.25 0 0.36 -0.33 0.36 -0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.5 11a6.5 6.5 0 1 0 6.5 6.5 6.51 6.51 0 0 0 -6.5 -6.5m3.25 6.5a0.76 0.76 0 0 1 -0.75 0.75h-1.5a0.25 0.25 0 0 0 -0.25 0.25V20a0.75 0.75 0 0 1 -1.5 0v-1.5a0.25 0.25 0 0 0 -0.25 -0.25H15a0.75 0.75 0 0 1 0 -1.5h1.5a0.25 0.25 0 0 0 0.25 -0.25V15a0.75 0.75 0 0 1 1.5 0v1.5a0.25 0.25 0 0 0 0.25 0.25H20a0.76 0.76 0 0 1 0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/cloud.upload","name":"cloud-upload","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Cloud-Upload--Streamline-Ultimate\">\n  <desc>\n    Cloud Upload Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M24 10.41a5.82 5.82 0 0 0 -1.77 -4.16 5.7 5.7 0 0 0 -3.45 -1.59 0.25 0.25 0 0 1 -0.19 -0.12 7.68 7.68 0 0 0 -14.1 2.3 0.25 0.25 0 0 1 -0.22 0.16 4.66 4.66 0 0 0 -2.58 1A4.59 4.59 0 0 0 0 11.61a4.33 4.33 0 0 0 1.24 3.21 5.58 5.58 0 0 0 3.6 1.38 1 1 0 0 0 1 -1 1 1 0 0 0 -1 -1 3.36 3.36 0 0 1 -2.17 -0.81A2.35 2.35 0 0 1 2 11.61a2.58 2.58 0 0 1 3.12 -2.53 1 1 0 0 0 0.81 -0.19 1 1 0 0 0 0.39 -0.73 5.68 5.68 0 0 1 10.82 -2.09 1 1 0 0 0 0.94 0.57 3.67 3.67 0 0 1 2.76 1.05A3.74 3.74 0 0 1 22 10.41a3.83 3.83 0 0 1 -3.44 3.79 1 1 0 0 0 0.26 2A5.82 5.82 0 0 0 24 10.41\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12.71 9a1 1 0 0 0 -1.42 0l-3.5 3.5a1 1 0 0 0 0.71 1.7h1.75a0.25 0.25 0 0 1 0.25 0.25v7.25a1.5 1.5 0 1 0 3 0v-7.25a0.25 0.25 0 0 1 0.25 -0.25h1.75a1 1 0 0 0 0.71 -1.71Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/hard.drive","name":"hard-drive","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Hard-Drive--Streamline-Ultimate\">\n  <desc>\n    Hard Drive Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M0.5 15.25v4a2 2 0 0 0 2 2h19a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-19a2 2 0 0 0 -2 2m19.5 -1a1 1 0 1 1 -1 1 1 1 0 0 1 1 -1M3.5 17.5h17a0.75 0.75 0 0 1 0 1.5h-17a0.75 0.75 0 0 1 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M2.5 11.75h19a3.31 3.31 0 0 1 1.34 0.28 0.27 0.27 0 0 0 0.26 0 0.26 0.26 0 0 0 0.08 -0.25l-1.69 -6.72a3.22 3.22 0 0 0 -3 -2.31H5.5a3.22 3.22 0 0 0 -3 2.31L0.82 11.74A0.26 0.26 0 0 0 0.9 12a0.27 0.27 0 0 0 0.26 0 3.31 3.31 0 0 1 1.34 -0.25\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/files/policy","name":"policy","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M19.415 19.3613c0.1722 0.1032 0.3332 0.2267 0.4776 0.3711 0.4688 0.4689 0.7324 1.1046 0.7324 1.7676s-0.2636 1.2987 -0.7324 1.7676c-0.4689 0.4688 -1.1046 0.7324 -1.7676 0.7324H8.57715c0.30324 -0.4868 0.50924 -1.0554 0.60937 -1.6523 0.13746 -0.8204 0.07552 -1.6846 -0.18164 -2.46 -0.06013 -0.1812 -0.1327 -0.3572 -0.21386 -0.5264zM15.0654 1.625c-0.6682 1.2295 -1.8645 2.14202 -3.2519 2.41602 -0.7981 0.15783 -1.3982 0.71748 -1.6612 1.40039 -0.0318 0.08261 -0.0595 0.16885 -0.082 0.25781l-0.001 0.0039c-0.0044 0.01682 -0.0164 0.06187 -0.0273 0.11817 -0.0036 0.01872 -0.0069 0.0378 -0.0098 0.05664l-0.0117 0.07617 -0.0107 0.08887c-0.0028 0.02956 -0.0038 0.05624 -0.0049 0.07812 -0.0006 0.00699 -0.0015 0.01479 -0.002 0.02246L10 6.23145v0.02636c0 0.05535 0.0027 0.11101 0.0088 0.16602l0.0146 0.13183c0.0042 0.0373 0.0097 0.07446 0.0166 0.11133 0.0111 0.05879 0.0243 0.10965 0.0264 0.11817l0.001 0.0039c0.0126 0.0512 0.0267 0.09909 0.041 0.14356l0.043 0.12304c0.2619 0.68293 0.8616 1.24501 1.6621 1.40332 1.8473 0.36483 3.3567 1.86122 3.7304 3.73142l0.0469 0.1934C15.8689 13.3327 16.7428 14 17.75 14h0.001c0.3568 -0.0002 0.6962 -0.0857 0.999 -0.2363v4.0976H7.24805c-0.32663 0.0002 -0.616 0.2121 -0.71485 0.5235 -0.09826 0.3111 0.01564 0.6506 0.28223 0.8388 0.30081 0.2125 0.58687 0.598 0.76562 1.1368 0.17752 0.5353 0.22444 1.1515 0.12598 1.7392 -0.09894 0.5896 -0.33166 1.079 -0.62305 1.4043 -0.28522 0.3181 -0.58881 0.4428 -0.85058 0.4453 -0.53695 -0.1028 -1.03557 -0.3627 -1.42774 -0.7549C4.28994 22.6786 4 21.9793 4 21.25V5c0 -0.41421 -0.33579 -0.75 -0.75 -0.75s-0.75 0.33579 -0.75 0.75v3.375H0.75c-0.414214 0 -0.75 -0.33579 -0.75 -0.75v-3.25c0 -0.72935 0.289939 -1.42861 0.805664 -1.94434C1.32139 1.91494 2.02065 1.625 2.75 1.625zM7.875 13.7783c-0.41419 0 -0.74997 0.3358 -0.75 0.75 0 0.4142 0.33579 0.75 0.75 0.75h7c0.4142 0 0.75 -0.3358 0.75 -0.75s-0.3358 -0.75 -0.75 -0.75zM17.75 0c0.3576 0 0.6653 0.252876 0.7354 0.603516 0.4926 2.465074 2.467 4.426704 4.9101 4.909184 0.2626 0.05193 0.4635 0.23598 0.5527 0.46875 0.0108 0.02782 0.0199 0.05638 0.0274 0.08593 0.0032 0.01302 0.0072 0.02583 0.0098 0.03907l0.0117 0.07617c0.0015 0.01665 0.0015 0.03328 0.0019 0.0498 0.0001 0.00326 0.001 0.0065 0.001 0.00977v0.01562l-0.0146 0.13184c-0.0025 0.01318 -0.0057 0.02609 -0.0088 0.03906 -0.0076 0.03063 -0.0173 0.06008 -0.0284 0.08887 -0.089 0.23317 -0.2898 0.41773 -0.5527 0.46972 -2.4432 0.48249 -4.4175 2.44424 -4.9101 4.9092 -0.0701 0.3505 -0.3779 0.6034 -0.7354 0.6035 -0.3576 0 -0.6653 -0.2529 -0.7354 -0.6035 -0.4926 -2.46509 -2.467 -4.42672 -4.9101 -4.9092 -0.2629 -0.05199 -0.4637 -0.23655 -0.5527 -0.46972 -0.0111 -0.02879 -0.0208 -0.05824 -0.0284 -0.08887 -0.0031 -0.01297 -0.0063 -0.02588 -0.0088 -0.03906L11.5 6.25781v-0.01562c0 -0.00327 0.0009 -0.00651 0.001 -0.00977 0.0004 -0.01652 0.0004 -0.03315 0.0019 -0.0498l0.0117 -0.07617c0.0026 -0.01324 0.0066 -0.02605 0.0098 -0.03907 0.0075 -0.02955 0.0166 -0.05811 0.0274 -0.08593 0.0892 -0.23277 0.2901 -0.41682 0.5527 -0.46875 2.4432 -0.48249 4.4175 -2.44424 4.9101 -4.909184C17.0847 0.252965 17.3925 0.000126981 17.75 0M7.875 10.0283c-0.41419 0 -0.74997 0.3358 -0.75 0.75 0 0.4142 0.33579 0.75 0.75 0.75h4.75c0.4142 0 0.75 -0.3358 0.75 -0.75s-0.3358 -0.75 -0.75 -0.75zm0 -3.74998c-0.41419 0 -0.74997 0.33581 -0.75 0.75 0 0.41421 0.33579 0.75 0.75 0.75h0.75c0.41421 0 0.75 -0.33579 0.75 -0.75 -0.00003 -0.41419 -0.33581 -0.75 -0.75 -0.75zm2.127 -0.08594 -0.001 0.00977c0.0001 -0.00692 0.0007 -0.01397 0.001 -0.02051z\" stroke-width=\"1\"></path>\n</svg>"}];
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
return { ok, missing, failed, miss, fail, batch: 'apply_12_p3' };
