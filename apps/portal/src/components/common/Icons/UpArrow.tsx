import * as React from 'react'

export const UpArrow = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M16.926 14.305V16h-13.5v-1.695h13.5zM18.146 3a.85.85 0 01.854.848v5.37h-1.708V5.893l-5.374 5.336a.86.86 0 01-1.207 0l-3.95-3.923-4.554 4.521L1 10.63l5.158-5.12a.857.857 0 011.206 0l3.95 3.923 4.77-4.738h-3.346V3h5.408z"
        fill="currentColor"
      />
    </svg>
  )
}
