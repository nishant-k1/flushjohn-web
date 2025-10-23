
/**
 * Lightweight Button Component
 * Replaces Material-UI Button with native HTML + CSS
 * Savings: ~15-20 KB per page
 */

import React from 'react';
import styles from './styles.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'error';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  loading?: boolean;
}

export default function Button({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  endIcon,
  startIcon,
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[color],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    disabled ? styles.disabled : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const { style, ...restProps } = props;

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      style={style}
      {...restProps}
    >
      {loading && <span className={styles.spinner} />}
      {!loading && startIcon && <span className={styles.startIcon}>{startIcon}</span>}
      <span className={styles.label}>{children}</span>
      {!loading && endIcon && <span className={styles.endIcon}>{endIcon}</span>}
    </button>
  );
}
