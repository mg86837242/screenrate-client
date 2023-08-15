import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import './Trailer.css';
import Box from '@mui/material/Box';

const Trailer = () => {
  const { ytTrailerId } = useParams();

  return (
    <Box sx={{ height: '90vh' }}>
      {ytTrailerId != null ? (
        <ReactPlayer
          controls={true}
          playing={true}
          url={`https://www.youtube.com/watch?v=${ytTrailerId}`}
          width='100%'
          height='100%'
        />
      ) : null}
    </Box>
  );
};

export default Trailer;
