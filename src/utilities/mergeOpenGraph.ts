import type { Metadata } from 'next'


const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Beneple offers corporate insurance and employee benefits solutions for UAE businesses. Licensed under FAEU Insurance Brokers LLC, Licence #92.',
  images: [
    {
      url: `https://beneple.com/website-template-OG.webp`,
    },
  ],
  siteName: 'Beneple',
  title: 'Beneple – Corporate Insurance & Employee Benefits for UAE Businesses',
}

export const mergeOpenGraph = (
  og?: Metadata['openGraph'],
): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images
      ? og.images
      : defaultOpenGraph.images,
  }
}
