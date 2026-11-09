const page = await figma.getNodeByIdAsync('9:13081');
await figma.setCurrentPageAsync(page);
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
let frame = page.findOne(n => n.name === '__xs_payload_store');
if (!frame) {
  frame = figma.createFrame();
  frame.name = '__xs_payload_store';
  frame.resize(10, 10);
  frame.x = -10000; frame.y = -10000;
  frame.visible = false;
  page.appendChild(frame);
}
const name = 'c' + String(8).padStart(2, '0');
let text = frame.findOne(n => n.type === 'TEXT' && n.name === name);
if (!text) { text = figma.createText(); text.name = name; frame.appendChild(text); }
text.characters = "LCBmYWlsZWQsIG1pc3MsIGZhaWwgfTsK";
return { batch: 16, chunk: 8, nChunks: 9, len: text.characters.length, expected: 32 };
