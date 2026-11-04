import { globalStyle } from '@vanilla-extract/css'
import { action, focusRing, surface, text } from '../tokens.css'

globalStyle('*', { boxSizing: 'border-box' })
globalStyle('html, body, #root', { margin: 0, minHeight: '100%', width: '100%' })
globalStyle('body', {
  background: surface.subtle,
  color: text.primary,
  fontFamily: '"Figtree", sans-serif',
  fontSize: 14,
})
globalStyle('button, input', { font: 'inherit' })
globalStyle('button', { color: 'inherit' })
globalStyle('button:focus-visible, input:focus-visible, [tabindex]:focus-visible', {
  outline: `2px solid ${focusRing}`,
  outlineOffset: 2,
})
globalStyle('button:not(:disabled)', { cursor: 'pointer' })
globalStyle('button:disabled', { cursor: 'not-allowed' })
globalStyle('::selection', { background: action.primary, color: surface.default })
