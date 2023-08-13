import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode, ThemeOptions } from '@mui/material';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

declare module '@mui/material/styles' {
  interface Theme {
    // add custom theme options as needed
  }
  interface ThemeOptions {
    // add custom theme options as needed
  }
}

function getDesignTokens(mode: PaletteMode): ThemeOptions {
  return {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#4361EE',
            },
            secondary: {
              main: '#3F37C9',
            },
            background: {
              paper: '#fff',
              default: '#fff',
            },
          }
        : {
            primary: {
              main: '#4CC9F0',
            },
            secondary: {
              main: '#4895EF',
            },
            background: {
              paper: '#121212',
              default: '#121212',
            },
          }),
    },
    typography: {
      fontFamily: ['Quicksand', 'Helvetica', 'Arial', 'sans-serif'].join(','),
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

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// This project's palette: https://coolors.co/palette/f72585-b5179e-7209b7-560bad-480ca8-3a0ca3-3f37c9-4361ee-4895ef-4cc9f0

// Palette config:
// -- https://mui.com/material-ui/customization/theming/
// -- https://zenoo.github.io/mui-theme-creator/

// Typography config: https://mui.com/material-ui/customization/typography/

// `ThemeOptions` data structure: https://mui.com/material-ui/customization/default-theme/

// Debate between `sx` prop and `styled()` util (styled-components API)
// -- Material UI:
// ---- https://mui.com/material-ui/customization/how-to-customize/
// -- Material System: it seems that the Material UI team is in favor of `sx` prop => so use `sx` in this project
// ---- https://mui.com/system/getting-started/usage/#when-to-use-mui-system
// ---- https://mui.com/system/getting-started/custom-components/
// ---- https://mui.com/system/getting-started/the-sx-prop/: `sx` prop
// ---- https://mui.com/system/styled/#difference-with-the-sx-prop: `styled()` util

// Toggle color mode: https://mui.com/material-ui/customization/dark-mode/#toggling-color-mode => check the CodeSandbox/StackBlitz
// Helper function for dual theme options: https://mui.com/material-ui/customization/dark-mode/#dark-mode-with-a-custom-palette => check the CodeSandbox/StackBlitz
