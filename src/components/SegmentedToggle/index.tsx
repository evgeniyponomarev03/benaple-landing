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

export const SegmentedToggle: React.FC<
  SegmentedToggleProps
> = (props) => {
  const {
    items,
    value,
    defaultValue,
    onValueChange,
    className,
  } = props
  // If the `value` prop key exists, treat as controlled (even if it's undefined)
  const isControlled = Object.prototype.hasOwnProperty.call(
    props,
    'value',
  )
  const [uncontrolledValue, setUncontrolledValue] =
    useState<string | undefined>(defaultValue)

  const activeKey = isControlled ? value : uncontrolledValue

  const itemRefs = useRef<
    Record<string, HTMLButtonElement | null>
  >({})
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
    return () =>
      window.removeEventListener('resize', handleResize)
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
      className={
        'relative inline-flex items-center rounded-full p-1 shadow-sm ring-1 ring-black/5 backdrop-blur ' +
        (className ?? '')
      }
      style={{
        background:
          'linear-gradient(135deg, rgba(248, 250, 252, 0.7) 0%, rgba(241, 245, 249, 0.8) 100%)',
        backdropFilter: 'blur(10px) saturate(120%)',
        WebkitBackdropFilter: 'blur(10px) saturate(120%)',
      }}
    >
      {/* Animated liquid glass pill */}
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
            'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.8) 100%)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 2px 8px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 -1px 0 rgba(255, 255, 255, 0.2)
          `,
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
            className={
              'relative z-10 select-none whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ' +
              (isActive
                ? 'text-slate-900'
                : 'text-slate-500 hover:text-slate-700')
            }
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
