import { useMemo } from 'react'
import { InputLabel, Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { Provider } from '@watt/api-interface'
import { ProviderImage } from '@watt/components'
import { UTILITIES_LOOKUP, UtilityKindType } from '@watt/constants'
import { useSpacing } from '@watt/theme'
import en from '~/i18n'
import { GenericCard } from '../Quote/GenericCard/GenericCard'
import { useStyles } from './PrefilledSupplier.styles'

const i18n = en.selectSupplierWithNoData

type PrefilledSupplierProps = {
  providers: Provider[]
  supplier: string
  utilityType: UtilityKindType
}

const getDetectedSupplier = (utilityType: UtilityKindType) => {
  switch (utilityType) {
    case UTILITIES_LOOKUP.ELECTRICITY:
      return i18n.weDetectedSupplier.electricity
    case UTILITIES_LOOKUP.GAS:
      return i18n.weDetectedSupplier.gas
    default:
      return ''
  }
}

/**
 * This view is shown when the user has a supplier prefilled
 *
 * i.e. when we can detect it from Electralinks
 *
 * TODO (jameskmonger) don't use <img> directly in the code, use a component
 */
export function PrefilledSupplier({ providers, supplier, utilityType }: PrefilledSupplierProps) {
  const styles = useStyles()
  const [mb4, py8, px6] = useSpacing('mb4', 'py8', 'px6', 'mt16')

  const selectedProvider = useMemo(() => providers.find((p) => p.name === supplier), [providers, supplier])

  if (!selectedProvider) {
    return null
  }

  return (
    <>
      <InputLabel required htmlFor={`supplierList`} className={mb4}>
        {i18n.yourCurrentSupplier}
      </InputLabel>
      <GenericCard className={clsx(styles.prefilledSupplierCard, py8, px6)}>
        <Typography variant="subtitle1" className={mb4}>
          {selectedProvider.name}
        </Typography>
        <Grid container className={mb4}>
          <ProviderImage
            imageName={selectedProvider.logo_file_name}
            alt={selectedProvider.name}
            className={styles.logo}
          />
        </Grid>
        <Typography variant="subtitle1" className={clsx(styles.subtitle)}>
          {getDetectedSupplier(utilityType)}
        </Typography>
      </GenericCard>
    </>
  )
}
