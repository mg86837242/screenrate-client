// NB Importing `styled()` util from `@mui/system` will cause linter error, the reason of which is b/c `styled()` imported from `@mui/system` has no access to the theme defined in the context
import { styled } from '@mui/material/styles';

const StyledMain = styled('main')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  flex: '1 0 calc(100vh - 3.5rem)',
  marginTop: '3.5rem',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default, // this line is needed since `enableColorScheme` prop is not working properly on <CssBaseline />, couldn't even find `MuiCssBaseline` in the dev tools

  [theme.breakpoints.up('sm')]: {
    flex: '1 0 calc(100vh - 4rem)',
    marginTop: '4rem',
  },
}));

export default StyledMain;
