// NB Emotion's `css()` method (currently not used in this project) & solution to related linter issues: https://mui.com/material-ui/guides/interoperability/#emotion
/** @jsxImportSource @emotion/react */
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import * as React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Link, useNavigate } from 'react-router-dom';
import { MoviesProps } from '../../common/types';
import './Hero.css';
import StyledPlayCirCleIcon from './styles';

export default function Hero({ movies }: MoviesProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <div className='movie-carousel-container'>
      <Carousel navButtonsAlwaysVisible>
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
                      <Typography align='center'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Iusto, ab. Quasi impedit tenetur deserunt a sunt
                        odit tempore officiis ipsam.
                      </Typography>
                    </div>
                    <div className='movie-buttons-container'>
                      <div className='play-button-icon-container'>
                        <Link to={`/trailer/${movie.trailerLink.slice(32)}`}>
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
                          onClick={() =>
                            navigate(`movies/${movie.imdbId}/reviews`)
                          }
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
