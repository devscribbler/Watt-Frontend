import { Box, IconButton, TableHead, TableRow, Typography } from '@mui/material'
import { Provider } from '@watt/api-interface'
import { InfoIcon, Tooltip } from '@watt/components'
import en from '~/i18n'
import { CustomTableCell } from '../CustomTableCell'
import { useStyles } from './table.head.styles'

const i18n = en.electricityQuote

type Props = {
  currentSupplier?: Provider
  nextSupplier: Provider
}

export const CustomTableHead = ({ currentSupplier, nextSupplier }: Props): JSX.Element => {
  const classes = useStyles()
  const headerItems = generateHeaderItems({ currentSupplier, nextSupplier, classes })

  return (
    <TableHead classes={{ root: classes.root }}>
      <TableRow>{headerItems.map((Item) => Item)}</TableRow>
    </TableHead>
  )
}

type GenerateHeaderItemsArgs = {
  currentSupplier?: Provider
  nextSupplier: Provider
  classes: ReturnType<typeof useStyles>
}

function generateHeaderItems({ currentSupplier, nextSupplier, classes }: GenerateHeaderItemsArgs) {
  const FIRST_COLUMN = (
    <CustomTableCell component="th" scope="row">
      {i18n.pricesComparisonTable.header}
    </CustomTableCell>
  )
  const SECOND_COLUMN = currentSupplier ? (
    <CustomTableCell component="th" scope="column">
      <Box className={classes.boxRow}>
        <Box className={classes.boxColumn}>
          {i18n.pricesComparisonTable.currentSupplierTitle}
          <Typography variant="caption">({currentSupplier.name})</Typography>
        </Box>
        <Box>
          <Tooltip title={i18n.pricesComparisonTable.currentSupplierTooltip}>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </CustomTableCell>
  ) : (
    <CustomTableCell component="th">Couldn&apos;t Find Supplier</CustomTableCell>
  )
  const THIRD_COLUMN = (
    <CustomTableCell component="th" scope="row">
      <Box className={classes.boxRow}>
        <Box className={classes.boxColumn}>
          {i18n.pricesComparisonTable.newSupplierTitle}
          <Typography variant="caption"> ({nextSupplier.name})</Typography>
        </Box>
        <Box>
          <Tooltip title={i18n.pricesComparisonTable.newSupplierTooltip}>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </CustomTableCell>
  )

  return [FIRST_COLUMN, SECOND_COLUMN, THIRD_COLUMN] as const
}
