import * as React from 'react';
import Button from '@mui/material/Button';

interface Props {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
}

export function BtnPrimary({ children, type, onClick, disabled }: Props) {
  return (
    <Button
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled || false}
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

export function BtnPrimaryWFull({ children, type, onClick, disabled }: Props) {
  return (
    <Button
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled || false}
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
