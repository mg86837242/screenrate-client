import { styled, darken } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const StyledPlayCirCleIcon = styled(PlayCircleIcon)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};
  font-size: 60px;

  :hover {
    color: ${darken(theme.palette.primary.main, 0.2)};
  };

  filter: drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.8));
`,
);

export default StyledPlayCirCleIcon;
