'use client'

import { cn } from '@/lib/utils'
import React, { useState, useEffect } from 'react'

interface MaxWidthProps {
  className?: string
  children: React.ReactNode
}

const MaxWidthWrapper = ({ className = '', children }: MaxWidthProps) => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0)

  useEffect(() => {
    const update = () => {
      const sw = window.innerWidth - document.documentElement.clientWidth
      setScrollbarWidth(sw > 0 ? sw : 0)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div
      className={cn('mx-auto max-w-screen-xl w-full', className)}
      style={{ paddingRight: `${scrollbarWidth}px` }}
    >
      {children}
    </div>
  )
}

export default MaxWidthWrapper
