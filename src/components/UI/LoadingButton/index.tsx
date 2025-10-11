/**
 * Lightweight LoadingButton Component
 * Replaces Material-UI Lab LoadingButton
 * Savings: ~25 KB
 */

import React from 'react';
import Button from '../Button';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'error';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  loadingPosition?: 'start' | 'end' | 'center';
}

export default function LoadingButton({
  loading = false,
  endIcon,
  startIcon,
  loadingPosition = 'center',
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      {...props}
      loading={loading}
      endIcon={!loading || loadingPosition !== 'end' ? endIcon : undefined}
      startIcon={!loading || loadingPosition !== 'start' ? startIcon : undefined}
      disabled={props.disabled || loading}
    >
      {children}
    </Button>
  );
}

