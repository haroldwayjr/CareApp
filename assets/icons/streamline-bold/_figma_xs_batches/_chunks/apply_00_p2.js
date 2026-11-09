
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

const BATCH = [{"setName":"icon/navigation/close","name":"close","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M.44 21.44a1.49 1.49 0 0 0 0 2.12 1.5 1.5 0 0 0 2.12 0l9.26-9.26a.25.25 0 0 1 .36 0l9.26 9.26a1.5 1.5 0 0 0 2.12 0 1.49 1.49 0 0 0 0-2.12l-9.26-9.26a.25.25 0 0 1 0-.36l9.26-9.26A1.5 1.5 0 0 0 21.44.44L12.18 9.7a.25.25 0 0 1-.36 0L2.56.44A1.5 1.5 0 0 0 .44 2.56l9.26 9.26a.25.25 0 0 1 0 .36Z\" fill=\"#000000\"/></svg>"},{"setName":"icon/navigation/more.horizontal","name":"more-horizontal","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Navigation-Menu-Horizontal--Streamline-Ultimate\">\n  <desc>\n    Navigation Menu Horizontal Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M0 12a3.25 3.25 0 1 0 6.5 0A3.25 3.25 0 1 0 0 12\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.75 12a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 1 0 -6.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.5 12a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 1 0 -6.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/navigation/more.vertical","name":"more-vertical","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Navigation-Menu-Vertical--Streamline-Ultimate\">\n  <desc>\n    Navigation Menu Vertical Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M8.75 3.25a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 1 0 -6.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.75 12a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 1 0 -6.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.75 20.75a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 1 0 -6.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/navigation/filter","name":"filter","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M20.59 9.33a6.07 6.07 0 0 0 .91-2.92V4.16c0-1.25-2.5-4.07-10-4.07s-10 2.82-10 4.07v2.25a6.07 6.07 0 0 0 1.56 3.77l6.44 6.44v5.79a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-2.52a6.48 6.48 0 0 0 7.09-10.56ZM11.5 2.09c5 0 8 1.56 8 2.41s-3 2.41-8 2.41-8-1.56-8-2.41 3.04-2.41 8-2.41ZM16 18.41a4.49 4.49 0 0 1-2.37-.68.25.25 0 0 1-.13-.22v-.79a.29.29 0 0 1 .07-.18l5.5-5.5a.26.26 0 0 1 .19-.07.21.21 0 0 1 .18.09 4.44 4.44 0 0 1 1.06 2.85 4.51 4.51 0 0 1-4.5 4.5Z\" fill=\"#000000\"/></svg>"},{"setName":"icon/navigation/back","name":"back","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Arrow-Circle-Left--Streamline-Ultimate\">\n  <desc>\n    Arrow Circle Left Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm3.91 17a1.25 1.25 0 1 1 -1.53 2L7 13.36a1.72 1.72 0 0 1 0 -2.72L14.38 5a1.25 1.25 0 1 1 1.53 2l-6.28 4.8a0.27 0.27 0 0 0 0 0.4Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/forward","name":"forward","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Arrow-Circle-Right--Streamline-Ultimate\">\n  <desc>\n    Arrow Circle Right Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm5 13.36L9.62 19a1.25 1.25 0 1 1 -1.53 -2l6.28 -4.81a0.27 0.27 0 0 0 0 -0.4L8.09 7a1.25 1.25 0 1 1 1.53 -2L17 10.64a1.72 1.72 0 0 1 0 2.72Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
