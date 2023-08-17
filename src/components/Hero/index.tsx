import * as React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Movie } from '../../common/movie';
import BoxFetchError from '../ui/BoxFetchError';
import BoxIsPending from '../ui/BoxIsPending';

import { BtnPrimary } from './../ui/BtnPrimary';
import StyledPlayCirCleIcon from './styles';

import './Hero.css';

interface Props {
  movies: Movie[];
  isPending: boolean;
  error: string;
}

export default function Hero({ movies, isPending, error }: Props) {
  const navigate = useNavigate();

  if (isPending || movies === undefined) {
    return <BoxIsPending />;
  }

  if (error) {
    return <BoxFetchError error={error} />;
  }

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
                            alt={`Poster of ${movie.title}`}
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
                        <StyledPlayCirCleIcon
                          onClick={() =>
                            navigate(`/trailer/${movie.trailerLink.slice(32)}`)
                          }
                        />
                      </div>
                      <div className='movie-review-button-container'>
                        <BtnPrimary
                          onClick={() =>
                            navigate(`movies/${movie.imdbId}/reviews`)
                          }
                        >
                          Reviews
                        </BtnPrimary>
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
