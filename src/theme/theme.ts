'use client';
import { createTheme } from '@mui/material/styles';
import { typography } from '@/theme/typography';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A1047',
      light: '#141E7A',
      100: '#98A2B3',
    },
    secondary: {
      main: '#D6302A',
      light: '#FE645E',
      200: '#CECECE',
    },
    error: {
      main: '#FE645E',
    },
    background: {
      paper: '#E5E5E7',
    },
    common: {
      black: '#000',
      white: '#fff',
    },
    grey: {
      50: '#E5E5E7',
      100: '#5C5C5C',
      200: '#494949',
      300: '#6E7278',
      400: '#F3F3F3',
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
