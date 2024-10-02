import * as React from 'react'

export const VisibilityIconOff = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.5 2.992C15.875 2.992 18 9.5 18 9.5s-2.125 6.508-8.5 6.508S1 9.5 1 9.5l.006-.017c.124-.366 2.309-6.49 8.494-6.49zm0 2.17c-3.695 0-5.536 2.953-6.197 4.338.659 1.38 2.5 4.338 6.197 4.338 3.695 0 5.536-2.953 6.197-4.338-.658-1.38-2.502-4.338-6.197-4.338zm0 2.169c1.174 0 2.125.97 2.125 2.169 0 1.198-.951 2.17-2.125 2.17s-2.125-.972-2.125-2.17.951-2.17 2.125-2.17z"
        fill="currentColor"
      />
      <path d="M1.173 2.15L2.3 1l15.527 15.85L16.7 18 1.173 2.15z" fill="currentColor" />
    </svg>
  )
}
