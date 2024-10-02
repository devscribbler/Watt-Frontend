import * as React from 'react'
import { Box, Typography } from '@mui/material'
import en from '~/i18n'
import { GenericCard } from '../GenericCard/GenericCard'
import { IconBox } from '../IconBox/IconBox'

interface Props {
  title: string
  Icon: React.ReactElement<SVGElement>
}

export const UnavailableUtilitiesCard: React.FunctionComponent<Props> = ({ title, Icon }) => {
  return (
    <GenericCard boxProps={{ display: 'flex' }}>
      <Box display="flex" justifyContent="space-between" flexDirection="column" flexGrow={1}>
        <IconBox>{Icon}</IconBox>
        <div>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="subtitle1">{en.dashboard.unavailableUtilitiesCards.subtitle}</Typography>
        </div>
      </Box>
      <Box flexShrink={0}>
        <img src="/assets/img/bill-construction-disabled.png" height="96px" />
      </Box>
    </GenericCard>
  )
}
