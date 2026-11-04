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
const BATCH = [{"setName":"icon/misc/balloon","name":"balloon","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Balloon-Party--Streamline-Ultimate\"><g><path d=\"M19.6 16.62a2.87 2.87 0 1 0 -2.87 -2.87 2.88 2.88 0 0 0 2.87 2.87\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M15.66 18.67a1.49 1.49 0 0 1 -1.71 0.09L12.66 18a1.75 1.75 0 0 0 -2.53 0.86 1.82 1.82 0 0 0 0.81 2.14l2.42 1.45a1.72 1.72 0 0 0 0.9 0.25 1.78 1.78 0 0 0 0.61 -0.11l1.89 -1v2h7v-2c-0.03 -3.73 -4.67 -5.59 -8.1 -2.92\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M8.52 16.25a6.81 6.81 0 0 1 -2.46 -4.93A4.6 4.6 0 0 0 8.5 9.7a5.82 5.82 0 0 0 1.22 -3.81 5.82 5.82 0 0 0 -1.44 -3.73A4.42 4.42 0 0 0 4.83 0.62a4.47 4.47 0 0 0 -3.36 1.74A5.82 5.82 0 0 0 0.26 6.17a5.82 5.82 0 0 0 1.43 3.72 4.53 4.53 0 0 0 2.37 1.44 8.8 8.8 0 0 0 3.12 6.41 1 1 0 0 0 1.34 -1.49M3.18 8.56a3.86 3.86 0 0 1 -0.93 -2.45A3.89 3.89 0 0 1 3 3.61a2.45 2.45 0 0 1 1.85 -1H5a2.47 2.47 0 0 1 1.84 0.88A3.86 3.86 0 0 1 7.72 6a3.83 3.83 0 0 1 -0.78 2.5 2.47 2.47 0 0 1 -1.85 1 2.49 2.49 0 0 1 -1.91 -0.94\" fill=\"#000000\" stroke-width=\"1\"></path><path d=\"M10 14.74a1 1 0 0 0 0.7 1.26 0.9 0.9 0 0 0 0.3 0 1 1 0 0 0 1 -0.71 11 11 0 0 0 0.4 -3.46A5.36 5.36 0 0 0 16.3 7c0.3 -3 -1.58 -5.6 -4.18 -5.86a5.43 5.43 0 0 0 -0.57 0 1 1 0 0 0 -1 1 1 1 0 0 0 1 1h0.3c1.5 0.15 2.57 1.8 2.38 3.67s-1.55 3.28 -3.06 3.13a1.91 1.91 0 0 1 -0.33 -0.06 1 1 0 0 0 -0.6 1.9 8.41 8.41 0 0 1 -0.24 2.96\" fill=\"#000000\" stroke-width=\"1\"></path></g></svg>"},{"setName":"icon/misc/ecology","name":"ecology","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" id=\"Ecology-Leaf--Streamline-Ultimate\"><path d=\"M23.74 3.16a1 1 0 0 0 -0.6 -0.76 1 1 0 0 0 -1 0.1 13.5 13.5 0 0 1 -7.66 2C8.34 4.45 5.76 7 5.71 7a8.11 8.11 0 0 0 -3.28 6.49A8 8 0 0 0 3 16.57a0.51 0.51 0 0 1 -0.1 0.53L0.27 20a1 1 0 0 0 0 1.42 1 1 0 0 0 1.32 0.05C3.35 19.9 6.15 15.2 14 11.91a1 1 0 0 1 0.78 1.86 26.18 26.18 0 0 0 -8.43 5.54l-0.24 0.25A0.51 0.51 0 0 0 6 20a0.5 0.5 0 0 0 0.24 0.36 8 8 0 0 0 4.26 1.22A12.21 12.21 0 0 0 16.27 20C25 15.17 24.2 5.89 23.74 3.16\" fill=\"#000000\" stroke-width=\"1\"></path></svg>"},{"setName":"icon/misc/rocket","name":"rocket","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Rocket-Attack--Streamline-Ultimate\"><path fill=\"#000000\" fill-rule=\"evenodd\" d=\"M22.9755 0.241101c-2.6793 -0.3349143 -5.3632 0.585941 -7.2725 2.495249l-0.3266 0.32662c0.22 0.10511 0.4265 0.24802 0.6098 0.42878l4.5312 4.46875c0.1875 0.18487 0.3391 0.39925 0.4504 0.63233l0.2959 -0.29582c1.9093 -1.90931 2.8301 -4.59317 2.4952 -7.27249l-0.0147 -0.117543c-0.0425 -0.340459 -0.3107 -0.608626 -0.6512 -0.651183zM7.06802 9.25H3.5c-0.19891 0 -0.38968 0.07902 -0.53033 0.21967l-2.5 2.50003c-0.292893 0.2929 -0.292893 0.7677 0 1.0606l1.49954 1.4996c0.10725 -0.2245 0.25385 -0.4349 0.4398 -0.6209zm2.40211 12.7808c0.2245 -0.1073 0.43491 -0.2539 0.62087 -0.4398l4.659 -4.659V20.5c0 0.1989 -0.079 0.3897 -0.2197 0.5303l-2.5 2.5c-0.2929 0.2929 -0.7677 0.2929 -1.0606 0zM12.1446 4.35539c-0.3905 -0.39052 -1.0237 -0.39052 -1.4142 0 -0.3905 0.39053 -0.3905 1.02369 0 1.41422l0.9697 0.96967 -8.23043 8.23042c-0.29289 0.2929 -0.29289 0.7677 0 1.0606l4.5 4.5c0.29289 0.2929 0.76777 0.2929 1.06066 0l8.23037 -8.2304 0.9697 0.9697c0.3905 0.3905 1.0237 0.3905 1.4142 0s0.3905 -1.0237 0 -1.4142l-0.9697 -0.9697 0.7929 -0.7929c0.1413 -0.14126 0.2204 -0.33309 0.2197 -0.5329 -0.0007 -0.19982 -0.0811 -0.39109 -0.2234 -0.5314l-4.5312 -4.46875c-0.2935 -0.28942 -0.7655 -0.28778 -1.057 0.00367l-0.7616 0.76164z\" clip-rule=\"evenodd\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
