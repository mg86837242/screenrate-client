import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export function PendingPage() {
  return (
    <Box
      flex='1 0 100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      role='alert'
      aria-live='polite'
      aria-busy={true}
      aria-label='Loading'
    >
      <CircularProgress size='4rem' />
    </Box>
  );
}
