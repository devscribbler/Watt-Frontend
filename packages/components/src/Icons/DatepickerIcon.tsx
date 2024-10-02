import * as React from 'react'

export const DatepickerIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.862 22h14.276C20.166 22 21 21.133 21 20.065V6.839c0-1.07-.834-1.936-1.862-1.936h-1.552V2h-1.862v2.903H8.276V2H6.414v2.903H4.862C3.834 4.903 3 5.77 3 6.84v13.226C3 21.133 3.834 22 4.862 22zm5.276-1.935v-3.226h3.724v3.226h-3.724zm3.724-8.388v3.226h-3.724v-3.226h3.724zm5.276 8.388h-3.414v-3.226h3.414v3.226zm0-5.162h-3.414v-3.226h3.414v3.226zM4.862 6.84h14.276v2.903H4.862V6.84zm0 4.838h3.414v3.226H4.862v-3.226zm0 5.162h3.414v3.226H4.862V16.84z"
        fill="#3F3F3A"
      />
    </svg>
  )
}
