// NB Emotion's css() method (currently not used in this project) & solution to related linter issues: https://mui.com/material-ui/guides/interoperability/#emotion
/** @jsxImportSource @emotion/react */
import './Hero.css';
import * as React from 'react';
import { MoviesProps } from '../../common/types';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Carousel from 'react-material-ui-carousel';
import StyledPlayCirCleIcon from './styles';

export default function Hero({ movies }: MoviesProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  function handleClickReviews(imdbId: string) {
    navigate(`/movies/${imdbId}/reviews`);
  }

  return (
    <div className='movie-carousel-container'>
      <Carousel navButtonsAlwaysVisible={true}>
        {movies?.map(movie => {
          return (
            <Paper key={movie.imdbId}>
              <div className='movie-card-container'>
                <div
                  className='movie-card'
                  style={
                    // type: https://stackoverflow.com/questions/52005083/how-to-define-css-variables-in-style-attribute-in-react-and-typescript
                    {
                      '--img': `url(${movie.backdrops[0]})`,
                    } as React.CSSProperties
                  }
                >
                  <div className='movie-detail'>
                    <div className='movie-poster-container'>
                      <Card>
                        <CardActionArea>
                          <CardMedia
                            component='img'
                            alt={movie.title}
                            image={movie.poster}
                          />
                        </CardActionArea>
                      </Card>
                    </div>
                    <div className='movie-description-container'>
                      <Typography
                        variant='h3'
                        align='center'
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}
                      >
                        {movie.title}
                      </Typography>
                      <Typography paragraph={true} align='center'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Iusto, ab. Quasi impedit tenetur deserunt a sunt
                        odit tempore officiis ipsam.
                      </Typography>
                    </div>
                    <div className='movie-buttons-container'>
                      <div className='play-button-icon-container'>
                        <Link
                          to={`/trailer/${movie.trailerLink.substring(
                            movie.trailerLink.length - 11,
                          )}`}
                        >
                          <ThemeProvider theme={theme}>
                            <StyledPlayCirCleIcon />
                          </ThemeProvider>
                        </Link>
                      </div>
                      <div className='movie-review-button-container'>
                        <Button
                          variant='contained'
                          sx={{
                            bgcolor: 'primary.main',
                            color: 'text.primary',
                            borderRadius: 1,
                          }}
                          onClick={() => handleClickReviews(movie.imdbId)}
                        >
                          Reviews
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
}
