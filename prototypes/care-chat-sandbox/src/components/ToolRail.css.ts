import { style } from '@vanilla-extract/css'
import { border, icon, inset, radius, shadowMd, stack, surface, text } from '../tokens.css'

export const rail = style({
  width: 56,
  flex: '0 0 56px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: stack.sm,
  padding: `${inset.md} ${inset.sm}`,
  borderLeft: `1px solid ${border.hairline}`,
  background: surface.default,
})
export const tool = style({
  width: 40,
  height: 40,
  border: 0,
  background: 'transparent',
  color: icon.tertiary,
  display: 'grid',
  placeItems: 'center',
  position: 'relative',
  borderRadius: radius.full,
  transition: 'background 100ms cubic-bezier(0.2, 0, 0, 1)',
  ':hover': { background: surface.subtle, color: icon.secondary },
  selectors: {
    '& > svg': { transition: 'transform 140ms ease' },
    '&:hover > svg': { transform: 'translateY(-1px)' },
    '&:focus-visible': {
      outline: 'none',
      background: surface.subtle,
      boxShadow: `inset 0 0 0 2px ${border.brand}`,
    },
  },
})
export const active = style({
  background: surface.selected,
  color: icon.brand,
  selectors: {
    '&:hover': { background: surface.brandSubtle, color: icon.brand },
    '&::before': {
      content: '',
      position: 'absolute',
      left: -8,
      top: '50%',
      width: 4,
      height: 20,
      borderRadius: radius.full,
      background: border.brand,
      transform: 'translateY(-50%)',
    },
  },
})
export const tooltip = style({
  zIndex: 10,
  background: surface.inverse,
  color: text.onBrand,
  padding: `${inset.sm} ${inset.md}`,
  borderRadius: radius.sm,
  boxShadow: shadowMd,
  fontSize: 12,
  fontWeight: 600,
})
