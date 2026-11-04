import { style } from '@vanilla-extract/css'
import { border, inset, shadowMd, surface, text } from '../tokens.css'

export const page = style({
  minHeight: '100vh',
  padding: inset.lg,
  display: 'grid',
  placeItems: 'center',
})
export const app = style({
  width: 'min(1440px, 100%)',
  height: 'calc(100vh - 32px)',
  minHeight: 680,
  display: 'flex',
  overflow: 'hidden',
  background: surface.default,
  border: `1px solid ${border.hairline}`,
  borderRadius: 12,
  boxShadow: shadowMd,
})
export const workspace = style({ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' })
export const topbar = style({
  height: 64,
  flex: '0 0 64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `0 ${inset.xl}`,
  borderBottom: `1px solid ${border.hairline}`,
})
export const brand = style({ fontWeight: 700, color: text.brand, letterSpacing: -0.4 })
export const agent = style({ color: text.tertiary, fontSize: 13 })
export const content = style({ flex: 1, minHeight: 0, display: 'flex' })
