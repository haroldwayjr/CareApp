
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
const BATCH = [{"setName":"icon/health/911","name":"911","category":"health","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Safety-911--Streamline-Ultimate\">\n  \n  <path fill=\"#000000\" d=\"M3.14764 4.86035c0.20606 0 0.41022 0.04029 0.60059 0.11914 0.19044 0.07892 0.36405 0.19501 0.50977 0.34082l2.77246 2.77246c0.14581 0.14572 0.2619 0.31933 0.34082 0.50977 0.07885 0.19036 0.11914 0.39454 0.11914 0.60058 -0.00002 0.20609 -0.04025 0.41021 -0.11914 0.60059 -0.07891 0.19041 -0.19504 0.36309 -0.34082 0.50879 -0.29408 0.2942 -0.4589 0.6934 -0.45899 1.1094 0 0.4159 0.16501 0.8151 0.45899 1.1093l4.43844 4.4376c0.2942 0.2941 0.6934 0.4599 1.1094 0.4599 0.4161 0 0.8151 -0.1658 1.1094 -0.4599 0.1457 -0.1459 0.3193 -0.261 0.5097 -0.3399 0.1904 -0.0788 0.3946 -0.1201 0.6006 -0.1201 0.2061 0 0.4103 0.0412 0.6006 0.1201s0.3632 0.1942 0.5088 0.3399l2.7754 2.7744c0.2941 0.2942 0.459 0.6933 0.459 1.1093 0 0.4161 -0.1649 0.8152 -0.459 1.1094l-0.6582 0.6592c-0.7574 0.7575 -1.7506 1.2337 -2.8154 1.3506 -1.0651 0.1168 -2.1383 -0.1334 -3.042 -0.709l-0.0108 -0.0059C7.65794 20.218 3.78404 16.3446 0.744324 11.8467l-0.007813 -0.0108c-0.575469 -0.9038 -0.8249609 -1.97688 -0.7080076 -3.04195C0.145475 7.72884 0.622129 6.73494 1.38007 5.97754l0.6582 -0.65723c0.1457 -0.14578 0.31837 -0.26191 0.50879 -0.34082 0.19038 -0.07889 0.3945 -0.11912 0.60058 -0.11914M11.4064 0.00195312C12.708 0.00203492 13.7598 1.06042 13.7599 2.36035v3.21582c-0.0002 1.2997 -1.0512 2.35707 -2.3525 2.35742 -0.9787 0 -1.97274 -0.6142 -2.31054 -1.57226 -0.13754 -0.39063 0.0674 -0.81939 0.45801 -0.95703 0.39039 -0.13729 0.81823 0.06779 0.95603 0.458 0.1025 0.29077 0.4794 0.57129 0.8965 0.57129 0.4685 -0.00035 0.8523 -0.38182 0.8525 -0.85742v-0.75293c-0.2645 0.1033 -0.5521 0.16209 -0.8535 0.16211 -1.3014 -0.00026 -2.35249 -1.05751 -2.35251 -2.35742v-0.26758C9.05403 1.06054 10.105 0.00221366 11.4064 0.00195312m5.2627 0c0.4141 0.00008859 0.7499 0.33595288 0.75 0.74999988V6.43359h0.8535c0.4141 0.0001 0.7498 0.33602 0.75 0.75 0 0.41416 -0.3358 0.74991 -0.75 0.75h-3.206c-0.4142 0 -0.75 -0.33578 -0.75 -0.75 0.0002 -0.41404 0.3359 -0.75 0.75 -0.75h0.8525V3.08008c-0.1033 0.01827 -0.2097 0.03026 -0.3183 0.03027h-0.5342c-0.4141 0 -0.7498 -0.33599 -0.75 -0.75 0.0001 -0.4141 0.3359 -0.75 0.75 -0.75h0.5342c0.152 -0.00008 0.2824 -0.10915 0.3125 -0.25683l0.0058 -0.06543V0.751953c0.0002 -0.413941 0.3361 -0.74973977 0.75 -0.74999988m4.9766 0c0.414 0.00008859 0.7499 0.33595288 0.75 0.74999988V6.43359h0.8535c0.414 0.0001 0.7498 0.33602 0.75 0.75 0 0.41416 -0.3359 0.74991 -0.75 0.75h-3.206c-0.4143 0 -0.75 -0.33578 -0.75 -0.75 0.0002 -0.41404 0.3359 -0.75 0.75 -0.75h0.8525V3.08008c-0.1034 0.01827 -0.2097 0.03026 -0.3184 0.03027h-0.5341c-0.4141 0 -0.7498 -0.33599 -0.75 -0.75 0.0001 -0.4141 0.3358 -0.75 0.75 -0.75h0.5341c0.1521 -0.00008 0.2824 -0.10915 0.3125 -0.25683l0.0059 -0.06543V0.751953c0.0001 -0.413941 0.3361 -0.74973977 0.75 -0.74999988M11.4064 1.50195c-0.4686 0.00026 -0.8524 0.38268 -0.8525 0.8584v0.26758c0 0.47582 0.3838 0.85716 0.8525 0.85742 0.4396 -0.00008 0.8048 -0.33536 0.8487 -0.76953l0.0048 -0.08789v-0.26758l-0.0048 -0.08887c-0.0442 -0.43382 -0.4093 -0.76945 -0.8487 -0.76953\" stroke-width=\"1\"></path>\n</svg>"},{"setName":"icon/actions/check.circle","name":"check-circle","category":"actions","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Check-Circle-1--Streamline-Ultimate\">\n  \n  <path d=\"M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm6.93 8.2 -6.85 9.29a1 1 0 0 1 -1.43 0.19l-4.89 -3.91a1 1 0 0 1 -0.15 -1.41A1 1 0 0 1 7 12.21l4.08 3.26L17.32 7a1 1 0 0 1 1.39 -0.21 1 1 0 0 1 0.22 1.41Z\" fill=\"#000000\" stroke-width=\"1\"></path>\n</svg>"}];
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
