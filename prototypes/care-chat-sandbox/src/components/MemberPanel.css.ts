import { style } from '@vanilla-extract/css'
import { border, inset, radius, stack, surface, text } from '../tokens.css'

export const person = style({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: stack.sm })
export const avatar = style({
  width: 36,
  height: 36,
  borderRadius: radius.full,
  background: surface.brandSubtle,
  color: text.brand,
  display: 'grid',
  placeItems: 'center',
  fontWeight: 700,
  flex: '0 0 auto',
})
export const personInfo = style({ flex: 1 })
export const personName = style({ fontWeight: 600 })
export const role = style({ color: text.tertiary, fontSize: 12, marginTop: stack.xs })
export const teamList = style({ display: 'grid', gap: stack.sm, marginTop: stack.md })
export const teamRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: stack.sm,
  padding: inset.sm,
  border: `1px solid ${border.hairline}`,
  borderRadius: radius.md,
})
/** WCAG 2.2 SC 2.5.8 — ≥24×24 hit target regardless of 16px glyph. */
export const remove = style({
  width: 24,
  height: 24,
  minWidth: 24,
  minHeight: 24,
  display: 'grid',
  placeItems: 'center',
  padding: 0,
  border: 0,
  borderRadius: radius.full,
  color: text.danger,
  background: surface.dangerSoft,
  flex: '0 0 auto',
})
