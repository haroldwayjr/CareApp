
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
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
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
  try { xs.resizeWithoutConstraints(16, 16); } catch (_) { try { xs.resize(16, 16); } catch(__){} }
  bindFills(node);
  xs.clipsContent = false;
  xs.visible = false;
  if (md) md.visible = true;
  try { set.resizeWithoutConstraints(24, 24); } catch (_) {}
  set.clipsContent = true;
  return { ok: true };
}
const BATCH = [{"setName": "icon/misc/umbrella", "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\">\n  <path fill=\"#000000\" d=\"M12 0c6.6274 0 12 5.37258 12 12 0 6.6274 -5.3726 12 -12 12 -6.62742 0 -12 -5.3726 -12 -12C0 5.37258 5.37258 0 12 0m0 3c-0.4142 0 -0.75 0.33579 -0.75 0.75v0.53516c-4.20481 0.37898 -7.5 3.91135 -7.5 8.21484v0.5c0 0.4142 0.33579 0.75 0.75 0.75s0.75 -0.3358 0.75 -0.75c0 -0.2667 0.33891 -0.75 1.125 -0.75 0.68804 0 1.03294 0.3704 1.1084 0.6416L7.5 13l0.00391 0.0771c0.03862 0.378 0.35793 0.6729 0.74609 0.6729 0.38813 0 0.70748 -0.2949 0.74609 -0.6729L9 13c0 -0.2667 0.33881 -0.75 1.125 -0.75 0.7861 0 1.125 0.4833 1.125 0.75v5.25c0 0.4142 -0.3358 0.75 -0.75 0.75s-0.75 -0.3358 -0.75 -0.75v-0.5c0 -0.4142 -0.33579 -0.75 -0.75 -0.75s-0.75 0.3358 -0.75 0.75v0.5c0 1.2426 1.00736 2.25 2.25 2.25 1.2426 0 2.25 -1.0074 2.25 -2.25V13c0 -0.2667 0.3389 -0.75 1.125 -0.75 0.7862 0 1.125 0.4833 1.125 0.75 0 0.4142 0.3358 0.75 0.75 0.75s0.75 -0.3358 0.75 -0.75c0 -0.2667 0.3389 -0.75 1.125 -0.75s1.125 0.4833 1.125 0.75c0 0.4142 0.3358 0.75 0.75 0.75 0.3882 0 0.7075 -0.2949 0.7461 -0.6729L20.25 13v-0.5c0 -4.30348 -3.2952 -7.83586 -7.5 -8.21484V3.75c0 -0.41421 -0.3358 -0.75 -0.75 -0.75\" stroke-width=\"1\"></path>\n</svg>"}];
let ok=0, missing=0, failed=0; const miss=[], fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<8) miss.push(item.setName); continue; }
  try {
    const r = applyBoldXs(set, item.svg);
    if (r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); }
  } catch(e) { failed++; if (fail.length<8) fail.push({name:item.setName,err:String(e)}); }
}
return { ok, missing, failed, miss, fail };
