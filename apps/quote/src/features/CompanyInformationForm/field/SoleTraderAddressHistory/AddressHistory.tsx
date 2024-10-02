import { useCallback } from 'react'
import { Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { CompanyDetailsForm } from '../../formConfig'
import { SOLE_TRADER_ADDRESS_HISTORY_YEARS_REQUIRED } from '../../getSoleTraderAddressValidationError'
import { AddressButton } from './AddressButton'
import { useStyles } from './AddressHistoryField.styles'
import { AddressHistoryFieldsList } from './AddressHistoryFieldsList'
import { AddressHistoryNavBar } from './AddressHistoryNavBar'
import { useCanAddAddress } from './useCanAddAddress'
import { useTotalYearsFromSoleTraderAddresses } from './useTotalYears'

type AddressHistoryProps = {
  selectedIndex: number
  onChange: (index: number) => void
}

export function AddressHistory({ selectedIndex, onChange }: AddressHistoryProps) {
  const { watch, control } = useFormContext<CompanyDetailsForm>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'company.soletraderPersonalDetails.addresses',
  })
  const lastMoveInDate = watch(`company.soletraderPersonalDetails.addresses.${fields.length - 1}.moved_in_at`)

  const totalYears = useTotalYearsFromSoleTraderAddresses()
  const canAdd = useCanAddAddress()

  const showAdd = totalYears < SOLE_TRADER_ADDRESS_HISTORY_YEARS_REQUIRED && canAdd
  const showRemove = fields.length > 1

  const classes = useStyles({ fieldCount: fields.length })

  const addField = useCallback(() => {
    append({
      address: '',
      postcode: '',
      moved_in_at: lastMoveInDate,
      moved_out_at: lastMoveInDate,
    })
    onChange(fields.length)
  }, [fields, lastMoveInDate, append, onChange])

  const removeField = useCallback(() => {
    remove(selectedIndex)
    onChange(fields.length - 2)
  }, [fields.length, remove, onChange, selectedIndex])

  return (
    <>
      <div className={classes.addressHistoryTitleContainer}>
        <Typography variant="h6" className={classes.addressHistoryTitleText}>
          Address History
        </Typography>
        <Typography variant="subtitle1">
          Please provide your current address and at least five years of address history.
        </Typography>
      </div>
      <AddressHistoryFieldsList selectedIndex={selectedIndex} lastMoveInDate={lastMoveInDate} />
      <Grid item xs={12}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={3}>
            <AddressButton visible={showRemove} onClick={removeField}>
              Remove
            </AddressButton>
          </Grid>
          <Grid item xs={6} className={clsx(classes.gridRow, classes.navBar)}>
            <AddressHistoryNavBar selectedIndex={selectedIndex} onChange={onChange} classes={classes} />
          </Grid>
          <Grid item xs={3}>
            <AddressButton visible={showAdd} onClick={addField}>
              Add
            </AddressButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
