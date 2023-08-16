import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { darken, styled } from '@mui/material/styles';

const StyledPlayCirCleIcon = styled(PlayCircleIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '3.75rem',
  filter: 'drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.8))',

  '&:hover': {
    color: darken(theme.palette.primary.main, 0.2),
  },
}));

export default StyledPlayCirCleIcon;
