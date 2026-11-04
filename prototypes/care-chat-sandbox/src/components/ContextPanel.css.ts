import { style } from '@vanilla-extract/css'
import { border, inset, radius, stack, surface, text } from '../tokens.css'

export const panel = style({
  width: 400,
  minWidth: 400,
  height: '100%',
  overflowY: 'auto',
  background: surface.default,
  borderLeft: `1px solid ${border.hairline}`,
})
export const panelHeader = style({
  minHeight: 64,
  padding: inset.lg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${border.hairline}`,
  position: 'sticky',
  top: 0,
  background: surface.default,
  zIndex: 2,
})
export const title = style({ margin: 0, fontSize: 18 })
export const body = style({ padding: inset.lg })
export const section = style({ padding: `${stack.md} 0`, borderBottom: `1px solid ${border.hairline}` })
export const sectionTitle = style({ margin: `0 0 ${stack.md}`, fontSize: 14, fontWeight: 700 })
export const row = style({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: stack.md, margin: `${stack.sm} 0` })
export const label = style({ color: text.tertiary, fontSize: 12 })
export const value = style({ color: text.primary, fontWeight: 500, textAlign: 'right' })
export const card = style({ border: `1px solid ${border.subtle}`, borderRadius: radius.lg, padding: inset.md, marginBottom: stack.sm })
export const listButton = style({
  width: '100%',
  border: 0,
  background: 'transparent',
  padding: 0,
  textAlign: 'left',
})
export const muted = style({ color: text.tertiary, fontSize: 13, lineHeight: 1.5 })
export const fieldset = style({ border: 0, padding: 0, margin: `${stack.md} 0` })
export const checkboxRow = style({
  display: 'flex',
  gap: stack.sm,
  alignItems: 'flex-start',
  padding: `${stack.sm} 0`,
  color: text.secondary,
})
export const footer = style({ display: 'flex', gap: stack.sm, justifyContent: 'flex-end', marginTop: stack.lg })
export const tabs = style({ display: 'flex', borderBottom: `1px solid ${border.hairline}`, padding: `0 ${inset.lg}` })
export const tab = style({
  flex: 1,
  background: 'transparent',
  border: 0,
  padding: `${inset.md} ${inset.xs}`,
  color: text.tertiary,
  selectors: {
    '&[data-selected]': {
      color: text.brand,
      boxShadow: `inset 0 -2px 0 ${text.brand}`,
      fontWeight: 600,
    },
  },
})
export const dangerBox = style({
  background: surface.dangerSoft,
  border: `1px solid ${border.dangerSubtle}`,
  borderRadius: radius.lg,
  padding: inset.md,
  color: text.danger,
})
