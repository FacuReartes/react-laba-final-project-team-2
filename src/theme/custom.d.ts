/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TypographyVariants, // eslint-disable-line @typescript-eslint/no-unused-vars
  TypographyVariantsOptions, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    subtitle3: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    subtitle3?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    subtitle3: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      lightGreen: string;
      darkPurple: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      lightBlue?: string;
      lightGreen?: string;
      blue?: string;
      green?: string;
    };
  }
}
