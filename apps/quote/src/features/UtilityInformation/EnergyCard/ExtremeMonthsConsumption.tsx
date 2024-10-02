import { Box, Typography } from '@mui/material'
import { MonthlyUsage, MM } from '@watt/api-interface'
import { DownArrow, UpArrow } from '@watt/components'
import { MONTHS } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import { ERROR_COLORS, PRIMARY_COLORS } from '@watt/theme'

function getMonthFromUsage(usage: MonthlyUsage) {
  const month = usage.year_month.slice(5, 7) as MM

  return MONTHS[month]
}

type Props = {
  type: 'min' | 'max'
  consumption: MonthlyUsage
}

export const ExtremeMonthsConsumption = ({ consumption, type }: Props): JSX.Element => {
  const arrowColor = type === 'max' ? ERROR_COLORS.main : PRIMARY_COLORS.main
  const [ml4] = useSpacing('ml4')

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      {type === 'max' ? (
        <UpArrow color={arrowColor} height="24" width="24" />
      ) : (
        <DownArrow color={arrowColor} height="24" width="24" />
      )}
      <Typography variant="subtitle2" className={ml4}>
        {getMonthFromUsage(consumption)} - {Math.round(consumption.monthly_usage)} kWh
      </Typography>
    </Box>
  )
}
