import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { BtnPrimary } from './BtnPrimary';

export function ErrorPage({ error }: { error: string }) {
  const navigate = useNavigate();

  return (
    <Box
      flex='1 0 100%'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap='2rem'
      role='alert'
      aria-live='assertive'
      aria-label='Error message'
    >
      <Typography>{error}</Typography>
      <BtnPrimary onClick={() => navigate(``)}>Go Home</BtnPrimary>
    </Box>
  );
}
