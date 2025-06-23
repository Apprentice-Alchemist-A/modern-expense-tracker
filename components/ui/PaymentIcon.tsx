import { PAYMENT_METHOD_ICONS, PaymentMethodType, USE_SVG_ICONS } from '@/lib/constants/design-tokens'
import Image from 'next/image'

interface PaymentIconProps {
  paymentMethod: PaymentMethodType
  size?: 'sm' | 'md' | 'lg'
  className?: string
  useSvg?: boolean
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
}

const emojiSizes = {
  sm: 'text-sm',
  md: 'text-base', 
  lg: 'text-xl'
}

export function PaymentIcon({
  paymentMethod,
  size = 'md',
  className = '',
  useSvg = USE_SVG_ICONS
}: PaymentIconProps) {
  const iconConfig = PAYMENT_METHOD_ICONS[paymentMethod]
  
  if (useSvg) {
    return (
      <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
        <Image
          src={iconConfig.iconPath}
          alt={iconConfig.altText}
          width={size === 'sm' ? 16 : size === 'md' ? 24 : 32}
          height={size === 'sm' ? 16 : size === 'md' ? 24 : 32}
          className="object-contain"
        />
      </div>
    )
  }

  return (
    <span className={`${emojiSizes[size]} ${className} flex items-center justify-center`}>
      {iconConfig.emoji}
    </span>
  )
}