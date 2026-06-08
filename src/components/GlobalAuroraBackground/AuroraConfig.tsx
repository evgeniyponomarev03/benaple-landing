'use client'

import React, {
  createContext,
  useContext,
  useState,
} from 'react'

interface AuroraConfig {
  variant: 'default' | 'blue' | 'purple' | 'green' | 'pink'
  intensity: 'low' | 'medium' | 'high'
  enabled: boolean
}

interface AuroraConfigContextType {
  config: AuroraConfig
  updateConfig: (newConfig: Partial<AuroraConfig>) => void
}

const AuroraConfigContext = createContext<
  AuroraConfigContextType | undefined
>(undefined)

export const useAuroraConfig = () => {
  const context = useContext(AuroraConfigContext)
  if (!context) {
    throw new Error(
      'useAuroraConfig must be used within an AuroraConfigProvider',
    )
  }
  return context
}

interface AuroraConfigProviderProps {
  children: React.ReactNode
  initialConfig?: Partial<AuroraConfig>
}

export const AuroraConfigProvider: React.FC<
  AuroraConfigProviderProps
> = ({ children, initialConfig = {} }) => {
  const [config, setConfig] = useState<AuroraConfig>({
    variant: 'default',
    intensity: 'low',
    enabled: true,
    ...initialConfig,
  })

  const updateConfig = (
    newConfig: Partial<AuroraConfig>,
  ) => {
    setConfig((prev) => ({ ...prev, ...newConfig }))
  }

  return (
    <AuroraConfigContext.Provider
      value={{ config, updateConfig }}
    >
      {children}
    </AuroraConfigContext.Provider>
  )
}

// Aurora Control Panel Component (for development/admin use)
export const AuroraControlPanel: React.FC = () => {
  const { config, updateConfig } = useAuroraConfig()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-black/80 p-4 text-white backdrop-blur-sm">
      <h3 className="mb-2 text-sm font-semibold">
        Aurora Background
      </h3>

      <div className="space-y-2">
        <div>
          <label className="block text-xs">Variant</label>
          <select
            value={config.variant}
            onChange={(e) =>
              updateConfig({
                variant: e.target
                  .value as AuroraConfig['variant'],
              })
            }
            className="w-full rounded bg-gray-700 px-2 py-1 text-xs"
          >
            <option value="default">Default</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
            <option value="green">Green</option>
            <option value="pink">Pink</option>
          </select>
        </div>

        <div>
          <label className="block text-xs">Intensity</label>
          <select
            value={config.intensity}
            onChange={(e) =>
              updateConfig({
                intensity: e.target
                  .value as AuroraConfig['intensity'],
              })
            }
            className="w-full rounded bg-gray-700 px-2 py-1 text-xs"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="enabled"
            checked={config.enabled}
            onChange={(e) =>
              updateConfig({ enabled: e.target.checked })
            }
            className="rounded"
          />
          <label htmlFor="enabled" className="text-xs">
            Enabled
          </label>
        </div>
      </div>
    </div>
  )
}

export default AuroraConfigProvider
