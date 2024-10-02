import * as React from 'react'
import { Grid } from '@mui/material'
import { UTILITIES_LOOKUP, UtilityKindType } from '@watt/constants'
import { UtilitySelector, UtilityType } from '../UtilitySelector'

type UtilityTypeProperties = {
  type: UtilityType
  supplierCount: number
  disabled: boolean
}

type UtilitySelectorGroupProps = {
  utilities: UtilityTypeProperties[]
  onChange: (utility: UtilityKindType[]) => void
}

export const UtilitySelectorGroup: React.FC<UtilitySelectorGroupProps> = ({ utilities, onChange }) => {
  const [selectedUtilities, setSelectedUtilities] = React.useState<UtilityKindType[]>([])

  const handleChange = (utility: UtilityKindType, checked: boolean) => {
    const selectedWithoutUtility = selectedUtilities.filter((u) => u !== utility)

    const updatedList = checked ? [...selectedWithoutUtility, utility] : selectedWithoutUtility

    setSelectedUtilities(updatedList)
    onChange(updatedList)
  }

  return (
    <Grid container spacing={6} direction="row" justifyContent="center" alignItems="center">
      {utilities.map((utility, index) => (
        <Grid item key={index} xs={12} sm={5} md={4} lg={2}>
          <UtilitySelector
            type={utility.type}
            supplierCount={utility.supplierCount}
            disabled={utility.disabled}
            onChange={(checked) => handleChange(UTILITIES_LOOKUP[utility.type], checked)}
          />
        </Grid>
      ))}
    </Grid>
  )
}
