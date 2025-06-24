import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  variant?: 'default' | 'filled' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  prefix?: ReactNode
  suffix?: ReactNode
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    variant = 'default',
    size = 'md',
    label,
    prefix,
    suffix,
    error,
    hint,
    className,
    disabled,
    required,
    id,
    ...props
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    
    const baseStyles = "block w-full rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
    
    const variants = {
      default: cn(
        "border border-primary-300 bg-white text-primary-900 placeholder-primary-400",
        "hover:border-primary-400 focus:border-primary-500 focus:ring-primary-500",
        error && "border-error focus:border-error focus:ring-error"
      ),
      filled: cn(
        "border-0 bg-primary-100 text-primary-900 placeholder-primary-500",
        "hover:bg-primary-50 focus:bg-white focus:ring-primary-500",
        error && "bg-error-50 focus:bg-error-50 focus:ring-error"
      ),
      minimal: cn(
        "border-0 border-b-2 border-primary-200 bg-transparent text-primary-900 placeholder-primary-400 rounded-none",
        "hover:border-primary-300 focus:border-primary-500 focus:ring-0",
        error && "border-error focus:border-error"
      )
    }
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-4 py-3 text-lg"
    }

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium text-primary-700 mb-1",
              required && "after:content-['*'] after:text-error after:ml-1"
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {prefix && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-500 pointer-events-none z-10">
              {prefix}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={cn(
              baseStyles,
              variants[variant],
              sizes[size],
              prefix && (typeof prefix === 'string' && prefix.length > 3 ? "pl-24" : "pl-10"),
              suffix && (typeof suffix === 'string' && suffix.length > 3 ? "pr-24" : "pr-10"),
              className
            )}
            disabled={disabled}
            required={required}
            {...props}
          />
          
          {suffix && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 pointer-events-none z-10">
              {suffix}
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-error flex items-center">
            <span className="mr-1">⚠️</span>
            {error}
          </p>
        )}
        
        {hint && !error && (
          <p className="mt-1 text-sm text-primary-500">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }