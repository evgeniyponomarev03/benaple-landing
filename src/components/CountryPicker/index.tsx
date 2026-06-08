'use client'

import { useState, useRef, useEffect } from 'react'

interface Country {
  id: string
  flag: string
  countryCode: string
}

interface Props {
  countriesDropdown: Country[]
  onSelect?: (countryCode: string) => void
}

const CountryPicker: React.FC<Props> = ({
  countriesDropdown,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<Country>(
    countriesDropdown[0],
  )
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener(
      'mousedown',
      handleClickOutside,
    )
    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      )
  }, [])

  const handleSelect = (country: Country) => {
    setSelected(country)
    setIsOpen(false)
    if (onSelect) onSelect(country.countryCode)
  }

  return (
    <div className="relative w-fit" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center justify-between border-r border-[#0B150C1A] pr-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          <img
            src={selected.flag}
            alt={selected.countryCode}
            className="h-3 w-5 object-cover"
          />
          <span>{selected.countryCode}</span>
        </span>
        <span className="ml-2">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: isOpen
                ? 'rotate(180deg)'
                : 'rotate(0deg)',
              transition: 'transform 0.2s ease-in-out',
            }}
          >
            <path
              d="M0.666504 0.666504L4.6665 4.6665L8.6665 0.666504"
              stroke="#172B5F"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-[-17px] top-9 z-10 mt-1 max-h-60 w-[115%] overflow-y-auto rounded bg-white p-1 shadow-lg">
          {countriesDropdown.map((country) => (
            <div
              key={country.id}
              className="flex cursor-pointer items-center gap-2 rounded px-3 py-2 hover:bg-gray-100"
              onClick={() => handleSelect(country)}
            >
              <img
                src={country.flag}
                alt={country.countryCode}
                className="h-3 w-5 object-cover"
              />
              <span>{country.countryCode}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CountryPicker
