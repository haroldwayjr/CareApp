/**
 * Soma light semantic tokens for the Unified Messaging spike.
 *
 * Color values are the light-mode resolution of the vendored Nova snapshot
 * (`soma-ui-library/vendor/nova-ui/src/tokens/colors.ts`). Primitive ramps stay
 * in that file; this module publishes semantic roles only.
 * `action.ghost` is the documented Soma alias (`coolDarkTransparent` 10 / 20)
 * used by outlined and text buttons.
 */

const typeStyle = (size: number, line: number, weight: number) =>
  ({
    fontFamily: 'Figtree, sans-serif',
    fontSize: size,
    lineHeight: `${line}px`,
    fontWeight: weight,
    letterSpacing: 0,
  }) as const

export const soma = {
  action: {
      danger: '#cb0c31',
      dangerHover: '#7f0009',
      ghostHover: '#101d381a',
      ghostPressed: '#101d3833',
      primary: '#002383',
      primaryHover: '#000b48',
      primaryPressed: '#000000',
      success: '#008200',
    },
    border: {
      accentSubtle: '#d6c2ff',
      brandSubtle: '#d0e0ff',
      dangerSubtle: '#fdd6d4',
      hairline: '#eaecf0',
      neutralSubtle: '#d0d5dd',
      strong: '#667085',
      subtle: '#d0d5dd',
      successSubtle: '#d0e9d0',
      warningSubtle: '#f5dcc3',
    },
    focus: {
      ring: '#002383',
      ringDanger: '#cb0c31',
    },
    icon: {
      accent: '#6b22d6',
      brand: '#002383',
      danger: '#cb0c31',
      default: '#101828',
      disabled: '#98a2b3',
      onBrand: '#ffffff',
      success: '#008200',
      tertiary: '#667085',
      warning: '#a55600',
    },
    surface: {
      accentSoft: '#f4f0ff',
      brandSoft: '#f0f4ff',
      brandSubtle: '#e0eaff',
      dangerSoft: '#fef9f8',
      default: '#ffffff',
      inverse: '#101828',
      muted: '#eaecf0',
      selected: '#f0f4ff',
      subtle: '#f2f4f7',
      successSoft: '#f8fbf8',
      warningSoft: '#fffbf5',
    },
    text: {
      accentSubtle: '#6b22d6',
      brand: '#002383',
      danger: '#cb0c31',
      dangerSubtle: '#cb0c31',
      disabled: '#98a2b3',
      inverse: '#ffffff',
      onBrand: '#ffffff',
      primary: '#101828',
      secondary: '#344054',
      successSubtle: '#004f00',
      tertiary: '#475467',
      warningSubtle: '#662600',
  },
  radius: {
    xxs: 2,
    xs: 4,
    sm: 6,
    md: 8,
    lg: 10,
    xl: 12,
    '2xl': 16,
    '3xl': 20,
    full: 9999,
  },
  space: {
    0: 0,
    2: 2,
    4: 4,
    8: 8,
    12: 12,
    16: 16,
    24: 24,
    32: 32,
  },
  inset: { xs: 4, sm: 8, md: 12 },
  stack: { xs: 4, sm: 8, md: 16 },
  inline: { xs: 4, sm: 8, md: 12 },
  shadow: {
    sm: '0 1px 3px rgb(16 24 40 / 10%), 0 1px 2px rgb(16 24 40 / 6%)',
    lg: '0 12px 16px rgb(16 24 40 / 8%), 0 4px 6px rgb(16 24 40 / 3%)',
  },
  motion: {
    durationFast: '100ms',
    durationNormal: '150ms',
    durationModerate: '200ms',
    easingStandard: 'cubic-bezier(0.2, 0, 0, 1)',
    easingEmphasized: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easingExit: 'cubic-bezier(0.4, 0, 1, 1)',
  },
  type: {
    h2: typeStyle(20, 28, 600),
    h3: typeStyle(18, 24, 600),
    h4: typeStyle(16, 24, 600),
    h5: typeStyle(14, 20, 600),
    subtitle2: typeStyle(14, 20, 500),
    subtitle3: typeStyle(12, 16, 500),
    body1: typeStyle(14, 20, 400),
    body2: typeStyle(12, 18, 400),
    caption: typeStyle(12, 16, 400),
    badgeSmall: typeStyle(11, 16, 500),
    displaySmall: typeStyle(28, 36, 600),
  },
} as const

export type SomaTokens = typeof soma
