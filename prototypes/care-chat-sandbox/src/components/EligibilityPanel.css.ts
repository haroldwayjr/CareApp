import { style } from '@vanilla-extract/css'
import { border, inset, radius, stack, surface, text } from '../tokens.css'

export const toolbar = style({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: stack.sm, margin: `${stack.md} 0` })
export const benefit = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: stack.sm,
  padding: inset.md,
  background: surface.default,
  border: `1px solid ${border.subtle}`,
  borderRadius: radius.lg,
  textAlign: 'left',
  marginBottom: stack.sm,
})
/** Selected = tint + brand border (never tint alone). */
export const benefitSelected = style({
  background: surface.selected,
  borderColor: border.brand,
})
export const benefitText = style({ flex: 1 })
export const benefitName = style({ fontWeight: 600, color: text.primary })
export const benefitMeta = style({ fontSize: 12, color: text.tertiary, marginTop: stack.xs })
export const back = style({
  display: 'inline-flex',
  gap: stack.sm,
  alignItems: 'center',
  border: 0,
  background: 'transparent',
  color: text.brand,
  padding: `${inset.sm} 0`,
  fontWeight: 600,
})
export const toggle = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: stack.xs,
  background: surface.muted,
  padding: inset.xs,
  borderRadius: radius.md,
  marginTop: stack.md,
})
export const toggleOption = style({
  border: 0,
  background: 'transparent',
  borderRadius: radius.sm,
  padding: inset.sm,
  selectors: { '&[aria-pressed="true"]': { background: surface.default, color: text.brand, boxShadow: `inset 0 0 0 1px ${border.brand}` } },
})
