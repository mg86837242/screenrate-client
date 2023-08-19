import * as React from 'react';
import Button from '@mui/material/Button';

interface Props {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  width?: string;
  height?: string;
}

export function BtnPrimary({
  children,
  type,
  onClick,
  disabled,
  width,
  height,
}: Props) {
  return (
    <Button
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled || false}
      variant='contained'
      color='primary'
      sx={{
        width,
        height,
        color: 'text.primary',
        borderRadius: 1,
      }}
    >
      {children}
    </Button>
  );
}
