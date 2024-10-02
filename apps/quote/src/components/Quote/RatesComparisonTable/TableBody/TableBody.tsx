// TODO fix keys in this file

/* eslint-disable react/jsx-key */
import { TableBody, TableRow } from '@mui/material'
import { QuoteRatesType } from '@watt/constants'
import { RATES } from '~/constants/quotes'
import en from '~/i18n'
import { CustomTableCell } from '../CustomTableCell'
import { getBetterRate } from './getBetterRate'
import { useStyles } from './table.body.styles'

const i18n = en.electricityQuote

type Props = {
  nextSupplierRates: QuoteRatesType
  currentSupplierRates?: QuoteRatesType
}

export const CustomTableBody = ({ currentSupplierRates, nextSupplierRates }: Props): JSX.Element => {
  const classes = useStyles()
  type TableLegendType = JSX.Element
  type GenericRateFromCurrentSupplierType = JSX.Element | null
  type GenericRateFromWattQuoteType = JSX.Element
  const items: Array<Array<TableLegendType | GenericRateFromCurrentSupplierType | GenericRateFromWattQuoteType>> = []

  Object.keys(RATES).forEach((rate) => {
    const rateKey = rate as keyof QuoteRatesType

    // Hide the following fields from the comparison table
    if (rateKey === 'durationMonths' || rateKey === 'contract_type') {
      return
    }

    const NO_RATE_PLACEHOLDER = '-'

    const supplierRate =
      currentSupplierRates && currentSupplierRates[rateKey] !== undefined ? currentSupplierRates[rateKey] : null

    const nextSupplierRate =
      nextSupplierRates && nextSupplierRates[rateKey] !== undefined ? nextSupplierRates[rateKey] : null

    const titleColumn: TableLegendType = (
      <CustomTableCell component="th" scope="row">
        {RATES[rateKey].label}:
      </CustomTableCell>
    )

    const betterRate = getBetterRate(
      // convert supplier rates to numbers, if they are not null
      supplierRate === null ? supplierRate : +supplierRate,
      nextSupplierRate === null ? nextSupplierRate : +nextSupplierRate
    )

    const currentSupplierColumn: GenericRateFromCurrentSupplierType = (
      <CustomTableCell isBetterRate={betterRate === 'current'}>
        {supplierRate ? RATES[rateKey].text(supplierRate) : NO_RATE_PLACEHOLDER}
      </CustomTableCell>
    )

    const nextSupplierColumn: GenericRateFromCurrentSupplierType = (
      <CustomTableCell isBetterRate={betterRate === 'next'}>
        {nextSupplierRate ? RATES[rateKey].text(nextSupplierRate) : NO_RATE_PLACEHOLDER}
      </CustomTableCell>
    )

    items.push([titleColumn, currentSupplierColumn, nextSupplierColumn])
  })

  // const currentSupplierEstimatedBillValue
  items.push([
    <CustomTableCell component="th" scope="row">
      {i18n.pricesComparisonTable.estimatedBill}
    </CustomTableCell>,
    currentSupplierRates ? <CustomTableCell className={classes.estimateBill}>-</CustomTableCell> : null,
    <CustomTableCell className={classes.estimateBill} isBetterRate>
      -
    </CustomTableCell>,
  ])

  return (
    <TableBody>
      {items.map((item) => (
        <TableRow>{item.map((Component) => Component)}</TableRow>
      ))}
    </TableBody>
  )
}
