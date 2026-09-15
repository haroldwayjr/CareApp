import { createTheme } from '@mui/material/styles'

const figtree = [
  'Figtree',
  'system-ui',
  '"Segoe UI"',
  'Roboto',
  'sans-serif',
].join(',')

declare module '@mui/material/styles' {
  interface Palette {
    icon: {
      primary: string
      secondary: string
      tertiary: string
    }
  }
  interface PaletteOptions {
    icon?: {
      primary?: string
      secondary?: string
      tertiary?: string
    }
  }
  interface PaletteColor {
    soft?: string
  }
  interface SimplePaletteColorOptions {
    soft?: string
  }
}

/** Soma light-mode tokens — primary = blue/800 (#002380). */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#002380',
      dark: '#001A5C',
      light: '#2B78F5',
      contrastText: '#ffffff',
    },
    secondary: {
      // Care App MUI secondary (purple) — Preferred / accent badges.
      main: '#8e24aa',
      light: '#ab47bc',
      dark: '#6a1b9a',
      soft: '#f3e5f5', // purple/50 — Soft badge fill
      contrastText: '#ffffff',
    },
    success: {
      main: '#16B04A',
      light: '#E8F8EC',
    },
    error: {
      main: '#F24646',
      light: '#FEECEC',
    },
    warning: {
      // Care App MUI warning — Standard badges (soft fill + ink).
      main: '#ed6c02',
      light: '#fff4e5',
      dark: '#9a3412',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.6)',
    },
    /** Soma icon ink tokens — primary / secondary / tertiary de-emphasis. */
    icon: {
      primary: '#0F1828',
      secondary: '#667085',
      tertiary: '#98A2B3',
    },
    divider: '#E5E7EB',
  },
  typography: {
    fontFamily: figtree,
    fontSize: 14,
    htmlFontSize: 16,
    allVariants: {
      letterSpacing: 0,
    },
    body1: { fontSize: 14, lineHeight: '20px', letterSpacing: 0 },
    body2: { fontSize: '0.875rem', letterSpacing: 0 },
    caption: { fontSize: '0.75rem', letterSpacing: 0 },
    h5: { fontWeight: 400, fontSize: '1.75rem', letterSpacing: 0 },
    h6: { fontWeight: 600, fontSize: '1.125rem', letterSpacing: 0 },
    subtitle1: { fontWeight: 600, fontSize: '0.875rem', letterSpacing: 0 },
    subtitle2: { fontWeight: 600, fontSize: '0.875rem', letterSpacing: 0 },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '0.875rem',
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontSize: 14,
          letterSpacing: 0,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          fontSize: 14,
          letterSpacing: 0,
          variants: [
            {
              props: { variant: 'contained', color: 'primary' },
              style: {
                backgroundColor: '#002380',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#001A5C',
                },
              },
            },
            {
              props: { variant: 'outlined', color: 'primary' },
              style: {
                color: '#002380',
                borderColor: '#002380',
                '&:hover': {
                  borderColor: '#001A5C',
                  backgroundColor: 'rgba(16, 29, 56, 0.05)',
                },
                '& .MuiButton-startIcon, & .MuiButton-endIcon': {
                  color: '#002380',
                },
              },
            },
            {
              props: { variant: 'text', color: 'primary' },
              style: {
                color: '#002380',
                '&:hover': {
                  backgroundColor: 'rgba(16, 29, 56, 0.05)',
                },
                '&:active': {
                  backgroundColor: 'rgba(16, 29, 56, 0.08)',
                },
                '& .MuiButton-startIcon, & .MuiButton-endIcon': {
                  color: '#002380',
                },
              },
            },
          ],
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
        input: {
          fontSize: 14,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
        input: {
          fontSize: 14,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          letterSpacing: 0,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          letterSpacing: 0,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontSize: 14,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 14,
          letterSpacing: 0,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: 14,
          letterSpacing: 0,
        },
      },
    },
  },
})

export default theme
