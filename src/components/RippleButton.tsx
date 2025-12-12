import { ReactNode } from 'react'
import Ripple from './Ripple'

interface RippleButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const RippleButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
}: RippleButtonProps) => {
  const baseStyles = 'relative font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 dark:bg-gray-500 dark:hover:bg-gray-600',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20',
    ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:text-primary-400 dark:hover:bg-primary-900/20',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const rippleColor = variant === 'primary' || variant === 'secondary' 
    ? 'rgba(255, 255, 255, 0.6)' 
    : 'rgba(14, 165, 233, 0.3)'

  return (
    <Ripple
      color={rippleColor}
      className="inline-block"
    >
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {children}
      </button>
    </Ripple>
  )
}

export default RippleButton

