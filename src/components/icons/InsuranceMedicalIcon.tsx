import React from 'react'

interface IconProps {
  className?: string
}

export const InsuranceMedicalIcon: React.FC<IconProps> = ({
  className = 'h-6 w-6',
}) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21.607 21.9999L16 28.1169L5.86249 17.0579C3.57299 14.5599 3.74199 10.6734 6.23949 8.38394C8.73749 6.09444 12.624 6.26344 14.9135 8.76094L16 9.94644L17.0865 8.76094C19.376 6.26344 23.2625 6.09444 25.7605 8.38394C28.258 10.6734 28.427 14.5599 26.1375 17.0579L23.5 19.9349"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 20C28.002 19.958 23.25 20 23.25 20L21.25 16L18.5 21.5L16 16L14 20.25H11.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
