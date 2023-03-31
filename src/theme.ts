import { createTheme } from '@mui/material/styles'

export const customTheme = createTheme({
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
