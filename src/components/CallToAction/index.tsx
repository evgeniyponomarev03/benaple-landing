'use client'
import React from 'react'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'

export interface CTAButton {
  text: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
}

export interface CallToActionProps {
  title: string
  subtitle?: string
  description?: string
  buttons: CTAButton[]
  variant?: 'default' | 'centered' | 'split' | 'minimal'
  background?:
    | 'gradient'
    | 'solid'
    | 'transparent'
    | 'pattern'
  gradientFrom?: string
  gradientTo?: string
  className?: string
  containerClassName?: string
  textAlign?: 'left' | 'center' | 'right'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  image?: {
    src: string
    alt: string
    position?: 'left' | 'right' | 'background'
  }
}

export const CallToAction: React.FC<CallToActionProps> = ({
  title,
  subtitle,
  description,
  buttons,
  variant = 'default',
  background = 'gradient',
  gradientFrom = 'from-brand-secondary',
  gradientTo = 'to-brand-primary',
  className,
  containerClassName,
  textAlign = 'center',
  size = 'md',
  image,
}) => {
  const getBackgroundClasses = () => {
    switch (background) {
      case 'solid':
        return 'bg-gray-900 text-white'
      case 'transparent':
        return 'bg-transparent'
      case 'pattern':
        return `bg-gradient-to-br ${gradientFrom} ${gradientTo} relative overflow-hidden`
      case 'gradient':
      default:
        return `bg-gradient-to-br ${gradientFrom} ${gradientTo} text-white`
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-12 px-6'
      case 'lg':
        return 'py-20 px-8'
      case 'xl':
        return 'py-24 px-8'
      case 'md':
      default:
        return 'py-16 px-6'
    }
  }

  const getTextAlignClasses = () => {
    switch (textAlign) {
      case 'left':
        return 'text-left'
      case 'right':
        return 'text-left md:text-right'
      case 'center':
      default:
        return 'text-left md:text-center'
    }
  }

  const renderButtons = () => (
    <div
      className={cn(
        'flex gap-3 sm:gap-4',
        textAlign === 'center' && 'justify-center',
        textAlign === 'right' && 'justify-end',
        variant === 'split'
          ? 'flex-col sm:flex-row'
          : 'xs:flex-row flex-col sm:flex-row',
      )}
    >
      {buttons.map((button, index) => {
        const buttonClasses = cn(
          'transition-all duration-300',
          background === 'gradient' &&
            button.variant === 'outline' &&
            'border-white border-2 text-white hover:bg-white hover:text-gray-900',
          background === 'gradient' &&
            button.variant === 'primary' &&
            'bg-white text-gray-900 hover:bg-gray-100 font-semibold',
        )

        if (button.href) {
          return (
            <Button
              key={index}
              variant={
                button.variant === 'primary'
                  ? 'default'
                  : button.variant ||
                    (index === 0 ? 'default' : 'outline')
              }
              size={button.size || 'lg'}
              className={buttonClasses}
              asChild
            >
              <a href={button.href}>{button.text}</a>
            </Button>
          )
        }

        return (
          <Button
            key={index}
            variant={
              button.variant === 'primary'
                ? 'default'
                : button.variant ||
                  (index === 0 ? 'default' : 'outline')
            }
            size={button.size || 'lg'}
            className={buttonClasses}
            onClick={button.onClick}
          >
            {button.text}
          </Button>
        )
      })}
    </div>
  )

  const renderContent = () => (
    <div
      className={cn('relative z-10', getTextAlignClasses())}
    >
      {subtitle && (
        <div
          className={cn(
            'mb-4 text-sm font-semibold uppercase tracking-wider',
            background === 'gradient'
              ? 'text-white'
              : 'text-brand-primary',
          )}
        >
          {subtitle}
        </div>
      )}

      <h2
        className={cn(
          'mb-6 font-semibold leading-tight',
          size === 'sm'
            ? 'text-2xl md:text-3xl'
            : size === 'lg'
              ? 'text-4xl md:text-5xl'
              : size === 'xl'
                ? 'text-5xl md:text-6xl'
                : 'text-3xl md:text-4xl',
          background === 'gradient'
            ? 'text-white'
            : 'text-gray-900',
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            'mb-8 max-w-3xl text-lg leading-relaxed md:text-xl',
            textAlign === 'center' && 'md:mx-auto',
            background === 'gradient'
              ? 'text-white'
              : 'text-gray-600',
          )}
        >
          {description}
        </p>
      )}

      {renderButtons()}
    </div>
  )

  if (variant === 'split' && image) {
    return (
      <div
        className={cn(
          'overflow-hidden rounded-3xl',
          getBackgroundClasses(),
          className,
        )}
      >
        {background === 'pattern' && (
          <div className="absolute inset-0 opacity-10">
            <div className="absolute right-0 top-0 h-96 w-96 -translate-y-48 translate-x-48 transform rounded-full bg-white" />
            <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-32 translate-y-32 transform rounded-full bg-white" />
          </div>
        )}

        <div
          className={cn(
            'container',
            getSizeClasses(),
            containerClassName,
          )}
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div
              className={
                image.position === 'right'
                  ? 'order-1'
                  : 'order-2'
              }
            >
              {renderContent()}
            </div>
            <div
              className={
                image.position === 'right'
                  ? 'order-2'
                  : 'order-1'
              }
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-auto w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl',
        getBackgroundClasses(),
        className,
      )}
    >
      {/* Background Pattern */}
      {background === 'pattern' && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 h-96 w-96 -translate-y-48 translate-x-48 transform rounded-full bg-white" />
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-32 translate-y-32 transform rounded-full bg-white" />
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-16 -translate-y-16 transform rounded-full bg-white" />
        </div>
      )}

      {/* Background Image */}
      {image && image.position === 'background' && (
        <div className="absolute inset-0">
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <div
        className={cn(
          'container',
          getSizeClasses(),
          containerClassName,
        )}
      >
        {variant === 'minimal' ? (
          <div className="mx-auto max-w-2xl">
            {renderContent()}
          </div>
        ) : (
          <div className="mx-auto max-w-4xl">
            {renderContent()}
          </div>
        )}
      </div>
    </div>
  )
}

// Predefined CTA variants for common use cases
export const CTAVariants = {
  // HR App specific CTAs
  StartTrial: (
    customProps?: Partial<CallToActionProps>,
  ): CallToActionProps => ({
    title: 'Ready to Transform Your HR Process?',
    subtitle: 'Get Started Today',
    description:
      'Join thousands of companies using our platform to streamline their HR operations and boost employee satisfaction.',
    buttons: [
      { text: 'Start Free Trial', variant: 'primary' },
      { text: 'Schedule Demo', variant: 'outline' },
    ],
    variant: 'centered',
    background: 'gradient',
    gradientFrom: 'from-brand-secondary',
    gradientTo: 'to-brand-primary',
    ...customProps,
  }),

  Contact: (
    customProps?: Partial<CallToActionProps>,
  ): CallToActionProps => ({
    title: 'Have Questions?',
    description:
      'Our team is here to help you find the perfect solution for your organization.',
    buttons: [
      { text: 'Contact Sales', variant: 'primary' },
      { text: 'View Pricing', variant: 'outline' },
    ],
    variant: 'minimal',
    background: 'transparent',
    textAlign: 'center',
    ...customProps,
  }),

  Newsletter: (
    customProps?: Partial<CallToActionProps>,
  ): CallToActionProps => ({
    title: 'Stay Updated',
    subtitle: 'HR Insights',
    description:
      'Get the latest HR trends, tips, and best practices delivered to your inbox.',
    buttons: [
      { text: 'Subscribe Now', variant: 'primary' },
    ],
    variant: 'minimal',
    background: 'solid',
    size: 'sm',
    ...customProps,
  }),
}
