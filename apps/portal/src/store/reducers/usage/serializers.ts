import { MonthlyUsage } from '@watt/api-interface'
import { MONTHS } from '~/constants/global'

type FormatUsageReturnType = MonthlyUsage & {
  formattedPeriod: string
}

export function formatUsage(consumptions: MonthlyUsage[]): FormatUsageReturnType[] {
  return consumptions.map((consumption) => {
    const period = consumption.year_month
    const year = period.slice(0, 4)
    const month = period.slice(5, 7)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const formattedPeriod = `${MONTHS[month]} ${year}`

    return {
      ...consumption,
      formattedPeriod,
    }
  })
}
