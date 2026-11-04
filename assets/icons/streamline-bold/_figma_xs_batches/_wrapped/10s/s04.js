
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
  setName: "icon/commerce/invoice",
  name: "invoice",
  category: "commerce",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Acco"+
    "unting-Invoice--Streamline-Ultimate\">\n  <desc>\n    Accounting Invoice Streamline"+
    " Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M14.25 6c0 0"+
    ".59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.6591"+
    "8h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75H4.25c-1.51878 0 -2.75 -1.2312 -2.75 -2.7"+
    "5V2.75C1.5 1.23122 2.73122 0 4.25 0h10zm-3.4912 14.4092H17c0.4039 0 0.75 -0.3159"+
    " 0.75 -0.7285v-2.7022c-0.0001 -0.4125 -0.3462 -0.7285 -0.75 -0.7285h-6.2412zM7 1"+
    "6.25c-0.40379 0 -0.74989 0.316 -0.75 0.7285v2.7022c0 0.4126 0.34615 0.7285 0.75 "+
    "0.7285h2.25879V16.25zm0.79199 -12.5c-0.41421 0 -0.75 0.33579 -0.75 0.75v0.26172c"+
    "-0.40764 0.04268 -0.79583 0.20388 -1.11426 0.4668 -0.3745 0.30927 -0.62951 0.739"+
    "92 -0.72168 1.21679 -0.09208 0.47679 -0.01544 0.971 0.2168 1.39746 0.2323 0.4264"+
    "3 0.60614 0.75917 1.05664 0.94043h0.00098l2.06348 0.8252c0.12723 0.05136 0.23222"+
    " 0.14609 0.29785 0.2666 0.06572 0.1207 0.0876 0.2606 0.06152 0.3955 -0.02609 0.1"+
    "348 -0.09828 0.2563 -0.2041 0.3438 -0.10598 0.0875 -0.23951 0.1356 -0.37695 0.13"+
    "57H6.28809c-0.41422 0 -0.75 0.3358 -0.75 0.75s0.33578 0.75 0.75 0.75h0.7539v0.25"+
    "c0 0.4142 0.33579 0.75 0.75 0.75 0.41422 0 0.75 -0.3358 0.75 -0.75v-0.2627c0.406"+
    "89 -0.043 0.79434 -0.2033 1.11231 -0.4658 0.3745 -0.3093 0.6295 -0.7399 0.7217 -"+
    "1.2168 0.0921 -0.4768 0.0154 -0.97101 -0.2168 -1.39747 -0.23232 -0.42642 -0.6061"+
    "7 -0.75917 -1.05666 -0.94043h-0.00098l-2.06445 -0.82618c-0.1267 -0.05146 -0.2314"+
    "6 -0.14549 -0.29688 -0.26562 -0.06572 -0.1207 -0.0876 -0.26057 -0.06152 -0.39551"+
    " 0.02609 -0.13479 0.09829 -0.25628 0.2041 -0.34375 0.07938 -0.06555 0.17416 -0.1"+
    "0929 0.27442 -0.12695L7.25977 6.25h2.02832c0.41419 -0.00003 0.75001 -0.3358 0.75"+
    "001 -0.75s-0.33582 -0.74997 -0.75001 -0.75h-0.7461V4.5c0 -0.41421 -0.33578 -0.75"+
    " -0.75 -0.75M15.8066 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.0"+
    "6857 0.13 0.14278 0.1885 0.21875H16.5c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.2197"+
    "3C15.8291 6.38962 15.75 6.19891 15.75 6V0.466797c0.0188 0.014433 0.0383 0.027935"+
    " 0.0566 0.042969\" stroke-width=\"1\"></path>\n</svg>")
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
