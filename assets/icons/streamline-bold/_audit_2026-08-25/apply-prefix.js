const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);
const colorVar = await figma.variables.getVariableByIdAsync('VariableID:34:2');
const FILL = { r: 0.062745, g: 0.094118, b: 0.156863 };
function paint(node) {
  node.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: FILL }, 'color', colorVar)];
  node.strokes = [];
}
function bindFills(root) {
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    if ('constraints' in n) n.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
    if (n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION' || n.type === 'ELLIPSE' || n.type === 'STAR' || n.type === 'POLYGON') paint(n);
    if ('clipsContent' in n && n.type === 'FRAME') n.clipsContent = false;
    if ('children' in n) for (const c of n.children) stack.push(c);
  }
}
function evenodd(root) {
  const vectors = root.findAll(n => n.type === 'VECTOR');
  for (const v of vectors) {
    const vn = v.vectorNetwork;
    if (!vn || !vn.regions) continue;
    let changed = false;
    const regions = vn.regions.map(r => {
      if (r.loops && r.loops.length >= 2 && r.windingRule !== 'EVENODD') {
        changed = true;
        return Object.assign({}, r, { windingRule: 'EVENODD' });
      }
      return r;
    });
    if (changed) v.vectorNetwork = { vertices: vn.vertices, segments: vn.segments, regions };
  }
}
function applyBoldXs(set, svg) {
  const bold = set.children.find(c => c.name === 'Size=xs, Style=bold');
  if (!bold) return { ok: false, reason: 'no-bold' };
  for (const c of [...bold.children]) c.remove();
  const node = figma.createNodeFromSvg(svg);
  node.name = '_bold';
  const inset = 1;
  const size = 14;
  try { node.resize(size, size); } catch (e) {}
  node.x = inset;
  node.y = inset;
  node.clipsContent = false;
  if ('constraints' in node) node.constraints = { horizontal: 'SCALE', vertical: 'SCALE' };
  bold.appendChild(node);
  evenodd(node);
  bindFills(node);
  bold.clipsContent = false;
  bold.visible = true;
  try { bold.resizeWithoutConstraints(16, 16); } catch (e) { try { bold.resize(16, 16); } catch (e2) {} }
  return { ok: true };
}
const BATCH =
