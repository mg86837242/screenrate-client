import './Hero.css';
import * as React from 'react';
import { ColorModeContext } from '../../context/Theme';
import { MoviesProps } from '../../common/types';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, useTheme } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

export default function Hero({ movies }: MoviesProps) {
  const colorMode = React.useContext(ColorModeContext);
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
                    // ref: https://stackoverflow.com/questions/52005083/how-to-define-css-variables-in-style-attribute-in-react-and-typescript
                    {
                      '--img': `url(${movie.backdrops[0]})`,
                    } as React.CSSProperties
                  }
                >
                  <div className='movie-detail'>
                    <div className='movie-poster'>
                      <img src={movie.poster} alt={movie.title} />
                    </div>
                    <div className='movie-title'>
                      <h2>{movie.title}</h2>
                      <p
                        onClick={colorMode.toggleColorMode}
                      >{`click me to change mode, currnet mode: "${theme.palette.mode}"`}</p>
                    </div>
                    <div className='movie-buttons-container'>
                      <div className='play-button-icon-container'>
                        <Link
                          to={`/trailer/${movie.trailerLink.substring(
                            movie.trailerLink.length - 11,
                          )}`}
                        >
                          <FontAwesomeIcon
                            className='play-button-icon'
                            color='primary'
                            icon={faCirclePlay}
                          />
                        </Link>
                      </div>
                      <div className='movie-review-button-container'>
                        <Button
                          variant='contained'
                          color='info'
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
