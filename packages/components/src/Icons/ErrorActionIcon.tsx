import * as React from 'react'

export const ErrorActionIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10 1a9 9 0 110 18 9 9 0 010-18zm0 1.742A7.257 7.257 0 002.742 10a7.257 7.257 0 1014.516 0A7.257 7.257 0 0010 2.742zm2.053 3.973l1.232 1.232L11.232 10l2.053 2.053-1.232 1.232L10 11.232l-2.053 2.053-1.232-1.232L8.768 10 6.715 7.947l1.232-1.232L10 8.768l2.053-2.053z"
        fill="currentColor"
      />
    </svg>
  )
}
