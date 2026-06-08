/**
 * Modern page transition system with flicker-free navigation
 */

interface TransitionOptions {
  duration?: number
  easing?: string
}

/**
 * Check if View Transitions API is supported
 */
export function isViewTransitionSupported(): boolean {
  return (
    typeof document !== 'undefined' &&
    'startViewTransition' in document
  )
}

/**
 * Create overlay element for smooth transitions
 */
function createTransitionOverlay(): HTMLDivElement {
  const overlay = document.createElement('div')
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 400ms cubic-bezier(0.4, 0, 0.2, 1);
  `
  return overlay
}

/**
 * Wait for page to be fully loaded and ready
 */
function waitForPageLoad(): Promise<void> {
  return new Promise((resolve) => {
    // If document is already loaded
    if (document.readyState === 'complete') {
      resolve()
      return
    }

    // Wait for load event
    const onLoad = () => {
      window.removeEventListener('load', onLoad)
      // Additional small delay to ensure all content is rendered
      setTimeout(resolve, 100)
    }

    window.addEventListener('load', onLoad)

    // Fallback timeout in case load event doesn't fire
    setTimeout(resolve, 5000)
  })
}

/**
 * Wait for images and other resources to load
 */
async function waitForContentReady(): Promise<void> {
  // Wait for DOM to be ready
  await waitForPageLoad()

  // Wait for images to load
  const images = document.querySelectorAll('img')
  const imagePromises = Array.from(images).map((img) => {
    if (img.complete) return Promise.resolve()

    return new Promise<void>((resolve) => {
      const onLoad = () => {
        img.removeEventListener('load', onLoad)
        img.removeEventListener('error', onLoad)
        resolve()
      }
      img.addEventListener('load', onLoad)
      img.addEventListener('error', onLoad) // Resolve even on error to not block

      // Timeout fallback
      setTimeout(resolve, 3000)
    })
  })

  await Promise.all(imagePromises)

  // Additional small delay for any final rendering
  await new Promise<void>((resolve) =>
    setTimeout(resolve, 100),
  )
}

/**
 * Modern page transition that prevents flickering
 */
export async function startViewTransition(
  navigationCallback: () => Promise<void> | void,
  options: TransitionOptions = {},
): Promise<void> {
  const { duration = 400 } = options

  // Create transition overlay
  const overlay = createTransitionOverlay()
  document.body.appendChild(overlay)

  try {
    // Phase 1: Fade in overlay to cover current page
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        overlay.style.opacity = '1'
        setTimeout(resolve, duration / 2)
      })
    })

    // Phase 2: Perform navigation while overlay is covering the page
    await navigationCallback()

    // Scroll to top immediately after navigation (while overlay is still covering)
    window.scrollTo({ top: 0, behavior: 'instant' })

    // Phase 3: Wait for new page to be completely loaded and ready
    await waitForContentReady()

    // Phase 4: Fade out overlay to reveal fully loaded new page
    await new Promise<void>((resolve) => {
      overlay.style.opacity = '0'
      setTimeout(() => {
        resolve()
      }, duration / 2)
    })
  } finally {
    // Clean up overlay
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay)
      }
    }, 100)
  }
}

/**
 * Fallback transition for browsers without support
 */
async function fallbackTransition(
  navigationCallback: () => Promise<void> | void,
): Promise<void> {
  const body = document.body

  // Simple fade transition without changing background
  body.style.transition = 'opacity 300ms ease-out'
  body.style.opacity = '0.5'

  await new Promise((resolve) => setTimeout(resolve, 150))

  await navigationCallback()
  window.scrollTo({ top: 0, behavior: 'instant' })

  body.style.opacity = '1'

  await new Promise((resolve) => setTimeout(resolve, 150))

  // Clean up
  body.style.transition = ''
  body.style.opacity = ''
}

/**
 * Enhanced View Transitions API (if supported) with overlay backup
 */
export async function performPageTransition(
  navigationCallback: () => Promise<void> | void,
): Promise<void> {
  // Use View Transitions API if supported, otherwise fallback
  if (isViewTransitionSupported()) {
    return new Promise<void>((resolve) => {
      const transition = document.startViewTransition!(
        () => {
          navigationCallback()
          resolve()
        },
      )
    })
  } else {
    return fallbackTransition(navigationCallback)
  }
}
