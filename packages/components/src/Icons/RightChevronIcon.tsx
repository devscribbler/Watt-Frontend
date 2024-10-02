import * as React from 'react'

export const RightChevronIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.085 23l10.276-9.563a1.934 1.934 0 000-2.874L8.085 1 5 3.872 13.732 12 5 20.128 8.085 23z"
        fill="currentColor"
      />
    </svg>
  )
}
