import * as React from 'react';
import Button from '@mui/material/Button';

interface Props {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export function BtnPrimary({ children, type, onClick }: Props) {
  return (
    <Button
      type={type || 'button'}
      onClick={onClick}
      variant='contained'
      color='primary'
      sx={{
        color: 'text.primary',
        borderRadius: 1,
      }}
    >
      {children}
    </Button>
  );
}

export function BtnPrimaryWFull({ children, type, onClick }: Props) {
  return (
    <Button
      type={type || 'button'}
      onClick={onClick}
      variant='contained'
      color='primary'
      fullWidth
      sx={{
        color: 'text.primary',
        borderRadius: 1,
      }}
    >
      {children}
    </Button>
  );
}
