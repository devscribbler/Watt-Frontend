import { Table, TableFooter, TableRow } from '@mui/material'
import { Provider } from '@watt/api-interface'
import { QuoteRatesType } from '@watt/constants'
import en from '~/i18n'
import { CustomTableCell } from './CustomTableCell'
import { CustomTableBody } from './TableBody/TableBody'
import { CustomTableHead } from './TableHead/TableHead'
import { useStyles } from './rates.comparison.table.styles'

const i18n = en.electricityQuote

type Props = {
  currentSupplier?: Provider
  currentSupplierRates?: QuoteRatesType
  nextSupplierRates: QuoteRatesType
  nextSupplier: Provider
}
// TODO (Stephen): Decide if this table should be showing duration as it is available on the two rates fields
export const RatesComparisonTable = (props: Props): JSX.Element => {
  const { currentSupplierRates, nextSupplierRates, currentSupplier, nextSupplier } = props
  const classes = useStyles()

  return (
    <Table>
      <CustomTableHead currentSupplier={currentSupplier} nextSupplier={nextSupplier} />
      <CustomTableBody currentSupplierRates={currentSupplierRates} nextSupplierRates={nextSupplierRates} />
      <TableFooter className={classes.footer}>
        <TableRow>
          <CustomTableCell colSpan={3} classes={{ root: classes.cellFooter }}>
            {i18n.pricesComparisonTable.footer}
          </CustomTableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
