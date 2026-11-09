
// RESCUE dual-style sets before deleting pilot frame
const page0 = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page0);
const pilot0 = page0.findOne(n => n.name === 'Icons — Dual-style pilot');
if (pilot0) {
  const shelf0 = pilot0.findOne(n => n.name === 'Component shelf (pilot)') || pilot0.findOne(n => /Component shelf/.test(n.name));
  if (shelf0) {
    const hold = figma.createFrame();
    hold.name = '_dual-style-hold';
    hold.visible = false;
    page0.appendChild(hold);
    hold.x = -5000; hold.y = 0;
    for (const c of [...shelf0.children]) {
      if (c.type === 'COMPONENT_SET') hold.appendChild(c);
    }
  }
}


const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);

const collections = await figma.variables.getLocalVariableCollectionsAsync();
const varByName = {};
for (const coll of collections) {
  for (const id of coll.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    varByName[v.name] = v;
  }
}
const styles = await figma.getLocalTextStylesAsync();
const styleByName = Object.fromEntries(styles.map(s => [s.name, s]));
for (const n of ['h3', 'h5', 'body1', 'body2', 'caption']) {
  await figma.loadFontAsync(styleByName[n].fontName);
}

function bindText(t, colorName) {
  t.fills = [figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', varByName[colorName])];
}
async function addText(parent, chars, style, color) {
  const t = figma.createText();
  t.textStyleId = styleByName[style].id;
  t.characters = chars;
  bindText(t, color);
  parent.appendChild(t);
  return t;
}

// Index Stage B components: icon/<folder>/<kebab>
const core = await figma.getNodeByIdAsync('49:2');
const byKey = {}; // folder/kebab -> component
function walk(n) {
  if (n.type === 'COMPONENT' && n.name.startsWith('icon/')) {
    const parts = n.name.split('/');
    if (parts.length >= 3) {
      const folder = parts[1];
      const kebab = parts.slice(2).join('/');
      byKey[folder + '/' + kebab] = n;
    }
  }
  if ('children' in n) for (const c of n.children) walk(c);
}
if (core) walk(core);

// Dual-style sets from shelf (prefer for catalog when present — use Regular)
const hold = page.findOne(n => n.name === '_dual-style-hold');
const oldPilot = page.findOne(n => n.name === 'Icons — Dual-style pilot');
const dualByKebab = {};
const dualSources = [];
if (hold) dualSources.push(...hold.children);
if (oldPilot) {
  const shelf = oldPilot.findOne(n => n.name === 'Component shelf (pilot)') || oldPilot.findOne(n => /Component shelf/.test(n.name));
  if (shelf) dualSources.push(...shelf.children);
}
for (const set of dualSources) {
  if (set.type === 'COMPONENT_SET') {
    const kebab = set.name.replace(/^icon\//, '');
    dualByKebab[kebab] = set;
  }
}

const folderToCat = {
  navigation: 'Navigation',
  actions: 'Actions',
  status: 'Status',
  comms: 'Communication',
  files: 'Files & media',
  media: 'Files & media',
  health: 'Care/work',
  commerce: 'General',
  misc: 'General',
};
const catOrder = ['Navigation', 'Actions', 'Status', 'Communication', 'Files & media', 'Care/work', 'General'];

const byCat = {};
for (const [key, comp] of Object.entries(byKey)) {
  const [folder, ...rest] = key.split('/');
  const kebab = rest.join('/');
  const cat = folderToCat[folder] || 'General';
  byCat[cat] = byCat[cat] || [];
  byCat[cat].push({ folder, kebab, comp, dual: dualByKebab[kebab] || null });
}
for (const cat of Object.keys(byCat)) {
  byCat[cat].sort((a, b) => a.kebab.localeCompare(b.kebab));
}

// Rebuild pilot frame in place
const x = oldPilot ? oldPilot.x : 2600;
const y = oldPilot ? oldPilot.y : 0;
if (oldPilot) oldPilot.remove();

const root = figma.createAutoLayout('VERTICAL');
root.name = 'Icons — Dual-style pilot';
root.itemSpacing = 40;
root.paddingTop = 40; root.paddingBottom = 40; root.paddingLeft = 40; root.paddingRight = 40;
root.primaryAxisSizingMode = 'AUTO';
root.counterAxisSizingMode = 'FIXED';
page.appendChild(root);
root.resize(960, 200);
root.x = x; root.y = y;
root.primaryAxisSizingMode = 'AUTO';

const title = await addText(root, 'Icons', 'h3', 'text/primary');
title.layoutSizingHorizontal = 'FILL';
const intro = await addText(root,
  'Streamline Ultimate Regular @ 24px (icon.md). Color bound to icon.default. Stroke 1.5. Categories follow Care App audit (+ General). Dual-style Regular/Bold component sets exist for the Navigation/Actions pilot set — catalog shows Regular.',
  'body2', 'text/secondary');
intro.layoutSizingHorizontal = 'FILL';

const counts = {};
const createdInstances = [];

for (const cat of catOrder) {
  const items = byCat[cat] || [];
  if (!items.length) continue;
  counts[cat] = items.length;

  const section = figma.createAutoLayout('VERTICAL');
  section.name = 'Category · ' + cat;
  section.itemSpacing = 16;
  section.primaryAxisSizingMode = 'AUTO';
  section.counterAxisSizingMode = 'FIXED';
  root.appendChild(section);
  section.layoutSizingHorizontal = 'FILL';

  const h = await addText(section, cat, 'h5', 'text/primary');
  h.layoutSizingHorizontal = 'FILL';

  // two-column grid of rows
  const grid = figma.createAutoLayout('HORIZONTAL');
  grid.name = 'grid';
  grid.itemSpacing = 48;
  grid.layoutWrap = 'NO_WRAP';
  grid.primaryAxisSizingMode = 'FIXED';
  grid.counterAxisSizingMode = 'AUTO';
  section.appendChild(grid);
  grid.layoutSizingHorizontal = 'FILL';

  const colL = figma.createAutoLayout('VERTICAL');
  colL.name = 'col-left';
  colL.itemSpacing = 12;
  colL.primaryAxisSizingMode = 'AUTO';
  colL.counterAxisSizingMode = 'FILL';
  grid.appendChild(colL);
  colL.layoutSizingHorizontal = 'FILL';

  const colR = figma.createAutoLayout('VERTICAL');
  colR.name = 'col-right';
  colR.itemSpacing = 12;
  colR.primaryAxisSizingMode = 'AUTO';
  colR.counterAxisSizingMode = 'FILL';
  grid.appendChild(colR);
  colR.layoutSizingHorizontal = 'FILL';

  const mid = Math.ceil(items.length / 2);
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const col = i < mid ? colL : colR;
    const row = figma.createAutoLayout('HORIZONTAL');
    row.name = 'row/' + item.kebab;
    row.itemSpacing = 12;
    row.counterAxisAlignItems = 'CENTER';
    row.primaryAxisSizingMode = 'AUTO';
    col.appendChild(row);

    let inst;
    if (item.dual) {
      const reg = item.dual.children.find(c => c.name === 'Style=Regular') || item.dual.children[0];
      inst = reg.createInstance();
    } else {
      inst = item.comp.createInstance();
    }
    // keep at 24 — do not resize (avoids clip)
    if (Math.abs(inst.width - 24) > 0.5 || Math.abs(inst.height - 24) > 0.5) {
      inst.resize(24, 24);
    }
    row.appendChild(inst);
    createdInstances.push(inst.id);

    const lab = figma.createText();
    lab.textStyleId = styleByName['body2'].id;
    lab.characters = item.kebab;
    bindText(lab, 'text/primary');
    row.appendChild(lab);
  }
}

// Park dual-style sets shelf at bottom (library assets)
const shelf = figma.createAutoLayout('HORIZONTAL');
shelf.name = 'Component shelf (pilot dual-style)';
shelf.itemSpacing = 16;
shelf.layoutWrap = 'WRAP';
shelf.primaryAxisSizingMode = 'FIXED';
shelf.counterAxisSizingMode = 'AUTO';
root.appendChild(shelf);
shelf.layoutSizingHorizontal = 'FILL';
const shelfNote = await addText(shelf, 'Dual-style sets (Regular/Bold) — pilot', 'caption', 'text/secondary');

const holdAfter = page.findOne(n => n.name === '_dual-style-hold');
if (holdAfter) {
  for (const c of [...holdAfter.children]) {
    if (c.type === 'COMPONENT_SET') shelf.appendChild(c);
  }
  holdAfter.remove();
}
const dualSets = shelf.children.filter(n => n.type === 'COMPONENT_SET');

return {
  createdNodeIds: [root.id, ...createdInstances.slice(0, 5)],
  rootId: root.id,
  counts,
  totalListed: Object.values(counts).reduce((a, b) => a + b, 0),
  dualSetsLeft: dualSets.length,
  dualSetNames: dualSets.map(s => s.name),
  stageBCount: Object.keys(byKey).length,
};
