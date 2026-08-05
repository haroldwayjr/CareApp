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
    }
  }
  interface PaletteOptions {
    icon?: {
      primary?: string
      secondary?: string
    }
  }
}

/** Primary maps to Figma `primary/ih-dark` (#0009a6). */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0009a6',
      dark: '#00077a',
      light: '#333bba',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#5c6bc0',
    },
    success: {
      main: '#2e7d32',
      light: '#e8f5e9',
    },
    error: {
      main: '#c62828',
      light: '#ffebee',
    },
    warning: {
      main: '#ed6c02',
      light: '#fff4e5',
      dark: '#e65100',
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
    /** Figma icon tokens — secondary ≈ icon/default/secondary. */
    icon: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: '#949494',
    },
    divider: '#e0e5ed',
  },
  typography: {
    fontFamily: figtree,
    fontSize: 14,
    htmlFontSize: 16,
    allVariants: {
      letterSpacing: 0,
    },
    body1: { fontSize: '0.875rem', letterSpacing: 0 },
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
          borderRadius: 4,
          fontSize: 14,
          letterSpacing: 0,
        },
      },
    },
  },
})

export default theme
