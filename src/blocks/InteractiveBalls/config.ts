import type { Block } from 'payload'
import { blockHeaderFields } from '@/fields/blockHeader'
import { withBlockThumbnail } from '@/utilities/blockThumbnail'

const interactiveBallsBlockConfig: Block = {
  slug: 'interactiveBalls',
  interfaceName: 'InteractiveBallsBlock',
  fields: [...blockHeaderFields],
  graphQL: {
    singularName: 'InteractiveBallsBlock',
  },
  labels: {
    plural: 'Interactive Balls Blocks',
    singular: 'Interactive Balls Block',
  },
}

export const InteractiveBallsBlock = withBlockThumbnail(interactiveBallsBlockConfig, 'InteractiveBalls')
