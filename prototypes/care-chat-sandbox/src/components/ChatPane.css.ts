import { style } from '@vanilla-extract/css'
import { border, inset, radius, stack, surface, text } from '../tokens.css'

export const pane = style({ flex: 1, minWidth: 420, display: 'flex', flexDirection: 'column', background: surface.subtle })
export const member = style({
  padding: `${inset.md} ${inset.xl}`,
  background: surface.default,
  borderBottom: `1px solid ${border.hairline}`,
})
export const name = style({ fontWeight: 700 })
export const meta = style({ color: text.tertiary, fontSize: 12, marginTop: stack.xs })
export const conversation = style({ flex: 1, overflow: 'auto', padding: inset.xl })
export const timestamp = style({ color: text.disabled, fontSize: 12, textAlign: 'center', marginBottom: stack.lg })
export const bubble = style({
  width: 'fit-content',
  maxWidth: 520,
  padding: `${inset.md} ${inset.lg}`,
  marginBottom: stack.md,
  borderRadius: radius['2xl'],
  lineHeight: 1.5,
  background: surface.default,
  border: `1px solid ${border.hairline}`,
})
export const own = style({ marginLeft: 'auto', background: surface.brandSubtle, borderColor: border.brand })
export const composer = style({
  margin: inset.lg,
  minHeight: 80,
  background: surface.default,
  border: `1px solid ${border.subtle}`,
  borderRadius: radius.xl,
  padding: inset.md,
  color: text.disabled,
})
