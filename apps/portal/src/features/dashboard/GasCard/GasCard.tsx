import * as React from 'react'
import { Box, Typography } from '@mui/material'
import { Button } from '@watt/components'
import { useSpacing } from '@watt/theme'
import { ERROR_COLORS } from '@watt/theme'
import { GasIcon } from '~/components/common/Icons/GasIcon'
import en from '~/i18n'
import { useAppSelector } from '~/store/selectors'
import { gasSupplier } from '../CardLayout/CardLayout'
import { GenericCard } from '../GenericCard/GenericCard'
import { IconBox } from '../IconBox/IconBox'

interface Props {
  supplier: typeof gasSupplier // TODO replace this when we know the data structure
  annualTotalConsumption?: number
}

export const GasCard: React.FunctionComponent<Props> = ({ supplier, annualTotalConsumption }) => {
  const [pb24, ml4] = useSpacing('pb24', 'ml4')
  const { mprn } = useAppSelector((state) => state.account)

  return (
    <GenericCard boxProps={{ display: 'flex' }}>
      <Box flexGrow={1}>
        <Box display="flex" alignItems="center" className={pb24}>
          <IconBox bgcolor="error.main">
            <GasIcon color={ERROR_COLORS.main} height={28} width={28} />
          </IconBox>

          <div className={ml4}>
            <Typography variant="h5" component="h2">
              {en.dashboard.gasCard.title}
            </Typography>
            {annualTotalConsumption && mprn ? (
              <Typography variant="subtitle1">
                {en.dashboard.gasCard.subtitle} {String(mprn).slice(-4)}
              </Typography>
            ) : null}
            <Typography>Want a better deal?</Typography>
          </div>
        </Box>

        <div>
          {annualTotalConsumption ? (
            <Typography variant="subtitle1">{annualTotalConsumption}</Typography>
          ) : (
            <>
              <Box display="flex" justifyContent="center">
                <Button variant="contained" color="primary">
                  Get a quote
                </Button>
              </Box>
            </>
          )}
        </div>
      </Box>
      <Box>
        {/* TODO: (Stephen) ensure this is loaded relatively from assets folder not absolute url */}
        <img src={supplier.img.src} height="32px" />
      </Box>
    </GenericCard>
  )
}
