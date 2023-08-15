import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.default,
  ...theme.typography.body2,
  textAlign: 'center',
}));

export default function CenteredElementGrid() {
  return (
    <Box sx={{ flexGrow: 1, padding: '3rem' }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(2)).map((_, index) => (
          <Grid xs={2} sm={4} md={6} key={index}>
            <Item>xs=2</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
