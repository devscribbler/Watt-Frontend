import * as React from 'react'
import clsx from 'clsx'
import { useStyles } from './icon.box.styles'

interface Props {
  children: React.ReactElement<SVGElement>
  bgcolor?: string
  height?: number | string
  width?: number | string
  className?: string
}

export const IconBox: React.FunctionComponent<Props> = ({
  children,
  height = '4rem',
  width = '4rem',
  bgcolor = 'grey.400',
  className,
}) => {
  const classes = useStyles({ height, width })

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.inner} style={{ backgroundColor: bgcolor }} />
      {children}
    </div>
  )
}
