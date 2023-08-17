import { styled } from '@mui/material/styles';

import darkLogoUrl from '../../assets/screen-rate-logo-dark.svg';
import lightLogoUrl from '../../assets/screen-rate-logo-light.svg';

const StyledLogo = styled('div')(({ theme }) => ({
  width: '87px',
  height: '40px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? `url(${darkLogoUrl})`
      : `url(${lightLogoUrl})`,
}));

export default StyledLogo;
