import { isAxiosError } from 'axios';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutOutletContextType, Movie } from '../../common/types';
import axios from '../../lib/axiosConfig';
import Navbar from '../Navbar';
import StyledMain from './styles';

export default function Layout() {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    let ignore = true;

    // axios snippet: https://rb.gy/5pmyk (source: google "axios react typescript example") => NB there's an error in the article - in catch block, use `e.status` instead
    axios
      .get<Movie[]>(`movies`)
      .then(response => {
        if (!ignore) {
          setMovies(response.data);
          setLoading(false);
        }
      })
      .catch(e => {
        // `isAxiosError()` snippet: https://bobbyhadz.com/blog/typescript-http-request-axios
        if (isAxiosError(e)) {
          const message =
            e.status === 404
              ? 'Resource Not found'
              : 'An unexpected error has occurred';
          setError(message);
          setLoading(false);
        } else {
          setError('An unexpected error has occurred');
          setLoading(false);
        }
      });

    return () => {
      ignore = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <StyledMain>
        <Outlet
          context={[movies, loading, error] satisfies LayoutOutletContextType}
        />
      </StyledMain>
    </>
  );
}
