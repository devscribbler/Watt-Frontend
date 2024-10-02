import * as React from 'react'
import { Typography } from '@mui/material'
import { UtilityKindType, UTILITY_TYPES } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import { IconHandler } from './IconHandler'
import { useStyles } from './contracts.styles'

export interface UtilityProps {
  utility_type: UtilityKindType
}

export const Utility: React.FunctionComponent<UtilityProps> = ({ utility_type }) => {
  const classes = useStyles()
  const [ml4] = useSpacing('ml4')

  return (
    <div className={classes.container}>
      <IconHandler utility={utility_type} />
      <Typography variant="body2" className={ml4}>
        {UTILITY_TYPES[utility_type]}
      </Typography>
    </div>
  )
}
