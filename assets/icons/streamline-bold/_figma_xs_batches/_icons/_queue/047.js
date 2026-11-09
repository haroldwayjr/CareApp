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
      const paint = figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', iconDefault);
      n.fills = [paint]; n.strokes = [];
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
  node.resize(16, 16); node.x = 0; node.y = 0; node.clipsContent = false;
  if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
  xs.appendChild(node);
  try { xs.resizeWithoutConstraints(16, 16); } catch (_) { try { xs.resize(16, 16); } catch (__) {} }
  bindFills(node); xs.clipsContent = false; xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true; return { ok: true };
}
const BATCH = [{"setName":"icon/misc/rocket","name":"rocket","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Rocket-Attack--Streamline-Ultimate\"><path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M22.9755 0.241101c-2.6793 -0.3349143 -5.3632 0.585941 -7.2725 2.495249l-0.3266 0.32662c0.22 0.10511 0.4265 0.24802 0.6098 0.42878l4.5312 4.46875c0.1875 0.18487 0.3391 0.39925 0.4504 0.63233l0.2959 -0.29582c1.9093 -1.90931 2.8301 -4.59317 2.4952 -7.27249l-0.0147 -0.117543c-0.0425 -0.340459 -0.3107 -0.608626 -0.6512 -0.651183zM7.06802 9.25H3.5c-0.19891 0 -0.38968 0.07902 -0.53033 0.21967l-2.5 2.50003c-0.292893 0.2929 -0.292893 0.7677 0 1.0606l1.49954 1.4996c0.10725 -0.2245 0.25385 -0.4349 0.4398 -0.6209zm2.40211 12.7808c0.2245 -0.1073 0.43491 -0.2539 0.62087 -0.4398l4.659 -4.659V20.5c0 0.1989 -0.079 0.3897 -0.2197 0.5303l-2.5 2.5c-0.2929 0.2929 -0.7677 0.2929 -1.0606 0zM12.1446 4.35539c-0.3905 -0.39052 -1.0237 -0.39052 -1.4142 0 -0.3905 0.39053 -0.3905 1.02369 0 1.41422l0.9697 0.96967 -8.23043 8.23042c-0.29289 0.2929 -0.29289 0.7677 0 1.0606l4.5 4.5c0.29289 0.2929 0.76777 0.2929 1.06066 0l8.23037 -8.2304 0.9697 0.9697c0.3905 0.3905 1.0237 0.3905 1.4142 0s0.3905 -1.0237 0 -1.4142l-0.9697 -0.9697 0.7929 -0.7929c0.1413 -0.14126 0.2204 -0.33309 0.2197 -0.5329 -0.0007 -0.19982 -0.0811 -0.39109 -0.2234 -0.5314l-4.5312 -4.46875c-0.2935 -0.28942 -0.7655 -0.28778 -1.057 0.00367l-0.7616 0.76164z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
