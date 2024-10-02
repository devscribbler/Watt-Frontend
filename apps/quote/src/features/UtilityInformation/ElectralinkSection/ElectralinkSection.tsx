import { Typography } from '@mui/material'
import { MonthlyUsage, Provider } from '@watt/api-interface'
import { useSpacing } from '@watt/theme'
import en from '~/i18n'
import { EnergyCard } from '../EnergyCard/EnergyCard'

type Props = {
  usage: MonthlyUsage[]
  mpan: string
  provider: Provider
}

export const ElectralinkSection = ({ usage, mpan, provider }: Props): JSX.Element => {
  const [pb8] = useSpacing('pb8')
  const sortedConsumption = [...usage].sort((a, b) => a.monthly_usage - b.monthly_usage)
  const maxConsumptionMonth = sortedConsumption[usage.length - 1]
  const minConsumptionMonth = sortedConsumption[0]

  return (
    <div>
      <Typography variant="h5" component="h1" className={pb8}>
        {en.electricityInfo.withElectralink.title}
      </Typography>
      <EnergyCard
        yearlyConsumption={usage}
        minConsumption={minConsumptionMonth}
        maxConsumption={maxConsumptionMonth}
        mpan={mpan}
        provider={provider}
      />
    </div>
  )
}
