
const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);
const old = page.findOne(n => n.name === 'Icons — Dual-style pilot');
if (old) old.remove();
const pilot = figma.createAutoLayout('VERTICAL');
pilot.name = 'Icons — Dual-style pilot';
pilot.itemSpacing = 32;
pilot.paddingTop = 40; pilot.paddingBottom = 40; pilot.paddingLeft = 40; pilot.paddingRight = 40;
pilot.primaryAxisSizingMode = 'AUTO';
pilot.counterAxisSizingMode = 'FIXED';
page.appendChild(pilot);
pilot.resize(720, 200);
pilot.x = 2600; pilot.y = 0;
pilot.primaryAxisSizingMode = 'AUTO';

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
for (const n of ['h3','body2','caption']) await figma.loadFontAsync(styleByName[n].fontName);
function bindText(t, colorName) {
  t.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', varByName[colorName])];
}
async function addText(parent, chars, style, color) {
  const t = figma.createText();
  t.textStyleId = styleByName[style].id;
  t.characters = chars;
  bindText(t, color);
  parent.appendChild(t);
  t.layoutSizingHorizontal = 'FILL';
  return t;
}
await addText(pilot, 'Icons pilot — dual-style (Regular / Bold)', 'h3', 'text/primary');
await addText(pilot, 'Phase 2 gate: Navigation + Actions (15). Style Regular|Bold. Color icon.default. Stroke Regular 1.5@24. Scale proposed: xs16 sm20 md24 lg32.', 'body2', 'text/secondary');
await addText(pilot, 'No Bold match excluded: home (House 1).', 'caption', 'text/secondary');
const shelf = figma.createAutoLayout('HORIZONTAL');
shelf.name = 'Component shelf (pilot)';
shelf.itemSpacing = 16;
shelf.layoutWrap = 'WRAP';
shelf.primaryAxisSizingMode = 'FIXED';
shelf.counterAxisSizingMode = 'AUTO';
pilot.appendChild(shelf);
shelf.layoutSizingHorizontal = 'FILL';
const nav = figma.createAutoLayout('VERTICAL');
nav.name = 'Category · Navigation';
nav.itemSpacing = 12;
pilot.appendChild(nav);
nav.layoutSizingHorizontal = 'FILL';
await addText(nav, 'Navigation', 'h3', 'text/primary');
const act = figma.createAutoLayout('VERTICAL');
act.name = 'Category · Actions';
act.itemSpacing = 12;
pilot.appendChild(act);
act.layoutSizingHorizontal = 'FILL';
await addText(act, 'Actions', 'h3', 'text/primary');
return { createdNodeIds: [pilot.id, shelf.id, nav.id, act.id], pilotId: pilot.id, shelfId: shelf.id, navId: nav.id, actId: act.id };
