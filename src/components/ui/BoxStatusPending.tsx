import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export function BoxStatusPending() {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='85vh'
      role='alert'
      aria-live='polite'
      aria-busy={true}
      aria-label='Loading'
    >
      <CircularProgress size='4rem' />
    </Box>
  );
}
