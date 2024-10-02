import * as React from 'react'
import { Box, Typography } from '@mui/material'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { MonthlyUsage } from '@watt/api-interface'
import { EnergyConsumptionDiagramProps } from '@watt/components'
import { useSpacing } from '@watt/theme'
import { ERROR_COLORS, PRIMARY_COLORS, UNCATEGORIZED_COLORS } from '@watt/theme'
import { DownArrow } from '~/components/common/Icons/DownArrow'
import { EnergyIcon } from '~/components/common/Icons/EnergyIcon'
import { UpArrow } from '~/components/common/Icons/UpArrow'
import en from '~/i18n'
import { useAppSelector } from '~/store/selectors'
import { GenericCard } from '../GenericCard/GenericCard'
import { IconBox } from '../IconBox/IconBox'

const EnergyConsumptionDiagram = dynamic<EnergyConsumptionDiagramProps>(
  () => import('@watt/components').then((m) => m.EnergyConsumptionDiagram),
  { ssr: false }
)

interface Props {
  maxConsumption: MonthlyUsage
  minConsumption: MonthlyUsage
  yearlyConsumption: MonthlyUsage[] | null
}

export const EnergyCard: React.FunctionComponent<Props> = ({
  maxConsumption,
  minConsumption,
  yearlyConsumption = [],
}) => {
  const [mt2, mr8, ml4, pt16, pb10] = useSpacing('mt2', 'mr8', 'ml4', 'pt16', 'pb10')
  const { mpan } = useAppSelector((state) => state.account)

  return (
    <GenericCard>
      <Box display="flex" justifyContent="space-between">
        <div>
          <Box display="flex" alignItems="center">
            <IconBox bgcolor={UNCATEGORIZED_COLORS.yellow}>
              <EnergyIcon color={UNCATEGORIZED_COLORS.yellow} height="28" width="28" />
            </IconBox>
            <div className={ml4}>
              <Typography variant="h5" component="h2">
                {en.dashboard.energyCard.title}
              </Typography>
              {mpan && (
                <Typography variant="subtitle1" className={mt2}>
                  {en.dashboard.energyCard.subtitle} {String(mpan).slice(-4)}
                </Typography>
              )}
            </div>
          </Box>

          {maxConsumption && minConsumption && (
            <Box display="flex" className={clsx(pt16, pb10)}>
              <Box display="flex" flexDirection="row" alignItems="center" className={mr8}>
                <UpArrow color={ERROR_COLORS.main} height="24" width="24" />
                <Typography variant="subtitle2" className={ml4}>
                  {maxConsumption.year_month} {maxConsumption.monthly_usage} kWh
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <DownArrow color={PRIMARY_COLORS.main} height="24" width="24" />
                <Typography variant="subtitle2" className={ml4}>
                  {minConsumption.year_month} {minConsumption.monthly_usage} kWh
                </Typography>
              </Box>
            </Box>
          )}
        </div>
        <div>
          {/* TODO: (Stephen) check why this is hard coded to always display npower */}
          <img src="/assets/img/npower.png" alt="" height="40px" />
        </div>
      </Box>
      <div style={{ height: '215px', width: '100%' }}>
        <EnergyConsumptionDiagram
          energyConsumption={yearlyConsumption}
          minConsumption={minConsumption}
          maxConsumption={maxConsumption}
        />
      </div>
    </GenericCard>
  )
}
