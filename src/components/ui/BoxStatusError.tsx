import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { BtnPrimary } from '.';

export function BoxStatusError({ error }: { error: string }) {
  const navigate = useNavigate();

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap='2rem'
      height='85vh'
    >
      <Typography>{error}</Typography>
      <BtnPrimary onClick={() => navigate(``)}>Go Home</BtnPrimary>
    </Box>
  );
}
