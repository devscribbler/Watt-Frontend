import * as React from 'react'

export const SuccessActionIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10 1a9 9 0 110 18 9 9 0 010-18zm0 1.742A7.257 7.257 0 002.742 10a7.257 7.257 0 1014.516 0A7.257 7.257 0 0010 2.742zm3.484 3.705l1.23 1.23-5.26 5.26a.87.87 0 01-1.23 0L5.284 10l1.23-1.23L8.84 11.09l4.645-4.644z"
        fill="currentColor"
      />
    </svg>
  )
}
