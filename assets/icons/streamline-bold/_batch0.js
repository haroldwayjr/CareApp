const ICONS = [{"kebab": "menu", "category": "Navigation", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Navigation-Menu--Streamline-Ultimate\">\n  <desc>\n    Navigation Menu Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m2.25 18.003 19.5 0\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m2.25 12.003 19.5 0\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m2.25 6.003 19.5 0\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"M1.5 2.5h21s1 0 1 1v1s0 1-1 1h-21s-1 0-1-1v-1s0-1 1-1\" fill=\"#000000\"/><path d=\"M1.5 10.5h21s1 0 1 1v1s0 1-1 1h-21s-1 0-1-1v-1s0-1 1-1\" fill=\"#000000\"/><path d=\"M1.5 18.5h21s1 0 1 1v1s0 1-1 1h-21s-1 0-1-1v-1s0-1 1-1\" fill=\"#000000\"/></g></svg>"}, {"kebab": "search", "category": "Navigation", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Search--Streamline-Ultimate\">\n  <desc>\n    Search Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M1.4720451262 13.356970375A9.063 9.063 0 1 0 18.154024235 6.267298379a9.063 9.063 0 1 0 -16.6819791088 7.089671996Z\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"m16.221 16.22 7.029 7.03\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><g><path d=\"m23.42 20.6-5.06-5.12a10 10 0 1 0-2.81 2.84l5 5.09a2 2 0 0 0 2.83 0 2 2 0 0 0 .04-2.81ZM10 1.76A8.25 8.25 0 1 1 1.75 10 8.26 8.26 0 0 1 10 1.76Z\" fill=\"#000000\"/><path d=\"M3.25 10.01a6.75 6.75 0 1 0 13.5 0 6.75 6.75 0 1 0-13.5 0\" fill=\"#000000\"/></g></svg>"}, {"kebab": "arrow-left", "category": "Navigation", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Arrow-Left--Streamline-Ultimate\">\n  <desc>\n    Arrow Left Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"M23.25 12 0.75 12\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M11.25 1.5 0.75 12l10.5 10.5\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M22.548 10.561H5.437a.251.251 0 0 1-.165-.438l8.637-7.6a1.44 1.44 0 0 0-1.9-2.162L.828 10.2a2.4 2.4 0 0 0 0 3.6l11.179 9.837a1.44 1.44 0 0 0 1.9-2.161l-8.637-7.6a.251.251 0 0 1 .165-.438h17.113a1.44 1.44 0 0 0 0-2.879Z\" fill=\"#000000\"/></svg>"}, {"kebab": "arrow-right", "category": "Navigation", "regularSvg": "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" id=\"Arrow-Right--Streamline-Ultimate\">\n  <desc>\n    Arrow Right Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path d=\"m0.75 12 22.5 0\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n  <path d=\"M12.75 22.5 23.25 12 12.75 1.5\" fill=\"none\" stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M23.987 12a2.411 2.411 0 0 0-.814-1.8L11.994.361a1.44 1.44 0 0 0-1.9 2.162l8.637 7.6a.25.25 0 0 1-.165.437H1.452a1.44 1.44 0 0 0 0 2.88h17.111a.251.251 0 0 1 .165.438l-8.637 7.6a1.44 1.44 0 1 0 1.9 2.161L23.172 13.8a2.409 2.409 0 0 0 .815-1.8Z\" fill=\"#000000\"/></svg>"}, {"kebab": "chevron-down", "category": "Navigation", "regularSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" id=\"Arrow-Down-1--Streamline-Ultimate\">\n  <desc>\n    Arrow Down 1 Streamline Icon: https://streamlinehq.com\n  </desc>\n  <path stroke=\"#000000\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M23.25 7.311 12.53 18.03c-0.0696 0.0697 -0.1522 0.1249 -0.2431 0.1626 -0.091 0.0378 -0.1885 0.0572 -0.2869 0.0572 -0.0984 0 -0.1959 -0.0194 -0.2869 -0.0572 -0.0909 -0.0377 -0.1735 -0.0929 -0.2431 -0.1626L0.75 7.311\" stroke-width=\"1\"></path>\n</svg>", "boldSvg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 19.5c-.7 0-1.3-.3-1.7-.8L.4 7.6c-.6-.8-.5-2 .3-2.6.8-.6 1.9-.6 2.5.2l8.6 9.8c.1.1.2.1.4 0l8.6-9.8c.7-.8 1.8-.9 2.6-.2s.9 1.8.2 2.6l-.1.1-9.8 11.1c-.4.4-1.1.7-1.7.7z\" fill=\"#000000\"/></svg>"}];

const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);
const pilot = page.findOne(n => n.name === 'Icons — Dual-style pilot');
const shelf = pilot.findOne(n => n.name === 'Component shelf (pilot)');
const nav = pilot.findOne(n => n.name === 'Category · Navigation');
const act = pilot.findOne(n => n.name === 'Category · Actions');
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const varByName = {};
for (const coll of collections) {
  for (const id of coll.variableIds) {
    const v = await figma.variables.getVariableByIdAsync(id);
    varByName[v.name] = v;
  }
}
const iconDefault = varByName['icon/default'];
const styles = await figma.getLocalTextStylesAsync();
const styleByName = Object.fromEntries(styles.map(s => [s.name, s]));
for (const n of ['body2','caption']) await figma.loadFontAsync(styleByName[n].fontName);
function bindColor(node, field) {
  const paint = figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', iconDefault);
  if (field === 'fills') node.fills = [paint]; else node.strokes = [paint];
}
function bindIconColor(root, styleName) {
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    if ('children' in n) for (const c of n.children) stack.push(c);
    if (n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION' || n.type === 'LINE') {
      const hasStroke = Array.isArray(n.strokes) && n.strokes.length > 0;
      const fills = Array.isArray(n.fills) ? n.fills : [];
      const hasFill = fills.some(f => f.type === 'SOLID' && f.visible !== false);
      if (styleName === 'Regular') {
        if (hasStroke) { bindColor(n, 'strokes'); n.strokeWeight = 1.5; }
        if (hasFill && hasStroke) n.fills = [];
      } else {
        if (hasFill) bindColor(n, 'fills');
        else if (hasStroke) bindColor(n, 'strokes');
      }
    }
  }
}
function bindText(t, colorName) {
  t.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', varByName[colorName])];
}
function makeVariant(styleName, svg) {
  const wrap = figma.createFrame();
  wrap.name = 'Style=' + styleName;
  wrap.resize(24, 24);
  wrap.fills = [];
  wrap.clipsContent = false;
  wrap.cornerRadius = 0;
  const node = figma.createNodeFromSvg(svg);
  node.name = 'glyph';
  wrap.appendChild(node);
  node.x = (24 - node.width) / 2;
  node.y = (24 - node.height) / 2;
  bindIconColor(wrap, styleName);
  return figma.createComponentFromNode(wrap);
}
const created = [];
for (const icon of ICONS) {
  const reg = makeVariant('Regular', icon.regularSvg);
  const bold = makeVariant('Bold', icon.boldSvg);
  const set = figma.combineAsVariants([reg, bold], shelf);
  set.name = 'icon/' + icon.kebab;
  set.description = 'Soma icon · Regular=Ultimate Regular · Bold=Ultimate Bold · icon.default';
  created.push(set.id);
  const section = icon.category === 'Navigation' ? nav : act;
  const row = figma.createAutoLayout('HORIZONTAL');
  row.name = 'row/' + icon.kebab;
  row.itemSpacing = 16;
  row.counterAxisAlignItems = 'CENTER';
  section.appendChild(row);
  const regComp = set.children.find(c => c.name === 'Style=Regular');
  const boldComp = set.children.find(c => c.name === 'Style=Bold');
  const sizeRow = figma.createAutoLayout('HORIZONTAL');
  sizeRow.itemSpacing = 10;
  sizeRow.counterAxisAlignItems = 'MAX';
  row.appendChild(sizeRow);
  for (const [label, px] of [['xs',16],['sm',20],['md',24],['lg',32]]) {
    const col = figma.createAutoLayout('VERTICAL');
    col.itemSpacing = 4;
    col.counterAxisAlignItems = 'CENTER';
    sizeRow.appendChild(col);
    const inst = regComp.createInstance();
    inst.resize(px, px);
    col.appendChild(inst);
    const lab = figma.createText();
    lab.textStyleId = styleByName['caption'].id;
    lab.characters = label;
    bindText(lab, 'text/secondary');
    col.appendChild(lab);
  }
  const boldInst = boldComp.createInstance();
  boldInst.resize(24, 24);
  row.appendChild(boldInst);
  const boldLab = figma.createText();
  boldLab.textStyleId = styleByName['caption'].id;
  boldLab.characters = 'Bold';
  bindText(boldLab, 'text/secondary');
  row.appendChild(boldLab);
  const name = figma.createText();
  name.textStyleId = styleByName['body2'].id;
  name.characters = icon.kebab;
  bindText(name, 'text/primary');
  row.appendChild(name);
}
return { createdNodeIds: created, mutatedNodeIds: [pilot.id], count: created.length };
