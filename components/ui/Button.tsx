import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
  fullWidth?: boolean
  children: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    fullWidth = false,
    className,
    disabled,
    children,
    ...props
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    
    const variants = {
      primary: "bg-primary-900 text-white hover:bg-primary-800 focus:ring-primary-500 button-hover",
      secondary: "bg-white border border-primary-300 text-primary-700 hover:bg-primary-50 focus:ring-primary-500 button-hover",
      ghost: "text-primary-700 hover:bg-primary-100 focus:ring-primary-500",
      danger: "bg-error text-white hover:bg-red-600 focus:ring-error",
      success: "bg-success text-white hover:bg-green-600 focus:ring-success",
      outline: "bg-transparent border border-primary-300 text-primary-700 hover:bg-primary-50 focus:ring-primary-500"
    }
    
    const sizes = {
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg"
    }
    
    const iconSizes = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5", 
      lg: "w-6 h-6"
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className={cn("animate-spin rounded-full border-2 border-current border-t-transparent", iconSizes[size])} />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className={cn(iconSizes[size], children && "mr-2")}>{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className={cn(iconSizes[size], children && "ml-2")}>{icon}</span>
            )}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }