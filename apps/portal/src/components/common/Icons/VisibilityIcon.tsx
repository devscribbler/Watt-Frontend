import * as React from 'react'

export const VisibilityIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.5 3C15.875 3 18 9.5 18 9.5S15.875 16 9.5 16 1 9.5 1 9.5l.006-.017C1.13 9.118 3.315 3 9.5 3zm0 2.167c-3.695 0-5.536 2.95-6.197 4.333.659 1.379 2.5 4.333 6.197 4.333 3.695 0 5.536-2.95 6.197-4.333-.658-1.379-2.502-4.333-6.197-4.333zm0 2.166c1.174 0 2.125.97 2.125 2.167 0 1.197-.951 2.167-2.125 2.167s-2.125-.97-2.125-2.167c0-1.197.951-2.167 2.125-2.167z"
        fill="currentColor"
      />
    </svg>
  )
}
