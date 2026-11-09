
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
  setName: "icon/health/meditation",
  name: "meditation",
  category: "health",
  svg: ("<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Yoga"+
    "-Meditation-Pose2--Streamline-Ultimate\">\n  <desc>\n    Yoga Meditation Pose2 Stre"+
    "amline Icon: https://streamlinehq.com\n  </desc>\n  <path fill=\"#000000\" fill-rule"+
    "=\"evenodd\" d=\"M8.75104 3.24902C8.75104 1.45464 10.2057 0 12.0001 0c1.7943 0 3.24"+
    "9 1.45464 3.249 3.24902 0 1.79439 -1.4547 3.24902 -3.249 3.24902 -1.7944 0 -3.24"+
    "906 -1.45463 -3.24906 -3.24902m3.19726 4.20773c-3.08096 0 -5.6909 2.30922 -6.171"+
    "05 5.26885 -0.98912 0.3056 -1.70224 1.2235 -1.70224 2.3167 0 0.5539 0.18307 1.06"+
    "27 0.49235 1.4698 0.72817 -0.3266 1.56979 -0.391 2.38362 -0.1229l1.74732 0.5501v"+
    "-1.9325c0 -0.4143 0.33579 -0.75 0.75 -0.75 0.41422 0 0.75 0.3357 0.75 0.75v2.404"+
    "7l1.3054 0.411 2.1946 -0.6909v-2.1248c0 -0.4143 0.3358 -0.75 0.75 -0.75s0.75 0.3"+
    "357 0.75 0.75v1.6526l1.8507 -0.5827c0.8736 -0.2878 1.7792 -0.1924 2.5421 0.199 0"+
    ".2125 -0.3611 0.3339 -0.7828 0.3339 -1.2334 0 -1.1328 -0.7657 -2.0773 -1.8107 -2"+
    ".3474 -0.4932 -2.94491 -3.0957 -5.23815 -6.166 -5.23815M6.56678 17.5843l6.59112 "+
    "2.0749c1.0985 0.3662 1.7087 1.5868 1.4646 2.6853 -0.3661 1.2205 -1.5867 1.8308 -"+
    "2.6852 1.4647l-6.59109 -2.075c-1.22056 -0.3662 -1.83084 -1.5867 -1.46467 -2.6853"+
    " 0.36617 -1.2205 1.58673 -1.8308 2.68524 -1.4646m9.33212 4.7047c0.1923 -1.5678 -"+
    "0.6868 -3.2454 -2.3153 -3.8053l3.8496 -1.2119c1.0985 -0.3662 2.3191 0.2441 2.685"+
    "2 1.4646 0.3662 1.0986 -0.2441 2.3191 -1.4646 2.6853z\" clip-rule=\"evenodd\" strok"+
    "e-width=\"1\"></path>\n</svg>")
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
