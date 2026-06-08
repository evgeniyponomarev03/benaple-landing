'use client'

import React, { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import type { InteractiveBallsBlock as InteractiveBallsBlockProps } from '@/payload-types'
import {
  BlockHeader,
  normalizeBlockHeaderProps,
} from '@/components/BlockHeader'

const COLORS = [
  '#37B0F0', // brand-primary
  '#1E558E', // brand-secondary
]

export const InteractiveBallsBlock: React.FC<
  InteractiveBallsBlockProps
> = (props) => {
  const { headline, subline, ...blockData } = props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const runnerRef = useRef<Matter.Runner | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(
    null,
  )

  useEffect(() => {
    setIsClient(true)
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const canvas = canvasRef.current
    if (!canvas) return

    // Set up canvas dimensions with debounced resize
    const updateCanvasSize = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = isMobile ? 400 : 600 // Smaller height on mobile
        setIsMobile(window.innerWidth < 768)
      }
    }

    const debouncedResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      resizeTimeoutRef.current = setTimeout(() => {
        // Clear existing physics world and recreate
        if (runnerRef.current && engineRef.current) {
          Matter.Runner.stop(runnerRef.current)
          Matter.World.clear(engineRef.current.world, false)
          Matter.Engine.clear(engineRef.current)
        }
        // Trigger a re-render by updating state
        setIsClient(false)
        setTimeout(() => setIsClient(true), 10)
      }, 300) // 300ms debounce
    }

    updateCanvasSize()
    window.addEventListener('resize', debouncedResize)

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const centerX = canvasWidth / 2
    const centerY = isMobile
      ? canvasHeight * 0.5 // Center bowl on mobile
      : canvasHeight * 0.45 - 50 // Position bowl higher on desktop
    const bowlRadius = isMobile
      ? Math.min(canvasWidth * 0.375, canvasHeight * 0.375) // 25% smaller on mobile
      : Math.min(canvasWidth * 0.5, canvasHeight * 0.5) // Full size on desktop

    // Create engine
    const engine = Matter.Engine.create()
    engineRef.current = engine

    // Configure engine
    engine.world.gravity.y = 1
    engine.timing.timeScale = 1

    // Create runner
    const runner = Matter.Runner.create()
    runnerRef.current = runner

    // Create walls to form the bowl shape (adjusted for thicker stroke)
    const wallThickness = 32
    const strokeThickness = 48
    const effectiveRadius =
      bowlRadius - strokeThickness / 2 + 15 // Reduce gap between stroke and balls
    const walls = []

    // Create curved bowl using multiple angled walls
    const numSegments = 15
    for (let i = 0; i < numSegments; i++) {
      const angle1 = (i / numSegments) * Math.PI
      const angle2 = ((i + 1) / numSegments) * Math.PI

      const x1 =
        centerX + Math.cos(angle1) * effectiveRadius
      const y1 =
        centerY + Math.sin(angle1) * effectiveRadius
      const x2 =
        centerX + Math.cos(angle2) * effectiveRadius
      const y2 =
        centerY + Math.sin(angle2) * effectiveRadius

      const wallX = (x1 + x2) / 2
      const wallY = (y1 + y2) / 2
      const wallLength = Math.sqrt(
        (x2 - x1) ** 2 + (y2 - y1) ** 2,
      )
      const wallAngle = Math.atan2(y2 - y1, x2 - x1)

      const wall = Matter.Bodies.rectangle(
        wallX,
        wallY,
        wallLength,
        wallThickness,
        {
          isStatic: true,
          angle: wallAngle,
          render: { fillStyle: 'transparent' },
        },
      )

      walls.push(wall)
    }

    // Add bottom wall to contain balls within the div
    const bottomWall = Matter.Bodies.rectangle(
      centerX,
      canvasHeight + wallThickness / 2,
      canvasWidth,
      wallThickness,
      {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      },
    )
    walls.push(bottomWall)

    // Add left and right walls to fully contain the balls
    const leftWall = Matter.Bodies.rectangle(
      -wallThickness / 2,
      canvasHeight / 2,
      wallThickness,
      canvasHeight,
      {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      },
    )
    walls.push(leftWall)

    const rightWall = Matter.Bodies.rectangle(
      canvasWidth + wallThickness / 2,
      canvasHeight / 2,
      wallThickness,
      canvasHeight,
      {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      },
    )
    walls.push(rightWall)

    // Add ceiling wall near the top of the container
    const ceilingOffset = isMobile ? 15 : 20 // Smaller gap on mobile
    const topWall = Matter.Bodies.rectangle(
      centerX,
      ceilingOffset,
      canvasWidth,
      wallThickness,
      {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      },
    )
    walls.push(topWall)

    // Create balls with varying sizes
    const balls: Matter.Body[] = []
    const minRadius = isMobile ? 6 : 8
    const maxRadius = isMobile ? 12 : 18
    const numBalls = isMobile ? 80 : 240 // Fewer balls on mobile for smaller bowl and better performance

    // Create balls in a more scattered pattern to accommodate different sizes
    for (let i = 0; i < numBalls; i++) {
      let x,
        y,
        attempts = 0
      let validPosition = false

      const ballRadius =
        minRadius + Math.random() * (maxRadius - minRadius)

      do {
        // Place balls above the bowl but below the ceiling
        const spreadWidth = effectiveRadius * 1.5 // Wider spread area
        const minY =
          ceilingOffset + wallThickness + ballRadius + 10 // Below ceiling
        const maxY = centerY - effectiveRadius / 2 // Above bowl center
        x = centerX + (Math.random() - 0.5) * spreadWidth
        y = minY + Math.random() * (maxY - minY) // Safe spawn zone

        // Check if this position overlaps with existing balls
        validPosition = true
        for (const existingBall of balls) {
          const dx = x - existingBall.position.x
          const dy = y - existingBall.position.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const minDist =
            ballRadius +
            (existingBall as any).ballRadius +
            2 // Small gap

          if (dist < minDist) {
            validPosition = false
            break
          }
        }
        attempts++
      } while (!validPosition && attempts < 50)

      // Create ball with varying properties based on size
      const ball = Matter.Bodies.circle(x, y, ballRadius, {
        restitution: 0.8,
        friction: 0.1,
        frictionAir: 0.01,
        density: 0.001 * (ballRadius / maxRadius), // Smaller balls are lighter
        render: {
          fillStyle:
            COLORS[
              Math.floor(Math.random() * COLORS.length)
            ],
        },
      }) as any

      // Store the ball radius for collision checking
      ball.ballRadius = ballRadius
      balls.push(ball)
    }

    // Add all bodies to the world
    Matter.World.add(engine.world, [...walls, ...balls])

    // Mouse/Touch interaction
    const mousePosition = { x: 0, y: 0, isHovering: false }

    const handleInteraction = (
      e: MouseEvent | TouchEvent,
    ) => {
      const rect = canvas.getBoundingClientRect()
      let clientX, clientY

      if (e.type.startsWith('touch')) {
        const touchEvent = e as TouchEvent
        if (touchEvent.touches.length > 0) {
          clientX = touchEvent.touches[0].clientX
          clientY = touchEvent.touches[0].clientY
        } else if (touchEvent.changedTouches.length > 0) {
          clientX = touchEvent.changedTouches[0].clientX
          clientY = touchEvent.changedTouches[0].clientY
        } else return
      } else {
        const mouseEvent = e as MouseEvent
        clientX = mouseEvent.clientX
        clientY = mouseEvent.clientY
      }

      mousePosition.x = clientX - rect.left
      mousePosition.y = clientY - rect.top
      mousePosition.isHovering = true
    }

    const handleInteractionEnd = () => {
      mousePosition.isHovering = false
    }

    if (isMobile) {
      // Touch events for mobile
      canvas.addEventListener(
        'touchstart',
        handleInteraction,
        { passive: true },
      )
      canvas.addEventListener(
        'touchmove',
        handleInteraction,
        { passive: true },
      )
      canvas.addEventListener(
        'touchend',
        handleInteractionEnd,
      )
      canvas.addEventListener(
        'touchcancel',
        handleInteractionEnd,
      )
    } else {
      // Mouse events for desktop
      canvas.addEventListener(
        'mousemove',
        handleInteraction,
      )
      canvas.addEventListener(
        'mouseleave',
        handleInteractionEnd,
      )
    }

    // Custom render function
    const ctx = canvas.getContext('2d')!

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      // Apply hover forces to balls
      if (mousePosition.isHovering) {
        balls.forEach((ball) => {
          const dx = ball.position.x - mousePosition.x
          const dy = ball.position.y - mousePosition.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150 && distance > 0) {
            const force = ((150 - distance) / 150) * 0.003 // Increased force for bigger balls
            Matter.Body.applyForce(ball, ball.position, {
              x: (dx / distance) * force,
              y: (dy / distance) * force,
            })
          }
        })
      }

      // Draw bowl outline
      ctx.beginPath()
      ctx.arc(centerX, centerY, bowlRadius, 0, Math.PI)
      ctx.strokeStyle = '#3B82F6'
      ctx.lineWidth = 36
      ctx.stroke()

      // Draw balls
      balls.forEach((ball) => {
        const pos = ball.position
        const radius = (ball as any).ballRadius * 0.7 // Visual radius smaller than physics radius

        ctx.beginPath()
        ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = ball.render.fillStyle as string
        ctx.fill()
      })

      requestAnimationFrame(render)
    }

    // Start the engine and render loop
    Matter.Runner.run(runner, engine)
    render()

    // Cleanup function
    return () => {
      window.removeEventListener('resize', debouncedResize)

      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }

      if (isMobile) {
        canvas.removeEventListener(
          'touchstart',
          handleInteraction,
        )
        canvas.removeEventListener(
          'touchmove',
          handleInteraction,
        )
        canvas.removeEventListener(
          'touchend',
          handleInteractionEnd,
        )
        canvas.removeEventListener(
          'touchcancel',
          handleInteractionEnd,
        )
      } else {
        canvas.removeEventListener(
          'mousemove',
          handleInteraction,
        )
        canvas.removeEventListener(
          'mouseleave',
          handleInteractionEnd,
        )
      }

      if (runnerRef.current && engineRef.current) {
        Matter.Runner.stop(runnerRef.current)
        Matter.World.clear(engineRef.current.world, false)
        Matter.Engine.clear(engineRef.current)
      }
    }
  }, [isClient])

  if (!isClient) {
    return (
      <div className="my-16 w-full">
        <div
          className={`flex w-full items-center justify-center bg-gray-100 ${isMobile ? 'h-[400px]' : 'h-[600px]'}`}
        >
          <p className="text-gray-500">
            Loading interactive physics...
          </p>
        </div>
      </div>
    )
  }

  const headerProps = normalizeBlockHeaderProps({
    headline,
    subline,
    ...blockData,
  })

  return (
    <div className="my-16 w-full">
      <div className="container">
        <BlockHeader {...headerProps} />
      </div>
      <div className="relative w-full">
        <canvas
          ref={canvasRef}
          className={`w-full cursor-pointer ${isMobile ? 'h-[400px]' : 'h-[600px]'}`}
          style={{ touchAction: 'none' }}
        />
        <div className="container mt-4 text-center text-sm text-gray-600">
          {isMobile
            ? 'Touch and drag to interact with the balls!'
            : 'Move your mouse over the bowl to interact with the balls!'}
        </div>
      </div>
    </div>
  )
}
