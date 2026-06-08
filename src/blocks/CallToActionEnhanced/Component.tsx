import React from 'react'

import type { CallToActionEnhancedBlock as CallToActionEnhancedBlockProps } from '@/payload-types'

import {
  CallToAction,
  type CTAButton,
} from '@/components/CallToAction'

export const CallToActionEnhancedBlockComponent: React.FC<
  CallToActionEnhancedBlockProps & {
    disableInnerContainer?: boolean
  }
> = ({
  title,
  subtitle,
  description,
  variant,
  background,
  gradientFrom,
  gradientTo,
  textAlign,
  size,
  image,
  links,
  disableInnerContainer,
}) => {
  const mappedButtons: CTAButton[] = (links || []).map(
    (linkItem) => {
      const link = linkItem.link

      // Generate href based on link type
      let href: string | undefined
      if (link?.type === 'reference' && typeof link.reference?.value === 'object' && link.reference.value.slug) {
        href = `${link.reference?.relationTo !== 'pages' ? `/${link.reference?.relationTo}` : ''}/${link.reference.value.slug}`
      } else if (link?.type === 'custom') {
        href = link.url || undefined
      }

      return {
        text: link?.label || 'Learn More',
        href,
        variant: link?.appearance as
          | 'primary'
          | 'secondary'
          | 'outline'
          | 'ghost',
      }
    },
  )

  let imageProps
  if (image?.media && typeof image.media === 'object') {
    imageProps = {
      src: image.media.url || '',
      alt: image.media.alt || '',
      position: (image.position || 'right') as
        | 'left'
        | 'right'
        | 'background',
    }
  }

  return (
    <div className={'container'}>
      <CallToAction
        title={title || ''}
        subtitle={subtitle || undefined}
        description={description || undefined}
        buttons={mappedButtons}
        variant={
          variant as
            | 'default'
            | 'centered'
            | 'split'
            | 'minimal'
        }
        background={
          background as
            | 'gradient'
            | 'solid'
            | 'transparent'
            | 'pattern'
        }
        gradientFrom={gradientFrom || undefined}
        gradientTo={gradientTo || undefined}
        textAlign={textAlign as 'left' | 'center' | 'right'}
        size={size as 'sm' | 'md' | 'lg' | 'xl'}
        image={imageProps}
        className="text-white [&_*]:text-white"
      />
    </div>
  )
}
