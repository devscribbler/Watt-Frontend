import * as React from 'react'
import { Grid } from '@mui/material'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { Provider, MonthlyUsage } from '@watt/api-interface'
import { useIsDesktop, EnergyConsumptionDiagramProps } from '@watt/components'
import { useSpacing } from '@watt/theme'
import { GenericCard } from '../GenericCard/GenericCard'
import { EnergyCardHeader } from './EnergyCardHeader'
import { ExtremeMonthsConsumption } from './ExtremeMonthsConsumption'
import { useStyles } from './energy.card.style'

const EnergyConsumptionDiagram = dynamic<EnergyConsumptionDiagramProps>(
  () => import('@watt/components').then((m) => m.EnergyConsumptionDiagram),
  { ssr: false }
)

interface Props {
  maxConsumption: MonthlyUsage
  minConsumption: MonthlyUsage
  yearlyConsumption: MonthlyUsage[]
  mpan: string
  provider: Provider
}

export const EnergyCard: React.FunctionComponent<Props> = ({
  maxConsumption,
  minConsumption,
  yearlyConsumption = [],
  mpan,
  provider,
}) => {
  const [pt16, pb10] = useSpacing('pt16', 'pb10')
  const classes = useStyles()
  const isDesktop = useIsDesktop()

  return (
    <GenericCard>
      <div className={classes.root}>
        <EnergyCardHeader mpan={mpan} supplierLogo={provider.logo_file_name} supplierName={provider.name} />

        <Grid container spacing={isDesktop ? 8 : 5} className={clsx(pt16, pb10)}>
          <Grid item xs={12} md="auto">
            <ExtremeMonthsConsumption consumption={maxConsumption} type="max" />
          </Grid>
          <Grid item xs={12} md="auto">
            <ExtremeMonthsConsumption consumption={minConsumption} type="min" />
          </Grid>
        </Grid>

        <div className={classes.diagram}>
          <EnergyConsumptionDiagram
            energyConsumption={yearlyConsumption}
            minConsumption={minConsumption}
            maxConsumption={maxConsumption}
          />
        </div>
      </div>
    </GenericCard>
  )
}
