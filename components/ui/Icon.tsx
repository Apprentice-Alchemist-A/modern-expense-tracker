'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils/cn'

interface IconProps {
  name: string
  category: 'ui' | 'navigation' | 'actions' | 'categories' | 'payments'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'error' | 'primary' | 'white'
  className?: string
  alt?: string
  style?: React.CSSProperties
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
}

export function Icon({ 
  name, 
  category, 
  size = 'md', 
  variant = 'default',
  className = '',
  alt,
  style
}: IconProps) {
  const [svgContent, setSvgContent] = useState<string>('')
  const iconPath = `/icons/${category}/${name}.svg`
  
  useEffect(() => {
    let isMounted = true
    
    const loadSvg = async () => {
      try {
        const response = await fetch(iconPath)
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const text = await response.text()
        
        if (isMounted) {
          setSvgContent(text)
        }
      } catch (error) {
        if (isMounted) {
          console.error(`Failed to load icon: ${iconPath}`, error)
          // フォールバック: 基本的な四角形アイコン
          setSvgContent(`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="12" height="12" stroke="currentColor" stroke-width="1" fill="none"/>
          </svg>`)
        }
      }
    }
    
    loadSvg()
    
    return () => {
      isMounted = false
    }
  }, [iconPath])

  if (!svgContent) {
    return (
      <div className={cn(sizeClasses[size], "flex items-center justify-center bg-gray-200 rounded", className)}>
        <span className="text-xs">?</span>
      </div>
    )
  }

  // 既存のSVG属性を全て削除して、variantクラスを追加する確実なアプローチ
  const iconClass = `icon-${variant}`
  
  const processedSvg = svgContent
    // <style>タグを削除（既存の色制御を無効化）
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // 全ての要素から既存のclass属性を削除
    .replace(/\s+class="[^"]*"/g, '')
    // 全ての要素からstyle属性を削除
    .replace(/\s+style="[^"]*"/g, '')
    // SVGタグにクラスを追加
    .replace(/<svg([^>]*)>/, `<svg$1 class="${iconClass}">`)
    // 全てのSVG要素にクラスを追加
    .replace(/<(path|circle|rect|polygon|ellipse|line)([^>]*)>/g, `<$1$2 class="${iconClass}">`)

  return (
    <div 
      className={cn(sizeClasses[size], "flex items-center justify-center", className)}
      dangerouslySetInnerHTML={{ __html: processedSvg }}
      style={style}
      role="img"
      aria-label={alt || `${name} icon`}
    />
  )
}