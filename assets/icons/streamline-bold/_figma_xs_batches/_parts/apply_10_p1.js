
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

const BATCH = [{"setName":"icon/health/pediatric","name":"pediatric","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Baby--Streamline-Ultimate\">\n  <desc>\n    Baby Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M10.55 11.78a1 1 0 0 0 -1 -1 1 1 0 0 0 -1 0.73 0.52 0.52 0 0 1 -0.51 0.4 0.52 0.52 0 0 1 -0.51 -0.38 1 1 0 0 0 -2 0.28A2.28 2.28 0 0 0 8 13.91a2.27 2.27 0 0 0 2.55 -2.13\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.38 10.78a1 1 0 0 0 -1 0.72 0.53 0.53 0 0 1 -1 0 1 1 0 0 0 -1 -0.73 1 1 0 0 0 -1 1 2.27 2.27 0 0 0 2.46 2.1 2.28 2.28 0 0 0 2.47 -2.1 1 1 0 0 0 -0.93 -0.99\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14.81 16.3a1 1 0 0 0 -1.37 0.35 1.86 1.86 0 0 1 -1.44 0.49 1.86 1.86 0 0 1 -1.44 -0.49 1 1 0 1 0 -1.72 1A3.6 3.6 0 0 0 12 19.14a3.6 3.6 0 0 0 3.16 -1.47 1 1 0 0 0 -0.35 -1.37\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M22.57 9.93a1 1 0 0 1 -0.38 -0.58A10.57 10.57 0 0 0 12 1 10.57 10.57 0 0 0 1.81 9.35a1 1 0 0 1 -0.38 0.58 3.5 3.5 0 0 0 0.48 5.94 0.94 0.94 0 0 1 0.46 0.5A10.51 10.51 0 0 0 12 23a10.51 10.51 0 0 0 9.63 -6.63 0.94 0.94 0 0 1 0.46 -0.5 3.5 3.5 0 0 0 0.48 -5.94m-1.77 4.29a1 1 0 0 0 -0.76 0.67A8.46 8.46 0 0 1 12 21a8.46 8.46 0 0 1 -8 -6.11 1 1 0 0 0 -0.76 -0.67A1.5 1.5 0 0 1 3 11.34a1 1 0 0 0 0.64 -0.78A8.64 8.64 0 0 1 12 3a1.5 1.5 0 0 1 1.45 1.34 1 1 0 0 1 -0.89 1.09 0.58 0.58 0 0 1 -0.65 -0.61 1 1 0 1 0 -2 -0.44 2.52 2.52 0 0 0 0.9 2.47 2.8 2.8 0 0 0 3.92 -0.51 2.94 2.94 0 0 0 0.66 -2.15 0.26 0.26 0 0 1 0.16 -0.19 0.25 0.25 0 0 1 0.25 0 9 9 0 0 1 4.59 6.62 1 1 0 0 0 0.64 0.78 1.5 1.5 0 0 1 -0.23 2.88Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/health/meditation","name":"meditation","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Yoga-Meditation-Pose2--Streamline-Ultimate\">\n  <desc>\n    Yoga Meditation Pose2 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M8.75104 3.24902C8.75104 1.45464 10.2057 0 12.0001 0c1.7943 0 3.249 1.45464 3.249 3.24902 0 1.79439 -1.4547 3.24902 -3.249 3.24902 -1.7944 0 -3.24906 -1.45463 -3.24906 -3.24902m3.19726 4.20773c-3.08096 0 -5.6909 2.30922 -6.17105 5.26885 -0.98912 0.3056 -1.70224 1.2235 -1.70224 2.3167 0 0.5539 0.18307 1.0627 0.49235 1.4698 0.72817 -0.3266 1.56979 -0.391 2.38362 -0.1229l1.74732 0.5501v-1.9325c0 -0.4143 0.33579 -0.75 0.75 -0.75 0.41422 0 0.75 0.3357 0.75 0.75v2.4047l1.3054 0.411 2.1946 -0.6909v-2.1248c0 -0.4143 0.3358 -0.75 0.75 -0.75s0.75 0.3357 0.75 0.75v1.6526l1.8507 -0.5827c0.8736 -0.2878 1.7792 -0.1924 2.5421 0.199 0.2125 -0.3611 0.3339 -0.7828 0.3339 -1.2334 0 -1.1328 -0.7657 -2.0773 -1.8107 -2.3474 -0.4932 -2.94491 -3.0957 -5.23815 -6.166 -5.23815M6.56678 17.5843l6.59112 2.0749c1.0985 0.3662 1.7087 1.5868 1.4646 2.6853 -0.3661 1.2205 -1.5867 1.8308 -2.6852 1.4647l-6.59109 -2.075c-1.22056 -0.3662 -1.83084 -1.5867 -1.46467 -2.6853 0.36617 -1.2205 1.58673 -1.8308 2.68524 -1.4646m9.33212 4.7047c0.1923 -1.5678 -0.6868 -3.2454 -2.3153 -3.8053l3.8496 -1.2119c1.0985 -0.3662 2.3191 0.2441 2.6852 1.4646 0.3662 1.0986 -0.2441 2.3191 -1.4646 2.6853z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/inhaler","name":"inhaler","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Inhaler--Streamline-Ultimate\">\n  <desc>\n    Inhaler Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule=\"evenodd\" d=\"m7.52403 3.74659 -0.4166 -1.99806C6.91497 0.825451 6.02576 0.220831 5.09658 0.381232L2.50046 0.829389C1.51905 0.998806 0.876679 1.95195 1.088 2.9252l0.40441 1.8626zM19.9236 16.2298v5.9982l2.3122 0.0015c0.199 0.0001 0.3899 -0.0789 0.5306 -0.2195 0.1408 -0.1407 0.2199 -0.3315 0.2199 -0.5305v-4.5012c0 -0.199 -0.0791 -0.3899 -0.2199 -0.5305 -0.1407 -0.1407 -0.3316 -0.2197 -0.5306 -0.2195zM8.5433 5.09285c0.53096 -0.09166 1.03908 0.25384 1.14906 0.78131l1.90324 9.12794 5.8268 -0.0068c0.5528 -0.0006 1.0012 0.4473 1.0012 1v6.4665c0 0.5528 -0.4484 1.0007 -1.0012 1l-2.2097 -0.0025v-2.5088c0 -0.5523 -0.4478 -1 -1 -1 -0.5523 0 -1 0.4477 -1 1v2.5126h-2.3282v-2.5126c0 -0.5523 -0.4477 -1 -0.99996 -1 -0.55229 0 -1 0.4477 -1 1v2.5126H7.25408c-1.68516 0 -3.14237 -1.1747 -3.49993 -2.8215L0.894591 7.47149c-0.120752 -0.55615 0.246319 -1.1008 0.807119 -1.19761z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/health/orthopedics","name":"orthopedics","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Medical-Specialty-Broken-Bone--Streamline-Ultimate\">\n  <desc>\n    Medical Specialty Broken Bone Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M11.45 15.59a0.52 0.52 0 0 0 0.14 -0.49 0.51 0.51 0 0 0 -0.34 -0.37l-1.13 -0.37A0.5 0.5 0 0 1 9.8 14l-0.29 -1a0.52 0.52 0 0 0 -0.37 -0.36 0.53 0.53 0 0 0 -0.49 0.14L6.44 15a0.3 0.3 0 0 1 -0.2 0.08 0.27 0.27 0 0 1 -0.18 -0.1l-0.25 -0.29a3.14 3.14 0 0 0 -4.4 -0.06 3 3 0 0 0 2.18 5.21 0.48 0.48 0 0 1 0.5 0.5 3.09 3.09 0 0 0 5.26 2.23 3 3 0 0 0 0 -4.32 0.63 0.63 0 0 0 -0.12 -0.1 0.25 0.25 0 0 1 0 -0.38Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.09 7.71a3.1 3.1 0 0 0 -3.51 -4.52 0.46 0.46 0 0 1 -0.38 0 0.5 0.5 0 0 1 -0.2 -0.36A3.07 3.07 0 0 0 13.32 2a3.2 3.2 0 0 0 1.25 4.3 2.9 2.9 0 0 0 0.35 0.17 0.24 0.24 0 0 1 0.13 0.15 0.23 0.23 0 0 1 0 0.2l-1.71 2.91a0.52 0.52 0 0 0 0 0.51 0.52 0.52 0 0 0 0.43 0.27l1 0.05a0.52 0.52 0 0 1 0.39 0.22l0.67 1a0.49 0.49 0 0 0 0.44 0.23 0.51 0.51 0 0 0 0.43 -0.26l1.7 -2.91a0.25 0.25 0 0 1 0.16 -0.12 0.28 0.28 0 0 1 0.2 0 0.71 0.71 0 0 0 0.14 0.1 3.05 3.05 0 0 0 4.19 -1.11\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M4 10h2a1 1 0 0 0 0 -2H4a1 1 0 0 0 0 2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6.3 6.69a1 1 0 0 0 1.4 -1.44l-1 -1a1 1 0 0 0 -1.43 1.43Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M10 6a1 1 0 0 0 1 -1V3a1 1 0 0 0 -2 0v2a1 1 0 0 0 1 1\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M20 14h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0 -2\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M17.72 17.27a1 1 0 1 0 -1.44 1.4l1 1.06A1 1 0 0 0 18 20a1 1 0 0 0 0.71 -1.7Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M14 18a1 1 0 0 0 -1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0 -1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/health/surgery","name":"surgery","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Surgery-Liposuction--Streamline-Ultimate\">\n  <desc>\n    Surgery Liposuction Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M18 9.49a7.41 7.41 0 0 1 -5.36 -2.26c-0.2 -0.21 -0.38 -0.43 -0.56 -0.65H12c-0.18 0.22 -0.36 0.44 -0.56 0.65a7.44 7.44 0 0 1 -9.17 1.2c-0.6 8 -3.51 11.08 -0.19 14.67h0.68c0.2 -0.21 0.4 -0.41 0.58 -0.63a0.51 0.51 0 0 1 0.71 0 0.49 0.49 0 0 1 0.06 0.67h15.82a0.5 0.5 0 0 1 0.07 -0.67 0.5 0.5 0 0 1 0.7 0c0.19 0.22 0.38 0.42 0.59 0.63h0.94c3.34 -3.61 0.38 -6.72 -0.2 -14.82A7.45 7.45 0 0 1 18 9.49M6.93 18a11.75 11.75 0 0 1 -0.88 2.23 0.49 0.49 0 0 1 -0.44 0.27 0.64 0.64 0 0 1 -0.23 0 0.52 0.52 0 0 1 -0.22 -0.68 11.11 11.11 0 0 0 0.81 -2 0.49 0.49 0 0 1 0.61 -0.34 0.5 0.5 0 0 1 0.35 0.52m-0.06 -3a0.51 0.51 0 0 1 -0.5 -0.49 12.93 12.93 0 0 0 -0.26 -2.19 0.51 0.51 0 0 1 0.39 -0.59 0.5 0.5 0 0 1 0.59 0.39 13 13 0 0 1 0.28 2.36 0.5 0.5 0 0 1 -0.5 0.46Zm9.76 -0.52a15 15 0 0 1 0.28 -2.36 0.51 0.51 0 0 1 0.59 -0.39 0.5 0.5 0 0 1 0.39 0.59 12.93 12.93 0 0 0 -0.26 2.19 0.5 0.5 0 0 1 -0.5 0.49 0.51 0.51 0 0 1 -0.5 -0.58Zm2 6a0.59 0.59 0 0 1 -0.22 0 0.5 0.5 0 0 1 -0.45 -0.27 11.7 11.7 0 0 1 -0.89 -2.21 0.49 0.49 0 0 1 0.34 -0.61 0.5 0.5 0 0 1 0.62 0.34 10.4 10.4 0 0 0 0.8 2 0.5 0.5 0 0 1 -0.22 0.69Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M6 8a6 6 0 0 0 6 -6.13A6 6 0 1 0 23.93 2a6.18 6.18 0 0 0 -0.2 -1.56H0.27A6.18 6.18 0 0 0 0.07 2 6 6 0 0 0 6 8m12 -4.81a1 1 0 1 1 -1 1 1 1 0 0 1 1 -1m-12 0a1 1 0 1 1 -1 1 1 1 0 0 1 1 -1\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"},{"setName":"icon/misc/airplane","name":"airplane","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Airplane-Mode--Streamline-Ultimate\">\n  <desc>\n    Airplane Mode Streamline Icon: https://streamlinehq.com\n  </desc>\n  <g>\n    <path d=\"M14.58 19.51a0.25 0.25 0 0 1 -0.08 -0.18V13l-4.93 5a0.29 0.29 0 0 0 -0.07 0.18v1.19a0.25 0.25 0 0 1 -0.08 0.18L8 20.92a1.5 1.5 0 0 0 1 2.58 7.24 7.24 0 0 0 2.85 -1.39 0.24 0.24 0 0 1 0.3 0A7.24 7.24 0 0 0 15 23.5a1.5 1.5 0 0 0 1 -2.58Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M18.07 9.8a0.26 0.26 0 0 0 -0.35 0l-3.2 3.2c1.42 1 4.86 3.48 5.48 3.9a2.49 2.49 0 0 0 1.5 0.59A2 2 0 0 0 22.82 14Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M23.71 0.29a1 1 0 0 0 -1.42 0l-6.84 6.84 -0.95 -1V3a2.4 2.4 0 0 0 -0.2 -1 2.49 2.49 0 0 0 -4.6 0 2.4 2.4 0 0 0 -0.2 1v3.66l-3 2.65L1.18 14A2 2 0 0 0 3 17.45a0.19 0.19 0 0 0 0.12 -0.07L9 12.68a0.34 0.34 0 0 1 0.5 0.32 0.37 0.37 0 0 1 -0.1 0.24L0.29 22.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l22 -22a1 1 0 0 0 0 -1.42\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
return { ok, missing, failed, miss, fail, batch: 'apply_10_p1' };
