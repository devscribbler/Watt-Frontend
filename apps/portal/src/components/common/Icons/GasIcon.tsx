import * as React from 'react'

export const GasIcon = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.603 19a.975.975 0 01-.428-.117c-1.141-.607-2.045-1.543-2.663-2.829-.357-.772-1.403-3.578 1.189-7.131C8.15 5.65 8.246 2.96 8.174 1.955a.892.892 0 01.238-.678c.31-.327.88-.373 1.237-.093.38.304.737.631 1.022 1.029 1.023 1.31 1.57 2.992 1.57 4.746v.21c0-.023.023-.023.047-.046a.964.964 0 011.284-.07c.523.467 1.284 1.38 1.903 3.226.523 1.613.57 2.806.499 3.53-.19 2.923-1.879 4.373-3.258 5.05a.867.867 0 01-1.022-.14c-.19-.187-.285-.468-.285-.771a5.906 5.906 0 00-.69-2.923c-.167-.327-.666-1.028-1.023-1.45a10.986 10.986 0 00-.714 1.357c-.475 1.262-.618 2.151-.498 2.946.047.304-.024.607-.215.817a.89.89 0 01-.666.305zm2.022-7.155c1.046 0 2.402 2.502 2.426 2.526.451.841.712 1.754.808 2.712.998-.772 1.57-1.917 1.64-3.368.048-.607 0-1.59-.427-2.968-.215-.632-.428-1.123-.642-1.496a1.722 1.722 0 01-.405.77c-.214.21-.476.328-.737.328-.309 0-.856-.14-1.19-1.029-.26-.654-.308-1.636-.308-2.337 0-1.38-.404-2.69-1.165-3.718-.142 1.543-.737 3.881-2.711 6.523-2.117 2.9-1.332 5.073-1.047 5.659a4.992 4.992 0 001.118 1.542c.048-.748.238-1.543.618-2.548 0-.024.975-2.408 1.856-2.572l.07-.023h.096v-.001z"
        fill="currentColor"
      />
    </svg>
  )
}