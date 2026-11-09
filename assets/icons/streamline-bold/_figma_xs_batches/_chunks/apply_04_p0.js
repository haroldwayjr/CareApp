
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

const BATCH = [{"setName":"icon/comms/user.remove","name":"user-remove","category":"comms","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Phone-Action-Remove-User--Streamline-Ultimate\">\n  <desc>\n    Phone Action Remove User Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M17 0H7a3 3 0 0 0 -3 3v18a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3V3a3 3 0 0 0 -3 -3m1 19a0.5 0.5 0 0 1 -0.5 0.5h-11A0.5 0.5 0 0 1 6 19V3.5a0.5 0.5 0 0 1 0.5 -0.5h11a0.5 0.5 0 0 1 0.5 0.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13.6 13.5H15a0.26 0.26 0 0 0 0.25 -0.33 4 4 0 0 0 -2.63 -2.49 2.25 2.25 0 1 0 -3.37 -1.93 2.22 2.22 0 0 0 1.12 1.93A4 4 0 0 0 7.5 14.5v1a0.5 0.5 0 0 0 0.5 0.5h3a0.25 0.25 0 0 0 0.25 -0.27 1.59 1.59 0 0 1 0.2 -1 2.42 2.42 0 0 1 2.15 -1.23\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M15.75 14.75h-2.5a0.75 0.75 0 0 0 0 1.5h2.5a0.75 0.75 0 0 0 0 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/comms/user.check","name":"user-check","category":"comms","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Messages-People-User-Check--Streamline-Ultimate\">\n  <desc>\n    Messages People User Check Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M13.24 9.91a1.82 1.82 0 0 0 2.76 -0.2l3.19 -4.24a1 1 0 1 0 -1.6 -1.2L14.5 8.35 13 6.85a1 1 0 0 0 -1.41 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22 0H9a2 2 0 0 0 -2 2v11a2 2 0 0 0 2 2h0.5v2.5a1 1 0 0 0 1.71 0.71l3.2 -3.21H22a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2m0 12.75a0.25 0.25 0 0 1 -0.25 0.25H14a1 1 0 0 0 -0.71 0.29l-1.79 1.8V14a1 1 0 0 0 -1 -1H9.25a0.25 0.25 0 0 1 -0.25 -0.25V2.25A0.25 0.25 0 0 1 9.25 2h12.5a0.25 0.25 0 0 1 0.25 0.25Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3.5 13a2.75 2.75 0 1 0 -2.75 -2.75A2.75 2.75 0 0 0 3.5 13 3.5 3.5 0 0 0 0 16.5v2a0.47 0.47 0 0 0 0.15 0.35 0.47 0.47 0 0 0 0.35 0.15h0.82a0.25 0.25 0 0 1 0.25 0.23L2 23.55a0.5 0.5 0 0 0 0.5 0.45h2a0.5 0.5 0 0 0 0.5 -0.45l0.43 -4.32a0.25 0.25 0 0 1 0.25 -0.23h0.82a0.5 0.5 0 0 0 0.5 -0.5v-2A3.5 3.5 0 0 0 3.5 13\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/comms/inbox","name":"inbox","category":"comms","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M12.5 6c0.5523 0 1 0.44772 1 1s-0.4477 1 -1 1H6.54492l-3.87207 6H6.5c0.77666 0 1.41539 0.5903 1.49219 1.3467l0.01562 0.3066C8.08461 16.4097 8.72334 17 9.5 17h5c0.7767 0 1.4154 -0.5903 1.4922 -1.3467l0.0156 -0.3066C16.0846 14.5903 16.7233 14 17.5 14h3.8262l-1.2637 -1.958c-0.2992 -0.464 -0.1651 -1.0825 0.2988 -1.3818 0.4641 -0.2994 1.0824 -0.1662 1.3819 0.2978l2.0966 3.25c0.1043 0.1616 0.1602 0.3497 0.1602 0.542V21c0 0.5523 -0.4477 1 -1 1H1c-0.552285 0 -1 -0.4477 -1 -1v-6.25c0 -0.1923 0.0559021 -0.3804 0.160156 -0.542L4.86426 6.91602C5.23256 6.34514 5.86555 6 6.54492 6zm7 -6C21.9853 0 24 2.01472 24 4.5S21.9853 9 19.5 9 15 6.98528 15 4.5 17.0147 0 19.5 0\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/comms/reply.all","name":"reply-all","category":"comms","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Email-Action-Reply-All--Streamline-Ultimate\">\n  <desc>\n    Email Action Reply All Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M20.82 10.74A10.65 10.65 0 0 0 14.24 8a0.24 0.24 0 0 1 -0.24 -0.23V5.56a1 1 0 0 0 -1.63 -0.75l-6.93 5.93a1 1 0 0 0 0 1.52l7 6a0.94 0.94 0 0 0 1 0.14 1 1 0 0 0 0.57 -0.88v-2.47a0.24 0.24 0 0 1 0.19 -0.24c1.47 -0.4 5.84 -1 8.86 4.92a0.51 0.51 0 0 0 0.57 0.26 0.51 0.51 0 0 0 0.37 -0.49c0 -3.81 -1.07 -6.76 -3.18 -8.76\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"m2.29 11.5 7 -5.73A1 1 0 0 0 8 4.23L0.55 10.34a1.5 1.5 0 0 0 0 2.32l7.25 6a1 1 0 1 0 1.27 -1.54Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/comms/chat","name":"chat","category":"comms","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Messages-Bubble--Streamline-Ultimate\">\n  <desc>\n    Messages Bubble Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12 1.34C5.66 1.34 0.5 5.59 0.5 10.81a8.58 8.58 0 0 0 3.18 6.54l-2.3 4.59a0.49 0.49 0 0 0 0.09 0.57 0.5 0.5 0 0 0 0.57 0.1l6.15 -2.86a13.44 13.44 0 0 0 3.81 0.54c6.34 0 11.5 -4.25 11.5 -9.48S18.34 1.34 12 1.34\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/comms/comment","name":"comment","category":"comms","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Comment-Box--Streamline-Ultimate\">\n  <desc>\n    Comment Box Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M0 2.25C0 1.03579 1.03579 0 2.25 0h19.5C22.9642 0 24 1.03579 24 2.25v15c0 1.2142 -1.0358 2.25 -2.25 2.25H11.5l-5.8 4.35c-0.22726 0.1704 -0.53132 0.1979 -0.78541 0.0708C4.6605 23.7938 4.5 23.5341 4.5 23.25V19.5H2.25C1.03579 19.5 0 18.4642 0 17.25zm3.13135 8.7466c-0.41422 0 -0.75 0.3358 -0.75 0.75 0 0.4143 0.33578 0.75 0.75 0.75h8.47945c0.4143 0 0.75 -0.3357 0.75 -0.75 0 -0.4142 -0.3357 -0.75 -0.75 -0.75zm10.89515 0.75c0 -0.4142 0.3358 -0.75 0.75 -0.75h5.9922c0.4142 0 0.75 0.3358 0.75 0.75 0 0.4143 -0.3358 0.75 -0.75 0.75h-5.9922c-0.4142 0 -0.75 -0.3357 -0.75 -0.75M3.13135 14.5999c-0.41422 0 -0.75 0.3357 -0.75 0.75 0 0.4142 0.33578 0.75 0.75 0.75h5.99218c0.41421 0 0.75 -0.3358 0.75 -0.75 0 -0.4143 -0.33579 -0.75 -0.75 -0.75zm13.94785 0.75c0 -0.4143 0.3357 -0.75 0.75 -0.75h2.9395c0.4142 0 0.75 0.3357 0.75 0.75 0 0.4142 -0.3358 0.75 -0.75 0.75h-2.9395c-0.4143 0 -0.75 -0.3358 -0.75 -0.75m-5.0161 -0.75c-0.4142 0 -0.75 0.3357 -0.75 0.75 0 0.4142 0.3358 0.75 0.75 0.75h3.0526c0.4142 0 0.75 -0.3358 0.75 -0.75 0 -0.4143 -0.3358 -0.75 -0.75 -0.75z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"}];
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
