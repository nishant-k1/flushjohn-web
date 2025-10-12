/**
 * Lightweight Grid Component
 * Replaces Material-UI Grid with CSS Grid
 * Savings: ~10 KB
 */

import React from 'react';
import styles from './styles.module.css';

interface GridProps {
  children: React.ReactNode;
  container?: boolean;
  item?: boolean;
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
  spacing?: number;
  direction?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  className?: string;
  style?: React.CSSProperties;
}

export function Grid({
  children,
  container = false,
  item = false,
  xs,
  sm,
  md,
  lg,
  xl,
  spacing = 2,
  direction = 'row',
  justifyContent,
  alignItems,
  className,
  style,
}: GridProps) {
  // Convert spacing to class name (handle decimals like 0.5 -> "spacing-0_5")
  const spacingClass = container 
    ? styles[`spacing-${spacing}`.replace('.', '_')] 
    : '';
  
  const classes = [
    container ? styles.container : '',
    item ? styles.item : '',
    xs ? styles[`xs-${xs}`] : '',
    sm ? styles[`sm-${sm}`] : '',
    md ? styles[`md-${md}`] : '',
    lg ? styles[`lg-${lg}`] : '',
    xl ? styles[`xl-${xl}`] : '',
    spacingClass,
    direction === 'column' ? styles.column : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const gridStyle: React.CSSProperties = {
    ...(container && justifyContent ? { justifyContent } : {}),
    ...(container && alignItems ? { alignItems } : {}),
    ...style,
  };

  return (
    <div className={classes} style={gridStyle}>
      {children}
    </div>
  );
}

export default Grid;

