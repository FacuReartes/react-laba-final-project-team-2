'use client';
import { createTheme } from '@mui/material/styles';
import { typography } from '@/theme/typography';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A1047',
      light: '#141E7A',
    },
    secondary: {
      main: '#6E314A',
      light: '#FE645E',
    },
    error: {
      main: '#FE645E',
    },
  },
  typography: { ...typography },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          subtitle3: 'h6',
        },
      },
    },
  },
});

export default theme;
