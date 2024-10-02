import * as React from 'react'
import { Typography } from '@mui/material'
import { MoreIcon } from '~/components/common'
import { useStyles } from './contracts.styles'

interface Props {
  unitRate: number
}

export const UnitRate: React.FunctionComponent<Props> = ({ unitRate }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography>{`${unitRate}p / day`}</Typography>
      <MoreIcon />
    </div>
  )
}
