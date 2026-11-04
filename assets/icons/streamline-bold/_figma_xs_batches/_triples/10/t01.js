
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

const BATCH = [{"setName":"icon/commerce/discount","name":"discount","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Discount--Streamline-Ultimate\">\n  <desc>\n    Discount Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M0.5 4.5a4 4 0 1 0 8 0 4 4 0 1 0 -8 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.5 19.5a4 4 0 1 0 8 0 4 4 0 1 0 -8 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.41 1.59a2 2 0 0 0 -2.82 0l-18 18a2 2 0 0 0 0 2.82 2 2 0 0 0 2.82 0l18 -18a2 2 0 0 0 0 -2.82\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/commerce/invoice","name":"invoice","category":"commerce","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Accounting-Invoice--Streamline-Ultimate\">\n  <desc>\n    Accounting Invoice Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M14.25 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75H4.25c-1.51878 0 -2.75 -1.2312 -2.75 -2.75V2.75C1.5 1.23122 2.73122 0 4.25 0h10zm-3.4912 14.4092H17c0.4039 0 0.75 -0.3159 0.75 -0.7285v-2.7022c-0.0001 -0.4125 -0.3462 -0.7285 -0.75 -0.7285h-6.2412zM7 16.25c-0.40379 0 -0.74989 0.316 -0.75 0.7285v2.7022c0 0.4126 0.34615 0.7285 0.75 0.7285h2.25879V16.25zm0.79199 -12.5c-0.41421 0 -0.75 0.33579 -0.75 0.75v0.26172c-0.40764 0.04268 -0.79583 0.20388 -1.11426 0.4668 -0.3745 0.30927 -0.62951 0.73992 -0.72168 1.21679 -0.09208 0.47679 -0.01544 0.971 0.2168 1.39746 0.2323 0.42643 0.60614 0.75917 1.05664 0.94043h0.00098l2.06348 0.8252c0.12723 0.05136 0.23222 0.14609 0.29785 0.2666 0.06572 0.1207 0.0876 0.2606 0.06152 0.3955 -0.02609 0.1348 -0.09828 0.2563 -0.2041 0.3438 -0.10598 0.0875 -0.23951 0.1356 -0.37695 0.1357H6.28809c-0.41422 0 -0.75 0.3358 -0.75 0.75s0.33578 0.75 0.75 0.75h0.7539v0.25c0 0.4142 0.33579 0.75 0.75 0.75 0.41422 0 0.75 -0.3358 0.75 -0.75v-0.2627c0.40689 -0.043 0.79434 -0.2033 1.11231 -0.4658 0.3745 -0.3093 0.6295 -0.7399 0.7217 -1.2168 0.0921 -0.4768 0.0154 -0.97101 -0.2168 -1.39747 -0.23232 -0.42642 -0.60617 -0.75917 -1.05666 -0.94043h-0.00098l-2.06445 -0.82618c-0.1267 -0.05146 -0.23146 -0.14549 -0.29688 -0.26562 -0.06572 -0.1207 -0.0876 -0.26057 -0.06152 -0.39551 0.02609 -0.13479 0.09829 -0.25628 0.2041 -0.34375 0.07938 -0.06555 0.17416 -0.10929 0.27442 -0.12695L7.25977 6.25h2.02832c0.41419 -0.00003 0.75001 -0.3358 0.75001 -0.75s-0.33582 -0.74997 -0.75001 -0.75h-0.7461V4.5c0 -0.41421 -0.33578 -0.75 -0.75 -0.75M15.8066 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875H16.5c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973C15.8291 6.38962 15.75 6.19891 15.75 6V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/glasses","name":"glasses","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Glasses--Streamline-Ultimate\">\n  <desc>\n    Glasses Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M20.61 1.43a1 1 0 0 0 0 2A1.4 1.4 0 0 1 22 4.83v7.9a0.25 0.25 0 0 1 -0.09 0.2 0.27 0.27 0 0 1 -0.21 0.05 3.08 3.08 0 0 0 -0.61 -0.07H16.3a2.92 2.92 0 0 0 -2.16 1 0.25 0.25 0 0 1 -0.32 0 3.39 3.39 0 0 0 -3.64 0 0.25 0.25 0 0 1 -0.32 0 2.92 2.92 0 0 0 -2.16 -1H2.91a3.08 3.08 0 0 0 -0.61 0.09 0.27 0.27 0 0 1 -0.21 -0.05 0.25 0.25 0 0 1 -0.09 -0.2V4.83a1.4 1.4 0 0 1 1.39 -1.4 1 1 0 0 0 0 -2A3.4 3.4 0 0 0 0 4.83v14.82a2.92 2.92 0 0 0 2.91 2.92H7.7a2.92 2.92 0 0 0 2.91 -2.92v-2.87a1.39 1.39 0 0 1 2.78 0v2.87a2.92 2.92 0 0 0 2.91 2.92h4.79A2.92 2.92 0 0 0 24 19.65V4.83a3.4 3.4 0 0 0 -3.39 -3.4m-12 18.22a0.92 0.92 0 0 1 -0.91 0.92H2.91a0.92 0.92 0 0 1 -0.91 -0.92v-3.82a0.92 0.92 0 0 1 0.91 -0.92H7.7a0.92 0.92 0 0 1 0.91 0.92Zm13.39 0a0.92 0.92 0 0 1 -0.91 0.92H16.3a0.92 0.92 0 0 1 -0.91 -0.92v-3.82a0.92 0.92 0 0 1 0.91 -0.92h4.79a0.92 0.92 0 0 1 0.91 0.92Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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