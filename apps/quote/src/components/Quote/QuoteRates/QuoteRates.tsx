import { useCallback, useMemo } from 'react'
import clsx from 'clsx'
import { useIsDesktop } from '@watt/components'
import { QuoteRatesType } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import { formatCurrency } from '@watt/utils'
import en from '~/i18n'
import { useStyles } from './quote.rates.styles'

const i18n = en.electricityQuote

type Props = {
  rates: QuoteRatesType
  className?: string
}

export const QuoteRates = ({ rates, className }: Props): JSX.Element => {
  const classes = useStyles()
  const [pb4] = useSpacing('pb4')
  const isDesktop = useIsDesktop()
  const estimatedBill = formatCurrency(Number(rates.annual_price) / 12, { maximumFractionDigits: 2 })
  const planType = rates.contract_type
  const price_guaranteed = useMemo(() => {
    if (rates.price_guaranteed < 12) {
      return `${rates.price_guaranteed} months`
    }
    const years = Math.floor(rates.price_guaranteed / 12)
    const months = rates.price_guaranteed % 12
    return (
      `${years} year` + (years > 1 ? 's' : '') + (months > 0 ? ` and ${months} month` + (months > 1 ? 's' : '') : '')
    )
  }, [rates.price_guaranteed])
  const getLengthWord = useCallback((years: number) => (years > 1 ? 'Years' : 'Year'), [])

  return (
    <table className={clsx(classes.root, className)}>
      <tbody>
        <tr>
          <th align="left" className={clsx(classes.label, pb4)}>
            {i18n.rates.contractLength}:
          </th>
          <td className={clsx(classes.values, pb4)}>
            {rates.durationMonths / 12} {getLengthWord(rates.durationMonths / 12)}
          </td>
        </tr>
        {rates.unit_rate > 0 && (
          <tr>
            <th align="left" className={clsx(classes.label, pb4)}>
              {i18n.rates.unitRate}:
            </th>
            <td className={clsx(classes.values, pb4)}>{parseFloat(rates.unit_rate.toString()).toFixed(5)}p / unit </td>
          </tr>
        )}
        {rates.day_unit_rate > 0 && (
          <tr>
            <th align="left" className={clsx(classes.label, pb4)}>
              {i18n.rates.dayUnitRate}:
            </th>
            <td className={clsx(classes.values, pb4)}>
              {parseFloat(rates.day_unit_rate.toString()).toFixed(5)}p / unit{' '}
            </td>
          </tr>
        )}
        {rates.night_unit_rate > 0 && (
          <tr>
            <th align="left" className={clsx(classes.label, pb4)}>
              {i18n.rates.nightUnitRate}:
            </th>
            <td className={clsx(classes.values, pb4)}>
              {parseFloat(rates.night_unit_rate.toString()).toFixed(5)}p / unit{' '}
            </td>
          </tr>
        )}
        <tr>
          <th align="left" className={clsx(classes.label, pb4)}>
            {i18n.rates.standingCharge}:
          </th>
          <td className={clsx(classes.values, pb4)}>
            {parseFloat(rates.standing_charge.toString()).toFixed(5)}p / day{' '}
          </td>
        </tr>
        {parseFloat(rates.capacity_charge_kva) > 0 && (
          <tr>
            <th align="left" className={clsx(classes.label, pb4)}>
              {i18n.rates.capacityChargeKva}:
            </th>
            <td className={clsx(classes.values, pb4)}>{rates.capacity_charge_kva}</td>
          </tr>
        )}
        <tr>
          <th align="left" className={clsx(classes.label, pb4)}>
            {i18n.rates.estimatedBill}:
          </th>
          <td className={clsx(classes.values, pb4)}>{estimatedBill} / month</td>
        </tr>
        <tr>
          <th align="left" className={clsx(classes.label, pb4)}>
            {i18n.rates.priceGuaranteed}:
          </th>
          <td className={clsx(classes.values, pb4)}>{price_guaranteed} fixed price</td>
        </tr>
        <tr>
          <th align="left" className={clsx(classes.label, isDesktop ? null : pb4)}>
            {i18n.rates.planType}:
          </th>
          <td className={clsx(classes.values, isDesktop ? null : pb4)}>{planType}</td>
        </tr>
      </tbody>
    </table>
  )
}
