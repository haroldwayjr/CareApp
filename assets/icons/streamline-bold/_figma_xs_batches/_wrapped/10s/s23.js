
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

const BATCH = [
{
  setName: "icon/actions/snooze",
  name: "snooze",
  category: "actions",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Snoo"+
    "ze-Return-Repeat--Streamline-Ultimate\">\n  <desc>\n    Snooze Return Repeat Stream"+
    "line Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\""+
    "evenodd\" d=\"M12.048 2.938c-2.902 0 -5.783 1.743 -7.602 4.102l1.347 0.815a1 1 0 0"+
    " 1 -0.288 1.829l-3.275 0.77a0.995 0.995 0 0 1 -0.98 -0.292 1.006 1.006 0 0 1 -0."+
    "234 -0.435L0.149 6.451a1 1 0 0 1 1.484 -1.112l1.095 0.662C4.877 3.111 8.367 0.93"+
    "8 12.048 0.938c4.796 0 8.826 3.088 10.415 7.22a1 1 0 0 1 -1.866 0.718c-1.313 -3."+
    "414 -4.637 -5.938 -8.549 -5.938Zm10.313 10.64a0.993 0.993 0 0 0 -0.616 -0.026l-3"+
    ".277 0.868a1 1 0 0 0 -0.261 1.822l1.357 0.82c-1.782 2.328 -4.65 4 -7.612 4 -3.91"+
    "2 0 -7.236 -2.524 -8.549 -5.938a1 1 0 1 0 -1.866 0.718c1.589 4.132 5.619 7.22 10"+
    ".415 7.22 3.712 0 7.205 -2.079 9.33 -4.96l1.085 0.656a1 1 0 0 0 1.486 -1.105l-0."+
    "866 -3.37a0.997 0.997 0 0 0 -0.626 -0.705ZM11.489 8.715a1 1 0 0 0 -2 0v5.8a1 1 0"+
    " 0 0 1 1h4a1 1 0 0 0 0 -2h-3v-4.8Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>"+
    "\n</svg>")
}
];

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
