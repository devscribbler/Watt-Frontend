import * as React from 'react'
import { Box, IconButton, TooltipProps } from '@mui/material'
import { Tooltip } from '@watt/components'
import { InfoIcon } from '../Icons/InfoIcon'

interface Props {
  tooltipProps: Omit<TooltipProps, 'children'>
}

export const InfoIconWithTooltip: React.FC<Props> = ({ tooltipProps }): JSX.Element => {
  return (
    <Box position="absolute" right="0" top="0" bottom="0" display="flex" alignItems="center">
      <Tooltip {...tooltipProps}>
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
