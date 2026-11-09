
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

const BATCH = [{"setName":"icon/navigation/home","name":"home","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"House--Streamline-Ultimate\">\n  <desc>\n    House Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m23.61 8.71 -11 -8.5a1 1 0 0 0 -1.22 0l-11 8.5A1 1 0 0 0 0 9.5V23a1 1 0 0 0 1 1h22a1 1 0 0 0 1 -1V9.5a1 1 0 0 0 -0.39 -0.79Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/menu","name":"menu","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"M1.5 2.5h21s1 0 1 1v1s0 1-1 1h-21s-1 0-1-1v-1s0-1 1-1\" fill=\"#000000\"/><path d=\"M1.5 10.5h21s1 0 1 1v1s0 1-1 1h-21s-1 0-1-1v-1s0-1 1-1\" fill=\"#000000\"/><path d=\"M1.5 18.5h21s1 0 1 1v1s0 1-1 1h-21s-1 0-1-1v-1s0-1 1-1\" fill=\"#000000\"/></g></svg>"},{"setName":"icon/navigation/search","name":"search","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"m23.42 20.6-5.06-5.12a10 10 0 1 0-2.81 2.84l5 5.09a2 2 0 0 0 2.83 0 2 2 0 0 0 .04-2.81ZM10 1.76A8.25 8.25 0 1 1 1.75 10 8.26 8.26 0 0 1 10 1.76Z\" fill=\"#000000\"/><path d=\"M3.25 10.01a6.75 6.75 0 1 0 13.5 0 6.75 6.75 0 1 0-13.5 0\" fill=\"#000000\"/></g></svg>"},{"setName":"icon/navigation/settings","name":"settings","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M22.5 9.5h-1.86a9.51 9.51 0 0 0-.76-1.84l1.31-1.32a1.46 1.46 0 0 0 .44-1.06 1.47 1.47 0 0 0-.44-1.06l-1.41-1.41a1.49 1.49 0 0 0-2.12 0l-1.32 1.32a9 9 0 0 0-1.84-.77V1.5A1.5 1.5 0 0 0 13 0h-2a1.5 1.5 0 0 0-1.5 1.5v1.86a9 9 0 0 0-1.84.77L6.34 2.81a1.49 1.49 0 0 0-2.12 0L2.81 4.22a1.47 1.47 0 0 0-.44 1.06 1.44 1.44 0 0 0 .44 1.06l1.31 1.32a9.51 9.51 0 0 0-.76 1.84H1.5A1.5 1.5 0 0 0 0 11v2a1.5 1.5 0 0 0 1.5 1.5h1.86a9.26 9.26 0 0 0 .76 1.84l-1.31 1.32a1.5 1.5 0 0 0 0 2.12l1.41 1.41a1.53 1.53 0 0 0 2.12 0l1.32-1.31a9.26 9.26 0 0 0 1.84.76v1.86A1.5 1.5 0 0 0 11 24h2a1.5 1.5 0 0 0 1.5-1.5v-1.86a9.26 9.26 0 0 0 1.84-.76l1.32 1.31a1.49 1.49 0 0 0 2.12 0l1.41-1.41a1.5 1.5 0 0 0 0-2.12l-1.31-1.32a9.26 9.26 0 0 0 .76-1.84h1.86A1.5 1.5 0 0 0 24 13v-2a1.5 1.5 0 0 0-1.5-1.5ZM12 17a5 5 0 1 1 5-5 5 5 0 0 1-5 5Z\" fill=\"#000000\"/></svg>"},{"setName":"icon/navigation/chevron.left","name":"chevron-left","category":"navigation","svg":"<svg version=\"1.1\" id=\"Arrow-Left-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" enable-background=\"new 0 0 24 24\">\n  <desc>\n    Arrow Left 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M4.5 12c0 -0.7 0.3 -1.3 0.8 -1.7L16.5 0.5c0.8 -0.7 1.9 -0.6 2.6 0.2 0.6 0.8 0.6 1.9 -0.2 2.5l-9.8 8.6c-0.1 0.1 -0.1 0.2 0 0.3l9.8 8.6c0.8 0.7 0.9 1.8 0.2 2.6s-1.8 0.9 -2.6 0.2l-0.1 -0.1 -11.1 -9.7c-0.5 -0.4 -0.8 -1.1 -0.8 -1.7z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/chevron.right","name":"chevron-right","category":"navigation","svg":"<svg version=\"1.1\" id=\"Arrow-Right-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" enable-background=\"new 0 0 24 24\">\n  <desc>\n    Arrow Right 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M19.5 12c0 0.7 -0.3 1.3 -0.8 1.7L7.5 23.6c-0.8 0.7 -2 0.6 -2.6 -0.2 -0.6 -0.8 -0.6 -1.9 0.2 -2.6l9.8 -8.6c0.1 -0.1 0.1 -0.2 0 -0.4L5.1 3.2c-0.8 -0.7 -0.8 -1.9 -0.1 -2.6 0.7 -0.7 1.8 -0.8 2.6 -0.2l11.2 9.8c0.4 0.5 0.7 1.1 0.7 1.8z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/chevron.up","name":"chevron-up","category":"navigation","svg":"<svg version=\"1.1\" id=\"Arrow-Up-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" enable-background=\"new 0 0 24 24\">\n  <desc>\n    Arrow Up 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12.1 4.5c0.7 0 1.3 0.3 1.7 0.8l9.7 11c0.7 0.7 0.6 1.9 -0.1 2.6s-1.9 0.6 -2.6 -0.1l-0.1 -0.1 -8.5 -9.6c-0.1 -0.1 -0.2 -0.1 -0.4 0l-8.5 9.6c-0.7 0.8 -1.8 0.9 -2.6 0.2s-0.9 -1.8 -0.2 -2.6l0.1 -0.1 9.7 -11c0.5 -0.4 1.1 -0.7 1.8 -0.7z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/chevron.down","name":"chevron-down","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 19.5c-.7 0-1.3-.3-1.7-.8L.4 7.6c-.6-.8-.5-2 .3-2.6.8-.6 1.9-.6 2.5.2l8.6 9.8c.1.1.2.1.4 0l8.6-9.8c.7-.8 1.8-.9 2.6-.2s.9 1.8.2 2.6l-.1.1-9.8 11.1c-.4.4-1.1.7-1.7.7z\" fill=\"#000000\"/></svg>"},{"setName":"icon/navigation/arrow.left","name":"arrow-left","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M22.548 10.561H5.437a.251.251 0 0 1-.165-.438l8.637-7.6a1.44 1.44 0 0 0-1.9-2.162L.828 10.2a2.4 2.4 0 0 0 0 3.6l11.179 9.837a1.44 1.44 0 0 0 1.9-2.161l-8.637-7.6a.251.251 0 0 1 .165-.438h17.113a1.44 1.44 0 0 0 0-2.879Z\" fill=\"#000000\"/></svg>"},{"setName":"icon/navigation/arrow.right","name":"arrow-right","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M23.987 12a2.411 2.411 0 0 0-.814-1.8L11.994.361a1.44 1.44 0 0 0-1.9 2.162l8.637 7.6a.25.25 0 0 1-.165.437H1.452a1.44 1.44 0 0 0 0 2.88h17.111a.251.251 0 0 1 .165.438l-8.637 7.6a1.44 1.44 0 1 0 1.9 2.161L23.172 13.8a2.409 2.409 0 0 0 .815-1.8Z\" fill=\"#000000\"/></svg>"},{"setName":"icon/navigation/arrow.up","name":"arrow-up","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Arrow-Up--Streamline-Ultimate\">\n  <desc>\n    Arrow Up Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.42 11.76 13.77 0.8A2.67 2.67 0 0 0 12 0a2.67 2.67 0 0 0 -1.77 0.8l-9.65 11a1.41 1.41 0 1 0 2.12 1.83l7.45 -8.46a0.25 0.25 0 0 1 0.28 -0.07 0.25 0.25 0 0 1 0.16 0.23v17.26a1.41 1.41 0 1 0 2.82 0V5.33a0.25 0.25 0 0 1 0.16 -0.23 0.25 0.25 0 0 1 0.28 0.07l7.45 8.46a1.41 1.41 0 1 0 2.12 -1.87Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/arrow.down","name":"arrow-down","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Arrow-Down--Streamline-Ultimate\">\n  <desc>\n    Arrow Down Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.29 10.24a1.4 1.4 0 0 0 -2 0.13l-7.45 8.46a0.25 0.25 0 0 1 -0.28 0.07 0.26 0.26 0 0 1 -0.16 -0.23V1.41a1.41 1.41 0 0 0 -2.82 0v17.26a0.26 0.26 0 0 1 -0.16 0.23 0.25 0.25 0 0 1 -0.28 -0.07L2.7 10.37a1.41 1.41 0 0 0 -2.12 1.86l9.65 11a2.36 2.36 0 0 0 3.54 0l9.65 -11a1.41 1.41 0 0 0 -0.13 -1.99Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/close","name":"close","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M.44 21.44a1.49 1.49 0 0 0 0 2.12 1.5 1.5 0 0 0 2.12 0l9.26-9.26a.25.25 0 0 1 .36 0l9.26 9.26a1.5 1.5 0 0 0 2.12 0 1.49 1.49 0 0 0 0-2.12l-9.26-9.26a.25.25 0 0 1 0-.36l9.26-9.26A1.5 1.5 0 0 0 21.44.44L12.18 9.7a.25.25 0 0 1-.36 0L2.56.44A1.5 1.5 0 0 0 .44 2.56l9.26 9.26a.25.25 0 0 1 0 .36Z\" fill=\"#000000\"/></svg>"},{"setName":"icon/navigation/more.horizontal","name":"more-horizontal","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Navigation-Menu-Horizontal--Streamline-Ultimate\">\n  <desc>\n    Navigation Menu Horizontal Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M0 12a3.25 3.25 0 1 0 6.5 0A3.25 3.25 0 1 0 0 12\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.75 12a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 1 0 -6.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.5 12a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 1 0 -6.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/navigation/more.vertical","name":"more-vertical","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Navigation-Menu-Vertical--Streamline-Ultimate\">\n  <desc>\n    Navigation Menu Vertical Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M8.75 3.25a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 1 0 -6.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.75 12a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 1 0 -6.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M8.75 20.75a3.25 3.25 0 1 0 6.5 0 3.25 3.25 0 1 0 -6.5 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/navigation/filter","name":"filter","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M20.59 9.33a6.07 6.07 0 0 0 .91-2.92V4.16c0-1.25-2.5-4.07-10-4.07s-10 2.82-10 4.07v2.25a6.07 6.07 0 0 0 1.56 3.77l6.44 6.44v5.79a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-2.52a6.48 6.48 0 0 0 7.09-10.56ZM11.5 2.09c5 0 8 1.56 8 2.41s-3 2.41-8 2.41-8-1.56-8-2.41 3.04-2.41 8-2.41ZM16 18.41a4.49 4.49 0 0 1-2.37-.68.25.25 0 0 1-.13-.22v-.79a.29.29 0 0 1 .07-.18l5.5-5.5a.26.26 0 0 1 .19-.07.21.21 0 0 1 .18.09 4.44 4.44 0 0 1 1.06 2.85 4.51 4.51 0 0 1-4.5 4.5Z\" fill=\"#000000\"/></svg>"}];
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
return { ok, missing, failed, miss, fail, batch: 'apply_00_p0' };
