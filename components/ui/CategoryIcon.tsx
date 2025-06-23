import { CATEGORY_ICONS, CategoryType, USE_SVG_ICONS } from '@/lib/constants/design-tokens'
import Image from 'next/image'

interface CategoryIconProps {
  category: CategoryType
  size?: 'sm' | 'md' | 'lg'
  className?: string
  useSvg?: boolean // SVGアイコンを使用するかどうか（デフォルト: true）
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

export function CategoryIcon({ 
  category, 
  size = 'md', 
  className = '',
  useSvg = USE_SVG_ICONS 
}: CategoryIconProps) {
  const iconConfig = CATEGORY_ICONS[category]
  
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
  
  // フォールバック：絵文字表示
  return (
    <span className={`${emojiSizes[size]} ${className} flex items-center justify-center`}>
      {iconConfig.emoji}
    </span>
  )
}