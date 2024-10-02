import * as React from 'react'

export const MenuIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2 4h20v2.55H2V4zm0 7.225h20v2.55H2v-2.55zm0 7.225h20V21H2v-2.55z" fill="currentColor" />
    </svg>
  )
}
