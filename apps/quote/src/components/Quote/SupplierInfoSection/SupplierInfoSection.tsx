import * as React from 'react'
import { Box } from '@mui/material'
import { Provider } from '@watt/api-interface'
import { useIsDesktop } from '@watt/components'
import { useStyles } from './supplier.info.section.styles'

type Props = {
  supplier: Provider
  togglePricesComparison: React.MouseEventHandler
  showComparison: boolean
  className?: string
}

export const SupplierInfoSection = ({ supplier, className }: Props): JSX.Element => {
  const isDesktop = useIsDesktop()
  const classes = useStyles()

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%" className={className}>
      <div className={classes.image}>
        <img
          src={`/assets/img/providers/${supplier.logo_file_name}`}
          height={isDesktop ? '100%' : '80%'}
          width="100%"
          alt={supplier.name}
        />
      </div>
      {/* Stephen: disabling this as it only shows random numbers */}
      {/* <ComparePricesButton onClick={togglePricesComparison} showComparison={showComparison} /> */}
    </Box>
  )
}
