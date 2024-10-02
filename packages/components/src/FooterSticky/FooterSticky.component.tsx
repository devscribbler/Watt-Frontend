import * as React from 'react'
import { useStyles } from './footerSticky.styles'

interface FooterStickyProps {
  children: React.ReactChild
}

export const FooterSticky: React.FunctionComponent<FooterStickyProps> = ({ children }) => {
  const classes = useStyles()
  return <div className={classes.root}>{children}</div>
}
