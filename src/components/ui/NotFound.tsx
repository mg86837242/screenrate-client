import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { ReactComponent as Illustration } from '../../assets/404-page-not-found.svg';

import { BtnPrimary } from './BtnPrimary';

const StyledIllustration = styled(Illustration)(({ theme }) => ({
  width: '20rem',
  role: 'img',
  ariaLabel: '404',

  [theme.breakpoints.up('sm')]: {
    width: '35rem',
  },
}));

export function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap='2rem'
      height='85vh'
      role='alert'
      aria-live='assertive'
      aria-label='Page not found error message'
    >
      <StyledIllustration />
      <Typography variant='h3'>Page Not Found</Typography>
      <BtnPrimary onClick={() => navigate(``)}>Go Home</BtnPrimary>
    </Box>
  );
}
