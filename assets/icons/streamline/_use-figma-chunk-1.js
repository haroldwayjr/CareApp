const iconsPage = figma.root.children.find(p => p.id === '9:13081') || figma.root.children.find(p => p.name === 'Icons');
await figma.setCurrentPageAsync(iconsPage);
const root = await figma.getNodeByIdAsync('49:2');
if (!root || root.type !== 'FRAME') return { error: 'root missing' };
const pending = [{"name":"hand-wash","category":"health","placedOnNodeId":"50:568"},{"name":"hard-drive","category":"files","placedOnNodeId":"50:577"},{"name":"headphones","category":"media","placedOnNodeId":"50:548"},{"name":"hearing-aid","category":"health","placedOnNodeId":"50:555"},{"name":"heart","category":"health","placedOnNodeId":"50:552"},{"name":"help","category":"status","placedOnNodeId":"50:563"},{"name":"hipaa","category":"health","placedOnNodeId":"50:571"},{"name":"history","category":"misc","placedOnNodeId":"50:588"},{"name":"home","category":"navigation","placedOnNodeId":"50:601"},{"name":"home-alt","category":"navigation","placedOnNodeId":"50:596"},{"name":"hospital","category":"health","placedOnNodeId":"50:598"},{"name":"id-card","category":"misc","placedOnNodeId":"50:604"},{"name":"image","category":"media","placedOnNodeId":"50:615"},{"name":"import","category":"actions","placedOnNodeId":"50:624"},{"name":"inbox","category":"comms","placedOnNodeId":"50:610"},{"name":"info","category":"status","placedOnNodeId":"50:634"},{"name":"inhaler","category":"health","placedOnNodeId":"50:628"},{"name":"insurance","category":"health","placedOnNodeId":"50:678"},{"name":"invoice","category":"commerce","placedOnNodeId":"50:658"},{"name":"key","category":"misc","placedOnNodeId":"50:640"},{"name":"keyboard","category":"misc","placedOnNodeId":"50:647"},{"name":"lab","category":"health","placedOnNodeId":"50:683"},{"name":"language","category":"misc","placedOnNodeId":"50:666"},{"name":"laptop","category":"misc","placedOnNodeId":"50:695"},{"name":"layers","category":"navigation","placedOnNodeId":"50:699"}];
const styles = await figma.getLocalTextStylesAsync();
const caption = styles.find(s => s.name === 'caption');
if (!caption) return { error: 'caption style missing' };
await figma.loadFontAsync(caption.fontName);
function ensureSection(category) {
  let section = root.children.find(c => c.name === `Section · ${category}`);
  if (section) {
    const grid = section.children.find(c => c.name === `Grid · ${category}`);
    return { section, grid, created: false };
  }
  section = figma.createFrame();
  section.name = `Section · ${category}`;
  section.layoutMode = 'VERTICAL';
  section.primaryAxisSizingMode = 'AUTO';
  section.counterAxisSizingMode = 'FIXED';
  section.itemSpacing = 12;
  section.fills = [];
  section.clipsContent = false;
  root.appendChild(section);
  section.layoutSizingHorizontal = 'FILL';
  section.layoutSizingVertical = 'HUG';
  const label = figma.createText();
  label.name = category;
  label.textStyleId = caption.id;
  label.characters = category;
  section.appendChild(label);
  label.layoutSizingHorizontal = 'HUG';
  label.layoutSizingVertical = 'HUG';
  const grid = figma.createFrame();
  grid.name = `Grid · ${category}`;
  grid.layoutMode = 'HORIZONTAL';
  grid.layoutWrap = 'WRAP';
  grid.primaryAxisSizingMode = 'FIXED';
  grid.counterAxisSizingMode = 'AUTO';
  grid.itemSpacing = 16;
  grid.counterAxisSpacing = 16;
  grid.fills = [];
  grid.clipsContent = false;
  section.appendChild(grid);
  grid.layoutSizingHorizontal = 'FILL';
  grid.layoutSizingVertical = 'HUG';
  return { section, grid, created: true };
}
function fitInto24(svgNode, wrapper) {
  const bw = Math.max(svgNode.width, 0.01);
  const bh = Math.max(svgNode.height, 0.01);
  const scale = Math.min(24 / bw, 24 / bh);
  svgNode.rescale(scale);
  svgNode.x = (24 - svgNode.width) / 2;
  svgNode.y = (24 - svgNode.height) / 2;
  wrapper.appendChild(svgNode);
}
const results = [];
const createdSectionIds = [];
const mutatedNodeIds = [];
for (const item of pending) {
  const svg = await figma.getNodeByIdAsync(item.placedOnNodeId);
  if (!svg) { results.push({ ...item, error: 'svg missing' }); continue; }
  if (svg.parent && svg.parent.type === 'COMPONENT') {
    const comp = svg.parent;
    const expected = `icon/${item.category}/${item.name}`;
    if (comp.name !== expected) comp.name = expected;
    const { grid } = ensureSection(item.category);
    if (comp.parent !== grid) {
      grid.appendChild(comp);
      comp.layoutSizingHorizontal = 'FIXED';
      comp.layoutSizingVertical = 'FIXED';
    }
    results.push({ name: item.name, category: item.category, placedOnNodeId: item.placedOnNodeId, componentId: comp.id, adopted: true });
    continue;
  }
  if (svg.name !== item.name) { results.push({ ...item, error: 'name mismatch:' + svg.name, actualName: svg.name }); continue; }
  const wrapper = figma.createFrame();
  wrapper.name = item.name;
  wrapper.resize(24, 24);
  wrapper.fills = [];
  wrapper.clipsContent = false;
  fitInto24(svg, wrapper);
  const component = figma.createComponentFromNode(wrapper);
  component.name = `icon/${item.category}/${item.name}`;
  const { grid, created, section } = ensureSection(item.category);
  if (created) createdSectionIds.push(section.id);
  grid.appendChild(component);
  component.layoutSizingHorizontal = 'FIXED';
  component.layoutSizingVertical = 'FIXED';
  results.push({ name: item.name, category: item.category, placedOnNodeId: item.placedOnNodeId, componentId: component.id });
  mutatedNodeIds.push(component.id, grid.id);
}
return {
  created: results.filter(r => r.componentId && !r.error && !r.adopted).length,
  adopted: results.filter(r => r.adopted).length,
  failed: results.filter(r => r.error),
  results,
  createdSectionIds,
  createdNodeIds: [...createdSectionIds, ...results.filter(r => r.componentId && !r.error).map(r => r.componentId)],
  mutatedNodeIds: [...new Set(mutatedNodeIds), root.id]
};