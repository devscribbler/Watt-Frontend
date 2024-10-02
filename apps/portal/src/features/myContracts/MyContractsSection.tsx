import * as React from 'react'
import { Typography } from '@mui/material'
import { useSpacing } from '@watt/theme'
import en from '~/i18n'
import { getAllContractsWithProvidersThunk, getContractPDFByIdThunk } from '~/store/reducers/contracts/extraReducers'
import { useAppDispatch, useAppSelector } from '~/store/selectors'
import { getDifferenceBetweenTwoDates, getDuration } from '~/utils/date'
import { ContractsTable } from './ContractsTable'
import { useStyles } from './ContractsTable/contracts.styles'

export const MyContractsSection: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const [mt16] = useSpacing('mt16')
  const { status, contracts } = useAppSelector((state) => state.contracts)

  React.useEffect(() => {
    dispatch(getAllContractsWithProvidersThunk())
  }, [dispatch])

  const handlePDF = React.useCallback(
    (contract_id: string) => {
      dispatch(getContractPDFByIdThunk(contract_id))
    },
    [dispatch]
  )

  const countActiveContracts = React.useCallback(() => {
    let activeContractsList = 0
    contracts.map((contract) => {
      const { unit } = getDuration(
        getDifferenceBetweenTwoDates(contract.contract.start_date, contract.contract.end_date)
      )
      if (unit !== 'hours') {
        activeContractsList++
      }
    })
    return activeContractsList
  }, [contracts])

  // TODO count just active contracts
  const activeContractsText = `${en.myContracts.activeContracts} (${countActiveContracts()})`

  if (status === 'loading') {
    return <></>
  }

  return (
    <div className={mt16}>
      <Typography variant="h3" component="h1">
        {en.myContracts.title}
      </Typography>
      <Typography className={classes.graySubtitle}>{activeContractsText}</Typography>
      <ContractsTable contracts={contracts} handlePDF={handlePDF} />
    </div>
  )
}
