import { createTheme } from '@mui/material/styles'

const figtree = [
  'Figtree',
  'system-ui',
  '"Segoe UI"',
  'Roboto',
  'sans-serif',
].join(',')

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  typography: {
    fontFamily: figtree,
  },
})

export default theme
