export const surface = {
  default: '#ffffff',
  subtle: '#f3f5f8',
  muted: '#eaecf0',
  raised: '#ffffff',
  selected: '#f2f5ff',
  brandSoft: '#f2f5ff',
  brandSubtle: '#e0eaff',
  successSoft: '#effdf0',
  dangerSoft: '#fff5f4',
  warningSoft: '#fdf9e1',
  overlayDark: '#101d38c2',
  inverse: '#101828',
} as const

export const text = {
  primary: '#101828',
  secondary: '#344054',
  tertiary: '#475467',
  disabled: '#98a2b3',
  brand: '#002380',
  onBrand: '#ffffff',
  onDanger: '#ffffff',
  success: '#045623',
  dangerSubtle: '#d13238',
  danger: '#d13238',
} as const

export const border = {
  subtle: '#d0d5dd',
  strong: '#667085',
  hairline: '#eaecf0',
  brand: '#002380',
  disabled: '#eaecf0',
  dangerSubtle: '#ffcbca',
  successSubtle: '#b7efbc',
  neutralSubtle: '#d0d5dd',
} as const

export const action = {
  primary: '#002380',
  primaryDisabled: '#00238033',
  danger: '#d13238',
  secondaryHover: '#eaecf0',
} as const

export const icon = {
  default: '#101828',
  secondary: '#344054',
  tertiary: '#667085',
  brand: '#002380',
  onBrand: '#ffffff',
} as const

export const radius = {
  xxs: '2px',
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '10px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '20px',
  '4xl': '24px',
  full: '9999px',
} as const

export const inset = { xs: '4px', sm: '8px', md: '12px', lg: '16px', xl: '24px' } as const
export const inline = { xs: '4px', sm: '8px' } as const
export const stack = { xs: '4px', sm: '8px', md: '16px', lg: '24px' } as const
export const section = { sm: '32px' } as const

/**
 * PROPOSED icon.md (24px) — shown on Icons page size scale; NOT yet ratified in Soma.
 * Do not treat as settled foundation.
 */
export const iconMd = '24px'

/**
 * FLAG TOKEN_GAP: `surface/disabled` hex was not in pulled Figma vars for this pass.
 * Aliased to `surface/muted` pending Colors verification.
 */
export const surfaceDisabled = surface.muted
/**
 * FLAG TOKEN_GAP: `icon/disabled` not returned; aliased from `text/disabled`.
 */
export const iconDisabled = text.disabled
/**
 * FLAG TOKEN_GAP: exact `focus/ring` hex not returned by get_variable_defs.
 * Using brand default (`action/primary`) — open-items: only default + danger rings exist;
 * do not invent success/warning/info variants.
 */
export const focusRing = action.primary

export const shadowMd = '0 4px 10px #101d380d'
export const shadowLg = '0 12px 24px #101d380d'
