import React from 'react'

interface TextProps {
  children: React.ReactNode
  className?: string
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export default function TextComponent({ children, className, as: Tag = 'p' }: TextProps) {
  // Styles automatiques en fonction du type de texte
  const defaultStyles = {
    h1: 'text-5xl font-bold',
    h2: 'text-3xl font-semibold',
    h3: 'text-2xl font-medium',
    h4: 'text-xl font-medium',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
    p: 'text-lg text-gray-700',
  }

  return <Tag className={`${defaultStyles[Tag] || ''} ${className}`}>{children}</Tag>
}
