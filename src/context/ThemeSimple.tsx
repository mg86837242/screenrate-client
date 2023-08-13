import * as React from 'react';
import { ThemeOptions, createTheme, ThemeProvider } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#4cc9f0',
    },
    secondary: {
      main: '#4361EE',
    },
    info: {
      main: '#7209B7',
    },
  },
  typography: {
    fontFamily: ['Quicksand', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    button: {
      fontWeight: 600,
    },
  },
};

const theme = createTheme(themeOptions);

export default function ThemeSimpleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

// This project's palette: https://coolors.co/palette/f72585-b5179e-7209b7-560bad-480ca8-3a0ca3-3f37c9-4361ee-4895ef-4cc9f0

// Palette config:
// -- https://mui.com/material-ui/customization/theming/
// -- https://zenoo.github.io/mui-theme-creator/

// Typography config: https://mui.com/material-ui/customization/typography/

// `ThemeOptions` data structure: https://mui.com/material-ui/customization/default-theme/
