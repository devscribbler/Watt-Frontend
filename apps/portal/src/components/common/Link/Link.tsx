// https://github.com/mui-org/material-ui/blob/master/examples/nextjs-with-typescript/src/Link.tsx
import * as React from 'react'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'
import clsx from 'clsx'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { useRouter } from 'next/router'

type NextComposedProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & NextLinkProps

const BaseNextLink: React.ForwardRefRenderFunction<HTMLAnchorElement, NextComposedProps> = (props, ref) => {
  const { as, href, replace, scroll, passHref, shallow, prefetch, ...other } = props

  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
    >
      <a ref={ref} {...other} />
    </NextLink>
  )
}

const NextComposed = React.forwardRef<HTMLAnchorElement, NextComposedProps>(BaseNextLink)

interface LinkPropsBase {
  activeClassName?: string
  innerRef?: React.Ref<HTMLAnchorElement>
  naked?: boolean
}

export type LinkProps = LinkPropsBase & NextComposedProps & Omit<MuiLinkProps, 'href'>

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props: LinkProps) {
  const { href, activeClassName = 'active', className: classNameProps, innerRef, naked, ...other } = props

  const router = useRouter()
  const pathname = typeof href === 'string' ? href : href.pathname
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  })

  if (naked) {
    return <NextComposed className={className} ref={innerRef} href={href} {...other} />
  }

  return <MuiLink component={NextComposed} className={className} ref={innerRef} href={href as string} {...other} />
}

const BaseLink: React.ForwardRefRenderFunction<HTMLAnchorElement, LinkProps> = (props, ref) => (
  <Link {...props} innerRef={ref} />
)

export default React.forwardRef<HTMLAnchorElement, LinkProps>(BaseLink)
