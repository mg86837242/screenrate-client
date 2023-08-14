import * as React from 'react';
import {
  ThemeOptions,
  alpha,
  getContrastRatio,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

declare module '@mui/material/styles' {
  interface Palette {
    appBar: Palette['primary'];
  }

  interface PaletteOptions {
    appBar?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    appBar: true;
  }
}

const appBarColorBase = '#121212';
const appBarColorMain = alpha(appBarColorBase, 0.7);

function getDesignTokens(mode: PaletteMode): ThemeOptions {
  return {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#4CC9F0',
            },
            secondary: {
              main: '#4895EF',
            },
          }
        : {
            primary: {
              main: '#4361EE',
            },
            secondary: {
              main: '#3F37C9',
            },
          }),
      appBar: {
        main: appBarColorMain,
        light: alpha(appBarColorBase, 0.5),
        dark: alpha(appBarColorBase, 0.9),
        contrastText:
          getContrastRatio(appBarColorMain, '#fff') > 4.5 ? '#fff' : '#111',
      },
    },
    typography: {
      fontFamily: ['Quicksand', 'Helvetica', 'Arial', 'sans-serif'].join(','),
      h1: {
        fontFamily: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'].join(','),
      },
      h2: {
        fontFamily: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'].join(','),
      },
      h3: {
        fontFamily: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'].join(','),
      },
      button: {
        fontWeight: 600,
      },
    },
  };
}

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const preferredMode = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';
  const storedMode = localStorage.getItem(
    `${import.meta.env.VITE_APP_NAME}-color-mode`,
  );
  const defaultMode =
    storedMode === 'dark' || storedMode === 'light'
      ? storedMode
      : preferredMode;

  const [mode, setMode] = React.useState<'light' | 'dark'>(defaultMode);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => {
          const m = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem(
            `${import.meta.env.VITE_APP_NAME}-color-mode`,
            m,
          );
          return m;
        });
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () => responsiveFontSizes(createTheme(getDesignTokens(mode))),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// This project's palette: https://coolors.co/palette/f72585-b5179e-7209b7-560bad-480ca8-3a0ca3-3f37c9-4361ee-4895ef-4cc9f0

// `ThemeOptions` data structure: https://mui.com/material-ui/customization/default-theme/

// Palette config:
// -- https://mui.com/material-ui/customization/theming/
// -- https://zenoo.github.io/mui-theme-creator/

// Typography config & `responsiveFontSizes`: https://mui.com/material-ui/customization/typography/

// Debate between `sx` prop and `styled()` => avoid using `styled-components`, reasons:
// -- https://mui.com/system/getting-started/installation/#with-styled-components
// -- https://mui.com/material-ui/guides/styled-engine/

// Toggle color mode: https://mui.com/material-ui/customization/dark-mode/#toggling-color-mode => check the CodeSandbox/StackBlitz
// Helper function for dual theme options: https://mui.com/material-ui/customization/dark-mode/#dark-mode-with-a-custom-palette => check the CodeSandbox/StackBlitz
