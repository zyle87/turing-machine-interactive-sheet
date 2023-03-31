import { createTheme } from '@mui/material/styles'

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#35b663',
    },
    secondary: {
      main: '#ff1744',
    },
  },
  typography: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 16,
    button: {
      fontWeight: 700,
    },
    body1: {
      color: '#35b663',
      fontWeight: 700,
      fontFamily: 'Kalam',
    },
  },
  shape: {
    borderRadius: 16,
  },
})
