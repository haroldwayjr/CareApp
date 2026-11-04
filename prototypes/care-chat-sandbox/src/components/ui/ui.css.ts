import { style, styleVariants } from '@vanilla-extract/css'
import {
  action,
  border,
  icon,
  inset,
  radius,
  shadowLg,
  stack,
  surface,
  surfaceDisabled,
  text,
} from '../../tokens.css'

const buttonBase = style({
  minHeight: 36,
  borderRadius: radius.full,
  padding: `0 ${inset.lg}`,
  border: `1px solid ${border.subtle}`,
  fontWeight: 600,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: stack.sm,
})

export const button = styleVariants({
  primary: [buttonBase, { background: action.primary, color: text.onBrand, borderColor: action.primary }],
  secondary: [buttonBase, { background: surface.default, color: text.secondary }],
  danger: [buttonBase, { background: action.danger, color: text.onDanger, borderColor: action.danger }],
  ghost: [buttonBase, { background: 'transparent', color: text.brand, borderColor: 'transparent' }],
})

export const disabledButton = style({
  selectors: {
    '&:disabled': { background: surfaceDisabled, borderColor: border.disabled, color: text.disabled },
  },
})

export const iconButton = style({
  width: 32,
  height: 32,
  padding: 0,
  border: 0,
  borderRadius: radius.full,
  background: 'transparent',
  color: icon.secondary,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': { background: action.secondaryHover },
})

export const chip = style({
  height: 24,
  padding: `0 ${inset.sm}`,
  display: 'inline-flex',
  alignItems: 'center',
  gap: stack.xs,
  borderRadius: radius.sm,
  border: `1px solid ${border.brand}`,
  background: surface.brandSoft,
  color: text.brand,
  fontSize: 12,
  fontWeight: 600,
})

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  background: surface.overlayDark,
  zIndex: 20,
})

export const modal = style({
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 21,
  width: 'min(520px, calc(100vw - 32px))',
  maxHeight: 'calc(100vh - 48px)',
  overflow: 'auto',
  background: surface.raised,
  borderRadius: radius['2xl'],
  boxShadow: shadowLg,
  padding: inset.xl,
})

export const modalDanger = style({ borderTop: `4px solid ${action.danger}` })
export const modalHeader = style({ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: stack.md })
export const modalTitle = style({ margin: 0, fontSize: 20, lineHeight: 1.3 })
export const modalDescription = style({ color: text.tertiary, lineHeight: 1.5 })
export const modalActions = style({ display: 'flex', justifyContent: 'flex-end', gap: stack.sm, marginTop: stack.lg })

export const searchWrap = style({ position: 'relative' })
export const searchIcon = style({ position: 'absolute', left: inset.md, top: 10, color: icon.tertiary })
export const searchInput = style({
  width: '100%',
  height: 40,
  borderRadius: radius.md,
  border: `1px solid ${border.subtle}`,
  padding: `0 ${inset.md} 0 40px`,
  color: text.primary,
  background: surface.default,
})
