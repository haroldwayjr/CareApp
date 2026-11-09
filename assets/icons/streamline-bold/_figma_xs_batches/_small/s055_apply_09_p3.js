
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

const BATCH = [{"setName":"icon/actions/remind","name":"remind","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M12.5 7.25c0.3205 0.00065 0.6337 0.09576 0.9004 0.27344 0.2668 0.17787 0.4757 0.43081 0.5996 0.72656v2.5c0 0.1326 0.0527 0.2597 0.1465 0.3535s0.2209 0.1465 0.3535 0.1465c0.1318 -0.0026 0.2574 -0.0562 0.3506 -0.1494s0.1468 -0.2188 0.1494 -0.3506V8.5c-0.0001 -0.06442 0.0248 -0.12629 0.0693 -0.17285 0.0448 -0.04661 0.1064 -0.07457 0.1709 -0.07715h0.25c0.3205 0.0007 0.6337 0.09573 0.9004 0.27344 0.2668 0.17787 0.4757 0.43081 0.5996 0.72656v2.4697c0 0.1326 0.0528 0.2598 0.1465 0.3535 0.0938 0.0938 0.2209 0.1465 0.3535 0.1465 0.1318 -0.0026 0.2575 -0.0562 0.3506 -0.1494s0.1469 -0.2189 0.1494 -0.3506V9.59961c0.0007 -0.03997 0.0102 -0.07913 0.0274 -0.11523 0.0172 -0.03624 0.0415 -0.06894 0.0722 -0.09473 0.036 -0.01693 0.0755 -0.02539 0.1153 -0.02539 0.0397 0.00001 0.0793 0.00847 0.1152 0.02539 0.4888 0.16423 0.9148 0.47557 1.2207 0.89065 0.306 0.4151 0.4771 0.9142 0.4893 1.4297v2.5996c-0.0045 0.9735 -0.1394 1.9429 -0.4004 2.8808l-1.749 6.086c-0.1233 0.4284 -0.5152 0.7236 -0.961 0.7236H7.55957c-0.27594 -0.0002 -0.5 -0.224 -0.5 -0.5V22l-1.73926 -1.7305C4.47713 19.4258 4.00215 18.2827 4 17.0898V14.25c0.00205 -0.5865 0.15153 -1.1631 0.43457 -1.6768 0.28307 -0.5137 0.6908 -0.9486 1.18555 -1.2636 0.03717 -0.024 0.08075 -0.0362 0.125 -0.0362 0.04427 0.0001 0.08782 0.0121 0.125 0.0362 0.03939 0.019 0.07267 0.0497 0.0957 0.0869 0.02278 0.037 0.03463 0.0796 0.03418 0.123v4.8203c0 0.1326 0.05277 0.2598 0.14648 0.3536 0.09377 0.0937 0.22091 0.1464 0.35352 0.1464s0.25975 -0.0527 0.35352 -0.1464c0.09371 -0.0938 0.14648 -0.221 0.14648 -0.3536v-5.8281c0.00014 -0.077 0.03569 -0.1499 0.0957 -0.1982 0.48685 -0.39148 0.8685 -0.80589 1.13282 -1.12307 0.16613 -0.19936 0.31737 -0.39659 0.45214 -0.58398 0.04756 -0.06613 0.12364 -0.10641 0.20508 -0.10645H10.75c0.1381 0 0.25 0.11193 0.25 0.25v2c0 0.1326 0.0527 0.2597 0.1465 0.3535s0.2209 0.1465 0.3535 0.1465c0.1318 -0.0026 0.2574 -0.0562 0.3506 -0.1494s0.1468 -0.2188 0.1494 -0.3506V7.5c0 -0.0663 0.0264 -0.12987 0.0732 -0.17676 0.0469 -0.04688 0.1105 -0.07324 0.1768 -0.07324zM9 0.75c0.53043 0 1.039 0.210865 1.4141 0.58594 0.375 0.37507 0.5859 0.88363 0.5859 1.41406v4c0 0.13807 -0.1119 0.25 -0.25 0.25H7.9375c-0.02054 0.03445 -0.04046 0.07171 -0.06348 0.10938 -0.1848 0.30241 -0.45546 0.71022 -0.79785 1.12109C6.43122 9.00436 5.361 10 4 10c-1.24264 0 -2.25 -1.00736 -2.25 -2.25 0 -0.57681 0.21831 -1.1018 0.5752 -1.5 -0.35689 -0.3982 -0.5752 -0.92319 -0.5752 -1.5C1.75 3.50736 2.75736 2.5 4 2.5c1.30978 0 2.3487 0.92345 3 1.68262V2.75c0 -0.53043 0.21087 -1.03899 0.58594 -1.41406C7.96101 0.960865 8.46957 0.75 9 0.75M4 7c-0.41421 0 -0.75 0.33579 -0.75 0.75s0.33579 0.75 0.75 0.75c0.63889 0 1.31876 -0.50438 1.92383 -1.23047 0.07499 -0.09 0.14575 -0.18061 0.21289 -0.26953zm0 -3c-0.41421 0 -0.75 0.33579 -0.75 0.75s0.33579 0.75 0.75 0.75h2.13672c-0.06714 -0.08892 -0.1379 -0.17953 -0.21289 -0.26953C5.31876 4.50438 4.63889 4 4 4\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/status/error","name":"error","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Remove-Circle--Streamline-Ultimate\">\n  <desc>\n    Remove Circle Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m5.49 16.07a1 1 0 0 1 -1.41 1.42l-3.9 -3.9a0.25 0.25 0 0 0 -0.36 0l-3.9 3.9a1 1 0 1 1 -1.41 -1.42l3.9 -3.89a0.25 0.25 0 0 0 0 -0.36l-3.9 -3.9a1 1 0 0 1 1.41 -1.41l3.9 3.9a0.25 0.25 0 0 0 0.36 0l3.9 -3.9a1 1 0 0 1 1.41 1.41l-3.9 3.9a0.25 0.25 0 0 0 0 0.36Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/status/bell.off","name":"bell-off","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Alarm-Bell-Off-1--Streamline-Ultimate\">\n  <desc>\n    Alarm Bell Off 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M21 19.5a1 1 0 0 0 0 -2 1.5 1.5 0 0 1 -1.5 -1.5v-4.86a8.65 8.65 0 0 0 -0.4 -2.62l-11 11Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.24 21H9.76a0.25 0.25 0 0 0 -0.24 0.22 2.64 2.64 0 0 0 0 0.28 2.5 2.5 0 0 0 5 0 2.64 2.64 0 0 0 0 -0.28 0.25 0.25 0 0 0 -0.28 -0.22\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1 24a1 1 0 0 0 0.71 -0.28l22 -22a1 1 0 0 0 0 -1.42 1 1 0 0 0 -1.42 0l-5 5A7.31 7.31 0 0 0 13 3.07V1a1 1 0 0 0 -2 0v2.07a8 8 0 0 0 -6.5 8.07V16A1.5 1.5 0 0 1 3 17.5a1 1 0 0 0 0 2h0.09l-2.8 2.79a1 1 0 0 0 0 1.42A1 1 0 0 0 1 24\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/status/eye.off","name":"eye-off","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"View-Off--Streamline-Ultimate\">\n  <desc>\n    View Off Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.19 10.51a20.64 20.64 0 0 0 -4.3 -3.59l4 -4a0.91 0.91 0 0 0 -0.05 -1.34 0.87 0.87 0 0 0 -1.31 0L2 21.07a1 1 0 1 0 1.35 1.35l4.15 -4.15a10.85 10.85 0 0 0 4.61 0.94c4.25 0 8.49 -3 11 -5.8a2.16 2.16 0 0 0 0.08 -2.9m-6.88 2.72a4.59 4.59 0 0 1 -3 3 4.3 4.3 0 0 1 -3.1 -0.19 0.24 0.24 0 0 1 -0.06 -0.4l5.55 -5.56a0.25 0.25 0 0 1 0.41 0.06 4.3 4.3 0 0 1 0.2 3.09\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M7.61 13.36a0.24 0.24 0 0 0 0.07 -0.24A4 4 0 0 1 7.5 12 4.51 4.51 0 0 1 12 7.46a4 4 0 0 1 1.16 0.18 0.26 0.26 0 0 0 0.24 -0.06l1.95 -1.95a0.26 0.26 0 0 0 -0.11 -0.42 10.58 10.58 0 0 0 -3.24 -0.5c-4.3 0 -8.6 3 -11.19 5.8a2.16 2.16 0 0 0 0 2.9 21.36 21.36 0 0 0 3.43 3 0.26 0.26 0 0 0 0.33 0Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
