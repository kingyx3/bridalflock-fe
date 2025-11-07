import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  variant = 'filled',
  size = 'md',
  disabled = false,
  onClick,
  children,
  className = '',
}) => {
  const baseStyles = 'font-semibold rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-primary-darker dark:focus:ring-primary'; // Added dark mode focus ring

  const variantStyles = {
    filled: `bg-primary-darker hover:bg-primary-darkest text-white dark:bg-primary-darker dark:hover:bg-primary-darkest dark:text-slate-800`, // Added dark mode styles
    outline: `border border-primary-darker text-primary-darker hover:bg-primary-darker hover:text-white dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-slate-800`, // Added dark mode styles
  };

  const sizeStyles = {
    sm: 'px-3 py-3 text-sm', // Increased py from 1.5 to 3 for better touch target height
    md: 'px-4 py-3 text-base', // Increased py from 2 to 3 for better touch target height
    lg: 'px-6 py-3 text-lg',   // Remains the same
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  const combinedClassName = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabled ? disabledStyles : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['filled', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default React.memo(Button);
