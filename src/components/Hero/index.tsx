import Carousel from 'react-material-ui-carousel';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { Movie } from '../../common';

import { BtnPrimary } from './..';
import StyledPlayCirCleIcon from './styles';

interface Props {
  movies: Movie[];
}

export function Hero({ movies }: Props) {
  const navigate = useNavigate();

  return (
    <Box bgcolor={'#000'}>
      <Carousel sx={{ pb: 2 }} navButtonsAlwaysVisible>
        {movies?.map(movie => {
          return (
            <Box
              display={'flex'}
              alignItems={'center'}
              width={'100%'}
              height={{ xs: '100vh', md: '80vh' }}
              sx={{
                backgroundImage: `linear-gradient(
                  to bottom,
                  rgba(0, 0, 0, 0),
                  rgba(0, 0, 0, 1)
                ), url(${movie.backdrops[0]})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
              key={movie.imdbId}
            >
              <Grid
                container
                flexDirection={{ xs: 'column', md: 'row' }}
                justifyContent={{ xs: 'space-evenly', md: 'space-between' }}
                alignItems={'center'}
                height={'100%'}
                width={'100%'}
              >
                <Grid
                  xs={12}
                  md={4}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  overflow={'visible'}
                >
                  <Card
                    sx={{
                      borderRadius: { xs: '0.5rem', xl: '1rem' },
                    }}
                  >
                    <CardActionArea
                      onClick={() => navigate(`movies/${movie.imdbId}`)}
                    >
                      <CardMedia
                        component='img'
                        image={movie.poster}
                        alt={`Poster of ${movie.title}`}
                        width={'auto'}
                        sx={{
                          /* `box-shadow` overflow over parent elements: https://stackoverflow.com/questions/9288029/let-box-shadow-overflow-over-parent-elements */
                          height: { xs: '30rem', md: '30rem', xl: '40rem' },
                          boxShadow:
                            '0px 0px 24px 8px var(--primary-transparent);',
                          '-webkit-box-shadow':
                            '0px 0px 24px 8px var(--primary-transparent)',
                          '-moz-box-shadow':
                            '0px 0px 24px 8px var(--primary-transparent)',
                        }}
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
                <Grid
                  xs={12}
                  md={4}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  height={'6rem'}
                  p={'0.75rem'}
                  color={'#fff'}
                >
                  <Typography
                    variant='h3'
                    align='center'
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {movie.title}
                  </Typography>
                  <Typography align='center'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Iusto, ab. Quasi impedit tenetur deserunt a sunt odit
                    tempore officiis ipsam.
                  </Typography>
                </Grid>
                <Grid
                  xs={12}
                  md={4}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  gap={'4rem'}
                  height={'6rem'}
                  p={'0.75rem'}
                  mt={{ md: '2.25rem' }}
                >
                  <RouterLink
                    to={`movies/${
                      movie.imdbId
                    }/trailer/${movie.trailerLink.slice(32)}`}
                  >
                    <StyledPlayCirCleIcon />
                  </RouterLink>
                  <BtnPrimary
                    type='button'
                    onClick={() => navigate(`movies/${movie.imdbId}/reviews`)}
                  >
                    Reviews
                  </BtnPrimary>
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Carousel>
    </Box>
  );
}
