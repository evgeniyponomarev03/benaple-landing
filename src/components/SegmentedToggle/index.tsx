'use client'

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

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
  
  // If the `value` prop key exists, treat as controlled (even if it's undefined)
  const isControlled = Object.prototype.hasOwnProperty.call(props, 'value')
  const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(defaultValue)
  const activeKey = isControlled ? value : uncontrolledValue

  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [pillLeft, setPillLeft] = useState(0)
  const [pillWidth, setPillWidth] = useState(0)
  const [ready, setReady] = useState(false)

  const updatePill = () => {
    if (!activeKey) return
    const el = itemRefs.current[activeKey]
    const container = containerRef.current
    if (!el || !container) return
    const elRect = el.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const left = elRect.left - containerRect.left
    setPillLeft(left)
    setPillWidth(elRect.width)
  }

  useEffect(() => {
    // initial measurement after mount
    const rAF = requestAnimationFrame(() => {
      updatePill()
      setReady(true)
    })
    return () => cancelAnimationFrame(rAF)
  }, [])

  useEffect(() => {
    updatePill()
  }, [activeKey, items])

  useEffect(() => {
    const handleResize = () => updatePill()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleClick = (key: string) => {
    if (!isControlled) setUncontrolledValue(key)
    onValueChange?.(key)
  }

  const transitionStyle = useMemo(
    () => ({
      transition:
        'transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), width 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 200ms ease-out',
      transform: `translateX(${pillLeft}px)`,
      width: `${pillWidth}px`,
    }),
    [pillLeft, pillWidth],
  )

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center gap-1 p-1 rounded-[40px] ${className ?? ''}`}
      style={{
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(30px) saturate(150%)',
        WebkitBackdropFilter: 'blur(30px) saturate(150%)',
      }}
    >
      {/* Animated active pill */}
      <div
        aria-hidden
        className="absolute left-0 top-0 h-full rounded-full"
        style={{
          ...transitionStyle,
          opacity: ready && !!activeKey ? 1 : 0,
          transform: activeKey
            ? `translateX(${pillLeft}px)`
            : 'translateX(0px)',
          width: activeKey ? `${pillWidth}px` : '0px',
          background:
            'linear-gradient(129.24deg, rgba(23, 43, 95, 0.9) 8.15%, rgba(17, 24, 39, 0.9) 94.34%)',
          boxShadow: '0 0 4px rgba(23, 43, 95, 0.48)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius: '120px',
        }}
      />
      {/* Items */}
      {items.map((item) => {
        const isActive = item.key === activeKey
        return (
          <button
            key={item.key}
            ref={(el) => {
              itemRefs.current[item.key] = el
            }}
            type="button"
            disabled={item.disabled}
            onClick={() => handleClick(item.key)}
            className={`relative z-10 select-none whitespace-nowrap transition-all duration-200 font-inter inline-flex items-center justify-center text-center align-middle py-3 px-6 gap-[10px] rounded-[120px] text-sm font-medium leading-[1.2] tracking-[-0.01em] cursor-pointer border-none bg-transparent ${
              isActive 
                ? 'text-white' 
                : 'text-[#64748B] hover:text-[#475569]'
            }`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
