import { TypographyVariantsOptions } from '@mui/material/styles';
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({ subsets: ['latin'] });

export const typography: TypographyVariantsOptions = {
  fontFamily: workSans.style.fontFamily,
  button: {
    textTransform: 'none',
  },
  subtitle1: {
    fontSize: '15px',
    color: '#5C5C5C',
    fontWeight: '300',
  },
  subtitle2: {
    fontSize: '12px',
    color: '#5C5C5C',
  },
  subtitle3: {
    fontSize: '15px',
    fontWeight: 'normal',
    color: '#5C5C5C',
  },
  h1: {
    fontSize: '45px',
    fontWeight: 'normal',
  },
  h2: {
    fontSize: '30px',
    fontWeight: 'normal',
  },
  h3: {
    fontSize: '25px',
    color: '#000',
    lineHeight: '34px',
  },
  h4: {
    fontSize: '15px',
    color: '#494949',
  },
  h5: {
    fontSize: '48px',
    color: '#000',
    fontWeight: '300',
    lineHeight: '56px',
    fontStyle: 'italic',
  },
  h6: {
    fontSize: '24px',
    color: '#5C5C5C',
    fontWeight: '300',
    lineHeight: '40px',
  },
};
