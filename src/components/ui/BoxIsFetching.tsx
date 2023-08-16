import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function BoxIsFetching() {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='85vh'
    >
      <CircularProgress size='4rem' />
    </Box>
  );
}
