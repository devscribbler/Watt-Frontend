import * as React from 'react'
import { Box, Typography, FormControl, FormGroup, FormControlLabel, Switch } from '@mui/material'
import { useSpacing } from '@watt/theme'
import { cfg } from '~/config/config'
import en from '~/i18n'
import { GenericCard } from '../GenericCard/GenericCard'

export const AutoRenewCard: React.FC = () => {
  const [mb2, mb4] = useSpacing('mb2', 'mb4')

  return (
    <GenericCard boxProps={{ display: 'flex' }}>
      <Box flexGrow={1}>
        <Typography variant="h5" component="h2" className={mb4}>
          {en.dashboard.autoRenewCard.title}
        </Typography>
        <Typography variant="subtitle2" className={mb2}>
          {en.dashboard.autoRenewCard.subtitle}
        </Typography>
        <Typography variant="subtitle2">{en.dashboard.autoRenewCard.footer}</Typography>
      </Box>

      {/* Togglers */}
      <Box>
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              value="electricity"
              control={<Switch color="primary" />}
              label="Electricity"
              checked
              labelPlacement="start"
            />
            <FormControlLabel
              value="gas"
              control={<Switch color="primary" />}
              label="Gas"
              labelPlacement="start"
              checked={true}
            />
            <FormControlLabel
              value="water"
              control={<Switch color="primary" />}
              label="Water"
              labelPlacement="start"
              disabled={!cfg.features.water}
            />
            <FormControlLabel
              value="telecom"
              control={<Switch color="primary" />}
              label="Telecom"
              labelPlacement="start"
              disabled={!cfg.features.telecom}
            />
            <FormControlLabel
              value="internet"
              control={<Switch color="primary" />}
              label="Internet"
              labelPlacement="start"
              disabled={!cfg.features.internet}
            />
          </FormGroup>
        </FormControl>
      </Box>
    </GenericCard>
  )
}
