'use client'

import { useState, useRef, useEffect } from 'react'

interface Subject {
  id: string
  name: string
}

interface Props {
  subjects: Subject[]
  defaultSubjectId?: string
  onSelect?: (subject: Subject) => void
}

const SubjectDropdown: React.FC<Props> = ({
  subjects,
  defaultSubjectId,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<Subject>(
    subjects.find((s) => s.id === defaultSubjectId) ||
      subjects[0],
  )
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
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

  const handleSelect = (subject: Subject) => {
    setSelected(subject)
    setIsOpen(false)
    onSelect?.(subject)
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className="selectBtn flex w-full items-center justify-between rounded-[8px] border border-[#1118271A] bg-white px-3 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected.name}</span>
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
        <div className="dropdownContainer absolute left-0 top-full z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-[8px] border border-[#1118271A] bg-white">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="item cursor-pointer px-3 py-2 hover:bg-[#0B150C1A]"
              onClick={() => handleSelect(subject)}
            >
              {subject.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SubjectDropdown
