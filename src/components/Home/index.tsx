import useLayoutOutletContext from '../../hooks/useLayoutOutletContext';
import Hero from '../Hero';

export default function Home() {
  const [movies] = useLayoutOutletContext();

  return <Hero movies={movies} />;
}