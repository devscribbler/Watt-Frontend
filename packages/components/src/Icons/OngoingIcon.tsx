import * as React from 'react'

export const OngoingIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={120} height={120} viewBox="0 0 120 120" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#203649"
          fillRule="nonzero"
          d="M30 82.042c0 3.705 2.985 6.708 6.667 6.708H90V83h-8.571V60.958h-5.715V83H66.19V68.625h-5.714V83h-9.524v-9.583h-5.714V83h-8.571a.956.956 0 01-.953-.958v-46H30v46z"
        />
        <path
          fill="#3E6DCF"
          d="M89.048 51.375v-17.25a2.867 2.867 0 00-2.858-2.875H69.048V37h10.247l-9.057 9.114a27.35 27.35 0 01-19.524 8.136h-5.476V60h5.476a33.01 33.01 0 0023.572-9.823l9.057-9.114v10.312h5.705z"
        />
      </g>
    </svg>
  )
}
