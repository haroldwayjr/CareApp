
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

const BATCH = [{"setName":"icon/navigation/chevron.up","name":"chevron-up","category":"navigation","svg":"<svg version=\"1.1\" id=\"Arrow-Up-1--Streamline-Ultimate\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0\" y=\"0\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" enable-background=\"new 0 0 24 24\">\n  <desc>\n    Arrow Up 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12.1 4.5c0.7 0 1.3 0.3 1.7 0.8l9.7 11c0.7 0.7 0.6 1.9 -0.1 2.6s-1.9 0.6 -2.6 -0.1l-0.1 -0.1 -8.5 -9.6c-0.1 -0.1 -0.2 -0.1 -0.4 0l-8.5 9.6c-0.7 0.8 -1.8 0.9 -2.6 0.2s-0.9 -1.8 -0.2 -2.6l0.1 -0.1 9.7 -11c0.5 -0.4 1.1 -0.7 1.8 -0.7z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/chevron.down","name":"chevron-down","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 19.5c-.7 0-1.3-.3-1.7-.8L.4 7.6c-.6-.8-.5-2 .3-2.6.8-.6 1.9-.6 2.5.2l8.6 9.8c.1.1.2.1.4 0l8.6-9.8c.7-.8 1.8-.9 2.6-.2s.9 1.8.2 2.6l-.1.1-9.8 11.1c-.4.4-1.1.7-1.7.7z\" fill=\"#000000\"/></svg>"},{"setName":"icon/navigation/arrow.left","name":"arrow-left","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M22.548 10.561H5.437a.251.251 0 0 1-.165-.438l8.637-7.6a1.44 1.44 0 0 0-1.9-2.162L.828 10.2a2.4 2.4 0 0 0 0 3.6l11.179 9.837a1.44 1.44 0 0 0 1.9-2.161l-8.637-7.6a.251.251 0 0 1 .165-.438h17.113a1.44 1.44 0 0 0 0-2.879Z\" fill=\"#000000\"/></svg>"},{"setName":"icon/navigation/arrow.right","name":"arrow-right","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M23.987 12a2.411 2.411 0 0 0-.814-1.8L11.994.361a1.44 1.44 0 0 0-1.9 2.162l8.637 7.6a.25.25 0 0 1-.165.437H1.452a1.44 1.44 0 0 0 0 2.88h17.111a.251.251 0 0 1 .165.438l-8.637 7.6a1.44 1.44 0 1 0 1.9 2.161L23.172 13.8a2.409 2.409 0 0 0 .815-1.8Z\" fill=\"#000000\"/></svg>"},{"setName":"icon/navigation/arrow.up","name":"arrow-up","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Arrow-Up--Streamline-Ultimate\">\n  <desc>\n    Arrow Up Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.42 11.76 13.77 0.8A2.67 2.67 0 0 0 12 0a2.67 2.67 0 0 0 -1.77 0.8l-9.65 11a1.41 1.41 0 1 0 2.12 1.83l7.45 -8.46a0.25 0.25 0 0 1 0.28 -0.07 0.25 0.25 0 0 1 0.16 0.23v17.26a1.41 1.41 0 1 0 2.82 0V5.33a0.25 0.25 0 0 1 0.16 -0.23 0.25 0.25 0 0 1 0.28 0.07l7.45 8.46a1.41 1.41 0 1 0 2.12 -1.87Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/navigation/arrow.down","name":"arrow-down","category":"navigation","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Arrow-Down--Streamline-Ultimate\">\n  <desc>\n    Arrow Down Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.29 10.24a1.4 1.4 0 0 0 -2 0.13l-7.45 8.46a0.25 0.25 0 0 1 -0.28 0.07 0.26 0.26 0 0 1 -0.16 -0.23V1.41a1.41 1.41 0 0 0 -2.82 0v17.26a0.26 0.26 0 0 1 -0.16 0.23 0.25 0.25 0 0 1 -0.28 -0.07L2.7 10.37a1.41 1.41 0 0 0 -2.12 1.86l9.65 11a2.36 2.36 0 0 0 3.54 0l9.65 -11a1.41 1.41 0 0 0 -0.13 -1.99Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
