
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

const BATCH = [{"setName":"icon/comms/reply","name":"reply","category":"comms","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Email-Action-Reply--Streamline-Ultimate\">\n  <desc>\n    Email Action Reply Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M19.62 10.68c-3 -2.67 -7.13 -2.85 -8.86 -2.79a0.29 0.29 0 0 1 -0.18 -0.07 0.27 0.27 0 0 1 -0.08 -0.18V5.06a1 1 0 0 0 -0.57 -0.9 1 1 0 0 0 -1.07 0.14l-7.5 6.37a1 1 0 0 0 -0.36 0.77 1 1 0 0 0 0.35 0.76l7.51 6.63a1 1 0 0 0 1.64 -0.77V15a0.26 0.26 0 0 1 0.2 -0.25c1.91 -0.4 8.13 -1.15 11.36 4.89a0.5 0.5 0 0 0 0.94 -0.23c0 -3.79 -1.14 -6.74 -3.38 -8.73\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/hearing.aid","name":"hearing-aid","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Hearing-Aid--Streamline-Ultimate\">\n  <desc>\n    Hearing Aid Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M12.7214 1.56128c-0.4435 -0.05431 -0.8952 -0.08228 -1.3534 -0.08228H9.51927c-2.84326 0 -5.14818 2.30492 -5.14818 5.14818v0.20363h-0.00744v1.98943c0 0.41421 -0.33579 0.75 -0.75 0.75 -0.41422 0 -0.75 -0.33579 -0.75 -0.75V7.68619c-0.77469 0.7829 -1.25305 1.85958 -1.25305 3.04801 0 2.3933 1.9402 4.3336 4.33357 4.3336 2.39336 0 4.33353 -1.9403 4.33353 -4.3336 0 -1.24804 -0.52753 -2.37285 -1.37182 -3.16359V8.8203c0 0.41421 -0.33578 0.75 -0.75 0.75 -0.41421 0 -0.75 -0.33579 -0.75 -0.75V6.94019c0 -0.03716 0.00271 -0.07368 0.00792 -0.10938h-0.00477c0.13381 -1.29258 1.22636 -2.30054 2.55433 -2.30054 0.40374 0 0.98024 0.00874 1.57944 0.04726zm-0.192 4.61224 -0.1147 0.29355c-0.201 0.51441 0.053 1.09436 0.5675 1.29536 0.5144 0.201 1.0943 -0.05307 1.2953 -0.56748l0.2501 -0.64014c4.6768 3.27161 1.8243 10.00229 -3.2442 10.00229 -1.92313 0 -3.48213 1.5589 -3.48213 3.4821 0 1.9231 1.559 3.4821 3.48213 3.4821 6.0869 0 11.1058 -4.9342 11.1058 -11.0211 0 -4.39477 -2.5723 -8.18879 -6.2935 -9.95853l0.273 -0.6987c0.201 -0.51441 -0.053 -1.094363 -0.5674 -1.295363 -0.5071 -0.198143 -1.0779 0.045937 -1.2866 0.545703L12.537 6.15468c-0.0025 0.00634 -0.005 0.01262 -0.0076 0.01884\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
