import { style } from '@vanilla-extract/css'
import { border, inset, radius, stack, surface, text } from '../tokens.css'

export const plan = style({
  display: 'flex',
  gap: stack.sm,
  alignItems: 'flex-start',
  padding: inset.md,
  border: `1px solid ${border.subtle}`,
  borderRadius: radius.lg,
  marginBottom: stack.sm,
  background: surface.default,
})
/** Selected = tint + brand border (never tint alone). */
export const planSelected = style({
  background: surface.selected,
  borderColor: border.brand,
})
export const planInfo = style({ flex: 1 })
export const planName = style({ fontWeight: 600 })
export const planMeta = style({ color: text.tertiary, fontSize: 12, marginTop: stack.xs })
export const table = style({ width: '100%', borderCollapse: 'collapse', fontSize: 12 })
export const cell = style({ padding: `${inset.md} ${inset.sm}`, textAlign: 'left', borderBottom: `1px solid ${border.hairline}` })
export const heading = style({ background: surface.subtle, color: text.secondary, fontWeight: 600 })
export const reviewed = style({
  padding: inset.md,
  background: surface.successSoft,
  border: `1px solid ${border.successSubtle}`,
  borderRadius: radius.md,
  color: text.success,
  marginBottom: stack.md,
})
