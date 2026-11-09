#!/usr/bin/env node
/**
 * Post-import guard: Style=outline variants must not be fill-only (Bold mix-up).
 * Run after Figma icon batches via use_figma audit, or paste the audit body into MCP.
 *
 * Intentional exceptions (filled by design):
 *   - icon/actions/check.bold
 *   - icon/status/star.filled
 *
 * See docs/design-system/soma/component-notes.md → "Outline ≠ Bold import rule".
 */
const INTENTIONAL = new Set([
  'icon/actions/check.bold',
  'icon/status/star.filled',
]);

/** Figma Plugin API audit — paste into use_figma */
const AUDIT_FIGMA = `
const page = figma.root.children.find(p => p.id === '9:13081');
await figma.setCurrentPageAsync(page);
const INTENTIONAL = new Set(['icon/actions/check.bold', 'icon/status/star.filled']);
const bad = [];
for (const set of page.findAll(n => n.type === 'COMPONENT_SET' && n.name.startsWith('icon/'))) {
  for (const v of set.children) {
    if (!/Style=outline/.test(v.name)) continue;
    const vecs = v.findAll(n => n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION');
    if (!vecs.length) continue;
    const fillOnly = vecs.every(n => {
      const hasFill = Array.isArray(n.fills) && n.fills.length > 0 && n.fills !== figma.mixed && n.fills.some(p => p.visible !== false);
      const hasStroke = Array.isArray(n.strokes) && n.strokes.length > 0 && n.strokes !== figma.mixed && n.strokes.some(p => p.visible !== false);
      return hasFill && !hasStroke;
    });
    if (fillOnly && !INTENTIONAL.has(set.name)) {
      bad.push({ set: set.name, variant: v.name, id: v.id, description: (set.description || '').slice(0, 100) });
    }
  }
}
return { accidentalFillOnlyOutline: bad, count: bad.length };
`;

if (require.main === module) {
  console.log('Paste AUDIT_FIGMA into Figma use_figma MCP after icon imports.');
  console.log('Intentional filled exceptions:', [...INTENTIONAL].join(', '));
  console.log('\\n--- AUDIT_FIGMA ---\\n' + AUDIT_FIGMA);
}

module.exports = { INTENTIONAL, AUDIT_FIGMA };
