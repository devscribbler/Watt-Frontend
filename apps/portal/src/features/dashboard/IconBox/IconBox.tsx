import * as React from 'react'
import { Box } from '@mui/material'
import { DEFAULT_BORDER_RADIUS } from '@watt/theme'

interface Props {
  children: React.ReactElement<SVGElement>
  bgcolor?: string
  className?: string
}

export const IconBox: React.FunctionComponent<Props> = ({ children, bgcolor = 'grey.400', className }) => {
  return (
    <Box
      display="flex"
      flexShrink={0}
      alignItems="center"
      justifyContent="center"
      height="4rem"
      width="4rem"
      position="relative"
      className={className}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        borderRadius={DEFAULT_BORDER_RADIUS}
        bgcolor={bgcolor}
        style={{ opacity: 0.1 }}
      />
      {children}
    </Box>
  )
}
