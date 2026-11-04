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
let text = frame.findOne(n => n.type === 'TEXT' && n.name === 'c05');
if (!text) {
  text = figma.createText();
  text.name = 'c05';
  frame.appendChild(text);
}
text.characters = "MTcgLTAuMzkxOSAtMC45ODU2cy0wLjgyMTcgMC4wMTE2IC0wLjk4NTYgMC4zOTJjLTAuNDcyNSAxLjA5NjUgLTEuNTYyMyAxLjg2MTcgLTIuODI5MTYgMS44NjE3IC0xLjI2Njg1IDAgLTIuMzU2NjYgLTAuNzY1MiAtMi44MjkxNiAtMS44NjE3bS0wLjQ4MTc0IC0yLjM1NTZjMC42MzMxOSAwIDEuMTQ2NDggLTAuNTEzMjYgMS4xNDY0OCAtMS4xNDY0NSAwIC0wLjYzMzE4IC0wLjUxMzI5IC0xLjE0NjQ4IC0xLjE0NjQ4IC0xLjE0NjQ4cy0xLjE0NjQ4IDAuNTEzMyAtMS4xNDY0OCAxLjE0NjQ4YzAgMC42MzMxOSAwLjUxMzI5IDEuMTQ2NDUgMS4xNDY0OCAxLjE0NjQ1bTcuNzY3NTYgLTEuMTQ2NDVjMCAwLjYzMzE5IC0wLjUxMzMgMS4xNDY0NSAtMS4xNDY1IDEuMTQ2NDVzLTEuMTQ2NCAtMC41MTMyNiAtMS4xNDY0IC0xLjE0NjQ1YzAgLTAuNjMzMTggMC41MTMyIC0xLjE0NjQ4IDEuMTQ2NCAtMS4xNDY0OHMxLjE0NjUgMC41MTMzIDEuMTQ2NSAxLjE0NjQ4XCIgY2xpcC1ydWxlPVwiZXZlbm9kZFwiIHN0cm9rZS13aWR0aD1cIjFcIj48L3BhdGg+IDwvc3ZnPiJ9XTsKbGV0IG9rPTAsIG1pc3Npbmc9MCwgZmFpbGVkPTA7IGNvbnN0IG1pc3M9W10sIGZhaWw9W107CmZvciAoY29uc3QgaXRlbSBvZiBCQVRDSCkgewogIGNvbnN0IHNldCA9IGZpZ21hLmN1cnJlbnRQYWdlLmZpbmRPbmUobiA9PiBuLnR5cGUgPT09ICdDT01QT05FTlRfU0VUJyAmJiBuLm5hbWUgPT09IGl0ZW0uc2V0TmFtZSk7CiAgaWYgKCFzZXQpIHsgbWlzc2luZysrOyBpZiAobWlzcy5sZW5ndGg8OCkgbWlzcy5wdXNoKGl0ZW0uc2V0TmFtZSk7IGNvbnRpbnVlOyB9CiAgdHJ5IHsKICAgIGNvbnN0IHIgPSBhcHBseUJvbGRYcyhzZXQsIGl0ZW0uc3ZnKTsKICAgIGlmIChyLm9rKSBvaysrOyBlbHNlIHsgZmFpbGVkKys7IGZhaWwucHVzaCh7bmFtZTppdGVtLnNldE5hbWUscn0pOyB9CiAgfSBjYXRjaChlKSB7IGZhaWxlZCsrOyBpZiAoZmFpbC5sZW5ndGg8OCkgZmFpbC5wdXNoKHtuYW1lOml0ZW0uc2V0TmFtZSxlcnI6U3RyaW5nKGUpfSk7IH0KfQpyZXR1cm4geyBvaywgbWlzc2luZywgZmFpbGVkLCBtaXNzLCBmYWlsIH07Cg==";
return { batch: 19, chunk: 5, len: text.characters.length, textId: text.id, frameId: frame.id };
