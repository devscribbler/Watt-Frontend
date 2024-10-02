import * as React from 'react'
import clsx from 'clsx'
import { useStyles } from './generic.card.styles'

interface Props {
  children: React.ReactNode
  className?: string
}

export const GenericCard: React.FunctionComponent<Props> = ({ children, className }) => {
  const classes = useStyles()

  return <div className={clsx(classes.root, className)}>{children}</div>
}
