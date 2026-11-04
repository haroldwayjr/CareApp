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
const BATCH = [{"setName":"icon/misc/office","name":"office","category":"misc","svg":"<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Office-File-Text--Streamline-Ultimate\"><path fill=\"#000000\" d=\"M14.25 6c0 0.59673 0.2372 1.16886 0.6592 1.59082 0.4219 0.42196 0.9941 0.65918 1.5908 0.65918h6v13c0 1.5188 -1.2312 2.75 -2.75 2.75H4.25c-1.51878 0 -2.75 -1.2312 -2.75 -2.75V2.75C1.5 1.23122 2.73122 0 4.25 0h10zM5.90723 18.6953c-0.41422 0 -0.75 0.3358 -0.75 0.75 0.00006 0.4142 0.33582 0.75 0.75 0.75H18.0938c0.4139 -0.0003 0.7499 -0.336 0.75 -0.75 0 -0.414 -0.3361 -0.7497 -0.75 -0.75zm0 -3.5713c-0.41422 0 -0.75 0.3358 -0.75 0.75 0.00026 0.414 0.33595 0.75 0.75 0.75H18.0938c0.4138 -0.0002 0.7497 -0.3362 0.75 -0.75 0 -0.414 -0.3361 -0.7497 -0.75 -0.75zm8.82417 -3.5722c-0.4141 0 -0.7499 0.3358 -0.75 0.75 0 0.4142 0.3358 0.75 0.75 0.75h3.3614c0.4142 -0.0001 0.75 -0.3358 0.75 -0.75 -0.0001 -0.4142 -0.3359 -0.75 -0.75 -0.75zM5.90723 4.3584c-0.4141 0 -0.74981 0.33595 -0.75 0.75v0.92187c0.0001 0.41413 0.33585 0.75 0.75 0.75s0.74989 -0.33587 0.75 -0.75V5.8584h1.26465v4.9521H6.8291c-0.41421 0 -0.75 0.3358 -0.75 0.75 0 0.4143 0.33579 0.75 0.75 0.75h3.6865c0.4142 0 0.75 -0.3357 0.75 -0.75 0 -0.4142 -0.3358 -0.75 -0.75 -0.75H9.42188V5.8584h1.26562v0.17187c0.0001 0.41413 0.3359 0.75 0.75 0.75 0.4141 -0.00009 0.7499 -0.33593 0.75 -0.75V5.1084c-0.0002 -0.41399 -0.336 -0.74991 -0.75 -0.75zM15.8066 0.509766l0.1631 0.148437 5.8721 5.872067v0.00098c0.0685 0.06857 0.13 0.14278 0.1885 0.21875H16.5c-0.1989 0 -0.3896 -0.07907 -0.5303 -0.21973C15.8291 6.38962 15.75 6.19891 15.75 6V0.466797c0.0188 0.014433 0.0383 0.027935 0.0566 0.042969\" stroke-width=\"1\"></path></svg>"}];
let ok=0,missing=0,failed=0; const miss=[],fail=[];
for (const item of BATCH) {
  const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === item.setName);
  if (!set) { missing++; if (miss.length<5) miss.push(item.setName); continue; }
  try { const r=applyBoldXs(set,item.svg); if(r.ok) ok++; else { failed++; fail.push({name:item.setName,r}); } }
  catch(e){ failed++; if(fail.length<5) fail.push({name:item.setName,err:String(e)}); }
}
return {ok,missing,failed,miss,fail};
