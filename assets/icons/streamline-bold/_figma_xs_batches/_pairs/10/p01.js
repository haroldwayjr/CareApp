
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

const BATCH = [{"setName":"icon/commerce/bag","name":"bag","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Shopping-Bag--Streamline-Ultimate\">\n  <desc>\n    Shopping Bag Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M18.9142 6.33594c0.5025 -0.01294 0.9938 0.151 1.3857 0.46679 0.3498 0.28201 0.6003 0.66712 0.7168 1.09766l0.042 0.1875 0.0029 0.02344 1.96 13.63187 0.0059 0.0654c0.016 0.2926 -0.0298 0.5858 -0.1348 0.8594 -0.1051 0.2734 -0.2669 0.5219 -0.4746 0.7285 -0.2079 0.2067 -0.4573 0.3671 -0.7315 0.4707 -0.26 0.0982 -0.537 0.1406 -0.8144 0.1299v0.0009H3.12999v-0.0009c-0.27764 0.0108 -0.5552 -0.0317 -0.81543 -0.1299 -0.27407 -0.1035 -0.52362 -0.2642 -0.73144 -0.4707 -0.20775 -0.2066 -0.36944 -0.4551 -0.47461 -0.7285 -0.10517 -0.2736 -0.151613 -0.5668 -0.135745 -0.8594l0.006836 -0.0654L2.93858 8.11133l0.00391 -0.02344c0.08886 -0.5061 0.35866 -0.96276 0.75879 -1.28516 0.39229 -0.31601 0.88381 -0.48006 1.38672 -0.46679v-0.00196h13.8262zM12.003 0.206055c1.0879 0.003446 2.1412 0.386566 2.9786 1.081055 0.837 0.69444 1.4067 1.65836 1.6113 2.72656 0.1035 0.54222 -0.2518 1.06602 -0.794 1.16992 -0.5422 0.10371 -1.0658 -0.25183 -1.1699 -0.79394 -0.1173 -0.61258 -0.4447 -1.16528 -0.9248 -1.56348 -0.4795 -0.39767 -1.0821 -0.6166 -1.7051 -0.61914 -0.6199 0.00278 -1.2201 0.21964 -1.6982 0.61426 -0.47899 0.39543 -0.80613 0.9452 -0.92579 1.55469 -0.10664 0.54157 -0.63214 0.89433 -1.17383 0.78808 -0.54177 -0.10637 -0.89516 -0.63207 -0.78906 -1.17383 0.20882 -1.06322 0.78059 -2.02116 1.61621 -2.71093C9.86424 0.589538 10.9135 0.209392 11.9972 0.206055l0.0029 0.834965z\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/commerce/discount","name":"discount","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Discount--Streamline-Ultimate\">\n  <desc>\n    Discount Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M0.5 4.5a4 4 0 1 0 8 0 4 4 0 1 0 -8 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 19.5a4 4 0 1 0 8 0 4 4 0 1 0 -8 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.41 1.59a2 2 0 0 0 -2.82 0l-18 18a2 2 0 0 0 0 2.82 2 2 0 0 0 2.82 0l18 -18a2 2 0 0 0 0 -2.82\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
