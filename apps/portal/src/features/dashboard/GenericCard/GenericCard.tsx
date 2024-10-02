import * as React from 'react'
import { Box, BoxProps } from '@mui/material'
import clsx from 'clsx'
import { useSpacing } from '@watt/theme'
import { DEFAULT_BORDER_RADIUS } from '@watt/theme'

interface Props {
  children: React.ReactChild[]
  boxProps?: BoxProps
}

export const GenericCard: React.FunctionComponent<Props> = ({ children, boxProps = {} }) => {
  const [px8, py8] = useSpacing('px8', 'py8')

  return (
    <Box
      bgcolor="white"
      boxShadow={1}
      className={clsx(px8, py8)}
      borderRadius={DEFAULT_BORDER_RADIUS}
      height="100%"
      {...boxProps}
    >
      {children}
    </Box>
  )
}
