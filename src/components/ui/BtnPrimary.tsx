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
  type = 'submit',
  onClick,
  disabled = false,
  width,
  height,
}: Props) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
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
