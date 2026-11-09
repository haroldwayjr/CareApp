
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
  xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}

const BATCH = [{"setName":"icon/files/faq","name":"faq","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Contact-Us-Faq--Streamline-Ultimate\">\n  <desc>\n    Contact Us Faq Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M22.25 1c0.4641 0 0.9091 0.18451 1.2373 0.5127S24 2.28587 24 2.75v14.5c0 0.4641 -0.1845 0.9091 -0.5127 1.2373S22.7141 19 22.25 19H11.8105l-3.78023 3.7803c-0.21448 0.2145 -0.53714 0.2791 -0.81738 0.1631 -0.28026 -0.1161 -0.46289 -0.3901 -0.46289 -0.6934V19h-5c-0.46413 0 -0.909115 -0.1845 -1.237305 -0.5127C0.184507 18.1591 0 17.7141 0 17.25V2.75c0 -0.46413 0.184507 -0.90912 0.512695 -1.2373C0.840884 1.18451 1.28587 1 1.75 1zm-4.5 5C16.7835 6 16 6.7835 16 7.75v4.5c0 0.9665 0.7835 1.75 1.75 1.75v0.25c0 0.9665 0.7835 1.75 1.75 1.75 0.4142 0 0.75 -0.3358 0.75 -0.75s-0.3358 -0.75 -0.75 -0.75c-0.1381 0 -0.25 -0.1119 -0.25 -0.25V14c0.9665 0 1.75 -0.7835 1.75 -1.75v-4.5C21 6.7835 20.2165 6 19.25 6zm-13 0C3.7835 6 3 6.7835 3 7.75v5.5c0 0.4142 0.33579 0.75 0.75 0.75s0.75 -0.3358 0.75 -0.75V10.5h1.75c0.41421 0 0.75 -0.3358 0.75 -0.75C7 9.33579 6.66421 9 6.25 9H4.5V7.75c0 -0.13807 0.11193 -0.25 0.25 -0.25h2.5c0.41421 0 0.75 -0.33579 0.75 -0.75S7.66421 6 7.25 6zm6.75 0C10.1193 6 9 7.11929 9 8.5v4.75c0 0.4142 0.33579 0.75 0.75 0.75 0.4142 0 0.75 -0.3358 0.75 -0.75v-2h2v2c0 0.4142 0.3358 0.75 0.75 0.75s0.75 -0.3358 0.75 -0.75V8.5C14 7.11929 12.8807 6 11.5 6m7.75 1.5c0.1381 0 0.25 0.11193 0.25 0.25v4.5c0 0.1381 -0.1119 0.25 -0.25 0.25h-1.5c-0.1381 0 -0.25 -0.1119 -0.25 -0.25v-4.5c0 -0.13807 0.1119 -0.25 0.25 -0.25zm-7.75 0c0.5523 0 1 0.44772 1 1v1.25h-2V8.5c0 -0.55228 0.4477 -1 1 -1\" stroke-width=\"1\"></path>\n</svg>"}];

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
