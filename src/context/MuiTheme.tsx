import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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

function getDesignTokens(mode: PaletteMode): ThemeOptions {
  return {
    palette: {
      // https://coolors.co/palette/31393c-2176ff-33a1fd-fdca40-f79824
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#9ad1fe',
            },
            secondary: {
              main: '#2176FF',
            },
            appBar: {
              main: '#9ad1fe',
              light: 'rgb(174, 218, 254)',
              dark: 'rgb(107, 146, 177)',
              contrastText: 'rgba(0, 0, 0, 0.87)',
            },
          }
        : {
            primary: {
              main: '#31393C',
            },
            secondary: {
              main: '#2176FF',
            },
            appBar: {
              main: '#090B0B',
              light: 'rgb(58, 59, 59)',
              dark: 'rgb(6, 7, 7)',
              contrastText: 'rgba(255, 255, 255)',
            },
          }),
    },
    spacing: 8, // 8px
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
        fontSize: '1rem',
        textTransform: 'capitalize',
      },
    },
  };
}

export function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  const storedMode = window.localStorage.getItem(
    `${import.meta.env.VITE_APP_NAME}-color-mode`,
  );
  const preferredMode = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';
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
      <CssBaseline enableColorScheme />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

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

// <CssBaseline />: https://mui.com/material-ui/react-css-baseline/
