
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
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
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
  try { xs.resizeWithoutConstraints(16, 16); } catch (_) { try { xs.resize(16, 16); } catch(__){} }
  bindFills(node);
  xs.clipsContent = false;
  xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}
const BATCH = [{"setName": "icon/status/shield.off", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Remove-Shield--Streamline-Ultimate\">\n  <desc>\n    Remove Shield Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M20.42 0H3.58a1.5 1.5 0 0 0 -1.49 1.5v6.26a18.26 18.26 0 0 0 9.68 16.18 0.47 0.47 0 0 0 0.46 0 18.26 18.26 0 0 0 9.68 -16.18V1.5A1.5 1.5 0 0 0 20.42 0m-3.8 13.2a1 1 0 1 1 -1.41 1.42l-2.77 -2.77a0.51 0.51 0 0 0 -0.71 0L9 14.62a1 1 0 0 1 -1.42 0 1 1 0 0 1 0 -1.42l2.77 -2.76a0.51 0.51 0 0 0 0 -0.71L7.55 7A1 1 0 1 1 9 5.55l2.76 2.77a0.51 0.51 0 0 0 0.71 0l2.77 -2.77a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.42l-2.8 2.76a0.51 0.51 0 0 0 0 0.71Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}, {"setName": "icon/status/critical", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flash-1--Streamline-Ultimate\">\n  <desc>\n    Flash 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M20.44 9.27A0.48 0.48 0 0 0 20 9h-7.38L14.49 0.61A0.51 0.51 0 0 0 14.2 0a0.5 0.5 0 0 0 -0.61 0.17l-10 14a0.49 0.49 0 0 0 0 0.52A0.49 0.49 0 0 0 4 15h7.38l-1.87 8.39a0.51 0.51 0 0 0 0.29 0.61 0.52 0.52 0 0 0 0.61 -0.17l10 -14a0.49 0.49 0 0 0 0.03 -0.56\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}, {"setName": "icon/health/emergency", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Hospital-Emergency-Department--Streamline-Ultimate\">\n  <desc>\n    Hospital Emergency Department Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M5 19.75a0.5 0.5 0 0 0 0.5 0.5h13a0.5 0.5 0 0 0 0.5 -0.5v-7a7 7 0 0 0 -14 0Zm8.25 -9.5v2h2a0.5 0.5 0 0 1 0.5 0.5v1.5a0.5 0.5 0 0 1 -0.5 0.5h-2v2a0.5 0.5 0 0 1 -0.5 0.5h-1.5a0.5 0.5 0 0 1 -0.5 -0.5v-2h-2a0.5 0.5 0 0 1 -0.5 -0.5v-1.5a0.5 0.5 0 0 1 0.5 -0.5h2v-2a0.5 0.5 0 0 1 0.5 -0.5h1.5a0.5 0.5 0 0 1 0.5 0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M12 4.25a0.75 0.75 0 0 0 0.75 -0.75V1.25a0.75 0.75 0 0 0 -1.5 0V3.5a0.76 0.76 0 0 0 0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18.37 6.89a0.74 0.74 0 0 0 0.53 -0.22l1.59 -1.59a0.75 0.75 0 0 0 0 -1.06 0.74 0.74 0 0 0 -1.06 0l-1.59 1.59a0.74 0.74 0 0 0 0 1.06 0.71 0.71 0 0 0 0.53 0.22\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.25 11.75H21a0.75 0.75 0 0 0 0 1.5h2.25a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.1 6.67a0.74 0.74 0 0 0 0.53 0.22 0.71 0.71 0 0 0 0.53 -0.22 0.74 0.74 0 0 0 0 -1.06L4.57 4a0.74 0.74 0 0 0 -1.06 0 0.75 0.75 0 0 0 0 1.06Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3.75 12.5a0.76 0.76 0 0 0 -0.75 -0.75H0.75a0.75 0.75 0 0 0 0 1.5H3a0.75 0.75 0 0 0 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M21 21.75H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
let ok=0, missing=0, failed=0; const miss=[], fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<8) miss.push(item.setName); continue; }
  try {
    const r = applyBoldXs(set, item.svg);
    if (r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); }
  } catch(e) { failed++; if (fail.length<8) fail.push({name:item.setName,err:String(e)}); }
}
return { ok, missing, failed, miss, fail };
