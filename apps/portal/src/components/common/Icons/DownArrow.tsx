import * as React from 'react'

export const DownArrow = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M16.926 15.036v1.714h-13.5v-1.714h13.5zM2.208 3.25L6.76 7.823l3.952-3.968a.852.852 0 011.206 0l5.374 5.396V5.89H19v5.43a.856.856 0 01-.854.857h-5.408v-1.715h3.348l-4.77-4.79L7.364 9.64a.852.852 0 01-1.207 0L1 4.462 2.208 3.25z"
        fill="currentColor"
      />
    </svg>
  )
}
