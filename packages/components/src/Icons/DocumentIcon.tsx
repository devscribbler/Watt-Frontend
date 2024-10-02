import * as React from 'react'

export const DocumentIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15.502 2L20 6.439v13.303c0 1.221-.982 2.216-2.21 2.257l-.078.001H5.288c-1.237 0-2.245-.97-2.287-2.18L3 19.742V4.258c0-1.221.982-2.216 2.21-2.257L5.288 2h10.214zm-1.387 1.935H5.288a.325.325 0 00-.324.285l-.002.038v15.484c0 .165.126.302.288.32l.038.003h12.424a.324.324 0 00.324-.285l.002-.038V7.806h-3.923V3.935zm1.962 11.29v1.936H6.923v-1.935l9.154-.001zm0-4.193v1.936H6.923v-1.936h9.154zm-4.25-4.193v1.935H6.923V6.84l4.904-.001z"
        fill="currentColor"
      />
    </svg>
  )
}
