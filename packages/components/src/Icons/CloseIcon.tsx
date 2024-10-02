import * as React from 'react'

export const CloseIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M22 4.7l-7.302 7.298L22 19.3 19.3 22l-7.302-7.302L4.7 22 2 19.3l7.3-7.302L2 4.7 4.7 2l7.298 7.3L19.3 2 22 4.7z"
        fill="currentColor"
      />
    </svg>
  )
}
