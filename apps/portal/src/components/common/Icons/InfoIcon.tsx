import * as React from 'react'

export const InfoIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M3.813 3.463a9.003 9.003 0 0112.552.172 9.003 9.003 0 010 12.73l-.178.172a9.003 9.003 0 01-12.552-.172l-.172-.178a9.002 9.002 0 01.172-12.552l.178-.172zm7.614-.638A7.315 7.315 0 1015.17 15.17l.167-.17A7.27 7.27 0 0017.313 10a7.314 7.314 0 00-5.886-7.175zm-.585 6.051v5.345H9.155V8.876h1.687zM10 5.5a.844.844 0 110 1.687.844.844 0 010-1.687z"
        fill="currentColor"
      />
    </svg>
  )
}
