import React from 'react'
import { ArrowRight } from 'lucide-react'

import type { FeatureGridEnhancedBlock as FeatureGridEnhancedBlockProps } from '@/payload-types'

import { type GridFeature } from '@/components/FeatureGrid'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

// Define icons directly to avoid undefined import issues
const UsersIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
    />
  </svg>
)

const ClockIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const ChartIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
)

const ShieldIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

const DocumentIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const CalendarIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const HeartIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const BuildingIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
)

const CogIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
)

const TruckIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
    />
    <path d="M16 4H5a1 1 0 00-1 1v4a1 1 0 001 1h3m7-6v6m0-6l4 6v6a1 1 0 01-1 1h-3m-7-8v8a1 1 0 001 1h3m0-9h4m-4 0V9a1 1 0 011-1h2a1 1 0 011 1v1m-4 8a2 2 0 104 0m-4 0a2 2 0 114 0m6 2a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
)

const GemIcon = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
    />
  </svg>
)

// Insurance Icons from ic_beneple
const InsuranceCorporateIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
  >
    <path
      d="M17.5 16H21.612C23.306 16 24.931 15.327 26.129 14.129C27.327 12.931 28 11.306 28 9.612V9.611C28 9.1835 27.8305 8.774 27.528 8.472C27.226 8.1695 26.8165 8 26.389 8C22.0195 8 9.9805 8 5.611 8C5.1835 8 4.774 8.1695 4.472 8.472C4.1695 8.774 4 9.1835 4 9.611V9.612C4 11.306 4.673 12.931 5.871 14.129C7.069 15.327 8.694 16 10.388 16C12.5835 16 14.5 16 14.5 16"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.5 12.5V23.4575C4.5 23.9995 4.715 24.519 5.098 24.902C5.481 25.285 6.0005 25.5 6.5425 25.5C8.624 25.5 12.0315 25.5 15.5 25.5"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.4575 25.5C25.9995 25.5 26.519 25.285 26.902 24.902C27.285 24.519 27.5 23.9995 27.5 23.4575C27.5 19.7975 27.5 12.5 27.5 12.5"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 8V5.9895C22 5.443 21.557 5 21.0105 5C18.7535 5 13.2465 5 10.9895 5C10.443 5 10 5.443 10 5.9895C10 6.8635 10 8 10 8"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 15.5C17.5 15.102 17.342 14.7205 17.0605 14.4395C16.7795 14.158 16.398 14 16 14C15.602 14 15.2205 14.158 14.9395 14.4395C14.658 14.7205 14.5 15.102 14.5 15.5C14.5 15.983 14.5 16.518 14.5 17.001C14.5 17.3985 14.658 17.78 14.939 18.061C15.22 18.342 15.6015 18.5 15.999 18.5H16C16.398 18.5 16.7795 18.342 17.0605 18.0605C17.342 17.7795 17.5 17.398 17.5 17C17.5 16.5175 17.5 15.9825 17.5 15.5Z"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M25.5 20.75C25.5 19.9215 24.8285 19.25 24 19.25C22.5705 19.25 20.4295 19.25 19 19.25C18.1715 19.25 17.5 19.9215 17.5 20.75C17.5 21.76 17.5 23.114 17.5 24.2755C17.5 25.752 18.366 27.091 19.7125 27.696C20.637 28.112 21.5 28.5 21.5 28.5C21.5 28.5 22.363 28.112 23.2875 27.696C24.634 27.091 25.5 25.752 25.5 24.2755V20.75Z"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.875 23.624L21.125 24.624L23.125 22.874"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const InsuranceGroupIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
  >
    <path
      d="M21.75 20.741C22.6776 20.741 23.4295 19.989 23.4295 19.0615C23.4295 18.1339 22.6776 17.382 21.75 17.382C20.8224 17.382 20.0705 18.1339 20.0705 19.0615C20.0705 19.989 20.8224 20.741 21.75 20.741Z"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5 14.5C12.5 12.5685 14.0685 11 16 11C17.9315 11 19.5 12.5685 19.5 14.5C19.5 12.5685 21.0685 11 23 11C24.9315 11 26.5 12.5685 26.5 14.5C26.5 8.705 21.795 4 16 4C10.205 4 5.5 8.705 5.5 14.5C5.5 12.5685 7.0685 11 9 11C10.9315 11 12.5 12.5685 12.5 14.5Z"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 11V16"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 21.368C17.0681 21.368 17.934 20.5021 17.934 19.434C17.934 18.3659 17.0681 17.5 16 17.5C14.9319 17.5 14.066 18.3659 14.066 19.434C14.066 20.5021 14.9319 21.368 16 21.368Z"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.25 20.741C11.1776 20.741 11.9295 19.989 11.9295 19.0615C11.9295 18.1339 11.1776 17.382 10.25 17.382C9.32243 17.382 8.5705 18.1339 8.5705 19.0615C8.5705 19.989 9.32243 20.741 10.25 20.741Z"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 22.75C18.8975 22.75 21.25 25.1025 21.25 28H10.75C10.75 25.1025 13.1025 22.75 16 22.75Z"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.1745 22.221C20.6655 22.0395 21.1965 21.941 21.75 21.941C24.2665 21.941 26.309 23.9835 26.309 26.5H23.418"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.58201 26.5H5.69101C5.69101 23.9835 7.73351 21.941 10.25 21.941C10.8035 21.941 11.3345 22.0395 11.8255 22.221"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 13.25C12.5 13.25 11.459 8.541 16 4"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.4485 13.25C19.4485 13.25 20.141 10.1185 17.9335 6.5"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const InsuranceMedicalIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
  >
    <path
      d="M21.607 21.9999L16 28.1169L5.86249 17.0579C3.57299 14.5599 3.74199 10.6734 6.23949 8.38394C8.73749 6.09444 12.624 6.26344 14.9135 8.76094L16 9.94644L17.0865 8.76094C19.376 6.26344 23.2625 6.09444 25.7605 8.38394C28.258 10.6734 28.427 14.5599 26.1375 17.0579L23.5 19.9349"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28 20C28.002 19.958 23.25 20 23.25 20L21.25 16L18.5 21.5L16 16L14 20.25H11.5"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const InsuranceSpecialIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M27 7.45399C27 6.45999 26.521 5.52699 25.7135 4.94749C24.906 4.36749 23.869 4.21249 22.927 4.52999C22.9265 4.53049 22.926 4.53049 22.926 4.53049C21.2995 5.07949 19.534 5.04999 17.9265 4.44749C17.192 4.17199 16.615 3.95549 16.615 3.95549C16.2185 3.80699 15.7815 3.80699 15.385 3.95549C15.385 3.95549 14.808 4.17199 14.0735 4.44749C12.466 5.04999 10.7005 5.07949 9.074 4.53049C9.074 4.53049 9.0735 4.53049 9.073 4.52999C8.131 4.21249 7.094 4.36749 6.2865 4.94749C5.479 5.52699 5 6.45999 5 7.45399C5 9.82799 5 13.9965 5 17.07C5 20.077 6.5655 22.867 9.1315 24.434C11.69 25.9965 14.8065 27.899 14.8065 27.899C15.353 28.233 16.038 28.242 16.593 27.923C16.593 27.923 19.9435 25.9975 22.671 24.43C25.349 22.891 27 20.038 27 16.949V7.45399Z"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinejoin="round"
    />
    <path
      d="M16 15.5C17.3807 15.5 18.5 14.3807 18.5 13C18.5 11.6193 17.3807 10.5 16 10.5C14.6193 10.5 13.5 11.6193 13.5 13C13.5 14.3807 14.6193 15.5 16 15.5Z"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5845 20.25C11.82 18.277 13.787 17 16 17C18.213 17 20.18 18.277 21.4155 20.25"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const InsuranceBuildingIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
  >
    <path
      d="M16 18.5V6.77105C16 6.31655 15.694 5.91955 15.2545 5.80405C13.631 5.37655 9.761 4.35805 7.7545 3.83005C7.4545 3.75105 7.135 3.81605 6.8895 4.00505C6.644 4.19455 6.5 4.48705 6.5 4.79705C6.5 9.85855 6.5 28 6.5 28"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M25.5 28V13.5C25.5 12.9475 25.0525 12.5 24.5 12.5C22.06 12.5 16 12.5 16 12.5"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 21.5C20 20.6715 19.3285 20 18.5 20C17.0705 20 14.9295 20 13.5 20C12.6715 20 12 20.6715 12 21.5C12 22.568 12 24.025 12 25.2535C12 26.716 12.8505 28.0455 14.178 28.6585C15.1155 29.0915 16 29.5 16 29.5C16 29.5 16.8845 29.0915 17.822 28.6585C19.1495 28.0455 20 26.716 20 25.2535V21.5Z"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.5 14.5H23.5V17"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.375 24.624L15.625 25.624L17.625 23.874"
      strokeWidth="2"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 12.5V14.5H9.75"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 17.25V19H9.75"
      strokeMiterlimit="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Licensed & Compliant Icon
const LicensedCompliantIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 33 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_50_2)">
      <path
        d="M9.26316 17.2106H15.2632"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.26316 13.2106H15.2632"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.7632 21.2106C27.8007 21.2106 30.2632 18.7481 30.2632 15.7106C30.2632 12.673 27.8007 10.2106 24.7632 10.2106C21.7256 10.2106 19.2632 12.673 19.2632 15.7106C19.2632 18.7481 21.7256 21.2106 24.7632 21.2106Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.2632 24.2106H5.26316C4.99794 24.2106 4.74359 24.1052 4.55605 23.9177C4.36852 23.7301 4.26316 23.4758 4.26316 23.2106V7.21057C4.26316 6.94535 4.36852 6.691 4.55605 6.50346C4.74359 6.31593 4.99794 6.21057 5.26316 6.21057H27.2632C27.5284 6.21057 27.7827 6.31593 27.9703 6.50346C28.1578 6.691 28.2632 6.94535 28.2632 7.21057V11.4681"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.2632 19.9531V28.2106L24.7632 26.2106L28.2632 28.2106V19.9531"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_50_2">
        <rect
          width="32"
          height="32"
          fill="white"
          transform="translate(0.263161 0.210571)"
        />
      </clipPath>
    </defs>
  </svg>
)

// Market-wide Access Icon
const MarketAccessIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_50_9)">
      <path
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 16C21 24 16 28 16 28C16 28 11 24 11 16C11 8 16 4 16 4C16 4 21 8 21 16Z"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.6825 12H27.3175"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.6825 20H27.3175"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_50_9">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

// Specialist Advisors Icon
const SpecialistAdvisorsIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_50_15)">
      <path
        d="M24 15C25.1645 14.9991 26.3131 15.2698 27.3547 15.7906C28.3963 16.3114 29.302 17.0679 30 18"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 18C2.698 17.0679 3.60375 16.3114 4.6453 15.7906C5.68686 15.2698 6.83551 14.9991 8 15"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 23C18.7614 23 21 20.7614 21 18C21 15.2386 18.7614 13 16 13C13.2386 13 11 15.2386 11 18C11 20.7614 13.2386 23 16 23Z"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 27C9.71786 25.7818 10.7412 24.772 11.9689 24.0705C13.1965 23.369 14.586 23 16 23C17.414 23 18.8035 23.369 20.0311 24.0705C21.2588 24.772 22.2821 25.7818 23 27"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.125 10C20.312 9.27571 20.6984 8.61836 21.2402 8.10263C21.7821 7.58689 22.4577 7.23343 23.1903 7.08239C23.923 6.93135 24.6833 6.98877 25.3849 7.24815C26.0866 7.50752 26.7014 7.95845 27.1596 8.54971C27.6179 9.14098 27.9011 9.8489 27.9772 10.5931C28.0533 11.3372 27.9192 12.0878 27.5902 12.7596C27.2611 13.4314 26.7502 13.9974 26.1156 14.3935C25.481 14.7895 24.748 14.9996 24 15"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 15C7.25195 14.9996 6.519 14.7895 5.88438 14.3935C5.24976 13.9974 4.73891 13.4314 4.40984 12.7596C4.08077 12.0878 3.94667 11.3372 4.02277 10.5931C4.09887 9.8489 4.38212 9.14098 4.84036 8.54971C5.29859 7.95845 5.91344 7.50752 6.61508 7.24815C7.31673 6.98877 8.07704 6.93135 8.80968 7.08239C9.54233 7.23343 10.2179 7.58689 10.7598 8.10263C11.3016 8.61836 11.688 9.27571 11.875 10"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_50_15">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

// Wellbeing/Wellness Icon
const WellbeingIcon = () => (
  <svg
    className="h-6 w-6"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_50_23)">
      <path
        d="M16 28C16 28 3 21 3 12.75C3 10.9598 3.71116 9.2429 4.97703 7.97703C6.2429 6.71116 7.95979 6 9.75 6C12.5738 6 14.9925 7.53875 16 10C17.0075 7.53875 19.4262 6 22.25 6C24.0402 6 25.7571 6.71116 27.023 7.97703C28.2888 9.2429 29 10.9598 29 12.75C29 21 16 28 16 28Z"
        stroke="#1E558E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_50_23">
        <rect width="32" height="32" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const iconMap = {
  users: <UsersIcon />,
  clock: <ClockIcon />,
  chart: <ChartIcon />,
  shield: <ShieldIcon />,
  document: <DocumentIcon />,
  calendar: <CalendarIcon />,
  heart: <HeartIcon />,
  building: <BuildingIcon />,
  cog: <CogIcon />,
  truck: <TruckIcon />,
  gem: <GemIcon />,
  // Insurance icons from ic_beneple
  'insurance-corporate': <InsuranceCorporateIcon />,
  'insurance-group': <InsuranceGroupIcon />,
  'insurance-medical': <InsuranceMedicalIcon />,
  'insurance-special': <InsuranceSpecialIcon />,
  'insurance-building': <InsuranceBuildingIcon />,
  // Business category icons
  'licensed-compliant': <LicensedCompliantIcon />,
  'market-access': <MarketAccessIcon />,
  'specialist-advisors': <SpecialistAdvisorsIcon />,
  wellbeing: <WellbeingIcon />,
}

export const FeatureGridEnhancedBlockComponent: React.FC<
  FeatureGridEnhancedBlockProps & {
    disableInnerContainer?: boolean
  }
> = ({
  title,
  subtitle,
  layout,
  columns,
  gap,
  variant,
  showImages,
  showCTA,
  ctaText,
  ctaUrl,
  ctaPosition = 'header',
  features,
  disableInnerContainer,
  featuredCard,
}) => {
  const mappedFeatures: GridFeature[] = (
    features || []
  ).map((feature: any, index: number) => {
    let imageUrl: string | undefined

    // Extract image URL from Media component
    if (
      feature.image &&
      typeof feature.image === 'object'
    ) {
      imageUrl = feature.image.url || undefined
    }

    return {
      id: `feature-${index}`,
      title: feature.title || '',
      description: feature.description ? (
        <RichText
          data={feature.description}
          enableGutter={false}
          enableProse={false}
          className="[&>*]:!leading-inherit [&>*:not(a)]:!text-inherit [&_a:hover]:!text-[#37b0f0] [&_a]:!text-[#1e558e] [&_a]:!underline"
        />
      ) : (
        ''
      ),
      icon: feature.icon
        ? iconMap[feature.icon as keyof typeof iconMap]
        : undefined,
      image: imageUrl,
      link:
        feature.linkText && feature.linkUrl
          ? {
              href: feature.linkUrl,
              text: feature.linkText,
            }
          : undefined,
      badge: feature.badge || undefined,
      size:
        (feature.size as
          | 'small'
          | 'medium'
          | 'large'
          | 'wide'
          | 'tall') || 'medium',
    }
  })

  // Render CTA button
  const renderCTAButton = () => {
    if (!showCTA || !ctaText) return null

    return (
      <div className="mt-6 flex justify-center md:justify-start">
        <a
          href={ctaUrl || '#'}
          className="inline-flex items-center rounded-full bg-brand-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-brand-primary/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
        >
          {ctaText}
        </a>
      </div>
    )
  }

  // Render featured card if provided
  const renderFeaturedCard = () => {
    if (!featuredCard) return null

    let featuredImageUrl: string | undefined
    if (
      featuredCard.image &&
      typeof featuredCard.image === 'object'
    ) {
      featuredImageUrl = featuredCard.image.url || undefined
    }

    const colorVariant = featuredCard.colorVariant || 'brand'
    const isBrandColor = colorVariant === 'brand'

    // Get variant classes for default style
    const getVariantClasses = () => {
      switch (variant) {
        case 'minimal':
          return 'bg-transparent hover:bg-gray-50'
        case 'modern':
          return 'backdrop-blur-2 border border-gray-100 bg-white bg-opacity-30 rounded-2xl shadow-lg hover:shadow-xl border-0'
        case 'bordered':
          return 'backdrop-blur-2 border border-gray-100 bg-white bg-opacity-30 hover:border-brand-secondary'
        case 'compact':
          return 'bg-transparent hover:bg-gray-50 border-0'
        case 'default':
        default:
          return 'backdrop-blur-2 border border-gray-100 bg-white bg-opacity-30 hover:shadow-lg'
      }
    }

    return (
      <div className="col-span-full mb-4 rounded-xl">
        <div
          className={cn(
            'group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]',
            isBrandColor
              ? '!bg-brand-primary hover:shadow-xl'
              : getVariantClasses(),
          )}
        >
          {/* Badge */}
          {featuredCard.badge && (
            <div className={cn(
              'absolute right-4 top-4 rounded-full px-2 py-1 text-xs font-semibold',
              isBrandColor
                ? 'bg-white text-brand-primary'
                : 'bg-brand-primary text-white'
            )}>
              {featuredCard.badge}
            </div>
          )}

          {/* Image */}
          {featuredImageUrl && showImages && (
            <div className="mb-6 overflow-hidden rounded-lg" style={{ aspectRatio: '3.4 / 1' }}>
              <img
                src={featuredImageUrl}
                alt={featuredCard.title || ''}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          )}

          {/* Content with Icon on Left */}
          <div className="flex items-start gap-4">
            {/* Icon */}
            {featuredCard.icon && (
              <div className={cn(
                'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-colors',
                isBrandColor
                  ? 'bg-white/20 text-white group-hover:bg-white/30'
                  : 'bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary/20'
              )}>
                {
                  iconMap[
                    featuredCard.icon as keyof typeof iconMap
                  ]
                }
              </div>
            )}

            {/* Text Content */}
            <div className="flex-1 space-y-4">
              <h3 className={cn(
                'text-lg font-semibold leading-tight md:text-xl',
                isBrandColor ? 'text-white' : 'text-gray-900'
              )}>
                {featuredCard.title}
              </h3>

              <div className={cn(
                'leading-relaxed [&>*]:m-0',
                isBrandColor ? 'text-white/90' : 'text-gray-600'
              )}>
                {featuredCard.description ? (
                  <RichText
                    data={featuredCard.description}
                    enableGutter={false}
                    enableProse={false}
                    className={cn(
                      '[&>*]:!leading-inherit [&>*:not(a)]:!text-inherit [&_a]:!underline',
                      isBrandColor
                        ? '[&_a:hover]:!text-white [&_a]:!text-white/80'
                        : '[&_a:hover]:!text-[#37b0f0] [&_a]:!text-[#1e558e]'
                    )}
                  />
                ) : null}
              </div>

              {/* Link */}
              {featuredCard.linkText &&
                featuredCard.linkUrl && (
                  <div className="pt-2">
                    <a
                      href={featuredCard.linkUrl}
                      className={cn(
                        'inline-flex items-center gap-2 font-medium transition-colors',
                        isBrandColor
                          ? 'text-white hover:text-white/80'
                          : 'text-brand-primary hover:text-brand-secondary'
                      )}
                    >
                      {featuredCard.linkText}
                    </a>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={
        disableInnerContainer
          ? 'feature-grid'
          : 'feature-grid container'
      }
    >
      {/* Header */}
      {(title || subtitle) && (
        <div className="container mb-12 text-left md:text-center">
          {title && (
            <h2 className="mb-4 text-center text-3xl font-semibold text-gray-900 md:max-w-[34ch] md:text-left md:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mx-auto max-w-3xl text-lg text-gray-600 md:mx-0 md:text-left md:text-xl">
              {subtitle}
            </p>
          )}
          {/* CTA Button - Header Position */}
          {ctaPosition === 'header' && renderCTAButton()}
        </div>
      )}

      {/* Combined Grid with Featured Card */}
      <div className="container">
        <div
          className={cn(
            'grid',
            {
              2: 'grid-cols-1 md:grid-cols-2',
              3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
              4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
            }[
              columns
                ? (parseInt(columns as string) as 2 | 3 | 4)
                : 3
            ],
            {
              sm: 'gap-4',
              md: 'gap-6',
              lg: 'gap-8',
            }[gap as 'sm' | 'md' | 'lg'],
          )}
        >
          {/* Featured Card - spans full width */}
          {renderFeaturedCard()}

          {/* Regular Features */}
          {mappedFeatures.map((feature) => {
            const getCardSizeClasses = (size?: string) => {
              if (layout === 'uniform') return ''

              switch (size) {
                case 'large':
                  return 'md:col-span-2 md:row-span-2'
                case 'wide':
                  return 'md:col-span-2'
                case 'tall':
                  return 'md:row-span-2'
                case 'small':
                  return ''
                case 'medium':
                default:
                  return ''
              }
            }

            const getVariantClasses = () => {
              switch (variant) {
                case 'minimal':
                  return 'bg-transparent hover:bg-gray-50'
                case 'modern':
                  return 'backdrop-blur-2 border border-gray-100 bg-white bg-opacity-30 rounded-2xl shadow-lg hover:shadow-xl border-0'
                case 'bordered':
                  return 'backdrop-blur-2 border border-gray-100 bg-white bg-opacity-30 hover:border-brand-secondary'
                case 'compact':
                  return 'bg-transparent hover:bg-gray-50 border-0'
                case 'default':
                default:
                  return 'backdrop-blur-2 border border-gray-100 bg-white bg-opacity-30 border border-gray-100 bg-white hover:shadow-lg'
              }
            }

            // Compact variant: horizontal layout with icon on left, text on right
            if (variant === 'compact') {
              return (
                <div
                  key={feature.id}
                  className={cn(
                    'group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:scale-[1.01]',
                    getVariantClasses(),
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    {feature.icon && (
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-brand-primary transition-colors group-hover:bg-blue-100">
                        {feature.icon}
                      </div>
                    )}

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 text-base font-semibold leading-tight text-gray-900 md:text-lg">
                        {feature.title}
                      </h3>
                      <div className="text-sm leading-relaxed text-gray-600 md:text-base [&>*]:m-0">
                        {feature.description}
                      </div>

                      {/* Link */}
                      {feature.link && (
                        <div className="mt-2">
                          <a
                            href={feature.link.href}
                            className="inline-flex items-center gap-1 text-sm font-medium text-brand-primary transition-colors hover:text-brand-secondary"
                          >
                            {feature.link.text}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Badge */}
                    {feature.badge && (
                      <div className="flex-shrink-0 rounded-full bg-brand-primary px-2 py-1 text-xs font-semibold text-white">
                        {feature.badge}
                      </div>
                    )}
                  </div>
                </div>
              )
            }

            // Standard variants: vertical layout
            return (
              <div
                key={feature.id}
                className={cn(
                  'group relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]',
                  getVariantClasses(),
                  getCardSizeClasses(feature.size),
                )}
              >
                {/* Badge */}
                {feature.badge && (
                  <div className="absolute right-4 top-4 rounded-full bg-brand-primary px-2 py-1 text-xs font-semibold text-white">
                    {feature.badge}
                  </div>
                )}

                {/* Image */}
                {feature.image && showImages && (
                  <div className="mb-6 overflow-hidden rounded-lg">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                )}

                {/* Icon */}
                {feature.icon && (
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-brand-primary transition-colors group-hover:bg-blue-100">
                    {feature.icon}
                  </div>
                )}

                {/* Content */}
                <div
                  className={cn(
                    'space-y-4',
                    feature.size === 'large' && 'space-y-6',
                  )}
                >
                  <h3
                    className={cn(
                      'font-semibold leading-tight text-gray-900',
                      feature.size === 'large'
                        ? 'text-2xl md:text-3xl'
                        : 'text-lg md:text-xl',
                    )}
                  >
                    {feature.title}
                  </h3>

                  <div
                    className={cn(
                      'leading-relaxed text-gray-600 [&>*]:m-0',
                      feature.size === 'large'
                        ? 'text-lg'
                        : 'text-base',
                    )}
                  >
                    {feature.description}
                  </div>

                  {/* Link */}
                  {feature.link && (
                    <div className="pt-2">
                      <a
                        href={feature.link.href}
                        className="inline-flex items-center gap-2 font-medium text-brand-primary transition-colors hover:text-brand-secondary"
                      >
                        {feature.link.text}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA Button - Footer Position */}
      {ctaPosition === 'footer' && (
        <div className="container">{renderCTAButton()}</div>
      )}
    </div>
  )
}
