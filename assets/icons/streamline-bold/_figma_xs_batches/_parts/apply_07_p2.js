
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

const BATCH = [{"setName":"icon/status/bell","name":"bell","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Alarm-Bell--Streamline-Ultimate\">\n  <desc>\n    Alarm Bell Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" d=\"M14.4111 21.002c0.2591 0.0002 0.5 0.1344 0.6368 0.3544 0.1366 0.2202 0.1498 0.4953 0.0351 0.7276 -0.238 0.4818 -0.5869 0.904 -1.0215 1.2295 -0.5945 0.4451 -1.3178 0.6864 -2.0605 0.6865 -0.7428 0 -1.4659 -0.2414 -2.06057 -0.6865 -0.43473 -0.3255 -0.78441 -0.7476 -1.02246 -1.2295 -0.11467 -0.2324 -0.1006 -0.5074 0.03613 -0.7276 0.13686 -0.2201 0.37749 -0.3544 0.63672 -0.3544zM12 0c0.5523 0 1 0.447715 1 1v1.3125c1.8195 0.2221 3.5244 1.04398 4.834 2.35352C19.3812 6.21319 20.25 8.31196 20.25 10.5c0 2.8965 0.367 4.8897 0.7217 6.1406 0.1774 0.6257 0.3523 1.067 0.4775 1.3438 0.0626 0.1382 0.1124 0.2358 0.1446 0.2949 0.016 0.0295 0.0278 0.0499 0.0341 0.0605 0.001 0.0016 0.0023 0.0028 0.003 0.004l0.0488 0.0898c0.0996 0.214 0.0934 0.465 -0.0215 0.6758 -0.1315 0.2408 -0.3838 0.3906 -0.6582 0.3906H3c-0.27435 0 -0.52674 -0.1498 -0.6582 -0.3906 -0.13141 -0.241 -0.12125 -0.5349 0.02734 -0.7656 0.00071 -0.0012 0.00198 -0.0024 0.00293 -0.004 0.00632 -0.0106 0.01809 -0.031 0.03418 -0.0605 0.03218 -0.0591 0.08199 -0.1567 0.14453 -0.2949 0.12521 -0.2768 0.3001 -0.7181 0.47754 -1.3438 0.35472 -1.2509 0.72168 -3.2441 0.72168 -6.1406 0 -2.18803 0.86884 -4.28681 2.41602 -5.83398C7.47555 3.35648 9.18047 2.5346 11 2.3125V1c0 -0.552282 0.4477 -0.9999952323 1 -1\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/status/eye","name":"eye","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"View-1--Streamline-Ultimate\">\n  <desc>\n    View 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M23.43 10.52c-2.64 -2.91 -7 -6 -11.43 -5.92S3.21 7.61 0.57 10.52a2.22 2.22 0 0 0 0 3C2.33 15.42 6.74 19.4 12 19.4s9.66 -4 11.43 -5.93a2.22 2.22 0 0 0 0 -2.95M7.4 12a4.6 4.6 0 1 1 4.6 4.6A4.6 4.6 0 0 1 7.4 12\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10 12a2 2 0 1 0 4 0 2 2 0 1 0 -4 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/status/flag","name":"flag","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Flag-1--Streamline-Ultimate\">\n  <desc>\n    Flag 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M16.55 7.2a0.27 0.27 0 0 1 0 -0.4l6 -4.78c0.52 -0.42 0.48 -0.81 0.42 -1S22.67 0.5 22 0.5H6a0.5 0.5 0 0 0 -0.5 0.5v12a0.5 0.5 0 0 0 0.5 0.5h16c0.66 0 0.88 -0.32 0.95 -0.52s0.1 -0.58 -0.42 -1Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M2.51 0A1.5 1.5 0 0 0 1 1.5v21a1.5 1.5 0 0 0 3 0v-21A1.5 1.5 0 0 0 2.51 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/status/online","name":"online","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Online-Video-Chat--Streamline-Ultimate\">\n  <desc>\n    Online Video Chat Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M4.294 0.12a2.462 2.462 0 0 0 -2.462 2.462v15.29L0.158 22.893a0.75 0.75 0 0 0 0.893 0.965l6.76 -1.69h13.607a2.462 2.462 0 0 0 2.463 -2.462V2.582A2.462 2.462 0 0 0 21.418 0.119H4.294Zm2.281 6.136h9.08c0.595 0 1.078 0.482 1.078 1.077v7.541c0 0.595 -0.483 1.077 -1.077 1.077h-9.08a1.077 1.077 0 0 1 -1.078 -1.077V7.333c0 -0.595 0.482 -1.077 1.077 -1.077m13.407 8.126 -3.25 -1.218v-4.12l3.25 -1.219a0.488 0.488 0 0 1 0.66 0.456v5.644a0.488 0.488 0 0 1 -0.66 0.457M11.748 8.05h-1.264a0.5 0.5 0 0 0 -0.5 0.5v1.42H8.56a0.5 0.5 0 0 0 -0.5 0.5v1.264a0.5 0.5 0 0 0 0.5 0.5h1.423v1.423a0.5 0.5 0 0 0 0.5 0.5l1.264 0a0.5 0.5 0 0 0 0.5 -0.5v-1.423h1.422a0.5 0.5 0 0 0 0.5 -0.5V10.47a0.5 0.5 0 0 0 -0.5 -0.5h-1.422V8.55a0.5 0.5 0 0 0 -0.5 -0.5Z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/status/badge","name":"badge","category":"status","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-Badge--Streamline-Ultimate\">\n  <desc>\n    Check Badge Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m22.72 10.35 -1.84 -1.48a1.09 1.09 0 0 1 -0.4 -1l0.25 -2.34a2.09 2.09 0 0 0 -2.3 -2.31l-2.35 0.25a1.09 1.09 0 0 1 -1 -0.4l-1.45 -1.81a2.16 2.16 0 0 0 -3.26 0L8.89 3.1a1.09 1.09 0 0 1 -1 0.4l-2.32 -0.25a2.09 2.09 0 0 0 -2.3 2.31l0.25 2.34a1.09 1.09 0 0 1 -0.4 1l-1.84 1.45a2.09 2.09 0 0 0 0 3.26l1.84 1.48a1.1 1.1 0 0 1 0.4 1l-0.25 2.35a2.07 2.07 0 0 0 0.6 1.7 2 2 0 0 0 1.7 0.6l2.35 -0.25a1.09 1.09 0 0 1 1 0.4l1.48 1.84a2.09 2.09 0 0 0 3.26 0l1.48 -1.84a1.09 1.09 0 0 1 1 -0.4l2.35 0.25a2 2 0 0 0 1.7 -0.6 2.07 2.07 0 0 0 0.6 -1.7l-0.25 -2.35a1.1 1.1 0 0 1 0.4 -1l1.84 -1.48a2.09 2.09 0 0 0 0 -3.26Zm-10.32 4.7a1.79 1.79 0 0 1 -2.67 0.19L7.29 12.8a1 1 0 1 1 1.42 -1.42L11 13.63l3.91 -5.21a1 1 0 0 1 1.6 1.2Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/media/pause","name":"pause","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Button-Pause--Streamline-Ultimate\">\n  <desc>\n    Button Pause Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M12 24A12 12 0 1 0 0 12a12 12 0 0 0 12 12m-4.74 -7.46v-8A1.5 1.5 0 0 1 8.76 7h0.48a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1 -1.5 1.5h-0.48a1.5 1.5 0 0 1 -1.5 -1.46m6 -8A1.5 1.5 0 0 1 14.71 7h0.53a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1 -1.5 1.5h-0.53a1.5 1.5 0 0 1 -1.5 -1.5Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/media/volume","name":"volume","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Volume--Streamline-Ultimate\">\n  <desc>\n    Volume Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M4.5 14.25a7.5 7.5 0 1 0 7.5 -7.5 7.5 7.5 0 0 0 -7.5 7.5m9.92 -4.92a1.5 1.5 0 1 1 -1.5 1.5 1.5 1.5 0 0 1 1.5 -1.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10.5 3.75a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1.5 9.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19.5 9.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M19.5 19.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M1.5 19.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/camera","name":"camera","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Camera--Streamline-Ultimate\">\n  <desc>\n    Camera Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M22.5 6h-21A1.5 1.5 0 0 0 0 7.5v12A1.5 1.5 0 0 0 1.5 21h21a1.5 1.5 0 0 0 1.5 -1.5v-12A1.5 1.5 0 0 0 22.5 6m-1 7.5a5 5 0 1 1 -5 -5 5 5 0 0 1 5 5M8 12.25H2.5a0.75 0.75 0 0 1 0 -1.5H8a0.75 0.75 0 0 1 0 1.5m0.75 3.25a0.76 0.76 0 0 1 -0.75 0.75H2.5a0.75 0.75 0 0 1 0 -1.5H8a0.76 0.76 0 0 1 0.75 0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M3 5h4a0.5 0.5 0 0 0 0.5 -0.5A1.5 1.5 0 0 0 6 3H4a1.5 1.5 0 0 0 -1.5 1.5 0.5 0.5 0 0 0 0.5 0.5\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.84 10.78h3.33s1.06 0 1.06 1.06v3.33s0 1.06 -1.06 1.06h-3.33s-1.06 0 -1.06 -1.06v-3.33s0 -1.06 1.06 -1.06\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/media/music","name":"music","category":"media","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Music-Note--Streamline-Ultimate\">\n  <desc>\n    Music Note Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m16.79 4.59 -2.95 1.18a0.24 0.24 0 0 1 -0.23 0 0.24 0.24 0 0 1 -0.11 -0.21V4.44a0.5 0.5 0 0 1 0.31 -0.44l3.9 -1.56a1.24 1.24 0 0 0 0.7 -1.62 1.24 1.24 0 0 0 -1.62 -0.7l-4.38 1.72A2.24 2.24 0 0 0 11 3.93v11.82a0.25 0.25 0 0 1 -0.25 0.25H9.5a4 4 0 0 0 0 8 4.11 4.11 0 0 0 4 -4V8.76a0.25 0.25 0 0 1 0.16 -0.23l4.05 -1.62a1.25 1.25 0 0 0 -0.92 -2.32\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
return { ok, missing, failed, miss, fail, batch: 'apply_07_p2' };
