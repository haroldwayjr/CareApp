
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
const BATCH = [{"setName":"icon/files/newspaper","name":"newspaper","category":"files","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Newspaper--Streamline-Ultimate\">\n  \n  <g>\n    <path d=\"M22 0H2a2 2 0 0 0 -2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2 -2V2a2 2 0 0 0 -2 -2m0 21.5a0.5 0.5 0 0 1 -0.5 0.5h-19a0.5 0.5 0 0 1 -0.5 -0.5v-19a0.5 0.5 0 0 1 0.5 -0.5h19a0.47 0.47 0 0 1 0.35 0.15 0.47 0.47 0 0 1 0.15 0.35Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5.5 4h13s1.25 0 1.25 1.25v2.5S19.75 9 18.5 9h-13S4.25 9 4.25 7.75v-2.5S4.25 4 5.5 4\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5 11h5.5s0.75 0 0.75 0.75v0.5s0 0.75 -0.75 0.75H5s-0.75 0 -0.75 -0.75v-0.5s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5 14.5h5.5s0.75 0 0.75 0.75v0.5s0 0.75 -0.75 0.75H5s-0.75 0 -0.75 -0.75v-0.5s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M5 18h5.5s0.75 0 0.75 0.75v0.5s0 0.75 -0.75 0.75H5s-0.75 0 -0.75 -0.75v-0.5s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13.5 18H19s0.75 0 0.75 0.75v0.5s0 0.75 -0.75 0.75h-5.5s-0.75 0 -0.75 -0.75v-0.5s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13.5 11H19s0.75 0 0.75 0.75v0.5s0 0.75 -0.75 0.75h-5.5s-0.75 0 -0.75 -0.75v-0.5s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n    <path d=\"M13.5 14.5H19s0.75 0 0.75 0.75v0.5s0 0.75 -0.75 0.75h-5.5s-0.75 0 -0.75 -0.75v-0.5s0 -0.75 0.75 -0.75\" fill=\"#000000\" stroke-width=\"1\"></path>\n  </g>\n</svg>"}];
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
