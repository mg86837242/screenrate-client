import { styled } from '@mui/material/styles';

import darkLogoUrl from '../../assets/screenrate-logo-dark.svg';
import lightLogoUrl from '../../assets/screenrate-logo-light.svg';

const StyledLogo = styled('div')(({ theme }) => ({
  width: '87px',
  height: '40px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundImage:
    theme.palette.mode === 'light'
      ? `url(${lightLogoUrl})`
      : `url(${darkLogoUrl})`,
}));

export default StyledLogo;
