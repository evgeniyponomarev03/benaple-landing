'use client'

import React from 'react'
import { WebGLGlobalAurora } from './WebGLGlobalAurora'
import { useAuroraConfig } from './AuroraConfig'

export const AuroraWrapper: React.FC = () => {
  const { config } = useAuroraConfig()

  if (!config.enabled) {
    return null
  }

  return <WebGLGlobalAurora intensity={config.intensity} />
}

export default AuroraWrapper
