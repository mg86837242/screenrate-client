import ReactPlayer from 'react-player';
import Box from '@mui/material/Box';

import { useTypedParams } from '../../hooks';

export function Trailer() {
  const { ytTrailerId } = useTypedParams('ytTrailerId');

  return (
    <Box sx={{ height: '90vh' }}>
      {ytTrailerId !== null ? (
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
}
