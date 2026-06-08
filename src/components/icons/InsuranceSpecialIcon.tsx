import React from 'react'

interface IconProps {
  className?: string
}

export const InsuranceSpecialIcon: React.FC<IconProps> = ({
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 7.45399C27 6.45999 26.521 5.52699 25.7135 4.94749C24.906 4.36749 23.869 4.21249 22.927 4.52999C22.9265 4.53049 22.926 4.53049 22.926 4.53049C21.2995 5.07949 19.534 5.04999 17.9265 4.44749C17.192 4.17199 16.615 3.95549 16.615 3.95549C16.2185 3.80699 15.7815 3.80699 15.385 3.95549C15.385 3.95549 14.808 4.17199 14.0735 4.44749C12.466 5.04999 10.7005 5.07949 9.074 4.53049C9.074 4.53049 9.0735 4.53049 9.073 4.52999C8.131 4.21249 7.094 4.36749 6.2865 4.94749C5.479 5.52699 5 6.45999 5 7.45399C5 9.82799 5 13.9965 5 17.07C5 20.077 6.5655 22.867 9.1315 24.434C11.69 25.9965 14.8065 27.899 14.8065 27.899C15.353 28.233 16.038 28.242 16.593 27.923C16.593 27.923 19.9435 25.9975 22.671 24.43C25.349 22.891 27 20.038 27 16.949V7.45399Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 15.5C17.3807 15.5 18.5 14.3807 18.5 13C18.5 11.6193 17.3807 10.5 16 10.5C14.6193 10.5 13.5 11.6193 13.5 13C13.5 14.3807 14.6193 15.5 16 15.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5845 20.25C11.82 18.277 13.787 17 16 17C18.213 17 20.18 18.277 21.4155 20.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeMiterlimit="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
