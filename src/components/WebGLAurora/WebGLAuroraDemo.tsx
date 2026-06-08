'use client'

import React, { useState } from 'react'
import WebGLAurora from './WebGLAurora'

export const WebGLAuroraDemo: React.FC = () => {
  const [variant, setVariant] = useState('default')
  const [intensity, setIntensity] = useState('medium')
  const [amplitude, setAmplitude] = useState(1.0)
  const [blend, setBlend] = useState(0.5)
  const [speed, setSpeed] = useState(1.0)

  const variants = {
    default: ['#5227FF', '#7cff67', '#5227FF'],
    blue: ['#1e40af', '#3b82f6', '#1e40af'],
    purple: ['#7c3aed', '#a855f7', '#7c3aed'],
    green: ['#059669', '#10b981', '#059669'],
    pink: ['#be185d', '#ec4899', '#be185d'],
  }

  const intensities = {
    low: 0.3,
    medium: 0.6,
    high: 1.0,
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* WebGL Aurora Background */}
      <div className="fixed inset-0 -z-10">
        <WebGLAurora
          colorStops={
            variants[variant as keyof typeof variants]
          }
          amplitude={
            amplitude *
            intensities[
              intensity as keyof typeof intensities
            ]
          }
          blend={blend}
          speed={speed}
          className="h-full w-full"
        />
      </div>

      {/* Control Panel */}
      <div className="fixed left-4 top-4 z-50 rounded-lg bg-black/80 p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-bold">
          WebGL Aurora Controls
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Variant
            </label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className="w-full rounded bg-gray-700 px-3 py-2 text-white"
            >
              <option value="default">Default</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="green">Green</option>
              <option value="pink">Pink</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Intensity
            </label>
            <select
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
              className="w-full rounded bg-gray-700 px-3 py-2 text-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Amplitude: {amplitude.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.1"
              value={amplitude}
              onChange={(e) =>
                setAmplitude(parseFloat(e.target.value))
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Blend: {blend.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.1"
              value={blend}
              onChange={(e) =>
                setBlend(parseFloat(e.target.value))
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Speed: {speed.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.1"
              value={speed}
              onChange={(e) =>
                setSpeed(parseFloat(e.target.value))
              }
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-center text-6xl font-bold">
            WebGL Aurora Demo
          </h1>

          <div className="space-y-8">
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <h2 className="mb-4 text-2xl font-semibold">
                Real-time WebGL Aurora
              </h2>
              <p className="text-lg opacity-90">
                This is a real WebGL-based Aurora effect
                that animates smoothly using GPU shaders.
                Use the controls on the left to customize
                the appearance and behavior.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="mb-2 text-xl font-semibold">
                  Features
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Real-time WebGL rendering</li>
                  <li>• Smooth noise-based animation</li>
                  <li>• Customizable color gradients</li>
                  <li>• Adjustable intensity and blend</li>
                  <li>• Variable animation speed</li>
                </ul>
              </div>

              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <h3 className="mb-2 text-xl font-semibold">
                  Technical Details
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Uses OGL WebGL library</li>
                  <li>• Custom fragment shaders</li>
                  <li>• Simplex noise generation</li>
                  <li>• Color ramp interpolation</li>
                  <li>• Optimized for performance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebGLAuroraDemo
