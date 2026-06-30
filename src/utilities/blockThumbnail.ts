import type { Block } from 'payload'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Automatically adds thumbnail preview to blocks that have a thumb.jpg in their directory.
 * This runs at build time and checks for the existence of thumb.jpg files.
 *
 * Usage:
 * 1. Place a thumb.jpg file in public/blocks/[BlockName]/thumb.jpg
 * 2. Wrap your block config with withBlockThumbnail(config, 'BlockName')
 * 3. The thumbnail will automatically appear in the Payload admin panel
 *
 * Example: public/blocks/MediaBlock/thumb.jpg → shows thumbnail for MediaBlock
 */

// Import all blocks dynamically and check for thumbnails at build time
const blockThumbnails: Record<string, string> = {}

// This will be populated at build time by checking which blocks have thumb.jpg in public/
if (typeof window === 'undefined') {
  try {
    const publicBlocksDir = path.join(
      process.cwd(),
      'public',
      'blocks',
    )

    if (fs.existsSync(publicBlocksDir)) {
      const blockFolders = fs
        .readdirSync(publicBlocksDir, {
          withFileTypes: true,
        })
        .filter((dirent: fs.Dirent) => dirent.isDirectory())
        .map((dirent: fs.Dirent) => dirent.name)

      blockFolders.forEach((folder: string) => {
        const thumbPath = path.join(
          publicBlocksDir,
          folder,
          'thumb.jpg',
        )
        if (fs.existsSync(thumbPath)) {
          blockThumbnails[folder] =
            `/blocks/${folder}/thumb.jpg`
        }
      })
    }
  } catch (error) {
    console.warn(
      'Could not scan for block thumbnails:',
      error,
    )
  }
}

/**
 * Wraps a block config and automatically adds thumbnail if thumb.jpg exists
 * @param block - The block configuration
 * @param blockPath - The folder name of the block (e.g., 'MediaBlock', 'CallToAction')
 * @returns The block config with thumbnail added if it exists
 */
export function withBlockThumbnail<T extends Block>(
  block: T,
  blockPath: string,
): T {
  const thumbnailUrl = blockThumbnails[blockPath]

  if (thumbnailUrl) {
    return {
      ...block,
      imageURL: thumbnailUrl,
      imageAltText: `${block.labels?.singular || blockPath} block preview`,
    }
  }

  return block
}
