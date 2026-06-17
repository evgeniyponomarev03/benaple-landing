'use client'

import React from 'react'

type SegmentedItem = {
  key: string
  label: React.ReactNode
  disabled?: boolean
}

export interface SegmentedToggleProps {
  items: SegmentedItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (key: string) => void
  className?: string
}

export const SegmentedToggle: React.FC<SegmentedToggleProps> = (props) => {
  const {
    items,
    value,
    defaultValue,
    onValueChange,
    className,
  } = props
  
  const isControlled = Object.prototype.hasOwnProperty.call(props, 'value')
  const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(defaultValue)
  const activeKey = isControlled ? value : uncontrolledValue

  const handleClick = (key: string) => {
    if (!isControlled) setUncontrolledValue(key)
    onValueChange?.(key)
  }

  return (
    <div
      className={`relative inline-flex items-center gap-1 p-1 rounded-[40px] ${className ?? ''}`}
      style={{
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(30px) saturate(150%)',
        WebkitBackdropFilter: 'blur(30px) saturate(150%)',
      }}
    >
      {/* Items */}
      {items.map((item) => {
        const isActive = item.key === activeKey
        return (
          <button
            key={item.key}
            type="button"
            disabled={item.disabled}
            onClick={() => handleClick(item.key)}
            className={`relative z-10 select-none whitespace-nowrap transition-all duration-200 font-inter inline-flex items-center justify-center text-center align-middle py-3 px-6 gap-[10px] rounded-[120px] text-sm font-medium leading-[1.2] tracking-[-0.01em] cursor-pointer border-none ${
              isActive 
                ? 'bg-[linear-gradient(129.24deg,_rgba(23,_43,_95,_0.9)_8.15%,_rgba(17,_24,_39,_0.9)_94.34%)] shadow-[0px_0px_4px_0px_#172B5F7A] text-white' 
                : 'bg-transparent text-[#64748B] hover:text-[#475569]'
            }`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
