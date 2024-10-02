import * as React from 'react'

export const DealCompleted = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={240} height={240} viewBox="0 0 240 240" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#203649"
          fillRule="nonzero"
          d="M175 145h-20V80c0-8.284-6.716-15-15-15H75c-8.284 0-15 6.716-15 15v75c0 13.807 11.193 25 25 25h70c13.807 0 25-11.193 25-25v-5a5 5 0 00-5-5zM70 155V80a5 5 0 015-5h65a5 5 0 015 5v65h-40a5 5 0 00-5 5v5c0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15zm85 15h-50a24.752 24.752 0 005-15h60c0 8.284-6.716 15-15 15z"
        />
        <path
          fill="#93BD22"
          d="M99.758 118.485L84.274 103l-8.206 8.206 19.587 19.587a5.804 5.804 0 008.206 0l35.071-35.07-8.206-8.207-30.968 30.968z"
        />
      </g>
    </svg>
  )
}
